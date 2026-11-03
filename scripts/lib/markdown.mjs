/** GitHub's anchor for a heading: lower case, punctuation dropped, spaces as hyphens. */
export const slug = (heading) =>
  heading
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\p{Pc} -]/gu, '')
    .replace(/ /g, '-')

/** The text between a README's two markers of this name, replaced. */
export function replaceBlock(markdown, name, body) {
  const start = `<!-- ${name}:start -->`
  const end = `<!-- ${name}:end -->`
  const from = markdown.indexOf(start)
  const to = markdown.indexOf(end)
  if (from < 0 || to < from || markdown.indexOf(start, from + 1) >= 0 || markdown.indexOf(end, to + 1) >= 0)
    throw new Error(`A README holds ${start} once, then ${end} once`)
  return `${markdown.slice(0, from + start.length)}\n${body}\n${markdown.slice(to)}`
}

/**
 * The contents of a README: every ## section after the one holding the toc markers but the last
 * (Contributing, which every README ends with), and under the one holding the official plugins,
 * these headings.
 */
export function contents(markdown, subheadings) {
  const sections = markdown.split(/^## /m).slice(1)
  const at = sections.findIndex((s) => s.includes('<!-- toc:start -->'))
  return sections
    .slice(at + 1, -1)
    .flatMap((s) => {
      const heading = s.slice(0, s.indexOf('\n')).trim()
      const line = `- [${heading}](#${slug(heading)})`
      if (!s.includes('<!-- official:start -->')) return [line]
      return [line, ...subheadings.map((h) => `  - [${h}](#${slug(h)})`)]
    })
    .join('\n')
}

// Written by code point: the narrow no-break space and the no-break space look like a plain one.
const NNBSP = String.fromCodePoint(0x202f)
const SPACES = `[ ${String.fromCodePoint(0xa0)}${NNBSP}]`

/**
 * A plugin's text as the app writes its languages: French with a narrow no-break space before
 * : ; ! ? (a plain space before one becomes it, and one is put where there was none) and inside
 * « », Russian with е for ё. A release's manifests that miss a rule are listed right all the same.
 */
export function typeset(text, lang) {
  if (lang === 'ru') return text.replace(/ё/g, 'е').replace(/Ё/g, 'Е')
  if (lang !== 'fr') return text
  return text
    .replace(new RegExp(`${SPACES}+([:;!?])(?=\\s|$)`, 'gu'), `${NNBSP}$1`)
    .replace(/(?<=\S)([:;!?])(?=\s|$)/gu, `${NNBSP}$1`)
    .replace(new RegExp(`«${SPACES}*`, 'gu'), `«${NNBSP}`)
    .replace(new RegExp(`${SPACES}*»`, 'gu'), `${NNBSP}»`)
}
