import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { absolute } from '../site';

// Pages that should never be listed.
const EXCLUDE = new Set(['/404', '/thanks']);

// Every .astro file in src/pages becomes a URL, so a new page is listed
// automatically. Dynamic routes ([slug]) are covered by their collections below.
const pageFiles = Object.keys(import.meta.glob('./**/*.astro'));

export const GET: APIRoute = async () => {
  const urls: { loc: string; lastmod?: Date }[] = [];

  for (const file of pageFiles) {
    if (file.includes('[')) continue;
    const path = file.replace(/^\./, '').replace(/\.astro$/, '').replace(/\/index$/, '') || '/';
    if (!EXCLUDE.has(path)) urls.push({ loc: absolute(path) });
  }

  for (const p of await getCollection('products')) {
    urls.push({ loc: absolute(`/products/${p.id}`) });
  }

  for (const post of await getCollection('blog', (p) => !p.data.draft)) {
    urls.push({ loc: absolute(`/blog/${post.id}`), lastmod: post.data.updatedDate ?? post.data.pubDate });
  }

  urls.sort((a, b) => a.loc.localeCompare(b.loc));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod.toISOString().slice(0, 10)}</lastmod>` : ''}</url>`)
  .join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
