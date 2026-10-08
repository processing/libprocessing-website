# Contributing to the libprocessing website

Welcome to the contributor guidelines!

This document is for anyone who wants to improve the libprocessing website: fixing a typo, filling in an outline page, adding an example, or working on the site's design and code. We believe that anyone can be a contributor. You don't need to be an expert. We also know that not everyone has the same time, energy, or resources to spend on Processing. That's okay. We're glad you're here!

This repository is the website only. To work on libprocessing itself, see [processing/libprocessing](https://github.com/processing/libprocessing). For Processing 5.0, see [processing/processing4](https://github.com/processing/processing4) and its [contributor guidelines](https://github.com/processing/processing4/blob/main/CONTRIBUTING.md).

> [!TIP]
> For questions about your own sketches, or broader conversations about coding in Processing, our [online forum](https://discourse.processing.org/) is a fantastic resource (make sure to read the [forum guidelines](https://discourse.processing.org/t/welcome-to-the-processing-foundation-discourse/8) before posting). You can also visit the [Processing Community Discord](https://discord.gg/8pFwMVATh8).

Everyone who takes part is expected to follow our [Code of Conduct](CODE-OF-CONDUCT.md).

## About GitHub

The website's code and content are hosted on [GitHub](https://github.com/processing/libprocessing-website). GitHub is a website where people can collaborate on code. It's widely used for open source projects and makes it easier to keep track of changes, report issues, and contribute improvements.

If you're new to GitHub, a good place to start is [this tutorial](https://github.com/firstcontributions/first-contributions/blob/main/docs/gui-tool-tutorials/github-desktop-tutorial.md), which walks you through the basics of contributing to a project using GitHub Desktop. For more information, we recommend [Git and GitHub for Poets](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6ZF9C0YMKuns9sLDzK6zoiV), a beginner-friendly video series by Dan Shiffman.

Every page on the site has an **Edit this page on GitHub** link at the bottom. For small fixes to a single page, that's often all you need: GitHub will walk you through proposing the change without setting anything up on your computer.

## About issues

Most activity on GitHub happens in _issues_. Issues are posts which can contain bug reports, requests for new pages, or broader discussions about the site. It's a great place to begin contributing.

To file a new issue, visit the [Issues](https://github.com/processing/libprocessing-website/issues) tab on the repository and click `New issue`. Tell us which page you were on and what you expected to find.

## Two kinds of change

Most contributions to the site are one of two kinds. They're reviewed differently, so please keep them in separate pull requests.

### Content: adding, editing or removing pages

Every page is a Markdown file in `src/content/docs/`, and every example in the gallery is a Markdown file in `src/content/examples/`. You don't need to touch any code to add or change them.

The full guide for writers is on the site at [/contributing/writing-docs/](src/content/docs/contributing/writing-docs.md). It covers where files go, the frontmatter each page needs, page status (`outline`, `draft`, `ready`), and callouts. Templates for a new page or example are in `templates/`.

A few things to keep in mind:

- Pages marked **outline** are the best place to start. They have headings and notes showing what's missing.
- Be honest about status. Only mark a page `ready` once someone has reviewed it.
- If you remove or rename a page, search the repository for links to it and update them. The site won't warn you about broken links.
- Reference documentation for each language is generated elsewhere (mkdocs for Python, rustdoc for Rust) and isn't duplicated here. To improve it, edit the docstrings or doc comments in [libprocessing](https://github.com/processing/libprocessing).

### UI: design, layout and code

The site is built with [Astro](https://docs.astro.build). Layouts are in `src/layouts/`, shared components in `src/components/`, and styles in `src/styles/`. The [README](README.md) has a map of where everything lives.

- Use the Processing Foundation design tokens in `src/styles/variables.css` rather than raw colours, sizes or fonts. Those files are copied from the Processing Foundation website, so don't edit them here.
- Use the custom breakpoints (`--sm`, `--md`, `--lg`, `--xl`) and the 12-column `.row` grid.
- Reuse and extend the existing components rather than copying them.
- Check your change at both wide and narrow screen sizes, and include before and after screenshots in your pull request.

Before working on a larger UI change, please open an issue first so the design can be discussed.

## Working on the site locally

### Prerequisites

You'll need [Node.js](https://nodejs.org/) and Git. We recommend [GitHub Desktop](https://github.com/apps/desktop) and any code editor you're comfortable with. Some familiarity with the [command line](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line) can help, but it's not required.

```sh
npm install
npm run dev     # http://localhost:4321
npm run build   # static site in dist/
```

### Making your first contribution

Issues marked [help wanted](https://github.com/processing/libprocessing-website/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) or [good first issue](https://github.com/processing/libprocessing-website/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22good%20first%20issue%22%20) are a good place to start, as are any pages on the site marked as outlines.

Before beginning work on anything bigger than a small fix, please make sure that:

- The issue has been discussed and a proposed approach has been agreed.
- You have been **assigned** to the issue.

If an approach has been agreed but no one has volunteered to take it on, feel free to comment and offer to help. A maintainer can then assign the issue to you.

> [!NOTE]
> If this is your first contribution, or if an approach hasn't been agreed yet, please include a brief explanation of how you plan to tackle the issue. Note that **we do not auto-assign issues**, so comments that only say "please assign" without further context may be overlooked.

Please do **not** open a pull request for an issue that is already assigned to someone else. If an issue has been inactive for over a month, you're welcome to check in politely by commenting to see if the assignee still plans to work on it.

There's no hard deadline for completing contributions. If you run into trouble or have questions at any point, don't hesitate to ask for help in the issue thread.

### Test locally

Before you submit your changes, make sure `npm run build` succeeds. The build checks every page's frontmatter, so it catches most content mistakes. Then look at the pages you changed in `npm run dev`.

### Using AI tools

This repository includes [Claude Code](https://claude.com/claude-code) skills in `.claude/skills/` for the common tasks above: adding a page, removing a page, making a UI change, and opening a pull request. You're welcome to use them, or any other tools. Either way, you are responsible for every change you submit, so read it, understand it, and check it before opening a pull request.

## Submit a pull request (PR)

Once your changes are ready:

1. Push your branch to your fork (or to a branch on this repository if you have access)
2. Open a pull request from your branch into `main`
3. Fill out the pull request information:

   - **Title**: clear and descriptive
   - **Resolves**: add `Resolves #[issue-number]` if applicable
   - **Changes**: for content, list the pages you added, changed or removed. For UI, explain what readers will see differently and include screenshots.
   - **Checked**: confirm the build passes, and mention anything you weren't able to check

If changes are requested, follow up by pushing additional commits. The PR will automatically update. If there hasn't been any activity after two weeks, feel free to gently follow up.

## Other ways to contribute

You don't have to write pages or code to contribute! Here are just a few other ways to get involved:

- **Testing**: follow the Getting Started guides on your own machine and [report](https://github.com/processing/libprocessing-website/issues) anything that didn't work as written.
- **Examples**: run and port examples, and tell us about snags in [libprocessing](https://github.com/processing/libprocessing/issues).
- **Translation**: help make the site available in your language.
- **Design**: suggest improvements to the site's layout and readability.
- **Community support**: answer questions on the [forum](https://discourse.processing.org/) and [Discord](https://discord.gg/8pFwMVATh8).
- **Art and projects**: share what you're making with libprocessing.

## License

By contributing, you agree that your contributions to the website's code will be licensed under the [GNU General Public License version 2](LICENSE).
