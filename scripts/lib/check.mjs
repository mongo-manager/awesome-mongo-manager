/**
 * One community entry checked as Mongo Manager installs it from GitHub: its latest release's one
 * archive downloaded and read with the app's own rules, its manifest checked with the app's schema,
 * its files scanned with the app's scan. Nothing of the plugin is ever run, here or anywhere.
 */

const norm = (url) =>
  url
    .trim()
    .replace(/\/+$/, '')
    .replace(/\.git$/i, '')
    .toLowerCase()

/** A character that ends a line, or controls the terminal, where a log shows it. */
const controlCode = (n) => n < 0x20 || (n >= 0x7f && n <= 0x9f) || n === 0x2028 || n === 0x2029

/**
 * Text kept on its line: every control character written as its code. A plugin's manifest reaches
 * the messages (the app names a manifest's own keys), and the runner reads a workflow command at
 * the start of any line of the log, a lone carriage return ending one too (review 2026-11-03).
 */
export const plain = (s) =>
  [...String(s)]
    .map((c) => {
      const n = c.codePointAt(0)
      return controlCode(n) ? `\\u${n.toString(16).padStart(4, '0')}` : c
    })
    .join('')

/**
 * The egress with the workflow's read-only token added for GitHub's API only, which limits unsigned
 * requests by address. Never for a download: it is redirected to other hosts, and the app sends
 * nothing of its own either.
 */
export function withToken(egress, token) {
  if (!token) return egress
  const signed = (r) => {
    let url
    try {
      url = new URL(r.url)
    } catch {
      return r
    }
    if (url.protocol !== 'https:' || url.hostname !== 'api.github.com' || url.port !== '') return r
    return { ...r, headers: { ...r.headers, authorization: `Bearer ${token}` } }
  }
  return {
    request: (r) => egress.request(signed(r)),
    buffer: (r, limit) => egress.buffer(signed(r), limit),
    probe: (...args) => egress.probe(...args),
    listed: (address) => egress.listed(address),
  }
}

/** The versions Mongo Manager has released, from its releases on GitHub (drafts and previews left out). */
export async function releasedVersions(egress) {
  const res = await egress.buffer(
    {
      method: 'GET',
      url: 'https://api.github.com/repos/mongo-manager/mongo-manager/releases?per_page=100',
      deadlineMs: 60_000,
      headers: {
        accept: 'application/vnd.github+json',
        'user-agent': 'awesome-mongo-manager',
        'x-github-api-version': '2022-11-28',
      },
    },
    5 * 1024 * 1024,
  )
  if (res.status !== 200) throw new Error(`GitHub did not list Mongo Manager’s releases (${res.status})`)
  const versions = JSON.parse(res.body.toString('utf8'))
    .filter((r) => !r.draft && !r.prerelease)
    .map((r) => /^v((?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*))$/.exec(String(r.tag_name))?.[1])
    .filter(Boolean)
  return new Set(versions)
}

/** A license expression as an entry writes it: without the parentheses around the whole of it. */
const bare = (license) => license.replace(/^\((.*)\)$/, '$1')

async function inspect(entry, { app, egress, released }, errors, warnings) {
  let ref
  try {
    ref = app.parseGithubRef(entry.url)
  } catch (e) {
    errors.push(e.message)
    return null
  }
  if (ref.tag) {
    errors.push('Link the repository, not a release: the app installs its latest release')
    return null
  }
  const listed = `https://github.com/${ref.owner}/${ref.repo}`
  if (entry.url !== listed) {
    errors.push(`Link the repository itself: ${listed}`)
    return null
  }
  if (released ? !released.has(entry.tested) : app.compareVersions(entry.tested, app.version) > 0)
    errors.push(`Mongo Manager ${entry.tested} is not a release; the latest is ${app.version}`)

  let fetched
  try {
    fetched = await app.fetchGithubRelease(egress, ref, app.uploadBytes)
  } catch (e) {
    errors.push(e.message)
    return null
  }
  const { archive, origin } = fetched
  let files
  try {
    files = app.readPluginArchive(archive)
  } catch (e) {
    errors.push(e.message)
    return null
  }
  const text = files.find((f) => f.path === app.PLUGIN_MANIFEST)?.data
  let id
  try {
    id = app.PluginIdSchema.parse(JSON.parse(text?.toString('utf8') ?? '{}').id)
  } catch {
    errors.push('The manifest has no valid id')
    return null
  }
  let manifest
  try {
    manifest = app.checkManifest(text, id, new Set(files.map((f) => f.path)))
  } catch (e) {
    errors.push(e.message)
    return null
  }

  if (app.officialIds.has(id)) errors.push(`The id "${id}" is a plugin shipped with Mongo Manager`)
  if (manifest.name.en !== entry.name) errors.push(`List it by its English name: "${manifest.name.en}"`)
  if (!manifest.license) errors.push('The manifest names no license')
  else if (bare(manifest.license) !== bare(entry.license))
    errors.push(`The manifest's license is ${manifest.license}, the entry says ${entry.license}`)
  if (!manifest.author) errors.push('The manifest names no author')
  const home = `https://github.com/${origin.repository}`
  if (!manifest.repository) errors.push('The manifest names no repository')
  else if (norm(manifest.repository) !== norm(home))
    errors.push(`The manifest's repository is ${manifest.repository}, not ${home}`)
  if (norm(home) !== norm(listed)) warnings.push(`The repository moved to ${home}: link that`)
  if (!files.some((f) => f.path === 'README.md'))
    errors.push('The plugin has no README.md, which the Plugins page shows to administrators')
  if (origin.asset !== `${id}-${manifest.version}.tgz`)
    warnings.push(`The archive is named ${origin.asset}, not ${id}-${manifest.version}.tgz`)

  // As the app does (folder.ts, scanned()): a scan that fails leaves the plugin approvable only as one
  // with a high finding is.
  let scan
  try {
    scan = app.scanPlugin(new Map(files.map((f) => [f.path, f.data])), manifest)
  } catch {
    errors.push('The scan failed, so the app would approve it only as a high-risk plugin')
    return null
  }
  const high = scan.findings.filter((f) => f.severity === 'high').slice(0, 5)
  for (const f of high) errors.push(`The scan finds a high risk (${f.rule}) in ${f.file}, line ${f.line}`)
  if (scan.counts.high > high.length) errors.push(`The scan finds ${scan.counts.high} high risks in all`)

  return {
    id,
    version: manifest.version,
    release: origin.release,
    asset: origin.asset,
    permissions: manifest.permissions,
    counts: scan.counts,
  }
}

export async function checkEntry(entry, deps) {
  const errors = []
  const warnings = []
  const plugin = await inspect(entry, deps, errors, warnings)
  return { entry, errors: errors.map(plain), warnings: warnings.map(plain), plugin }
}

/** Entries naming the same repository or plugin twice: one server holds one plugin of an id. */
export function duplicates(results) {
  const errors = []
  const seen = { repo: new Map(), id: new Map() }
  for (const r of results) {
    const keys = { repo: norm(r.entry.url), id: r.plugin?.id }
    for (const kind of ['repo', 'id']) {
      const key = keys[kind]
      if (!key) continue
      const first = seen[kind].get(key)
      if (first)
        errors.push({
          line: r.entry.line,
          message: plain(`Listed already on line ${first.line} (${kind} ${key})`),
        })
      else seen[kind].set(key, r.entry)
    }
  }
  return errors
}

/** Text from a plugin or its release as Markdown shows it: nothing in it read as markup. */
export const mdText = (s) =>
  String(s)
    .replace(/[\\`*_{}[\]()<>#+!|~-]/g, (c) => `\\${c}`)
    .replace(/\s+/g, ' ')

/** A workflow command's message and properties, escaped as GitHub's runner reads them. */
export const commandData = (s) => String(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A')
export const commandProperty = (s) => commandData(s).replace(/:/g, '%3A').replace(/,/g, '%2C')
