#!/usr/bin/env node
/**
 * Checks every community plugin of README.md as Mongo Manager would install it from GitHub.
 *
 *   MM_SOURCE=<a mongo-manager checkout> node scripts/check-plugins.mjs
 *
 * MM_SOURCE is a checkout of mongo-manager/mongo-manager at a release, with the shared package's
 * dependencies installed (the workflow takes the latest release). GITHUB_TOKEN, when set, is sent to
 * GitHub's API only. In GitHub Actions each problem is also an annotation on its line of README.md,
 * and the step summary lists every plugin with what it asks for and what the scan found.
 */
import { appendFileSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAppChecks } from './lib/app.mjs'
import { checkEntry, duplicates, plain, releasedVersions, withToken } from './lib/check.mjs'
import { communityEntries } from './lib/readme.mjs'
import { logLines, summary } from './lib/report.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = process.env.MM_SOURCE
if (!source) {
  console.error('Set MM_SOURCE to a checkout of mongo-manager/mongo-manager (see CONTRIBUTING.md).')
  process.exit(2)
}

const app = await loadAppChecks(source)
const { entries, problems } = communityEntries(readFileSync(join(ROOT, 'README.md'), 'utf8'))
const egress = withToken(
  app.createEgress({ networks: [], networksSetting: 'no setting (GitHub’s public addresses only)' }),
  process.env.GITHUB_TOKEN,
)

let released
if (entries.length)
  try {
    released = await releasedVersions(egress)
  } catch (e) {
    problems.push({ line: 1, message: plain(`The versions entries name cannot be checked: ${e.message}`) })
  }

const results = []
for (const entry of entries) results.push(await checkEntry(entry, { app, egress, released }))
problems.push(...duplicates(results))
for (const r of results) for (const message of r.errors) problems.push({ line: r.entry.line, message })

const report = { version: app.version, count: entries.length, results, problems }
for (const line of logLines({ ...report, actions: process.env.GITHUB_ACTIONS === 'true' })) console.log(line)
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary(report))

process.exit(problems.length ? 1 : 0)
