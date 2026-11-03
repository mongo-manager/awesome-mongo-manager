# Contribution guidelines

To list a plugin, open a pull request that adds one line to [README.md](README.md) and changes nothing else. The checks below run on it; then a maintainer reads the plugin before merging. One plugin per pull request.

## What a listed plugin needs

- A public GitHub repository whose latest release holds exactly one plugin archive (`.tgz`). Name it `<id>-<version>.tgz`, as the starter's `node scripts/pack.mjs` does: the checks warn about any other name.
- A manifest the latest Mongo Manager release accepts, naming `license`, `author` and `repository`. The repository is the one you list.
- An id of its own: not one of the official plugins', not one listed already.
- A `README.md` in the plugin, which the Plugins page shows administrators before they approve it. It says what the plugin does, why it needs each permission it asks for, and, for each address setting, what the plugin sends to that address.
- No high finding in the app's scan. The README explains every other finding.
- A screenshot, in its README or in the pull request.
- Tried on a Mongo Manager server of the latest release.

## The entry

Under **Community plugins**, between the two `community` markers, one line:

```markdown
- [Name](https://github.com/owner/repository) - What it does, in one sentence. (License).
```

- **Name**: the plugin's English name, as its manifest gives it.
- **Link**: the repository itself, as `https://github.com/owner/repository`: not a release, not `/releases`. The app installs its latest release.
- **Description**: what it shows or does, plainly; no marketing. At most 300 characters. It may not start with the plugin's name; if it has to, put `<!--lint ignore no-repeat-item-in-description-->` on the line before.
- **License**: as the manifest's `license` names it, an SPDX expression such as `MIT` (`MIT OR Apache-2.0` for `(MIT OR Apache-2.0)`).

The first entry also removes the line "There are none yet" above the markers. When there are several plugins of a kind, group them under `###` headings between the markers.

## What the checks do

`scripts/check-plugins.mjs` downloads each listed plugin's latest release and checks it with Mongo Manager's own code, built from the source of its latest release: the rules of the app's GitHub install, the archive limits, the manifest schema and the security scan. Nothing of a plugin is run. The run's summary lists what each plugin asks for and what the scan found. A pull request from a fork that changes anything but the community list is flagged, and every change is reviewed by the list's maintainer.

Every Monday the list is checked again, links included. GitHub stops scheduled runs after 60 days without a change to the repository; a maintainer turns them on again under Actions.

To run the checks yourself (Node.js 24 or later, with Corepack, and the GitHub CLI):

```sh
tag=$(gh release view --repo mongo-manager/mongo-manager --json tagName --jq .tagName)
git clone --depth 1 --branch "$tag" https://github.com/mongo-manager/mongo-manager.git ../mongo-manager
(cd ../mongo-manager && corepack pnpm install --frozen-lockfile --ignore-scripts --filter @mongo-manager/shared)
npm ci --ignore-scripts
MM_SOURCE=../mongo-manager npm test
MM_SOURCE=../mongo-manager npm run check
npm run lint
```

On a fork, `npm run lint` also says the repository has no description or `awesome` topic: forks do not copy them, and the check of this repository passes.

## Keeping the list current

When a listed plugin's latest release no longer passes, or its repository is archived or gone, a maintainer opens an issue here and tells its author. If it is not fixed within 30 days, the entry is removed. Its author can open a new pull request once it passes again.

## Reporting a plugin

If a listed plugin misbehaves or looks harmful, [open an issue](https://github.com/mongo-manager/awesome-mongo-manager/issues/new?template=report-a-plugin.yml). For a security problem in Mongo Manager itself, follow its [security policy](https://github.com/mongo-manager/mongo-manager/blob/main/SECURITY.md) instead.

## Translations

The README is in ten languages. The official plugins and the contents of every translation are written by `npm run sync-official -- ../mongo-manager` from the plugins' own manifests, linking each to its source in that release; the community list is kept in English only, in README.md.
