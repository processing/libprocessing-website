import type { ColorThemeName } from './lib/constants.ts';

export const site = {
  title: 'libprocessing',
  description:
    'An experimental Rust and Bevy implementation of the Processing API, with bindings for Python, Java and the web.',
  colorTheme: 'default' satisfies ColorThemeName as ColorThemeName,
  // Where "Edit this page" points. The content path is appended, e.g. `docs/faq/index.md`.
  editBaseUrl:
    'https://github.com/processing/libprocessing-website/edit/main/src/content/',
  links: {
    github: 'https://github.com/processing/libprocessing',
    processing4: 'https://github.com/processing/processing4',
    pythonApi: 'https://processing.github.io/libprocessing/',
    rustApi: '',
    discord: '',
    foundation: 'https://processingfoundation.org',
    donate:
      'https://www.every.org/processing-foundation?donateTo=processing-foundation#/donate/card',
  },
};

export const sourceRepos = {
  python: 'https://github.com/processing/libprocessing/blob/main/',
  rust: 'https://github.com/processing/libprocessing/blob/main/',
  java: 'https://github.com/processing/processing4/blob/main/',
  web: 'https://github.com/processing/libprocessing/blob/main/',
} as const;
