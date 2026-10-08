---
name: add-page
description: Add a documentation page or a whole new top-level section to the libprocessing site. Use when someone wants to add, create or stub out a page, section, guide or doc on this site, or move a page to a different place in the navigation.
---

# Add a page or section

Every page is a Markdown file in `src/content/docs/`. The folder is the URL, each top-level folder is a section in the header nav and sidebar, and the section's `index.md` is its landing page. The full writer's guide is `src/content/docs/contributing/writing-docs.md`; read it if you haven't this session.

You shouldn't need to touch any `.astro`, `.ts` or `.css` file. If the request seems to need one, stop and say so: that's a UI change (see the `ui-change` skill).

## 1. Work out what's being added

Ask only for what you can't infer:

- **Title**, and a shorter **navLabel** if the title is long for the sidebar.
- **Description**: one sentence about what the page helps someone do. It appears under the title, on cards and in search results.
- **Where it goes**: an existing section, or a new top-level section.
- **Languages** it applies to, if any: `python`, `rust`, `java`, `web`.
- **Content**: if they've given text or a source (wiki page, issue, doc), use it. Otherwise write an outline.

Run `ls src/content/docs/*/` and read the `order:` of each page in the target folder so you can say where it'll land.

## 2. Create the file

Start from `templates/page.md`. Name the file in kebab-case after the topic, e.g. `getting-started/release-vs-main.md` → `/getting-started/release-vs-main/`.

- A **page in a section**: `src/content/docs/<section>/<slug>.md`.
- A **new section**: `src/content/docs/<section>/index.md`. It shows up in the header nav automatically; the build lists its child pages as cards on it.

Frontmatter:

- `status`: `outline` unless real content is going in. Use `draft` for written-but-unreviewed text. Only use `ready` if the person says it has been reviewed.
- `order`: see step 3.
- Leave out fields that would be empty (`languages: []`, `links: []`), except as the template has them.

Body:

- No `# H1`; the title comes from frontmatter. Start at `##`.
- An outline is `##` headings in the order a reader needs them, with a `:::todo` note under any heading whose content isn't obvious.
- Internal links are absolute with a trailing slash: `/getting-started/mewnala/`.
- Text copied from somewhere else keeps its wording, gets a `:::note` at the top linking to the source ("copied from … for now; if they disagree, the source wins"), and bare issue numbers like `#188` become links to `https://github.com/processing/libprocessing/issues/188`.

## 3. Set `order` and renumber

`order` is the position among siblings, lowest first. For top-level sections it is the header nav order.

- Appending to the end: one more than the current highest.
- Inserting in the middle: give the new page the slot, then bump every sibling at or after it by one so numbers stay whole and unique. Edit only the `order:` line in those files.
- Keep top-level sections in a sensible reading order: getting started and learning material first, reference and design next, community and contributing last. Say where you put a new section and why.

## 4. Check it

```sh
npm run build
```

The build fails if frontmatter doesn't match `src/content.config.ts`. Fix and rebuild until it passes, then confirm the page is in the output: `ls dist/<section>/<slug>/`.

If the header nav now has more than 9 items, mention that it may be crowded on narrow screens.

## 5. Report

Tell the person:

- the file(s) created and the URL,
- the nav position, and any sibling `order` numbers you changed,
- the status you set and why,
- anything they still need to fill in (`:::todo` notes, empty links).

If they want to propose the change, the `open-pr` skill takes it from here.
