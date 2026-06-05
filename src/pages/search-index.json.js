import { getCollection } from 'astro:content';

// A lightweight JSON index of every published article, fetched by the search page.
export async function GET() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const items = articles.map((a) => ({
    t: a.data.title,
    s: a.data.species ?? '',
    d: a.data.description,
    c: a.data.category,
    g: a.data.tags ?? [],
    u: `/articles/${a.id}/`,
  }));
  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  });
}
