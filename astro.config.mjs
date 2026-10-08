// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { callouts } from './src/lib/callouts.ts';

export default defineConfig({
  site: 'https://lib.processing.org',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: {
    processor: satteri({
      features: { directive: true },
      mdastPlugins: [callouts()],
    }),
    shikiConfig: { theme: 'github-light' },
  },
});
