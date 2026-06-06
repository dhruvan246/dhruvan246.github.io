// =============================================================================
// SUPABASE CONFIG  —  powers Owner Reviews + login.
//
// After you create a free Supabase project (https://supabase.com):
//   Project Settings → API → copy "Project URL" and the "anon / public" key.
// Paste them below. The anon key is a PUBLIC client key — safe to commit.
// Until both are filled, the Reviews section + Login page show a friendly
// "coming soon" message instead of breaking.
// =============================================================================

export const SUPABASE_URL = 'https://nebjnsndgrhumnkuipqy.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_MDlQwiVc5deii91__UNeDg_z9r4Fk98';

export const REVIEWS_ENABLED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// Storage bucket name (create this in Supabase → Storage, set to public).
export const REVIEW_PHOTO_BUCKET = 'review-photos';

// =============================================================================
// ADMIN — the email allowed to use the /admin moderation page.
// Whoever logs in with this exact email can delete ANY review.
// (A matching Supabase RLS policy enforces this on the database side too.)
// =============================================================================
export const ADMIN_EMAIL = 'dhruvan246@gmail.com';

// =============================================================================
// SOCIAL LOGIN — list the OAuth providers you've enabled in
// Supabase → Authentication → Providers. Buttons only show for those listed,
// so users never see a button that errors with "provider not enabled".
// Supported here: 'google', 'github', 'facebook', 'twitter', 'azure'...
// =============================================================================
export const OAUTH_PROVIDERS: string[] = [];
