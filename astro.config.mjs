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
      // Journal is noindexed — kept out of the sitemap to match. Resources
      // was removed entirely. About is no longer noindexed (it has real
      // content now), so it's back in the sitemap.
      filter: (page) => !page.includes('/journal'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});