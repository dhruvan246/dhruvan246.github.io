// Fetch copyright-safe, realistic photos from Wikipedia/Wikimedia Commons.
// Usage: node scripts/fetch-images.mjs scripts/image-queries.json
// Input JSON: [{ "slug": "...", "q": "search term", "alt": "..." }]
// Output: downloads images to public/images/, writes image-manifest.json

import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = 'public/images';
mkdirSync(OUT_DIR, { recursive: true });

const inputPath = process.argv[2] || 'scripts/image-queries.json';
const items = JSON.parse(readFileSync(inputPath, 'utf8'));

// Accept only clearly free licenses; reject anything not obviously reusable.
const OK = /(cc0|public domain|cc[\s-]?by(\b|-sa)|attribution|creative commons)/i;
const BAD = /(fair use|non-free|all rights reserved|©|copyrighted)/i;

const UA = 'PawPedia/1.0 (pet encyclopedia; educational use)';
const strip = (s) => String(s || '')
  .replace(/<[^>]*>/g, '')
  .replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, '$1')
  .replace(/\[\[([^\]]*)\]\]/g, '$1')
  .replace(/[\w.-]+\.(jpg|jpeg|png|gif|svg):?/gi, '')
  .replace(/derivative work:.*$/i, '')
  .replace(/["']/g, '')
  .replace(/\s+/g, ' ').trim();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(host, params, tries = 4) {
  const u = new URL(`https://${host}/w/api.php`);
  u.search = new URLSearchParams({ format: 'json', origin: '*', ...params }).toString();
  for (let i = 0; i < tries; i++) {
    const r = await fetch(u, { headers: { 'User-Agent': UA } });
    if (r.ok) return r.json();
    if (r.status === 429) { await sleep(2000 * (i + 1)); continue; }
    throw new Error('api ' + r.status);
  }
  throw new Error('api 429 (gave up)');
}

// Resumable: load any existing manifest and skip slugs already done.
const manifest = (() => { try { return JSON.parse(readFileSync('image-manifest.json', 'utf8')); } catch { return {}; } })();
let ok = 0, skip = 0;

for (const it of items) {
  if (manifest[it.slug]) { continue; } // already fetched in a previous run
  await sleep(2000); // be polite to the free APIs — avoids rate limiting (429s)
  try {
    // 1) Resolve best Wikipedia article title for the query.
    const s = await api('en.wikipedia.org', { action: 'opensearch', search: it.q, limit: '1', namespace: '0' });
    const title = s[1] && s[1][0];
    if (!title) { console.log('SKIP no-title', it.slug); skip++; continue; }

    // 2) Get the article's representative (lead) image.
    const pi = await api('en.wikipedia.org', {
      action: 'query', titles: title, prop: 'pageimages', piprop: 'original|thumbnail|name', pithumbsize: '1100',
    });
    const page = Object.values(pi.query.pages)[0];
    const fileName = page && page.pageimage;
    const imgUrl = page && ((page.thumbnail && page.thumbnail.source) || (page.original && page.original.source));
    if (!fileName || !imgUrl) { console.log('SKIP no-image', it.slug, title); skip++; continue; }

    // 3) Get license + author from Commons.
    const ci = await api('commons.wikimedia.org', {
      action: 'query', titles: 'File:' + fileName, prop: 'imageinfo', iiprop: 'extmetadata|url',
    });
    const cpage = Object.values(ci.query.pages)[0];
    const info = cpage && cpage.imageinfo && cpage.imageinfo[0];
    const meta = (info && info.extmetadata) || {};
    const license = strip((meta.LicenseShortName && meta.LicenseShortName.value) || (meta.UsageTerms && meta.UsageTerms.value));
    const artist = strip((meta.Artist && meta.Artist.value)) || 'Wikimedia Commons';
    const descUrl = (info && info.descriptionurl) || ('https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(fileName));

    if (!license || BAD.test(license) || !OK.test(license)) { console.log('SKIP license', it.slug, '|', license); skip++; continue; }

    // 4) Download the image.
    const ext0 = (imgUrl.split('?')[0].split('.').pop() || 'jpg').toLowerCase();
    const ext = ['jpg', 'jpeg', 'png', 'webp'].includes(ext0) ? (ext0 === 'jpeg' ? 'jpg' : ext0) : 'jpg';
    const resp = await fetch(imgUrl, { headers: { 'User-Agent': UA } });
    if (!resp.ok) throw new Error('img ' + resp.status);
    const buf = Buffer.from(await resp.arrayBuffer());
    const fileOut = `${it.slug}.${ext}`;
    writeFileSync(join(OUT_DIR, fileOut), buf);

    manifest[it.slug] = {
      file: `/images/${fileOut}`,
      alt: it.alt || title,
      credit: artist,
      license,
      source: descUrl,
    };
    ok++;
    writeFileSync('image-manifest.json', JSON.stringify(manifest, null, 2)); // save progress incrementally
    console.log('OK  ', it.slug, '|', license, '|', artist.slice(0, 40));
  } catch (e) {
    console.log('ERR ', it.slug, e.message);
    skip++;
  }
}

writeFileSync('image-manifest.json', JSON.stringify(manifest, null, 2));
console.log(`\nDone. ${ok} images, ${skip} skipped. Manifest: image-manifest.json`);
