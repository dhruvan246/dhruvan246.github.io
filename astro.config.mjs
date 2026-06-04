// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/consts.ts';

// https://astro.build/config
export default defineConfig({
  // IMPORTANT: change SITE_URL in src/consts.ts to your real domain before deploying.
  site: SITE_URL,
  integrations: [sitemap()],
});
