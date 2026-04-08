// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      preprocessorOptions: {
        // Deprecation warnings come from within Bootstrap 5. This may be resolved with Bootstrap 6.
        scss: {
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
        },
      },
    },
  },
  // Deployed at https://bittremieuxlab.github.io/lab-website/
  // Switch to custom domain: remove base, set site to 'https://example.com'
  // See: https://docs.astro.build/en/guides/deploy/github/#configure-astro
  site: 'https://bittremieuxlab.github.io',
  // base: '/lab-website',
  integrations: [preact()],
});
