// =============================================================================
// SUPABASE CONFIG  —  powers Owner Reviews + login.
//
// After you create a free Supabase project (https://supabase.com):
//   Project Settings → API → copy "Project URL" and the "anon / public" key.
// Paste them below. The anon key is a PUBLIC client key — safe to commit.
// Until both are filled, the Reviews section + Login page show a friendly
// "coming soon" message instead of breaking.
// =============================================================================

export const SUPABASE_URL = '';
export const SUPABASE_ANON_KEY = '';

export const REVIEWS_ENABLED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// Storage bucket name (create this in Supabase → Storage, set to public).
export const REVIEW_PHOTO_BUCKET = 'review-photos';
