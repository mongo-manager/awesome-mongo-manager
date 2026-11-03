import assert from 'node:assert/strict'
import { test } from 'node:test'
import { commandData, commandProperty, duplicates, mdText, plain, withToken } from '../scripts/lib/check.mjs'
import { logLines, summary } from '../scripts/lib/report.mjs'

function recording() {
  const seen = []
  const record = async (r) => {
    seen.push(r)
    return { status: 200, headers: {}, body: Buffer.alloc(0) }
  }
  return { seen, egress: { request: record, buffer: record, probe: async () => ({}), listed: () => false } }
}

test('the token goes to GitHub’s API over https, and nowhere else', async () => {
  const { seen, egress } = recording()
  const signed = withToken(egress, 'tok')
  for (const url of [
    'https://api.github.com/repos/a/b/releases/latest',
    'https://github.com/a/b/releases/download/v1/a.tgz',
    'https://objects.githubusercontent.com/x',
    'https://release-assets.githubusercontent.com/x',
    'http://api.github.com/repos/a/b/releases/latest',
    'https://api.github.com.example.com/repos/a/b',
    'https://api.github.com:8443/repos/a/b',
    'https://example.com/?u=https://api.github.com/',
    'not an address',
  ])
    await signed.buffer({ method: 'GET', url, headers: { accept: 'x' } })
  await signed.request({ method: 'GET', url: 'https://api.github.com/x', headers: {} })
  assert.deepEqual(
    seen.map((r) => r.headers.authorization ?? null),
    ['Bearer tok', null, null, null, null, null, null, null, null, 'Bearer tok'],
  )
  assert.equal(seen[1].headers.accept, 'x')
})

test('with no token the egress is the app’s, unchanged', () => {
  const { egress } = recording()
  assert.equal(withToken(egress, undefined), egress)
  assert.equal(withToken(egress, ''), egress)
})

test('a message cannot start another workflow command', () => {
  const evil = 'bad\n::error::forged\r\n::add-mask::x 100%'
  const data = commandData(evil)
  assert.ok(!/[\r\n]/.test(data))
  assert.equal(data, 'bad%0A::error::forged%0D%0A::add-mask::x 100%25')
  assert.equal(commandProperty('a:b,c'), 'a%3Ab%2Cc')
})

test('a plugin’s text is no markup in the step summary', () => {
  const shown = mdText('x | <img src=y onerror=z> [link](https://e.com) `code`\n**b**')
  assert.ok(!/(?<!\\)[|<>[\]()`*]/.test(shown))
  assert.ok(!shown.includes('\n'))
  // A backslash of its own cannot cancel the escape of the pipe after it, ending a table cell.
  assert.equal(mdText('a\\|b'), 'a\\\\\\|b')
})

test('the same repository or id listed twice is a problem on the later line', () => {
  const r = (line, url, id) => ({ entry: { line, url }, plugin: id ? { id } : null })
  const found = duplicates([
    r(10, 'https://github.com/a/b', 'one'),
    r(11, 'https://github.com/A/B.git/', 'two'),
    r(12, 'https://github.com/c/d', 'one'),
    r(13, 'https://github.com/e/f', null),
  ])
  assert.deepEqual(
    found.map((p) => p.line),
    [11, 12],
  )
  assert.match(found[0].message, /line 10/)
})

test('plain text keeps a message on one line, every control character written as its code', () => {
  assert.equal(plain('a\nb\rc\u0000d\u2028e\u0085f'), 'a\\u000ab\\u000dc\\u0000d\\u2028e\\u0085f')
  assert.equal(plain('Ünïcode “quotes” ok'), 'Ünïcode “quotes” ok')
})

const forged = 'x\n::warning file=README.md,line=1::forged\r::stop-commands::y'
const results = [
  {
    entry: { line: 10, name: `Evil${forged}` },
    errors: [`The manifest is not valid: settings.a${forged}`],
    warnings: [`moved${forged}`],
    plugin: null,
  },
  {
    entry: { line: 11, name: 'Fine' },
    errors: [],
    warnings: [],
    plugin: { id: 'fine', version: '1.0.0', permissions: [], counts: { high: 0, medium: 0, low: 0 } },
  },
]
const problems = [
  { line: 10, message: `The manifest is not valid: settings.a${forged}` },
  { line: 11, message: 'Listed already on line 9 (repo https://github.com/a/b)' },
  { line: 4, message: `An entry is written as: ${forged}` },
]
// The runner reads a command at the start of any line, after its spaces; a lone \r ends a line too.
const outputLines = (lines) => lines.flatMap((l) => l.split(/\r\n|\r|\n/)).map((l) => l.trimStart())

test('nothing a plugin wrote starts a workflow command in the log', () => {
  const lines = outputLines(logLines({ version: '1.1.0', count: 2, results, problems, actions: true }))
  const commands = lines.filter((l) => l.startsWith('::'))
  assert.equal(commands.length, 4)
  // Every command is one of the check's own annotations: the forged ones stay inside their messages.
  for (const c of commands)
    assert.match(c, /^::(error|warning) file=README\.md,line=\d+,title=Community plugin::/)
  // ...whose text the runner reads back as written: a % of its own is not taken for an escape.
  const percent = logLines({
    version: '1',
    count: 0,
    results: [],
    problems: [{ line: 2, message: '100%0A' }],
    actions: true,
  })
  assert.ok(percent.includes('::error file=README.md,line=2,title=Community plugin::100%250A'))
})

test('an entry with a problem of its line is marked failed, in the log and the summary', () => {
  const lines = logLines({ version: '1.1.0', count: 2, results, problems, actions: false })
  assert.ok(lines.some((l) => l.startsWith('✗ README.md:11')))
  const md = summary({ version: '1.1.0', results, problems })
  assert.match(md, /\| ✗ \| Fine \|/)
  assert.match(md, /README\.md:4/)
  assert.ok(!outputLines([md]).some((l) => l.startsWith('::')))
})
