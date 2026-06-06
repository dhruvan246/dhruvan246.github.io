// Apply images to ALL article frontmatter from image-manifest.json.
// - If a valid downloaded image exists for the slug → set heroImage + credit fields.
// - Otherwise → clear heroImage + credit fields (emoji fallback, never a broken image).
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';

const manifest = (() => { try { return JSON.parse(readFileSync('image-manifest.json', 'utf8')); } catch { return {}; } })();
const dir = 'src/content/articles';
const esc = (s) => String(s).replace(/\\/g, '').replace(/"/g, '\\"');
const files = readdirSync(dir).filter((f) => f.endsWith('.md'));

let set = 0, cleared = 0;
for (const f of files) {
  const slug = f.replace(/\.md$/, '');
  const path = `${dir}/${f}`;
  let txt = readFileSync(path, 'utf8');
  const fm = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) continue;
  let body = fm[1];

  const setKey = (k, v) => {
    const line = `${k}: "${esc(v)}"`;
    const re = new RegExp(`^${k}:.*$`, 'm');
    if (re.test(body)) body = body.replace(re, line); else body += `\n${line}`;
  };
  const delKey = (k) => { body = body.replace(new RegExp(`^${k}:.*\\r?\\n?`, 'm'), ''); };

  const m = manifest[slug];
  const hasImg = m && existsSync('public' + m.file);
  if (hasImg) {
    setKey('heroImage', m.file);
    setKey('heroImageAlt', m.alt);
    setKey('heroCredit', m.credit);
    setKey('heroCreditUrl', m.source);
    setKey('heroLicense', m.license);
    set++;
  } else {
    setKey('heroImage', '');
    delKey('heroCredit'); delKey('heroCreditUrl'); delKey('heroLicense');
    cleared++;
  }

  txt = txt.replace(/^---\r?\n[\s\S]*?\r?\n---/, `---\n${body}\n---`);
  writeFileSync(path, txt);
}
console.log(`Applied images to ${set} articles; ${cleared} left with emoji fallback.`);
