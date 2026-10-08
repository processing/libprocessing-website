# libprocessing docs

The libprocessing website. It's a plain Astro site, styled with the Processing Foundation design tokens, and every page is a Markdown file.

```sh
npm install
npm run dev     # http://localhost:4321
npm run build   # static site in dist/
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/docs/` | Every page. Each top-level folder is a section; its `index.md` is the landing page. |
| `src/content/examples/<category>/` | One file per example in the gallery. |
| `templates/` | Starting points for a new page or example. Copy one, then rename it. |
| `src/site.ts` | Site title, colour theme, external links, and the "Edit on GitHub" base URL. |
| `src/content.config.ts` | Frontmatter schemas. The build fails if a page doesn't match. |
| `src/lib/examples.ts` | Example categories and group order. |
| `src/styles/` | PF tokens (`variables.css` and friends, copied from processing-foundation-website), plus `layout.css` and `prose.css`. |
| `src/lib/callouts.ts` | Turns `:::note`, `:::tip`, `:::caution` and `:::todo` blocks into callouts. |

The full guide for writers is on the site at `/contributing/writing-docs/`, from `src/content/docs/contributing/writing-docs.md`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Everyone taking part is expected to follow the [Code of Conduct](CODE-OF-CONDUCT.md).

## License

The code of this website is licensed under the GNU General Public License version 2 ([GPL-2.0](LICENSE)).
