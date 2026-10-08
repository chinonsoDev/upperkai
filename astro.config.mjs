import { defineConfig } from 'astro/config';

export default defineConfig({
  // The one canonical origin. www.upperkai.com 301-redirects here (see netlify.toml).
  site: 'https://upperkai.com',
  // Pages build to /about.html and are served at /about, with no trailing slash.
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  prefetch: false,
});
