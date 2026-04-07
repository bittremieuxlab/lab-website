// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // Deployed at https://bittremieuxlab.github.io/lab-website/
  // Switch to custom domain: remove base, set site to 'https://example.com'
  // See: https://docs.astro.build/en/guides/deploy/github/#configure-astro
  site: 'https://bittremieuxlab.github.io',
  base: '/lab-website',
  integrations: [preact()],
});
