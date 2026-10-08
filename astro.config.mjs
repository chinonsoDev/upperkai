import { defineConfig } from 'astro/config';

export default defineConfig({
  // The one canonical origin. www.upperkai.com redirects here (set up in Firebase Hosting; see README).
  site: 'https://upperkai.com',
  // Pages build to /about.html and are served at /about, with no trailing slash.
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  prefetch: false,
});
