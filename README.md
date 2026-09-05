# Docusaurus to PDF

Export a built **Docusaurus** site to complete, publication-ready PDF manuals.

[![Export the example to PDF](https://github.com/manuscrio/docusaurus-pdf-export/actions/workflows/example.yml/badge.svg)](https://github.com/manuscrio/docusaurus-pdf-export/actions/workflows/example.yml)

Manuscrio reads the **build directory**. There is no plugin to add to your site, no source access,
and no running server — if `npm run build` succeeds, Manuscrio has everything it needs.

## Try it

You need Docker or Podman; the `manuscrio` command is a thin wrapper that runs the engine image.

```bash
npm run build
npx manuscrio@0.1.0 export ./build --theme lapis
```

That writes one PDF per documentation edition into `./manuscrio-output`. Your site's navbar logo
appears on the cover and in the running header — Manuscrio finds it in the built markup, with no
configuration.

`--theme lapis` sets the accent on top-level chapter titles and the contents table. Five themes
ship, named for mineral pigments; the default `ink` carries no accent at all, so an unthemed manual
stays readable printed in greyscale. See [Branding](https://manuscrio.com/docs/branding/).

## In GitHub Actions

```yaml
- run: npm ci && npm run build

- name: Export the docs to PDF
  run: npx --yes manuscrio@0.1.0 export build --theme lapis --output-dir manuscrio-output

- uses: actions/upload-artifact@v7
  with:
    name: manual
    path: manuscrio-output/*.pdf
```

[`.github/workflows/example.yml`](.github/workflows/example.yml) in this repository is the complete,
working version of that. GitLab CI and other providers: see [Run in
CI](https://manuscrio.com/docs/ci/).

## The example in this repository

[`example/`](example/) is a small but real Docusaurus site — six pages, two nested sidebar
categories, two navbar sections. CI builds it and exports it on every push, so the PDF is a
downloadable artifact on [the latest run](https://github.com/manuscrio/docusaurus-pdf-export/actions/workflows/example.yml).

Copy it, or copy just the workflow.

To drive it locally, the repository carries a [mise](https://mise.jdx.dev) config pinning the same
Node version CI uses, with the commands already wired up:

```bash
mise trust     # mise asks before running a config it has not seen before
mise install
mise run build            # build the example site
mise run inspect          # what manuals does this build contain?
mise run export           # one manual per edition
mise run export-sections  # one manual per navbar section
```

## What Docusaurus gives you that the others do not

Docusaurus is the framework Manuscrio reads most deeply, because it is the only one of the three
that describes all of these in its built output:

| | |
| --- | --- |
| **Editions** | Versions, locales and plugin instances. A site with two versions in three languages is six editions, and each exports as its own manual rather than being merged. |
| **Sections** | Documentation-bearing navbar entries. `--scope section` gives you a manual per section — shipping a short *API* volume separately from a long *Docs* one. |
| **Logo** | Discovered from the navbar. Starlight and MkDocs need `--logo`; Docusaurus does not. |

```bash
npx manuscrio@0.1.0 export ./build --scope section --theme lapis
```

Full reference — the scopes, how detection works, and what each refusal means — is on
[Docusaurus to PDF](https://manuscrio.com/docs/frameworks/docusaurus/).

## Evaluation Mode

With no licence, Manuscrio produces **complete** manuals carrying an evaluation watermark. Nothing
is truncated and no feature is withheld. The PDF this repository's CI publishes is watermarked,
deliberately: a licence is a bearer token and does not belong in a public repository.

See [Licensing](https://manuscrio.com/docs/licensing/) for how to supply one in a real pipeline.

## Licence

This repository — the example project, the workflows, and this README — is **MIT**. Copy it freely.

**The Manuscrio engine image it runs is proprietary software.** MIT covers the glue in this
repository and nothing else.

---

[manuscrio.com](https://manuscrio.com) · [`manuscrio` on npm](https://www.npmjs.com/package/manuscrio) · [Starlight](https://github.com/manuscrio/starlight-pdf-export) · [MkDocs](https://github.com/manuscrio/mkdocs-pdf-export)
