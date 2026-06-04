// =============================================================================
// BREED DIRECTORY
// Groups breeds by size for a category. The category page shows these groups,
// and each breed name links to its article IF an article with that `slug` exists
// (a file src/content/articles/<slug>.md). Breeds without an article yet show
// a "soon" tag instead of a link — so nothing links to an empty page.
//
// To add a new breed article later: pick the breed's `slug` below, then run
//   npm run new -- "Breed Name" dogs
// and rename the created file to <slug>.md (or just match the slug).
// =============================================================================

export interface Breed {
  name: string;
  slug: string; // matches the article filename (article id)
}

export interface SizeGroup {
  slug: string;
  label: string;
  emoji: string;
  description: string;
  breeds: Breed[];
}

export const BREED_GROUPS: Record<string, SizeGroup[]> = {
  dogs: [
    {
      slug: 'small',
      label: 'Small Dogs',
      emoji: '🐶',
      description: 'Compact companions, usually under 10 kg — great for apartments and laps.',
      breeds: [
        { name: 'Chihuahua', slug: 'chihuahua' },
        { name: 'Pomeranian', slug: 'pomeranian' },
        { name: 'French Bulldog', slug: 'french-bulldog' },
        { name: 'Shih Tzu', slug: 'shih-tzu' },
        { name: 'Dachshund', slug: 'dachshund' },
        { name: 'Yorkshire Terrier', slug: 'yorkshire-terrier' },
        { name: 'Pug', slug: 'pug' },
        { name: 'Maltese', slug: 'maltese' },
        { name: 'Boston Terrier', slug: 'boston-terrier' },
        { name: 'Cavalier King Charles Spaniel', slug: 'cavalier-king-charles-spaniel' },
        { name: 'Miniature Schnauzer', slug: 'miniature-schnauzer' },
        { name: 'Jack Russell Terrier', slug: 'jack-russell-terrier' },
      ],
    },
    {
      slug: 'medium',
      label: 'Medium Dogs',
      emoji: '🐕',
      description: 'Versatile, energetic dogs roughly 10–25 kg — popular family all-rounders.',
      breeds: [
        { name: 'Beagle', slug: 'beagle' },
        { name: 'Border Collie', slug: 'border-collie' },
        { name: 'Cocker Spaniel', slug: 'cocker-spaniel' },
        { name: 'Australian Shepherd', slug: 'australian-shepherd' },
        { name: 'Bulldog', slug: 'bulldog' },
        { name: 'Shiba Inu', slug: 'shiba-inu' },
        { name: 'Whippet', slug: 'whippet' },
        { name: 'Basset Hound', slug: 'basset-hound' },
        { name: 'Brittany', slug: 'brittany' },
        { name: 'Staffordshire Bull Terrier', slug: 'staffordshire-bull-terrier' },
      ],
    },
    {
      slug: 'large',
      label: 'Large Dogs',
      emoji: '🐕‍🦺',
      description: 'Big, strong breeds 25 kg and up — loyal guardians and working dogs.',
      breeds: [
        { name: 'German Shepherd', slug: 'german-shepherd' },
        { name: 'Labrador Retriever', slug: 'labrador-retriever' },
        { name: 'Golden Retriever', slug: 'golden-retriever-complete-care-guide' },
        { name: 'Rottweiler', slug: 'rottweiler' },
        { name: 'Siberian Husky', slug: 'siberian-husky' },
        { name: 'Boxer', slug: 'boxer' },
        { name: 'Doberman Pinscher', slug: 'doberman-pinscher' },
        { name: 'Great Dane', slug: 'great-dane' },
        { name: 'Bernese Mountain Dog', slug: 'bernese-mountain-dog' },
        { name: 'Saint Bernard', slug: 'saint-bernard' },
        { name: 'Mastiff', slug: 'mastiff' },
      ],
    },
  ],

  cats: [
    {
      slug: 'shorthair',
      label: 'Shorthair Cats',
      emoji: '🐈',
      description: 'Easy-care, short-coated breeds — sleek, low-grooming and hugely popular.',
      breeds: [
        { name: 'British Shorthair', slug: 'british-shorthair' },
        { name: 'American Shorthair', slug: 'american-shorthair' },
        { name: 'Siamese', slug: 'siamese-cat' },
        { name: 'Bengal', slug: 'bengal-cat' },
        { name: 'Russian Blue', slug: 'russian-blue' },
        { name: 'Abyssinian', slug: 'abyssinian-cat' },
        { name: 'Scottish Fold', slug: 'scottish-fold' },
      ],
    },
    {
      slug: 'longhair',
      label: 'Longhair Cats',
      emoji: '🐱',
      description: 'Luxurious, fluffy breeds with flowing coats that need regular grooming.',
      breeds: [
        { name: 'Persian', slug: 'persian-cat-care-guide' },
        { name: 'Maine Coon', slug: 'maine-coon' },
        { name: 'Ragdoll', slug: 'ragdoll' },
        { name: 'Norwegian Forest Cat', slug: 'norwegian-forest-cat' },
        { name: 'Birman', slug: 'birman' },
        { name: 'Siberian', slug: 'siberian-cat' },
      ],
    },
    {
      slug: 'special',
      label: 'Special & Unusual Cats',
      emoji: '✨',
      description: 'Distinctive breeds — hairless, curly-coated or tailless — with unique care needs.',
      breeds: [
        { name: 'Sphynx', slug: 'sphynx' },
        { name: 'Devon Rex', slug: 'devon-rex' },
        { name: 'Manx', slug: 'manx' },
      ],
    },
  ],
};
