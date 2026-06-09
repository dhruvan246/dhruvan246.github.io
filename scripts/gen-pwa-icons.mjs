// Generates PWA app icons (regular + maskable + apple-touch) from the brand paw.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

mkdirSync('public/icons', { recursive: true });

const PAW = `
  <g fill="#ffffff">
    <circle cx="176" cy="192" r="48"/>
    <circle cx="336" cy="192" r="48"/>
    <circle cx="112" cy="288" r="40"/>
    <circle cx="400" cy="288" r="40"/>
    <path d="M256 256c-56 0-96 48-96 96 0 40 32 56 96 56s96-16 96-56c0-48-40-96-96-96z"/>
  </g>`;

// Rounded-square icon (matches favicon look).
const regular = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="#2f8f63"/>${PAW}</svg>`;

// Maskable: full-bleed green, paw shrunk into the central safe zone.
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#2f8f63"/>
  <g transform="translate(256,256) scale(0.7) translate(-256,-256)">${PAW}</g></svg>`;

const jobs = [
  [regular, 'public/icons/icon-192.png', 192],
  [regular, 'public/icons/icon-512.png', 512],
  [regular, 'public/icons/apple-touch-icon.png', 180],
  [maskable, 'public/icons/icon-maskable-512.png', 512],
  [maskable, 'public/icons/icon-maskable-192.png', 192],
];

for (const [svg, out, size] of jobs) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(out);
  console.log('wrote', out);
}
console.log('Done generating PWA icons.');
