import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import { contents, replaceBlock, slug, typeset } from '../scripts/lib/markdown.mjs'

const NNBSP = String.fromCodePoint(0x202f)
const NBSP = String.fromCodePoint(0xa0)

test('a heading’s anchor is GitHub’s', () => {
  assert.equal(slug('Querying and search'), 'querying-and-search')
  assert.equal(slug('Plug-ins de la communauté'), 'plug-ins-de-la-communauté')
  assert.equal(slug('查询与搜索'), '查询与搜索')
  assert.equal(slug('Schema & data (quality)'), 'schema--data-quality')
})

test('only the text between a block’s markers is replaced', () => {
  const text = 'a\n<!-- x:start -->\nold\n<!-- x:end -->\nb\n'
  assert.equal(replaceBlock(text, 'x', 'new'), 'a\n<!-- x:start -->\nnew\n<!-- x:end -->\nb\n')
  assert.throws(() => replaceBlock('<!-- x:end --><!-- x:start -->', 'x', ''), /once/)
  assert.throws(() => replaceBlock(`${text}${text}`, 'x', ''), /once/)
  assert.throws(() => replaceBlock('nothing', 'x', ''), /once/)
})

test('the contents list the sections after Contents but the last, the official ones with their headings', () => {
  const text = [
    '# T',
    '## Contents',
    '<!-- toc:start -->',
    '<!-- toc:end -->',
    '## Official',
    '<!-- official:start -->',
    '<!-- official:end -->',
    '## Community',
    '## Contributing',
    '',
  ].join('\n')
  assert.equal(
    contents(text, ['Charts and maps']),
    '- [Official](#official)\n  - [Charts and maps](#charts-and-maps)\n- [Community](#community)',
  )
})

test('French gets its narrow spaces once, Russian its е, other languages nothing', () => {
  assert.equal(
    typeset(`champ : ce ; «${NBSP}Documents${NBSP}» et «${NNBSP}${NNBSP}x${NNBSP}» !`, 'fr'),
    `champ${NNBSP}: ce${NNBSP}; «${NNBSP}Documents${NNBSP}» et «${NNBSP}x${NNBSP}»${NNBSP}!`,
  )
  assert.equal(typeset('Un mot! Deux: trois?', 'fr'), `Un mot${NNBSP}! Deux${NNBSP}: trois${NNBSP}?`)
  assert.equal(typeset('https://a.b/c?d=1 et 16:9', 'fr'), 'https://a.b/c?d=1 et 16:9')
  assert.equal(typeset('объединённые Ёж', 'ru'), 'объединенные Еж')
  assert.equal(typeset('a : b ё', 'en'), 'a : b ё')
})

test('every README ends with its Contributing section, which links the guidelines', () => {
  const readmes = readdirSync(new URL('..', import.meta.url)).filter((f) =>
    /^README(\.[a-z]{2})?\.md$/.test(f),
  )
  assert.equal(readmes.length, 10)
  for (const file of readmes) {
    const text = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
    const last = text.split(/^## /m).at(-1)
    assert.match(last, /\]\(CONTRIBUTING\.md\)/, file)
    assert.doesNotMatch(last, /<!-- (toc|official|community):/, file)
  }
})
