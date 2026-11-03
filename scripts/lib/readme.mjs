/**
 * The community plugins of README.md: the list items between the two markers, each in the one form
 * CONTRIBUTING.md gives, so a check can find the repository, the license and the version it names.
 */
export const COMMUNITY_START = '<!-- community:start -->'
export const COMMUNITY_END = '<!-- community:end -->'

const ENTRY =
  /^- \[(?<name>[^[\]]+)\]\((?<url>https:\/\/github\.com\/[^()\s]+)\) - (?<description>\S.*) \((?<license>[^(),]+), Mongo Manager (?<tested>(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*))\)\.$/
const FORM = '- [Name](https://github.com/owner/repository) - What it does. (License, Mongo Manager 1.2.3).'
const DESCRIPTION_MAX = 300

/** Every entry, with the line it is on; and what is wrong with the block, line by line. */
export function communityEntries(markdown) {
  const lines = markdown.split(/\r?\n/)
  const problems = []
  const starts = lines.flatMap((l, i) => (l.trim() === COMMUNITY_START ? [i] : []))
  const ends = lines.flatMap((l, i) => (l.trim() === COMMUNITY_END ? [i] : []))
  if (starts.length !== 1 || ends.length !== 1 || starts[0] > ends[0])
    return {
      entries: [],
      problems: [{ line: 1, message: `README.md holds ${COMMUNITY_START} once, then ${COMMUNITY_END} once` }],
    }
  const entries = []
  for (let i = starts[0] + 1; i < ends[0]; i++) {
    const text = lines[i]
    const line = i + 1
    // An awesome-lint comment may stand before an entry whose description must start with its name.
    if (
      !text.trim() ||
      /^### \S/.test(text) ||
      /^<!--lint (?:ignore|disable|enable)(?: [a-z-]+)+-->$/.test(text)
    )
      continue
    const m = ENTRY.exec(text)
    if (!m) {
      problems.push({
        line,
        message: text.startsWith('- ')
          ? `An entry is written as: ${FORM}`
          : 'Only entries and ### headings go between the community markers',
      })
      continue
    }
    const { name, url, description, license, tested } = m.groups
    if (description.length > DESCRIPTION_MAX)
      problems.push({ line, message: `The description is over ${DESCRIPTION_MAX} characters` })
    else entries.push({ line, name, url, description, license, tested })
  }
  return { entries, problems }
}
