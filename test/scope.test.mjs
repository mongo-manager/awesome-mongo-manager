import assert from 'node:assert/strict'
import { test } from 'node:test'
import { COMMUNITY_END, COMMUNITY_START } from '../scripts/lib/readme.mjs'
import { scopeProblems } from '../scripts/lib/scope.mjs'

const readme = (list, intro = 'Intro.') =>
  `# List\n\n${intro}\n\n${COMMUNITY_START}\n${list}\n${COMMUNITY_END}\n\nEnd.\n`
const base = readme('')

test('adding an entry to the community list is in scope', () => {
  assert.deepEqual(
    scopeProblems({ changed: ['README.md'], baseReadme: base, headReadme: readme('- [A](u) - B.') }),
    [],
  )
})

test('a change to the checks, or to the README outside the list, is flagged', () => {
  const problems = scopeProblems({
    changed: ['README.md', 'scripts/lib/check.mjs', '.github/workflows/check.yml'],
    baseReadme: base,
    headReadme: readme('- [A](u) - B.', 'Another intro.'),
  })
  assert.deepEqual(problems, [
    'scripts/lib/check.mjs is changed: a pull request from a fork changes the community list only',
    '.github/workflows/check.yml is changed: a pull request from a fork changes the community list only',
    'README.md is changed outside the community list',
  ])
})

test('moving the markers is a change outside the list', () => {
  const moved = base.replace(`${COMMUNITY_START}\n`, '').replace('End.', `End.\n${COMMUNITY_START}`)
  assert.deepEqual(scopeProblems({ changed: ['README.md'], baseReadme: base, headReadme: moved }), [
    'README.md is changed outside the community list',
  ])
})
