---
name: ui-change
description: Rules and a check-your-work routine for changing how the libprocessing site looks or behaves — layouts, components, styles, navigation, the homepage, the example gallery. Use for any edit to .astro, .css, or src/lib/*.ts files, or when someone asks to restyle, redesign, rearrange or add an interface element.
---

# Change the UI

Content changes (adding, editing or removing Markdown pages) don't need this skill; see `add-page` and `remove-page`.

## Know where things are

- `src/layouts/BaseLayout.astro`: the page shell (header, main, footer). `DocLayout.astro`: every docs page (sidebar, article, table of contents, prev/next).
- `src/pages/index.astro`: the homepage. `src/pages/[...slug].astro`: renders every docs page. `src/pages/examples/`: example pages.
- `src/components/`: shared pieces (`SiteHeader`, `Sidebar`, `LinkCards`, `Divider`, `Button`, `StatusNotice`, …). Reuse and extend these; don't copy one to make a variant.
- `src/lib/docs.ts`: builds the navigation from the folder structure and `order`. The header nav, sidebar, cards and prev/next all come from it, so a change there changes all of them.
- `src/site.ts`: title, colour theme, external links.
- `src/styles/`: `variables.css` (PF design tokens, copied from processing-foundation-website), `textStyles.css`, `layout.css` (the grid), `prose.css` (Markdown body), `breakpoints.css`.

Read the files you'll change and the components they use before editing.

## Rules

- **Tokens, not raw values.** Colours, spacing, type sizes, fonts, weights, line heights and thread heights all have custom properties in `variables.css`: `var(--color-text-secondary)`, `var(--spacing-xl)`, `var(--text-size-body-s)`. Don't write hex codes, `px` spacing or font names. If no token fits, say so rather than inventing a value.
- **Semantic colours only.** Use `--color-bg-*` and `--color-text-*`, never `--base-color-*`. The site supports several colour themes via `data-color-theme` (`src/site.ts`), and only semantic tokens follow the theme.
- **Don't edit `variables.css`, `fonts.css` or `reset.css` by hand.** They mirror processing-foundation-website. Changes to the tokens belong there first.
- **Breakpoints:** use the custom media queries, mobile first: `@media (--sm)`, `(--md)`, `(--lg)`, `(--xl)`. No raw `min-width` values in components.
- **Grid:** page sections use `<div class="row">`, a 12-column grid at `--lg` that collapses below it. Children span the full width by default; place them with `grid-column` inside `@media (--lg)`. `Divider` threads are sized to line up with these columns, so keep dividers outside nested grids.
- **Scoped styles:** put styles in the component's `<style>` block. Only shared, site-wide rules go in `src/styles/`.
- **Accessibility:** keep landmarks and `aria-current`/`aria-labelledby` as the existing components do, keep interactive elements as real links and buttons, and keep visible focus and hover states.
- **Content stays in Markdown.** If the change needs new data per page, add a frontmatter field to the schema in `src/content.config.ts` (with a default, so existing pages still build), document it in `src/content/docs/contributing/writing-docs.md`, and read it in the layout. Don't hard-code page-specific text in components.

## Check your work

Every UI change needs a passing build and screenshots before it's done.

1. **Build:** `npm run build`. Fix anything it reports.
2. **Before screenshots:** take these before editing if you can (stash or use a second checkout), so you can show the difference.
3. **Serve and capture.** In the background:

   ```sh
   npx astro preview --port 4329
   ```

   Then, for each page the change affects (always include `/` and one docs page, e.g. `/getting-started/mewnala/`):

   ```sh
   CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
   "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,2200 --screenshot=<scratch>/wide.png http://localhost:4329/<path>
   "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=600,1600 --screenshot=<scratch>/narrow.png http://localhost:4329/<path>
   ```

   Save screenshots to a scratch or temp directory, not the repo. Look at each image. Check alignment with the grid, nothing cut off or overflowing sideways, the header nav, and the sidebar's collapsed "Menu" on narrow screens.

   Headless Chrome won't render narrower than 500px, so anything below that is cropped, not broken. Don't "fix" it. Tell the person to check true phone width (about 390px) in a real browser's device mode.
4. **Stop the server** when done: `pkill -f "astro preview --port 4329"`.

## Report

Say which files changed and why, what it looks like now (attach or describe the screenshots), what you couldn't check (phone width, other colour themes, keyboard navigation), and any side effects on other pages, especially changes to shared components or `src/lib/docs.ts`.

If they want to propose the change, the `open-pr` skill takes it from here. Include the screenshots.
