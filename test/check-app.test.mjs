import assert from 'node:assert/strict'
import { before, test } from 'node:test'
import { loadAppChecks } from '../scripts/lib/app.mjs'
import { checkEntry } from '../scripts/lib/check.mjs'
import { fakeGithub, manifest, pluginFiles, tgz } from './helpers.mjs'

/*
 * The entry checks with the app's own code: these run where MM_SOURCE names a Mongo Manager checkout
 * (the workflow sets it), and are skipped elsewhere, but never in CI: there they fail without it.
 */
const source = process.env.MM_SOURCE
const skip = source || process.env.CI ? false : 'MM_SOURCE is not set'
let app

before(async () => {
  if (!source && process.env.CI) throw new Error('MM_SOURCE is not set: the app’s checks are not tested')
  if (source) app = await loadAppChecks(source)
})

/** A character that ends a line, or controls the terminal, where a log shows it. */
const controlCode = (n) => n < 0x20 || (n >= 0x7f && n <= 0x9f) || n === 0x2028 || n === 0x2029

const entry = (more = {}) => ({
  line: 7,
  name: 'Row counter',
  url: 'https://github.com/someone/row-counter',
  description: 'Counts the documents of a collection.',
  license: 'MIT',
  ...more,
})
const archive = (files = pluginFiles()) => ({ name: 'row-counter-1.0.0.tgz', data: tgz(files) })
const check = (assets, e = entry(), moved = {}, using = app) =>
  checkEntry(e, {
    app: using,
    egress: fakeGithub({ 'someone/row-counter': assets }, moved).egress,
  })
const withManifest = (more) => pluginFiles({ 'mongo-manager-plugin.json': JSON.stringify(manifest(more)) })

test(
  'a plugin the app would install passes, with what it asks for and what the scan found',
  { skip },
  async () => {
    const r = await check([archive(pluginFiles({ 'main.js': 'fetch("./data")\n' }))])
    assert.deepEqual(r.errors, [])
    assert.deepEqual(r.warnings, [])
    assert.equal(r.plugin.id, 'row-counter')
    assert.equal(r.plugin.version, '1.0.0')
    assert.deepEqual(r.plugin.permissions, ['documents:read'])
    assert.equal(r.plugin.counts.high, 0)
    assert.equal(r.plugin.counts.medium, 1)
  },
)

test('a release with no archive, or two, is refused as the app refuses it', { skip }, async () => {
  assert.match((await check([])).errors[0], /no plugin archive/)
  assert.match(
    (await check([archive(), { name: 'other.tgz', data: tgz(pluginFiles()) }])).errors[0],
    /more than one archive/,
  )
})

test('an archive that is not the one the release published is refused', { skip }, async () => {
  const r = await check([{ ...archive(), digest: `sha256:${'0'.repeat(64)}` }])
  assert.match(r.errors[0], /not the one the release published/)
})

test('a link to a release, or with a query, is refused', { skip }, async () => {
  const tag = await check(
    [archive()],
    entry({ url: 'https://github.com/someone/row-counter/releases/tag/v1.0.0' }),
  )
  assert.match(tag.errors[0], /not a release/)
  const query = await check([archive()], entry({ url: 'https://github.com/someone/row-counter?x=1' }))
  assert.match(query.errors[0], /GitHub repository address/)
})

test('an archive breaking the app’s path rules is refused', { skip }, async () => {
  const r = await check([archive(pluginFiles({ '../outside.js': 'x' }))])
  assert.match(r.errors[0], /Not a plain path/)
})

test('a manifest the app’s schema refuses is refused, naming the field', { skip }, async () => {
  const r = await check([archive(withManifest({ permissions: ['documents:everything'] }))])
  assert.match(r.errors[0], /The manifest is not valid: permissions/)
})

test('a plugin taking the id of one shipped with the app is refused', { skip }, async () => {
  const r = await check([archive(withManifest({ id: 'charts' }))])
  assert.ok(r.errors.some((e) => /shipped with Mongo Manager/.test(e)))
})

test(
  'an entry must name the plugin, its license and its repository as its manifest does',
  { skip },
  async () => {
    const r = await check(
      [archive(withManifest({ license: 'Apache-2.0', repository: 'https://github.com/other/row-counter' }))],
      entry({ name: 'Counter' }),
    )
    assert.deepEqual(
      r.errors.map((e) => e.split(':')[0]),
      [
        'List it by its English name',
        "The manifest's license is Apache-2.0, the entry says MIT",
        "The manifest's repository is https",
      ],
    )
  },
)

test('a plugin with no license, author or README is refused', { skip }, async () => {
  const files = withManifest({ license: undefined, author: undefined })
  delete files['README.md']
  const r = await check([archive(files)])
  assert.ok(r.errors.includes('The manifest names no license'))
  assert.ok(r.errors.includes('The manifest names no author'))
  assert.ok(r.errors.some((e) => /no README\.md/.test(e)))
})

test('a high finding of the scan is refused, naming the file and line', { skip }, async () => {
  const r = await check([archive(pluginFiles({ 'main.js': 'let n = 0\nsetTimeout("n++", 10)\n' }))])
  assert.deepEqual(r.errors, ['The scan finds a high risk (code-from-text) in main.js, line 2'])
})

test('an archive named otherwise is a warning only', { skip }, async () => {
  const r = await check([{ name: 'plugin.tgz', data: tgz(pluginFiles()) }])
  assert.deepEqual(r.errors, [])
  assert.match(r.warnings[0], /named plugin\.tgz/)
})

test(
  'a link to the releases page, or to the latest release, is refused: list the repository',
  { skip },
  async () => {
    for (const url of [
      'https://github.com/someone/row-counter/releases',
      'https://github.com/someone/row-counter/releases/latest',
      'https://github.com/someone/row-counter.git',
    ]) {
      const r = await check([archive()], entry({ url }))
      assert.match(r.errors[0], /Link the repository itself/, url)
    }
  },
)

test('a repository that moved is a warning, its manifest naming the new place', { skip }, async () => {
  const r = await check(
    [archive(withManifest({ repository: 'https://github.com/someone/row-counter-2' }))],
    entry(),
    { 'someone/row-counter': 'someone/row-counter-2' },
  )
  assert.deepEqual(r.errors, [])
  assert.deepEqual(r.warnings, [
    'The repository moved to https://github.com/someone/row-counter-2: link that',
  ])
})

test('a manifest cannot put a line break, or a workflow command, in a message', { skip }, async () => {
  const forged = '\n::warning file=README.md,line=1::forged\r::stop-commands::x\u2028'
  for (const more of [
    { settings: { [`a${forged}`]: { type: 'boolean', title: { en: 'A' } } } },
    { [`extra${forged}`]: 1 },
    { name: { en: 'Row counter', [`xx${forged}`]: 'x' } },
    { contributes: { [`more${forged}`]: [] } },
  ]) {
    const r = await check([archive(withManifest(more))])
    assert.ok(r.errors.length, JSON.stringify(more))
    for (const e of r.errors) assert.ok(![...e].some((c) => controlCode(c.codePointAt(0))), e)
  }
})

test(
  'a scan that fails is refused, as the app approves such a plugin only as a high risk',
  { skip },
  async () => {
    const broken = {
      ...app,
      scanPlugin: () => {
        throw new Error('boom')
      },
    }
    const r = await check([archive()], entry(), {}, broken)
    assert.deepEqual(r.errors, ['The scan failed, so the app would approve it only as a high-risk plugin'])
  },
)

test('a license expression in parentheses matches the entry written without them', { skip }, async () => {
  const r = await check(
    [archive(withManifest({ license: '(MIT OR Apache-2.0)' }))],
    entry({ license: 'MIT OR Apache-2.0' }),
  )
  assert.deepEqual(r.errors, [])
})
