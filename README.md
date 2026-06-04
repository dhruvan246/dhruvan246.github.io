# 🐾 PawPedia — Pet Encyclopedia Website

A fast, SEO-friendly website for publishing daily pet articles, built with [Astro](https://astro.build).
Designed to grow into an encyclopedia covering **every pet** and **everything about caring for them**.

---

## ✅ What you have

- A homepage showing your latest articles
- Browsable **categories** (Dogs, Cats, Birds, Fish, Reptiles, and more)
- Beautiful, fast article pages
- **SEO built in:** meta tags, Open Graph, canonical URLs, JSON-LD, automatic `sitemap`, and an RSS feed
- **AdSense-ready** ad slots (they show a placeholder until you add your AdSense ID)
- A one-command tool for starting new articles

---

## 🚀 Everyday commands

Open a terminal **in this folder** and run:

| What you want to do | Command |
| --- | --- |
| Preview the site on your computer | `npm run dev` then open the link it prints (usually http://localhost:4321) |
| Start a new article | `npm run new -- "Your Article Title" dogs` |
| Build the final site for hosting | `npm run build` |
| Preview the built site | `npm run preview` |

> The text after `--` is your article title. The last word (e.g. `dogs`) is the category — see the list in `src/consts.ts`.

---

## ✍️ How to publish a new article (daily routine)

1. Run `npm run new -- "Persian Cat Care Guide" cats`
2. Open the new file it created in `src/content/articles/`
3. Fill in the **description** (shows in Google), write your content under the headings
4. (Optional) Add a `heroImage` — see below
5. When it's ready, change `draft: true` to `draft: false`
6. Save. With `npm run dev` running, it appears instantly. To publish live, run `npm run build` and re-deploy.

That's it — every article is just one text file.

### Adding images
- Drop image files into the `public/images/` folder (create it if needed).
- Reference them like: `heroImage: "/images/persian-cat.jpg"`
- Or paste a full image URL.

---

## ⚙️ Customise your site (edit `src/consts.ts`)

Everything important lives in **`src/consts.ts`**:

- `SITE_TITLE` — your site name
- `SITE_DESCRIPTION` — tagline for SEO
- `SITE_URL` — **set this to your real domain before deploying**
- `ADSENSE_CLIENT` — your AdSense ID (leave empty until approved)
- `CATEGORIES` — add or remove pet categories

---

## 💰 Turning on Google AdSense

1. Get your site online first (see deploying below) with real content.
2. Apply at [google.com/adsense](https://www.google.com/adsense/) — they need original, useful content and a few key pages (About, etc.). **Tip:** publish 15–25+ solid articles before applying.
3. Once approved, set `ADSENSE_CLIENT` in `src/consts.ts` to your `ca-pub-...` ID.
4. Update `public/ads.txt` with the line AdSense gives you.
5. Create ad units in AdSense and place them: `<AdSlot slot="1234567890" />`.

Until then, ad slots show a tidy placeholder so the layout looks right.

---

## 🌐 Putting the site online (free)

The simplest path for a beginner:

1. Put this folder on [GitHub](https://github.com).
2. Sign up at [Netlify](https://netlify.com) or [Cloudflare Pages](https://pages.cloudflare.com) (free).
3. Connect your GitHub repo. Build command: `npm run build`. Publish directory: `dist`.
4. It deploys automatically every time you push changes.
5. Add your custom domain, then update `SITE_URL` in `src/consts.ts` and the domain in `public/robots.txt`.

---

## 📁 Project structure

```
src/
  consts.ts              ← main settings (edit me!)
  content.config.ts      ← article fields/rules
  content/articles/      ← YOUR ARTICLES live here (.md files)
  components/            ← reusable pieces (header, footer, ad slot, cards)
  layouts/               ← page + article wrappers (SEO lives here)
  pages/                 ← homepage, categories, about, 404, RSS
  styles/global.css      ← colours and design
public/                  ← favicon, robots.txt, ads.txt, images/
scripts/new-article.mjs  ← the "npm run new" helper
```

Happy writing! 🐾
