#!/usr/bin/env node
/**
 * Writes the official plugins into every README from the manifests of a Mongo Manager checkout,
 * each plugin in its own languages:
 *
 *   node scripts/sync-official.mjs <mongo-manager checkout>
 *
 * Only what is between a README's official and toc markers is written; the rest is written by hand.
 * A plugin of the checkout that no category names stops it: give it a category first.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { contents, replaceBlock, typeset } from './lib/markdown.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const LANGS = ['en', 'tr', 'zh', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'ru']

const CATEGORIES = [
  {
    title: {
      en: 'Querying and search',
      tr: 'Sorgu ve arama',
      zh: '查询与搜索',
      ja: 'クエリと検索',
      es: 'Consultas y búsqueda',
      pt: 'Consultas e busca',
      ko: '쿼리와 검색',
      de: 'Abfragen und Suche',
      fr: 'Requêtes et recherche',
      ru: 'Запросы и поиск',
    },
    plugins: ['date-presets', 'value-search', 'sql-to-mongodb', 'search-playground', 'reshape'],
  },
  {
    title: {
      en: 'Charts and maps',
      tr: 'Grafikler ve haritalar',
      zh: '图表与地图',
      ja: 'グラフとマップ',
      es: 'Gráficos y mapas',
      pt: 'Gráficos e mapas',
      ko: '차트와 지도',
      de: 'Diagramme und Karten',
      fr: 'Graphiques et cartes',
      ru: 'Графики и карты',
    },
    plugins: ['charts', 'geojson-map'],
  },
  {
    title: {
      en: 'Documents and values',
      tr: 'Belgeler ve değerler',
      zh: '文档与值',
      ja: 'ドキュメントと値',
      es: 'Documentos y valores',
      pt: 'Documentos e valores',
      ko: '문서와 값',
      de: 'Dokumente und Werte',
      fr: 'Documents et valeurs',
      ru: 'Документы и значения',
    },
    plugins: [
      'document-diff',
      'references',
      'time-hints',
      'local-time',
      'binary-preview',
      'legacy-uuid',
      'document-size',
    ],
  },
  {
    title: {
      en: 'Schema and data quality',
      tr: 'Şema ve veri kalitesi',
      zh: '模式与数据质量',
      ja: 'スキーマとデータ品質',
      es: 'Esquema y calidad de datos',
      pt: 'Esquema e qualidade dos dados',
      ko: '스키마와 데이터 품질',
      de: 'Schema und Datenqualität',
      fr: 'Schéma et qualité des données',
      ru: 'Схема и качество данных',
    },
    plugins: ['schema-health', 'validation-inspector', 'duplicate-finder', 'data-dictionary'],
  },
  {
    title: {
      en: 'Privacy and test data',
      tr: 'Gizlilik ve test verisi',
      zh: '隐私与测试数据',
      ja: 'プライバシーとテストデータ',
      es: 'Privacidad y datos de prueba',
      pt: 'Privacidade e dados de teste',
      ko: '개인정보와 테스트 데이터',
      de: 'Datenschutz und Testdaten',
      fr: 'Confidentialité et données de test',
      ru: 'Конфиденциальность и тестовые данные',
    },
    plugins: ['personal-data', 'anonymiser', 'mock-data'],
  },
  {
    title: {
      en: 'Operations and performance',
      tr: 'İşletim ve performans',
      zh: '运维与性能',
      ja: '運用とパフォーマンス',
      es: 'Operaciones y rendimiento',
      pt: 'Operações e desempenho',
      ko: '운영과 성능',
      de: 'Betrieb und Leistung',
      fr: 'Exploitation et performances',
      ru: 'Эксплуатация и производительность',
    },
    plugins: ['index-script', 'storage-report', 'ttl-view', 'shard-key-analyzer', 'log-analyzer'],
  },
]

/** A plugin's own text in a list item: brackets kept as text, a sentence ending with its stop. */
const itemText = (text, lang) => {
  const t = text.trim().replace(/[[\]]/g, (c) => `\\${c}`)
  return lang === 'en' && !/[.!?]$/.test(t) ? `${t}.` : t
}

function manifests(source) {
  const plugins = join(source, 'packages/plugins')
  const found = new Map()
  for (const dir of readdirSync(plugins)) {
    const file = join(plugins, dir, 'public', 'mongo-manager-plugin.json')
    if (existsSync(file)) found.set(dir, JSON.parse(readFileSync(file, 'utf8')))
  }
  return found
}

/** The release the checkout is of: the official plugins link their source there, as listed. */
const releaseOf = (source) =>
  `v${JSON.parse(readFileSync(join(source, 'packages/cli/package.json'), 'utf8')).version}`

function main() {
  const source = process.argv[2]
  if (!source) {
    console.error('Usage: node scripts/sync-official.mjs <mongo-manager checkout>')
    process.exit(2)
  }
  const found = manifests(source)
  const placed = CATEGORIES.flatMap((c) => c.plugins)
  const missing = [...found.keys()].filter((id) => !placed.includes(id))
  const gone = placed.filter((id) => !found.has(id))
  if (missing.length || gone.length) {
    if (missing.length) console.error(`Give these plugins a category: ${missing.join(', ')}`)
    if (gone.length) console.error(`These plugins are no longer in the checkout: ${gone.join(', ')}`)
    process.exit(1)
  }
  const tree = `https://github.com/mongo-manager/mongo-manager/tree/${releaseOf(source)}/packages/plugins`
  for (const lang of LANGS) {
    const file = join(ROOT, lang === 'en' ? 'README.md' : `README.${lang}.md`)
    const official = CATEGORIES.map((c) => {
      let repeats = false
      const items = c.plugins.map((id) => {
        const m = found.get(id)
        const name = typeset(m.name[lang] ?? m.name.en, lang)
        const description = itemText(typeset(m.description?.[lang] ?? m.description?.en ?? '', lang), lang)
        if (lang === 'en' && description.toLowerCase().startsWith(name.toLowerCase())) repeats = true
        return `- [${name}](${tree}/${id}) - ${description}`
      })
      // awesome-lint wants no description to start with its item's name (in any case): Charts' does.
      const ignore = repeats ? '<!--lint ignore no-repeat-item-in-description-->\n' : ''
      return `### ${c.title[lang]}\n\n${ignore}${items.join('\n')}`
    }).join('\n\n')
    let text = readFileSync(file, 'utf8')
    text = replaceBlock(text, 'official', `\n${official}\n`)
    text = replaceBlock(
      text,
      'toc',
      contents(
        text,
        CATEGORIES.map((c) => c.title[lang]),
      ),
    )
    writeFileSync(file, text)
    console.log(`${file}: ${placed.length} official plugins`)
  }
}

main()
