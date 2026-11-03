import { commandData, commandProperty, mdText, plain } from './check.mjs'

/**
 * What the check prints and what its step summary says. Every text of a plugin or of README.md is
 * kept on its own line (plain), so no line the log shows starts a workflow command but the check's
 * own annotations; an entry is marked failed when it, or anything of its line, has a problem.
 */
const passed = (r, problems) => r.plugin && !r.errors.length && !problems.some((p) => p.line === r.entry.line)

const annotation = (level, line, message) =>
  `::${level} file=README.md,line=${line},title=${commandProperty('Community plugin')}::${commandData(plain(message))}`

export function logLines({ version, count, results, problems, actions }) {
  const out = [`Checked with Mongo Manager ${plain(version)}: ${count} community plugin(s).`]
  for (const r of results) {
    const p = r.plugin
    const head = `README.md:${r.entry.line} ${JSON.stringify(plain(r.entry.name))}`
    out.push(
      passed(r, problems)
        ? `✓ ${head} ${plain(`${p.id} ${p.version} [${p.permissions.join(', ')}]`)}`
        : `✗ ${head}`,
    )
    for (const w of r.warnings) {
      out.push(`  warning: ${plain(w)}`)
      if (actions) out.push(annotation('warning', r.entry.line, w))
    }
  }
  for (const { line, message } of problems) {
    out.push(`  README.md:${line}: ${plain(message)}`)
    if (actions) out.push(annotation('error', line, message))
  }
  return out
}

export function summary({ version, results, problems }) {
  const rows = results.map((r) => {
    const p = r.plugin
    const scan = p ? `${p.counts.high} high, ${p.counts.medium} medium, ${p.counts.low} low` : ''
    const cells = [
      passed(r, problems) ? '✓' : '✗',
      mdText(plain(r.entry.name)),
      p ? mdText(plain(`${p.id} ${p.version}`)) : '',
      p ? mdText(plain(p.permissions.join(', ') || 'none')) : '',
      scan,
    ]
    return `| ${cells.join(' | ')} |`
  })
  return [
    `### Community plugins, checked with Mongo Manager ${mdText(plain(version))}`,
    '',
    ...(rows.length
      ? ['|  | Plugin | Id and version | Permissions | Scan |', '|---|---|---|---|---|', ...rows]
      : ['No community plugins are listed.']),
    '',
    ...(problems.length
      ? [
          '**Problems**',
          '',
          ...problems.map(({ line, message }) => `- README.md:${line}: ${mdText(plain(message))}`),
          '',
        ]
      : []),
    'Being listed is not a review: read the plugin before you approve it on your server.',
    '',
  ].join('\n')
}
