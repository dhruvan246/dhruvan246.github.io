import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIES } from './consts.ts';

const categorySlugs = CATEGORIES.map((c) => c.slug);

// The "articles" collection: every .md file in src/content/articles is an article.
const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
  schema: z.object({
    // Required fields ----------------------------------------------------------
    title: z.string(),
    description: z.string(), // used for SEO + article cards. Keep under ~160 chars.
    category: z.enum(categorySlugs as [string, ...string[]]), // must match a slug in consts.ts
    pubDate: z.coerce.date(), // e.g. 2026-06-04

    // Optional fields ----------------------------------------------------------
    updatedDate: z.coerce.date().optional(),
    species: z.string().optional(), // e.g. "Golden Retriever", "Persian Cat"
    heroImage: z.string().optional(), // a URL or a path inside /public, e.g. /images/dog.jpg
    heroImageAlt: z.string().optional(),
    heroCredit: z.string().optional(),     // photo author (for attribution)
    heroCreditUrl: z.string().optional(),  // link to the image's source page
    heroLicense: z.string().optional(),    // e.g. "CC BY-SA 4.0"
    tags: z.array(z.string()).default([]),
    author: z.string().optional(),
    draft: z.boolean().default(false), // set true to hide an unfinished article
  }),
});

export const collections = { articles };
