import { createHash } from 'node:crypto'
import { gzipSync } from 'node:zlib'

/** A .tgz of these files (plain ustar, gzipped), as a plugin's release would hold. */
export function tgz(files) {
  const blocks = []
  for (const [path, content] of Object.entries(files)) {
    const data = Buffer.from(content)
    const header = Buffer.alloc(512)
    header.write(path, 0, 100, 'utf8')
    header.write('0000644\0', 100, 'ascii')
    header.write('0000000\0', 108, 'ascii')
    header.write('0000000\0', 116, 'ascii')
    header.write(`${data.length.toString(8).padStart(11, '0')}\0`, 124, 'ascii')
    header.write(
      `${Math.floor(Date.UTC(2026, 10, 3) / 1000)
        .toString(8)
        .padStart(11, '0')}\0`,
      136,
      'ascii',
    )
    header.write('        ', 148, 'ascii')
    header.write('0', 156, 'ascii')
    header.write('ustar\0', 257, 'ascii')
    header.write('00', 263, 'ascii')
    let sum = 0
    for (const byte of header) sum += byte
    header.write(`${sum.toString(8).padStart(6, '0')}\0 `, 148, 'ascii')
    blocks.push(header, data, Buffer.alloc((512 - (data.length % 512)) % 512))
  }
  blocks.push(Buffer.alloc(1024))
  return gzipSync(Buffer.concat(blocks))
}

export const sha256 = (data) => createHash('sha256').update(data).digest('hex')

/** A plugin's manifest, valid unless the test changes it. */
export const manifest = (more = {}) => ({
  id: 'row-counter',
  name: { en: 'Row counter' },
  version: '1.0.0',
  description: { en: 'Counts the documents of a collection.' },
  entry: 'index.html',
  permissions: ['documents:read'],
  contributes: { collectionTabs: [{ id: 'count', title: { en: 'Count' }, icon: 'table' }] },
  author: { name: 'A. Person' },
  repository: 'https://github.com/someone/row-counter',
  license: 'MIT',
  ...more,
})

/** A plugin's files, valid unless the test changes them. */
export const pluginFiles = (more = {}) => ({
  'mongo-manager-plugin.json': JSON.stringify(manifest()),
  'index.html': '<!doctype html><title>Row counter</title><script type="module" src="./main.js"></script>',
  'main.js': 'document.title = "Row counter"\n',
  'README.md': '# Row counter\n\nAsks for documents:read to count them.\n',
  ...more,
})

/**
 * An egress answering as GitHub would for these releases (by "owner/repo"), each a list of assets
 * ({ name, data, digest? }), and recording every request it was given. `moved` names the repositories
 * that were renamed: their releases' pages and downloads are then at the new name, as GitHub has it.
 */
export function fakeGithub(releases, moved = {}) {
  const asked = []
  const answer = (status, body) => ({ status, headers: {}, body: Buffer.from(body) })
  const buffer = async (r) => {
    asked.push(r)
    const url = new URL(r.url)
    const api = /^\/repos\/([^/]+)\/([^/]+)\/releases\/latest$/.exec(url.pathname)
    if (url.hostname === 'api.github.com' && api) {
      const repo = `${api[1]}/${api[2]}`
      const assets = releases[repo]
      if (!assets) return answer(404, '{}')
      const home = moved[repo] ?? repo
      return answer(
        200,
        JSON.stringify({
          tag_name: 'v1.0.0',
          html_url: `https://github.com/${home}/releases/tag/v1.0.0`,
          assets: assets.map((a) => ({
            name: a.name,
            size: a.data.length,
            browser_download_url: `https://github.com/${home}/releases/download/v1.0.0/${a.name}`,
            digest: a.digest === undefined ? `sha256:${sha256(a.data)}` : a.digest,
          })),
        }),
      )
    }
    const download = /^\/([^/]+)\/([^/]+)\/releases\/download\/v1\.0\.0\/(.+)$/.exec(url.pathname)
    if (url.hostname === 'github.com' && download) {
      const at = `${download[1]}/${download[2]}`
      const repo = Object.keys(releases).find((r) => (moved[r] ?? r) === at)
      const asset = repo && releases[repo].find((a) => a.name === download[3])
      if (asset) return { status: 200, headers: {}, body: asset.data }
    }
    return answer(404, '')
  }
  return { asked, egress: { buffer, request: buffer, probe: async () => ({}), listed: () => false } }
}
