import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'esbuild'

/**
 * The checks Mongo Manager itself makes when an administrator installs a plugin from GitHub, built
 * from its own source: a checkout of mongo-manager/mongo-manager at a release, with the shared
 * package's dependencies installed. The release rules, the archive limits, the manifest schema and
 * the security scan are the app's code, never a copy here that could drift from it.
 */
const FILES = {
  github: 'packages/server/src/plugins/github.ts',
  archive: 'packages/server/src/plugins/archive.ts',
  folder: 'packages/server/src/plugins/folder.ts',
  scan: 'packages/server/src/plugins/scan.ts',
  egress: 'packages/server/src/net/egress.ts',
  routes: 'packages/server/src/routes/plugins.ts',
  shared: 'packages/shared/src/index.ts',
  version: 'packages/cli/package.json',
}

/** The largest archive the app takes from a GitHub release (its routes' UPLOAD_BYTES). */
function uploadBytes(routes) {
  const m = /\bconst UPLOAD_BYTES = (\d+) \* 1024 \* 1024\b/.exec(routes)
  if (!m) throw new Error(`UPLOAD_BYTES was not found in ${FILES.routes}: update scripts/lib/app.mjs`)
  return Number(m[1]) * 1024 * 1024
}

/** The ids of the plugins shipped with the app: the app refuses another plugin of one of them. */
function officialIds(root) {
  const plugins = join(root, 'packages/plugins')
  const ids = new Set()
  for (const dir of readdirSync(plugins)) {
    const manifest = join(plugins, dir, 'public', 'mongo-manager-plugin.json')
    if (existsSync(manifest)) ids.add(JSON.parse(readFileSync(manifest, 'utf8')).id)
  }
  return ids
}

export async function loadAppChecks(source) {
  const root = resolve(source)
  const at = (p) => join(root, p).replaceAll('\\', '/')
  for (const p of Object.values(FILES))
    if (!existsSync(at(p))) throw new Error(`Not a Mongo Manager checkout: ${at(p)} is missing`)
  const entry = [
    `export { parseGithubRef, fetchGithubRelease } from ${JSON.stringify(at(FILES.github))}`,
    `export { readPluginArchive } from ${JSON.stringify(at(FILES.archive))}`,
    `export { checkManifest } from ${JSON.stringify(at(FILES.folder))}`,
    `export { scanPlugin } from ${JSON.stringify(at(FILES.scan))}`,
    `export { createEgress } from ${JSON.stringify(at(FILES.egress))}`,
    `export { PLUGIN_MANIFEST, PluginIdSchema } from ${JSON.stringify(at(FILES.shared))}`,
  ].join('\n')
  const out = await build({
    stdin: { contents: entry, resolveDir: root, loader: 'js' },
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node24',
    write: false,
    logLevel: 'silent',
    alias: { '@mongo-manager/shared': at(FILES.shared) },
    // The server's files import zod too: the shared package's copy, the one the app runs with.
    nodePaths: [at('packages/shared/node_modules')],
  })
  const dir = mkdtempSync(join(tmpdir(), 'mm-checks-'))
  let checks
  try {
    const file = join(dir, 'checks.mjs')
    writeFileSync(file, out.outputFiles[0].contents)
    checks = await import(pathToFileURL(file).href)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
  return {
    ...checks,
    version: JSON.parse(readFileSync(at(FILES.version), 'utf8')).version,
    uploadBytes: uploadBytes(readFileSync(at(FILES.routes), 'utf8')),
    officialIds: officialIds(root),
  }
}
