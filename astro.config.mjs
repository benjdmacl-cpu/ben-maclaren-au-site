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
      // Journal, Resources, and About are still work-in-progress (see the
      // noindex meta tag on those pages) — kept out of the sitemap until
      // real content replaces the placeholders.
      filter: (page) =>
        !page.includes('/journal') && !page.includes('/resources') && !page.includes('/about'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});