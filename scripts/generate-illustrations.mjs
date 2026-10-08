// Generates the placeholder illustrations in src/assets/images as WebP.
// upperkai-jambcbt-practice.webp is a real screenshot and is not generated here.
// Run once with `npm run illustrations`. Replace any file with a real
// screenshot or photo of the same name and size when you have one.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT = new URL('../src/assets/images/', import.meta.url);
const P = '#5838B8';
const L = '#C4B1F9';
const T = '#EEE8FE';
const W = '#FFFFFF';
const D = '#1B1B1B';

// The Upperkai arrow, drawn in a 100x100 box.
const arrow = (x, y, size, color, stroke = 11) =>
  `<g transform="translate(${x} ${y}) scale(${size / 100})"><path d="M26 38 V58 A18 18 0 0 0 62 58 V24 M50 36 L62 24 L74 36" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/></g>`;

const svg = (w, h, body, bg = T) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${bg}"/>${body}</svg>`;

const shadow = `<defs><filter id="s" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="${P}" flood-opacity="0.18"/></filter></defs>`;

// A phone with an app screen; `screen` draws inside a 320x640 box at (0,0).
const phone = (cx, cy, screen) => `
  <g transform="translate(${cx - 180} ${cy - 350})" filter="url(#s)">
    <rect width="360" height="700" rx="48" fill="${D}"/>
    <rect x="20" y="20" width="320" height="660" rx="32" fill="${W}"/>
    <g transform="translate(20 40)">${screen}</g>
  </g>`;

const bar = (x, y, w, h = 14, c = L, r = 7) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c}"/>`;

const screens = {
  list: `
    ${bar(28, 20, 140, 20, D, 10)}${bar(28, 52, 200, 12, L, 6)}
    <rect x="20" y="96" width="280" height="120" rx="20" fill="${P}"/>
    ${bar(44, 124, 120, 16, W, 8)}${bar(44, 156, 190, 12, L, 6)}${bar(44, 182, 90, 12, L, 6)}
    ${[0, 1, 2, 3].map((i) => `
      <rect x="20" y="${244 + i * 88}" width="280" height="72" rx="18" fill="${T}"/>
      <circle cx="56" cy="${280 + i * 88}" r="18" fill="${i === 0 ? P : L}"/>
      ${bar(88, 266 + i * 88, 150, 12, D, 6)}${bar(88, 286 + i * 88, 100, 10, L, 5)}`).join('')}`,
  chart: `
    ${bar(28, 20, 120, 20, D, 10)}${bar(28, 52, 170, 12, L, 6)}
    <rect x="20" y="96" width="280" height="250" rx="20" fill="${T}"/>
    ${[90, 150, 120, 190, 140, 210].map((h, i) => `<rect x="${44 + i * 42}" y="${320 - h}" width="26" height="${h}" rx="8" fill="${i === 5 ? P : L}"/>`).join('')}
    <rect x="20" y="370" width="132" height="110" rx="20" fill="${P}"/>
    ${bar(40, 396, 70, 14, W, 7)}${bar(40, 424, 92, 26, W, 10)}
    <rect x="168" y="370" width="132" height="110" rx="20" fill="${T}"/>
    ${bar(188, 396, 70, 14, L, 7)}${bar(188, 424, 92, 26, D, 10)}
    <rect x="20" y="500" width="280" height="64" rx="32" fill="${D}"/>${bar(110, 526, 100, 12, W, 6)}`,
  calendar: `
    ${bar(28, 20, 160, 20, D, 10)}${bar(28, 52, 120, 12, L, 6)}
    ${Array.from({ length: 28 }, (_, i) => {
      const x = 24 + (i % 7) * 40, y = 96 + Math.floor(i / 7) * 44;
      const on = [9, 16, 17, 23].includes(i);
      return `<rect x="${x}" y="${y}" width="32" height="34" rx="10" fill="${i === 16 ? P : on ? L : T}"/>`;
    }).join('')}
    <rect x="20" y="290" width="280" height="96" rx="20" fill="${P}"/>
    ${bar(44, 316, 150, 16, W, 8)}${bar(44, 346, 110, 12, L, 6)}
    <rect x="20" y="402" width="280" height="72" rx="18" fill="${T}"/>${bar(44, 428, 180, 12, D, 6)}${bar(44, 448, 120, 10, L, 5)}
    <rect x="20" y="490" width="280" height="72" rx="18" fill="${T}"/>${bar(44, 516, 160, 12, D, 6)}${bar(44, 536, 90, 10, L, 5)}`,
};

const productShot = (screen, accentSide) => svg(1200, 800, `${shadow}
  <circle cx="${accentSide ? 940 : 260}" cy="180" r="220" fill="${L}" opacity="0.55"/>
  <circle cx="${accentSide ? 220 : 980}" cy="700" r="160" fill="${L}" opacity="0.4"/>
  ${phone(600, 420, screens[screen])}`);

const images = {
  // Purpose first: a target with the arrow heading for the centre.
  'upperkai-purpose-first-illustration': [1200, 900, svg(1200, 900, `
    <circle cx="600" cy="450" r="330" fill="${L}" opacity="0.5"/>
    <circle cx="600" cy="450" r="240" fill="${W}"/>
    <circle cx="600" cy="450" r="160" fill="${L}"/>
    <circle cx="600" cy="450" r="80" fill="${P}"/>
    ${arrow(520, 370, 160, W, 12)}`)],

  // Simple by default: one card, three things ticked off.
  'upperkai-simple-by-default-illustration': [1200, 900, svg(1200, 900, `${shadow}
    <circle cx="960" cy="200" r="180" fill="${L}" opacity="0.5"/>
    <g filter="url(#s)"><rect x="300" y="190" width="600" height="520" rx="40" fill="${W}"/></g>
    ${bar(360, 250, 260, 24, D, 12)}
    ${[0, 1, 2].map((i) => `
      <circle cx="390" cy="${370 + i * 110}" r="30" fill="${i < 2 ? P : T}"/>
      ${i < 2 ? `<path d="M376 ${370 + i * 110} l10 10 l18 -20" fill="none" stroke="${W}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
      ${bar(440, 358 + i * 110, i === 1 ? 300 : 360, 22, i < 2 ? L : T, 11)}`).join('')}`)],

  // Built to last: steady, stacked layers.
  'upperkai-built-to-last-illustration': [1200, 900, svg(1200, 900, `${shadow}
    <circle cx="250" cy="250" r="170" fill="${L}" opacity="0.5"/>
    ${[0, 1, 2, 3].map((i) => `<g filter="url(#s)"><rect x="${330 + i * 30}" y="${560 - i * 120}" width="${540 - i * 60}" height="100" rx="28" fill="${[P, L, W, L][i]}"/></g>`).join('')}
    ${arrow(560, 120, 110, P, 12)}`)],

  'upperkai-about-illustration': [1200, 900, svg(1200, 900, `
    <rect x="160" y="130" width="880" height="640" rx="64" fill="${P}"/>
    ${arrow(380, 230, 440, W, 11)}
    <circle cx="1040" cy="150" r="90" fill="${L}"/>`)],

  'upperkai-blog-choosing-problems-cover': [1200, 630, svg(1200, 630, `
    ${Array.from({ length: 24 }, (_, i) => `<circle cx="${150 + (i % 8) * 130}" cy="${150 + Math.floor(i / 8) * 165}" r="${i === 13 ? 52 : 26}" fill="${i === 13 ? P : L}"/>`).join('')}`)],
  'upperkai-blog-simple-software-cover': [1200, 630, svg(1200, 630, `
    <path d="M120 470 C 300 120, 420 520, 600 300 S 900 120, 1080 200" fill="none" stroke="${L}" stroke-width="28" stroke-linecap="round"/>
    <path d="M120 520 L1080 520" stroke="${P}" stroke-width="28" stroke-linecap="round"/>`)],
  'upperkai-blog-refining-after-launch-cover': [1200, 630, svg(1200, 630, `
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${140 + i * 190}" y="${400 - i * 60}" width="150" height="${90 + i * 60}" rx="24" fill="${i === 4 ? P : L}"/>`).join('')}
    ${arrow(960, 60, 150, P, 12)}`)],
};

await mkdir(OUT, { recursive: true });
for (const [name, [w, h, markup]] of Object.entries(images)) {
  const file = new URL(`${name}.webp`, OUT);
  await sharp(Buffer.from(markup)).resize(w, h).webp({ quality: 82 }).toFile(file.pathname);
  console.log(`wrote src/assets/images/${name}.webp`);
}
