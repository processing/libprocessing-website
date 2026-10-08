---
title: Writing docs
description: Where each kind of documentation lives, and how to add to this site.
order: 4
status: draft
---

## API docs

:::todo
Docstrings feed the mkdocs site (`just docs-serve`). Rustdoc comments feed the rustdoc site.
:::

## This site

Every page is a Markdown file in `src/content/docs/`. The folder is the URL:

```txt
src/content/docs/
├── index.md                  → /
├── getting-started/
│   ├── index.md              → /getting-started/        (section landing page)
│   └── mewnala.md            → /getting-started/mewnala/
└── faq/
    └── index.md              → /faq/
```

Each top-level folder is a section in the navigation, and its `index.md` is the section's landing page. To add a section, add a folder with an `index.md`. To add a page, add a `.md` file to the folder. Files starting with `_` are ignored.

### Frontmatter

```yaml
---
title: mewnala (Python)          # required
description: One sentence.       # shown under the title, in cards, and in search results
navLabel: mewnala                # shorter label for the sidebar (optional)
order: 1                         # position in the sidebar, lowest first
status: outline                  # outline | draft | ready
languages: [python]              # python | rust | java | web
links:                           # optional cards shown above the page body
  - label: mewnala API
    href: https://processing.github.io/libprocessing/
    description: Generated from docstrings.
---
```

### Page status

Status tells readers how far to trust a page, and tells writers where help is needed.

- **outline**: headings and notes only. Readers see a banner asking for help, and the page is greyed out in the sidebar. This is the default.
- **draft**: written, but incomplete or not yet reviewed.
- **ready**: reviewed and accurate for the current release.

A good outline is a set of `##` headings in the order a reader needs them, with a `:::todo` note under any heading whose content isn't obvious.

### Callouts

```md
:::note
Something worth knowing.
:::

:::tip[A custom title]
A shortcut or a better way.
:::

:::caution
Something that can go wrong.
:::

:::todo
A note to writers about what belongs here. Delete it once the section is written.
:::
```

:::tip
Callouts render like this.
:::

### Adding an example

Examples live in `src/content/examples/<category>/`, one Markdown file per example. The category is one of `basics`, `topics`, `demos` or `features`.

```yaml
---
title: Particles basic
category: features
group: Particles & GPU Compute   # the heading it's listed under in the gallery
image: ./particles-basic.png      # optional thumbnail, next to the .md file
sources:                          # paths within each repo, one per language
  rust: examples/particles_basic.rs
  python: crates/processing_pyo3/examples/particles_basic.py
---

Optional notes about the example.
```

The gallery groups examples by category and `group`, and readers can filter it by language. Templates for new pages and examples are in the `templates/` folder at the root of the repo.
