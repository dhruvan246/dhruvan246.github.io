// Quickly scaffold a new article file.
//
// Usage:
//   npm run new -- "Golden Retriever Care Guide"
//   npm run new -- "Budgie Care Guide" birds
//
// It creates src/content/articles/<slug>.md with the frontmatter filled in
// and today's date, ready for you to write. (The text after `--` is your title.)

import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('\n  Please give a title, e.g.:\n  npm run new -- "Golden Retriever Care Guide" dogs\n');
  process.exit(1);
}

// If the last argument looks like a category slug (one word, no spaces), use it.
let category = 'dogs';
let titleParts = args;
const last = args[args.length - 1];
if (args.length > 1 && /^[a-z][a-z-]*$/.test(last)) {
  category = last;
  titleParts = args.slice(0, -1);
}
const title = titleParts.join(' ').trim();

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const dir = join(process.cwd(), 'src', 'content', 'articles');
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const file = join(dir, `${slug}.md`);
if (existsSync(file)) {
  console.error(`\n  An article already exists at: ${file}\n`);
  process.exit(1);
}

const template = `---
title: "${title}"
description: "A short 1–2 sentence summary (this shows in Google results and on cards — keep it under 160 characters)."
category: "${category}"
species: ""
pubDate: ${today}
heroImage: ""
heroImageAlt: ""
tags: []
draft: true
---

Write your introduction here. Hook the reader and tell them what they'll learn.

## Overview

Key facts at a glance.

## Appearance & temperament

Describe what they look like and their personality.

## Diet & nutrition

What they eat, how often, what to avoid.

## Care & housing

Daily care, environment, exercise needs.

## Health & lifespan

Common health issues and how long they typically live.

## Frequently asked questions

**Question?**
Answer.

## Conclusion

Wrap up and a friendly closing thought.
`;

writeFileSync(file, template, 'utf8');
console.log(`\n  ✅ Created: src/content/articles/${slug}.md`);
console.log('  Open it, write your article, then set  draft: false  to publish.\n');
