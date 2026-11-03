import { COMMUNITY_END, COMMUNITY_START } from './readme.mjs'

/**
 * Review 2026-11-03: a pull request runs its own workflow and scripts, so one that also changed the
 * checks could pass them. A pull request from a fork may change the community list only: this says
 * where it does more. The workflow runs it from the pull request too, so it is a flag for the
 * maintainer, next to the code owners' review the repository requires, not a lock.
 */
export function outsideCommunity(markdown) {
  const from = markdown.indexOf(COMMUNITY_START)
  const to = markdown.indexOf(COMMUNITY_END)
  if (from < 0 || to < from) return markdown
  return markdown.slice(0, from + COMMUNITY_START.length) + markdown.slice(to)
}

export function scopeProblems({ changed, baseReadme, headReadme }) {
  const problems = changed
    .filter((file) => file !== 'README.md')
    .map((file) => `${file} is changed: a pull request from a fork changes the community list only`)
  if (headReadme !== null && outsideCommunity(baseReadme) !== outsideCommunity(headReadme))
    problems.push('README.md is changed outside the community list')
  return problems
}
