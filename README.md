# Awesome Mongo Manager [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

<img src="https://raw.githubusercontent.com/mongo-manager/mongo-manager/main/site/assets/icon.svg" align="right" width="96" alt="Mongo Manager">

> Plugins and resources for [Mongo Manager](https://github.com/mongo-manager/mongo-manager), the self-hosted MongoDB manager that runs in your browser.

A plugin adds a view, an action or a page to Mongo Manager: a map of a collection's places, a chart, a duplicate finder. It is a folder of static files that the app shows in a sandboxed frame, with no server code and no network of its own (only an address an administrator sets, such as a map’s tile server), and it runs only after an administrator has approved its exact files and the permissions it asks for.

**Being listed here is not a review or an endorsement.** The app scans every plugin before an administrator approves it, but a scan finds known patterns, not intent. Read a plugin, and its scan on the Plugins page, before you approve it.

English · [Türkçe](README.tr.md) · [简体中文](README.zh.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Português](README.pt.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Русский](README.ru.md)

## Contents

<!-- toc:start -->
- [Official plugins](#official-plugins)
  - [Querying and search](#querying-and-search)
  - [Charts and maps](#charts-and-maps)
  - [Documents and values](#documents-and-values)
  - [Schema and data quality](#schema-and-data-quality)
  - [Privacy and test data](#privacy-and-test-data)
  - [Operations and performance](#operations-and-performance)
- [Community plugins](#community-plugins)
- [Installing a plugin](#installing-a-plugin)
- [Building a plugin](#building-a-plugin)
<!-- toc:end -->

## Official plugins

Shipped with Mongo Manager: they are already on your server, and an administrator turns each one on from the Plugins page.

<!-- official:start -->

### Querying and search

- [Date filters](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/date-presets) - Puts the date ranges people filter by — today, yesterday, the last 7 days, this month, the last n hours or days, between two days — on a date field, or on _id by when its documents were made, in the Documents query.
- [Value search](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/value-search) - Looks for a text, a number or an ObjectId in every field of a collection's documents, and shows where it was found.
- [SQL to MongoDB](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/sql-to-mongodb) - Turns SELECT statements into MongoDB queries and driver code, runs them read-only in the open collection (a JOIN also reads the collection it names, of the same database), and puts them in its Documents or Aggregations.
- [Search playground](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/search-playground) - Tries a collection's search indexes: full-text search on a field or all of them, with typos allowed and highlights, or vector search with a pasted vector or one of the collection's documents — results with their score, the pipeline handed to Aggregations.
- [Reshape](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/reshape) - Renames, flattens, nests, converts or removes a collection's fields as steps you preview on sample documents, then hands them to Aggregations as a pipeline — to write a new collection with a $out you add there. The collection itself is never changed.

### Charts and maps

<!--lint ignore no-repeat-item-in-description-->
- [Charts](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/charts) - Charts a collection's values — bar, line over time, donut, histogram, scatter — with a summary table, within the current query.
- [Map](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/geojson-map) - Draws the GeoJSON fields and \[lng, lat\] pairs of a collection's documents on a map, and filters them by an area drawn on it.

### Documents and values

- [Document diff](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/document-diff) - Compares a document with another of its collection, field by field: what was added, removed or changed, nested values and arrays included.
- [References](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/references) - Finds the fields that hold other documents' ObjectIds and the collections they refer to; shows the referenced document's name beside each id, and a missing one as such; lists the documents referring to one.
- [Time hints](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/time-hints) - Shows, when you point at an ObjectId, when it was made, and at a number that reads as a Unix time, its date.
- [Local time](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/local-time) - Shows each date in your local time — or a time zone you set — with its offset from UTC, in a tooltip or beside the value; optionally how long ago it was.
- [Binary preview](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/binary-preview) - Says what a binary value holds — an image's kind and size, a PDF, an archive — when you point at it, and shows the images stored in a collection's documents, or in one document, drawn from their own bytes.
- [Legacy UUIDs](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/legacy-uuid) - Reads the legacy UUIDs older drivers stored (binary subtype 3) in the Java, C# and Python byte orders, finds which order a field was written in, and finds a UUID however it was stored.
- [Document size](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/document-size) - How big a collection's documents are — their spread, the largest, how near the 16 MB limit — and where their bytes go, field by field and into object fields, names included, measured on the server.

### Schema and data quality

- [Schema health](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/schema-health) - Checks a sample of a collection, its documents' sizes and its indexes for the schema anti-patterns MongoDB's documentation names: large documents and arrays, deep nesting, mixed types, unused and redundant indexes.
- [Validation check](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/validation-inspector) - Checks a collection's documents against its validation rules one by one — over a random sample or all of them — and says how many break each rule, with those documents a click away in Documents.
- [Duplicate finder](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/duplicate-finder) - Finds the documents that share values in fields that should be unique, counted, the most first.
- [Data dictionary](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/data-dictionary) - Documents a database: every collection's fields with their types and presence, what its validation rules say of them, the references between collections, the indexes and the rules — shown in a tab and saved as Markdown or HTML.

### Privacy and test data

- [Personal data finder](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/personal-data) - Finds the fields of a collection that hold personal data — e-mail addresses, phone and card numbers, IBANs, identity numbers, names, addresses, passwords — in a random sample, showing masked examples only, and suggests the fields chosen as personal data rules.
- [Anonymiser](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/anonymiser) - Makes an anonymised copy of a collection for testing or sharing: realistic fake values that keep their format, consistent hashes, shuffled values, shifted dates, number noise — saved as NDJSON or JSON, or imported into a new collection.
- [Test data](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/mock-data) - Makes realistic test documents shaped like a collection's — names, e-mails, addresses, prices, dates and more, from over 100 templates in ten languages — and hands them to the Import wizard, where you check and start the import.

### Operations and performance

- [Index script](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/index-script) - Writes a collection's indexes, or a whole database's, as the commands that make them again — for mongosh, the Node.js or Python driver, or as JSON — to copy or to save, for another environment or a migration.
- [Storage report](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/storage-report) - Shows what each collection of a database takes on disk, the free space WiredTiger holds inside its files and its indexes' files, and how large a share that is — and, for one collection, estimates what compact would give back and runs compact after the app asks you and you type the collection's name.
- [Expiry (TTL)](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/ttl-view) - Shows when a collection's TTL indexes remove its documents — already due, within the hour, the day, the week, later — and which they never remove, each group a click away in Documents.
- [Shard key analyzer](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/shard-key-analyzer) - Compares candidate shard keys for a collection by what MongoDB's analyzeShardKey says of them — distinct values, how common the most common value is, whether the key grows with each insert — and judges each as MongoDB's guidance has it.
- [Log analyzer](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/log-analyzer) - Reads a mongod or mongos log file in your browser — it never leaves it — and shows its slow operations grouped by query shape, errors and warnings, connections and a timeline.

<!-- official:end -->

## Community plugins

Plugins made by others, each in its own repository. Every entry is checked against the latest Mongo Manager release with the app's own code: its latest release holds one plugin archive, its manifest is one the app accepts, and the app's scan finds no high risk in it.

There are none yet: [add yours](#contributing).

<!-- community:start -->
<!-- community:end -->

## Installing a plugin

On the **Plugins** page, an administrator chooses **Upload plugin** and gives the `.tgz` file of the plugin's GitHub release, or chooses **Install from GitHub** and gives the repository's address (this is off unless the server sets `MM_PLUGINS_GITHUB=1`).

On the server itself, the plugin's folder, named after its id, can also be put in the `plugins` folder of the data directory; then choose **Scan again**.

Whichever way, the plugin arrives turned off, scanned, and waiting for an administrator's approval. Any change to its files needs a new approval.

## Building a plugin

On the Plugins page, under **Build your own plugin**, choose **Read the developer guide** for everything a plugin can do: the manifest, the bridge, the permissions, the sandbox, the scan, packaging and publishing.

- [Starter plugin](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/starter) - A working plugin in plain JavaScript, with no build step and no dependencies, and instructions for AI coding assistants. Also on the Plugins page, as **Download the starter (.zip)**.
- [Source of the official plugins](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins) - Every plugin above, with its tests.

## Contributing

Contributions welcome! Read the [contribution guidelines](CONTRIBUTING.md) first.
