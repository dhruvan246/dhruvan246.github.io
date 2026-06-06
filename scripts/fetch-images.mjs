// Fetch copyright-safe, realistic photos from Wikipedia/Wikimedia Commons.
// Uses the CDN-served REST summary endpoint (lenient) to resolve the lead image,
// then one Commons call for the license. Resumable + throttled.
// Usage: node scripts/fetch-images.mjs scripts/image-queries-all.json

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = 'public/images';
mkdirSync(OUT_DIR, { recursive: true });

const inputPath = process.argv[2] || 'scripts/image-queries.json';
const items = JSON.parse(readFileSync(inputPath, 'utf8'));

const OK = /(cc0|public domain|cc[\s-]?by(\b|-sa)|attribution|creative commons)/i;
const BAD = /(fair use|non-free|all rights reserved|copyrighted)/i;
const UA = 'PawPedia/1.0 (pet encyclopedia; educational use)';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const strip = (s) => String(s || '')
  .replace(/<[^>]*>/g, '')
  .replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, '$1')
  .replace(/\[\[([^\]]*)\]\]/g, '$1')
  .replace(/[\w.-]+\.(jpg|jpeg|png|gif|svg):?/gi, '')
  .replace(/derivative work:.*$/i, '')
  .replace(/["']/g, '')
  .replace(/\s+/g, ' ').trim();

async function commons(file, tries = 3) {
  const u = new URL('https://commons.wikimedia.org/w/api.php');
  u.search = new URLSearchParams({
    format: 'json', origin: '*', action: 'query',
    titles: 'File:' + file, prop: 'imageinfo', iiprop: 'extmetadata|url',
  }).toString();
  for (let i = 0; i < tries; i++) {
    const r = await fetch(u, { headers: { 'User-Agent': UA } });
    if (r.ok) return r.json();
    if (r.status === 429) { await sleep(2500 * (i + 1)); continue; }
    throw new Error('commons ' + r.status);
  }
  throw new Error('commons 429');
}

const manifest = (() => { try { return JSON.parse(readFileSync('image-manifest.json', 'utf8')); } catch { return {}; } })();
let ok = 0, skip = 0;

for (const it of items) {
  if (manifest[it.slug]) continue;
  await sleep(3500);
  try {
    // 1) REST summary — CDN-served, resolves redirects. Retry through 429s.
    let sres = null;
    for (let i = 0; i < 5; i++) {
      sres = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(it.q)}`,
        { headers: { 'User-Agent': UA, accept: 'application/json' } });
      if (sres.ok || sres.status !== 429) break;
      await sleep(3000 * (i + 1));
    }
    if (!sres || !sres.ok) { console.log('SKIP nopage', it.slug, sres && sres.status); skip++; continue; }
    const sum = await sres.json();
    if (sum.type === 'disambiguation') { console.log('SKIP disambig', it.slug); skip++; continue; }
    const orig = sum.originalimage && sum.originalimage.source;
    if (!orig || !orig.includes('/wikipedia/commons/') || /\.svg$/i.test(orig)) { console.log('SKIP no-commons-img', it.slug); skip++; continue; }

    // Derive filename + a 1000px Commons thumbnail URL.
    const after = orig.split('/wikipedia/commons/')[1]; // "a/bc/File_Name.jpg"
    const baseName = after.split('/').pop();
    const fileName = decodeURIComponent(baseName);
    const thumb = `https://upload.wikimedia.org/wikipedia/commons/thumb/${after}/1000px-${baseName}`;

    // 2) License + author from Commons.
    const ci = await commons(fileName);
    const cpage = Object.values(ci.query.pages)[0];
    const info = cpage && cpage.imageinfo && cpage.imageinfo[0];
    const meta = (info && info.extmetadata) || {};
    const license = strip((meta.LicenseShortName && meta.LicenseShortName.value) || (meta.UsageTerms && meta.UsageTerms.value));
    const artist = strip(meta.Artist && meta.Artist.value) || 'Wikimedia Commons';
    const descUrl = (info && info.descriptionurl) || ('https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(fileName));
    if (!license || BAD.test(license) || !OK.test(license)) { console.log('SKIP license', it.slug, '|', license); skip++; continue; }

    // 3) Download (prefer 1000px thumb, fall back to original), retrying 429s.
    const dl = async (url) => {
      for (let i = 0; i < 4; i++) {
        const r = await fetch(url, { headers: { 'User-Agent': UA } });
        if (r.ok || r.status !== 429) return r;
        await sleep(2500 * (i + 1));
      }
      return null;
    };
    let resp = await dl(thumb);
    if (!resp || !resp.ok) resp = await dl(orig);
    if (!resp || !resp.ok) throw new Error('img ' + (resp && resp.status));
    const ext0 = (fileName.split('.').pop() || 'jpg').toLowerCase();
    const ext = ['jpg', 'jpeg', 'png', 'webp'].includes(ext0) ? (ext0 === 'jpeg' ? 'jpg' : ext0) : 'jpg';
    const fileOut = `${it.slug}.${ext}`;
    writeFileSync(join(OUT_DIR, fileOut), Buffer.from(await resp.arrayBuffer()));

    manifest[it.slug] = { file: `/images/${fileOut}`, alt: it.alt || sum.title, credit: artist, license, source: descUrl };
    ok++;
    writeFileSync('image-manifest.json', JSON.stringify(manifest, null, 2));
    console.log('OK  ', it.slug, '|', license, '|', artist.slice(0, 36));
  } catch (e) {
    console.log('ERR ', it.slug, e.message);
    skip++;
  }
}

console.log(`\nDone. ${ok} new images this run, ${skip} skipped. Total manifest: ${Object.keys(manifest).length}.`);
