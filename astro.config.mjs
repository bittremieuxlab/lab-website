// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // TODO: Update to your GitHub Pages or custom domain URL
  // Examples:
  //   GitHub Pages:   'https://username.github.io'
  //   Custom domain:  'https://example-lab.com'
  // See: https://docs.astro.build/en/guides/deploy/github/#configure-astro
  site: 'https://bittremieuxlab.github.io',
  integrations: [preact()],
});
