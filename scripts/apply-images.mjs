// Apply fetched images to article frontmatter from image-manifest.json.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const manifest = JSON.parse(readFileSync('image-manifest.json', 'utf8'));
const dir = 'src/content/articles';
const esc = (s) => String(s).replace(/\\/g, '').replace(/"/g, '\\"');

let n = 0;
for (const [slug, m] of Object.entries(manifest)) {
  const path = `${dir}/${slug}.md`;
  if (!existsSync(path)) { console.log('missing', slug); continue; }
  let txt = readFileSync(path, 'utf8');
  const fm = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) { console.log('no-frontmatter', slug); continue; }
  let body = fm[1];

  const setKey = (k, v) => {
    const line = `${k}: "${esc(v)}"`;
    const re = new RegExp(`^${k}:.*$`, 'm');
    if (re.test(body)) body = body.replace(re, line);
    else body = body + '\n' + line;
  };
  setKey('heroImage', m.file);
  setKey('heroImageAlt', m.alt);
  setKey('heroCredit', m.credit);
  setKey('heroCreditUrl', m.source);
  setKey('heroLicense', m.license);

  txt = txt.replace(/^---\r?\n[\s\S]*?\r?\n---/, `---\n${body}\n---`);
  writeFileSync(path, txt);
  n++;
  console.log('updated', slug);
}
console.log(`\nUpdated ${n} articles with images.`);
