---
name: remove-page
description: Remove, delete, merge or rename a documentation page or section on the libprocessing site, and fix every link that pointed at it. Use when someone wants to take a page down, combine two pages, or change a page's URL.
---

# Remove (or rename) a page

The site is static, so nothing warns you about a link to a page that no longer exists. The point of this skill is to find and fix those links.

## 1. Confirm the target

Find the file in `src/content/docs/` and tell the person its title, URL and status. Ask what should happen to readers who followed a link to it:

- **Drop it**: links to it are removed or rewritten.
- **Point them elsewhere**: links go to a replacement page you name.
- **Merge**: content worth keeping moves into another page first, then links go there.
- **Rename**: the file moves to a new slug; links go to the new URL.

Removing a whole section means its folder and every page in it. List them all and get a yes before deleting.

## 2. Find every inbound link

Search for the URL with and without the trailing slash, and for the file's slug, everywhere content can link from:

```sh
grep -rn "/<section>/<slug>" src/ templates/ README.md
```

That covers Markdown bodies, frontmatter (`links:` cards, the homepage `hero.actions` and `quickstarts` in `src/content/docs/index.md`), and any hard-coded hrefs in components. Also search for the page title in case it's referred to by name.

For a section, also search for `/<section>/` on its own.

## 3. Make the change

- Move content first if merging.
- Delete or move the file(s). For a rename, keep the frontmatter and change only the path.
- Update every link found in step 2 to the replacement, or remove the link and adjust the sentence so it still reads well. Don't leave a dangling "see …".
- Renumber `order:` of the remaining siblings so there's no gap, editing only those lines. For a removed section, renumber the remaining top-level `index.md` files.

## 4. Check it

```sh
npm run build
grep -rn "/<section>/<slug>" src/ templates/ README.md   # should find nothing
grep -rn "<section>/<slug>" dist/ | head                 # should find nothing
```

## 5. Report

List the files deleted or moved, every link you changed (file and what it now points to), the `order` numbers you changed, and anything you weren't sure about.

Old URLs will 404 for anyone with a bookmark or an external link. If the page had been public for a while, say so and offer a redirect as a follow-up; that is a config change, not a content change.

If they want to propose the change, the `open-pr` skill takes it from here.
