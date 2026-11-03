#!/usr/bin/env node
/**
 * Says what a pull request from a fork changes beyond the community list.
 *
 *   node scripts/check-scope.mjs <base commit>
 *
 * HEAD is the pull request's merge commit; the base commit must have been fetched.
 */
import { execFileSync } from 'node:child_process'
import { commandData } from './lib/check.mjs'
import { scopeProblems } from './lib/scope.mjs'

const base = process.argv[2]
if (!/^[0-9a-f]{40}$/.test(base ?? '')) {
  console.error('Usage: node scripts/check-scope.mjs <base commit>')
  process.exit(2)
}
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 })
const show = (rev) => {
  try {
    return git('show', `${rev}:README.md`)
  } catch {
    return null
  }
}

const changed = git('diff', '--name-only', '-z', base, 'HEAD').split('\0').filter(Boolean)
const problems = scopeProblems({ changed, baseReadme: show(base) ?? '', headReadme: show('HEAD') })
for (const p of problems) console.log(`::error title=Pull request scope::${commandData(JSON.stringify(p))}`)
if (!problems.length) console.log('The pull request changes the community list only.')
process.exit(problems.length ? 1 : 0)
