// Generate image search queries for every article from its frontmatter.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const dir = 'src/content/articles';
const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
const out = [];

for (const f of files) {
  const slug = f.replace(/\.md$/, '');
  const txt = readFileSync(`${dir}/${f}`, 'utf8');
  const fm = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) continue;
  const body = fm[1];
  const get = (k) => {
    const m = body.match(new RegExp(`^${k}:\\s*"?([^"\\n]*)"?\\s*$`, 'm'));
    return m ? m[1].trim() : '';
  };
  const category = get('category');
  let name = get('species');
  if (!name) name = get('title').replace(/:.*$/, '').replace(/\s+Care Guide.*$/i, '').trim();
  if (!name) continue;

  // Cats need "<name> cat" (bare names like "Bengal" are ambiguous); dogs and
  // other species use the bare name, which matches Wikipedia articles far better.
  let q = name;
  if (category === 'cats') q = `${name} cat`;

  out.push({ slug, q, alt: `A ${name}` });
}

writeFileSync('scripts/image-queries-all.json', JSON.stringify(out, null, 2));
console.log(`Generated ${out.length} image queries -> scripts/image-queries-all.json`);
