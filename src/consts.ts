// =============================================================================
// SITE CONFIGURATION  —  This is the main file you'll edit to customise your site.
// =============================================================================

/** The name of your website (shown in the header, title bar, etc.). */
export const SITE_TITLE = 'PawPedia';

/** A short tagline / description used for SEO and the homepage. Keep it under ~160 characters. */
export const SITE_DESCRIPTION =
  'PawPedia is the friendly encyclopedia for every pet on earth — daily guides on care, diet, health, behaviour and more for dogs, cats, birds, reptiles, fish and beyond.';

/**
 * Your real website address. CHANGE THIS before you publish/deploy.
 * No trailing slash. Example: 'https://www.pawpedia.com'
 */
export const SITE_URL = 'https://example.com';

/** Author/brand name shown on articles by default. */
export const SITE_AUTHOR = 'The PawPedia Team';

/**
 * Your Google AdSense publisher ID, e.g. 'ca-pub-1234567890123456'.
 * Leave it as an empty string until your AdSense account is approved —
 * ads simply won't render while it's empty, so the site still works perfectly.
 */
export const ADSENSE_CLIENT = '';

// -----------------------------------------------------------------------------
// CATEGORIES
// Each pet category gets its own browsable page at /category/<slug>.
// In every article's frontmatter, set `category:` to one of the slugs below.
// Add or remove categories here as your encyclopedia grows.
// -----------------------------------------------------------------------------
export const CATEGORIES = [
  { slug: 'dogs',          label: 'Dogs',           emoji: '🐕', description: 'Breeds, training, care and health for our loyal canine companions.' },
  { slug: 'cats',          label: 'Cats',           emoji: '🐈', description: 'Everything about feline breeds, behaviour, nutrition and well-being.' },
  { slug: 'birds',         label: 'Birds',          emoji: '🦜', description: 'Parrots, canaries, finches and more — care guides for feathered friends.' },
  { slug: 'fish',          label: 'Fish & Aquariums', emoji: '🐠', description: 'Freshwater and saltwater fish keeping, tank setup and aquatic care.' },
  { slug: 'reptiles',      label: 'Reptiles',       emoji: '🦎', description: 'Lizards, snakes, turtles and tortoises — habitat, diet and handling.' },
  { slug: 'small-pets',    label: 'Small Pets',     emoji: '🐹', description: 'Rabbits, hamsters, guinea pigs, ferrets and other pocket pets.' },
  { slug: 'amphibians',    label: 'Amphibians',     emoji: '🐸', description: 'Frogs, salamanders and newts — terrarium care and feeding.' },
  { slug: 'invertebrates', label: 'Invertebrates',  emoji: '🦂', description: 'Tarantulas, snails, hermit crabs and other unusual companions.' },
  { slug: 'farm-pets',     label: 'Farm & Backyard', emoji: '🐓', description: 'Chickens, goats, ducks and other friendly backyard animals.' },
  { slug: 'exotic',        label: 'Exotic Pets',    emoji: '🦔', description: 'Hedgehogs, sugar gliders and rare companions — specialist care.' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

/** Helper: look up a category object by its slug. */
export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
