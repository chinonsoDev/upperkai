// Builds the 1200x630 Open Graph / Twitter images in public/og.
// Runs before every build, so a new product or post gets its own image.
import sharp from 'sharp';
import { mkdir, readdir, readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const P = '#5838B8';
const L = '#C4B1F9';

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Greedy word wrap; good enough for headline-length text.
function wrap(text, maxChars) {
  const lines = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if ((line + ' ' + word).trim().length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function frontmatter(source) {
  const block = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const get = (key) => block.match(new RegExp(`^${key}:\\s*["']?(.*?)["']?\\s*$`, 'm'))?.[1];
  return { get };
}

async function render({ eyebrow, title, file }) {
  const lines = wrap(title, 24);
  const size = lines.length > 2 ? 64 : 76;
  const top = 630 - 90 - (lines.length - 1) * size * 1.12;
  const text = lines
    .map((l, i) => `<text x="80" y="${top + i * size * 1.12}" font-size="${size}" font-weight="700" fill="#FFFFFF">${escape(l)}</text>`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
    <rect width="1200" height="630" fill="${P}"/>
    <circle cx="1080" cy="110" r="250" fill="${L}" opacity="0.22"/>
    <circle cx="1150" cy="560" r="140" fill="${L}" opacity="0.14"/>
    ${eyebrow ? `<text x="80" y="${top - size - 10}" font-size="30" font-weight="600" fill="${L}">${escape(eyebrow)}</text>` : ''}
    ${text}
  </svg>`;
  const logo = await sharp(new URL('public/brand/upperkai-logo-white.svg', root).pathname, { density: 300 })
    .resize({ height: 64 })
    .toBuffer();
  await sharp(Buffer.from(svg))
    .composite([{ input: logo, left: 80, top: 72 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(new URL(`public/og/${file}`, root).pathname);
  console.log(`wrote public/og/${file}`);
}

await mkdir(new URL('public/og/products', root), { recursive: true });
await mkdir(new URL('public/og/blog', root), { recursive: true });

await render({ title: 'Software that makes everyday life simpler.', file: 'upperkai-share.jpg' });

for (const [dir, eyebrow, key] of [
  ['products', 'Upperkai product', 'name'],
  ['blog', 'Notes from Upperkai', 'title'],
]) {
  const folder = new URL(`src/content/${dir}/`, root);
  for (const name of (await readdir(folder)).filter((f) => f.endsWith('.md'))) {
    const { get } = frontmatter(await readFile(new URL(name, folder), 'utf8'));
    const slug = name.replace(/\.md$/, '');
    await render({ eyebrow, title: get(key) ?? slug, file: `${dir}/${slug}.jpg` });
  }
}
