---
name: open-pr
description: Package local changes to the libprocessing site into a branch and a GitHub pull request, with a description reviewers can act on. Use when someone asks to open, make, submit or propose a PR, or to "send this upstream".
disable-model-invocation: true
---

# Open a pull request

The repo is `processing/libprocessing-website`; `main` is the default branch.

## 1. See what's changing

```sh
git status
git diff --stat main
```

Sort the changes into **content** (files under `src/content/`, `templates/`, `README.md`) and **UI** (anything else under `src/`, `public/`, config). If one change set mixes unrelated content and UI work, suggest splitting it into two PRs; reviewers for the two are often different people. Don't commit build output (`dist/`, `.astro/`) or screenshots.

## 2. Check it builds

```sh
npm run build
```

Don't open a PR on a failing build. For UI changes, make sure the `ui-change` screenshots exist; take them now if not.

## 3. Branch and commit

If on `main`, create a branch first: `content/<short-topic>` or `ui/<short-topic>`, e.g. `content/add-roadmap` or `ui/homepage-sidebar`.

Commit messages: short, lowercase, imperative, saying what changed for a reader of the site, e.g. `add roadmap page from wiki`, `move tutorials after getting started`. Stage the specific files, not `git add -A`.

## 4. Write the description

Title: the same style as the commit, a little more specific if needed.

For **content** PRs:

```md
## Pages
- Added: /roadmap/ (draft), copied from the wiki
- Changed: /faq/, new answer on performance
- Removed: /old-page/, links updated in /getting-started/ and the homepage

## Navigation
Tutorials is now 2nd in the header nav; other sections moved down one.

## Still to do
- :::todo notes left in /tutorials/
```

For **UI** PRs:

```md
## What changed
One or two sentences on what readers will see differently, then the files touched.

## Screenshots
Before / after, wide and narrow.

## Checked
- Build passes
- Wide (1440px) and narrow (600px)
- Not checked: true phone width, other colour themes
```

List anything not checked honestly. Screenshots can't be attached with `gh`; say that they need to be dragged into the PR on GitHub, and give their file paths.

## 5. Confirm, then push

Show the person the branch name, commits, title and description, and ask before pushing: opening a PR is public. Then:

```sh
git push -u origin <branch>
gh pr create --base main --title "<title>" --body-file <scratch>/pr-body.md
```

Give them the PR URL. If `gh` isn't installed or authenticated, give them the pushed branch and the description to paste on GitHub instead.
