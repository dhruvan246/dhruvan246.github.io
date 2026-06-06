# 🛠️ Activating Owner Reviews (one-time setup, ~10 min)

The review system + login page are already built into the site. They show
"coming soon" until you connect a free **Supabase** backend. Here's how.

## 1. Create a free Supabase project
1. Go to **https://supabase.com** → sign up (free).
2. Click **New project**. Give it a name (e.g. `pawpedia`), set a database password, pick a region near you, and create it (takes ~2 min).

## 2. Create the reviews table
In your Supabase project: **SQL Editor → New query**, paste this, and click **Run**:

```sql
create table reviews (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  slug text not null,
  user_id uuid references auth.users not null,
  author_name text,
  rating int check (rating between 1 and 5),
  comment text,
  photo_url text
);

alter table reviews enable row level security;

create policy "Anyone can read reviews"   on reviews for select using (true);
create policy "Logged-in users can post"   on reviews for insert with check (auth.uid() = user_id);
create policy "Users can edit own reviews" on reviews for update using (auth.uid() = user_id);
create policy "Users can delete own"       on reviews for delete using (auth.uid() = user_id);
```

## 3. Create the photo storage bucket
**Storage → New bucket** → name it exactly **`review-photos`** → tick **Public bucket** → create.
Then **Storage → Policies → review-photos → New policy → "Allow authenticated uploads"** (INSERT, for role `authenticated`).

## 4. (Optional) turn off email confirmation for easy testing
**Authentication → Providers → Email** → toggle **Confirm email** off (so sign-ups work instantly). You can turn it back on later.

## 5. Give me the two public keys
**Project Settings → API**, copy:
- **Project URL** (e.g. `https://abcd.supabase.co`)
- **anon / public** key (a long string — this is a public client key, safe to commit)

Paste both to me, and I'll drop them into `src/lib/supabase.ts`, push, and reviews go live across all breed pages. 🎉

## Moderation note
Reviews are public. To remove spam/abuse, you can delete any row in
**Supabase → Table editor → reviews**. (We can add an admin tool later.)
