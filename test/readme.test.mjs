import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { COMMUNITY_END, COMMUNITY_START, communityEntries } from '../scripts/lib/readme.mjs'

const block = (...lines) => ['# List', '', COMMUNITY_START, ...lines, COMMUNITY_END, ''].join('\n')
const ENTRY =
  '- [Row counter](https://github.com/someone/row-counter) - Counts the documents of a collection. (MIT, Mongo Manager 1.1.0).'

test('an entry gives its name, repository, description, license, version and line', () => {
  const { entries, problems } = communityEntries(block('### Charts', '', ENTRY))
  assert.deepEqual(problems, [])
  assert.deepEqual(entries, [
    {
      line: 6,
      name: 'Row counter',
      url: 'https://github.com/someone/row-counter',
      description: 'Counts the documents of a collection.',
      license: 'MIT',
      tested: '1.1.0',
    },
  ])
})

test('an entry in another form, or other text between the markers, is a problem on its line', () => {
  const { entries, problems } = communityEntries(
    block(
      '- [Row counter](https://github.com/someone/row-counter) - Counts the documents.',
      '- [Row counter](http://github.com/someone/row-counter) - Counts. (MIT, Mongo Manager 1.1.0).',
      '- [Row counter](https://example.com/row-counter) - Counts. (MIT, Mongo Manager 1.1.0).',
      '- [Row counter](https://github.com/someone/row-counter) - Counts. (MIT, Mongo Manager 01.1.0).',
      'Some words.',
      '## A heading of the wrong level',
    ),
  )
  assert.deepEqual(entries, [])
  assert.deepEqual(
    problems.map((p) => p.line),
    [4, 5, 6, 7, 8, 9],
  )
  assert.match(problems[0].message, /An entry is written as/)
  assert.match(problems[4].message, /Only entries and ### headings/)
})

test('an awesome-lint comment may stand before an entry', () => {
  const { entries, problems } = communityEntries(
    block('<!--lint ignore no-repeat-item-in-description-->', ENTRY, '<!--lint ignore-->', '<!-- note -->'),
  )
  assert.equal(entries.length, 1)
  assert.deepEqual(
    problems.map((p) => p.line),
    [6, 7],
  )
})

test('a description over 300 characters is refused', () => {
  const long = `- [Row counter](https://github.com/someone/row-counter) - ${'A'.repeat(301)}. (MIT, Mongo Manager 1.1.0).`
  const { entries, problems } = communityEntries(block(long))
  assert.deepEqual(entries, [])
  assert.match(problems[0].message, /over 300 characters/)
})

test('the markers must be there once each, in order', () => {
  for (const text of [
    '# List\n',
    `${COMMUNITY_END}\n${COMMUNITY_START}\n`,
    `${COMMUNITY_START}\n${COMMUNITY_START}\n${COMMUNITY_END}\n`,
  ]) {
    const { entries, problems } = communityEntries(text)
    assert.deepEqual(entries, [])
    assert.equal(problems.length, 1)
  }
})

test('the README this repository holds parses with no problem', () => {
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8')
  assert.deepEqual(communityEntries(readme).problems, [])
})
