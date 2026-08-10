// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://benmaclaren.com.au',
  integrations: [
    mdx(),
    sitemap({
      // Journal, Resources, and About are hidden from nav and noindexed —
      // kept out of the sitemap to match.
      filter: (page) =>
        !page.includes('/journal') && !page.includes('/resources') && !page.includes('/about'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});