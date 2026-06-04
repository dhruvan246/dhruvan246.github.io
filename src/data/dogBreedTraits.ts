// =============================================================================
// DOG BREED TRAITS  —  powers the Breed Matcher tool (/breed-matcher).
//
// Each breed is rated 1–5 on several traits. Higher = more of that trait.
//   energy      1 = couch potato      5 = needs tons of exercise
//   grooming    1 = wash & go         5 = daily brushing / pro grooming
//   shedding    1 = barely sheds      5 = sheds heavily
//   kids        1 = not ideal         5 = wonderful with children
//   pets        1 = prefers to be only pet   5 = great with other animals
//   beginner    1 = experts only      5 = perfect for first-time owners
//   barking     1 = very quiet        5 = very vocal
//   apartment   1 = needs space       5 = thrives in a flat
//
// `slug` must match the article filename so results can link to the guide.
// To add a breed: copy a line, fill in the ratings, and (optionally) write its article.
// =============================================================================

export interface BreedTraits {
  name: string;
  slug: string;
  size: 'small' | 'medium' | 'large';
  energy: number;
  grooming: number;
  shedding: number;
  kids: number;
  pets: number;
  beginner: number;
  barking: number;
  apartment: number;
}

export const DOG_BREED_TRAITS: BreedTraits[] = [
  // ---- Small --------------------------------------------------------------
  { name: 'Chihuahua',                     slug: 'chihuahua',                     size: 'small', energy: 3, grooming: 2, shedding: 2, kids: 2, pets: 3, beginner: 3, barking: 4, apartment: 5 },
  { name: 'Pomeranian',                    slug: 'pomeranian',                    size: 'small', energy: 3, grooming: 4, shedding: 4, kids: 3, pets: 3, beginner: 3, barking: 4, apartment: 5 },
  { name: 'French Bulldog',                slug: 'french-bulldog',                size: 'small', energy: 2, grooming: 2, shedding: 3, kids: 4, pets: 4, beginner: 4, barking: 2, apartment: 5 },
  { name: 'Shih Tzu',                      slug: 'shih-tzu',                      size: 'small', energy: 2, grooming: 5, shedding: 1, kids: 4, pets: 4, beginner: 4, barking: 2, apartment: 5 },
  { name: 'Dachshund',                     slug: 'dachshund',                     size: 'small', energy: 3, grooming: 2, shedding: 3, kids: 3, pets: 3, beginner: 3, barking: 4, apartment: 4 },
  { name: 'Yorkshire Terrier',             slug: 'yorkshire-terrier',             size: 'small', energy: 3, grooming: 4, shedding: 1, kids: 3, pets: 3, beginner: 3, barking: 4, apartment: 5 },
  { name: 'Pug',                           slug: 'pug',                           size: 'small', energy: 2, grooming: 2, shedding: 4, kids: 4, pets: 4, beginner: 4, barking: 2, apartment: 5 },
  { name: 'Maltese',                       slug: 'maltese',                       size: 'small', energy: 2, grooming: 5, shedding: 1, kids: 3, pets: 4, beginner: 3, barking: 3, apartment: 5 },
  { name: 'Boston Terrier',                slug: 'boston-terrier',                size: 'small', energy: 3, grooming: 2, shedding: 2, kids: 4, pets: 4, beginner: 4, barking: 2, apartment: 5 },
  { name: 'Cavalier King Charles Spaniel', slug: 'cavalier-king-charles-spaniel', size: 'small', energy: 3, grooming: 3, shedding: 3, kids: 5, pets: 5, beginner: 5, barking: 2, apartment: 5 },
  { name: 'Miniature Schnauzer',           slug: 'miniature-schnauzer',           size: 'small', energy: 3, grooming: 4, shedding: 1, kids: 4, pets: 3, beginner: 4, barking: 4, apartment: 4 },
  { name: 'Jack Russell Terrier',          slug: 'jack-russell-terrier',          size: 'small', energy: 5, grooming: 2, shedding: 3, kids: 3, pets: 2, beginner: 2, barking: 4, apartment: 3 },

  // ---- Medium -------------------------------------------------------------
  { name: 'Beagle',                        slug: 'beagle',                        size: 'medium', energy: 4, grooming: 2, shedding: 3, kids: 5, pets: 4, beginner: 3, barking: 4, apartment: 3 },
  { name: 'Border Collie',                 slug: 'border-collie',                 size: 'medium', energy: 5, grooming: 3, shedding: 4, kids: 4, pets: 3, beginner: 2, barking: 3, apartment: 2 },
  { name: 'Cocker Spaniel',                slug: 'cocker-spaniel',                size: 'medium', energy: 4, grooming: 4, shedding: 3, kids: 5, pets: 4, beginner: 4, barking: 3, apartment: 3 },
  { name: 'Australian Shepherd',           slug: 'australian-shepherd',           size: 'medium', energy: 5, grooming: 3, shedding: 4, kids: 4, pets: 3, beginner: 2, barking: 3, apartment: 2 },
  { name: 'Bulldog',                       slug: 'bulldog',                       size: 'medium', energy: 2, grooming: 2, shedding: 3, kids: 4, pets: 4, beginner: 4, barking: 1, apartment: 5 },
  { name: 'Shiba Inu',                     slug: 'shiba-inu',                     size: 'medium', energy: 3, grooming: 3, shedding: 4, kids: 3, pets: 2, beginner: 2, barking: 2, apartment: 4 },
  { name: 'Whippet',                       slug: 'whippet',                       size: 'medium', energy: 4, grooming: 1, shedding: 2, kids: 4, pets: 3, beginner: 3, barking: 1, apartment: 4 },
  { name: 'Basset Hound',                  slug: 'basset-hound',                  size: 'medium', energy: 2, grooming: 2, shedding: 3, kids: 4, pets: 4, beginner: 3, barking: 3, apartment: 4 },
  { name: 'Brittany',                      slug: 'brittany',                      size: 'medium', energy: 5, grooming: 2, shedding: 3, kids: 4, pets: 4, beginner: 3, barking: 3, apartment: 2 },
  { name: 'Staffordshire Bull Terrier',    slug: 'staffordshire-bull-terrier',    size: 'medium', energy: 4, grooming: 1, shedding: 2, kids: 5, pets: 2, beginner: 3, barking: 2, apartment: 4 },

  // ---- Large --------------------------------------------------------------
  { name: 'German Shepherd',               slug: 'german-shepherd',                          size: 'large', energy: 5, grooming: 3, shedding: 5, kids: 4, pets: 3, beginner: 2, barking: 3, apartment: 2 },
  { name: 'Labrador Retriever',            slug: 'labrador-retriever',                       size: 'large', energy: 4, grooming: 2, shedding: 4, kids: 5, pets: 5, beginner: 5, barking: 2, apartment: 3 },
  { name: 'Golden Retriever',              slug: 'golden-retriever-complete-care-guide',     size: 'large', energy: 4, grooming: 3, shedding: 4, kids: 5, pets: 5, beginner: 5, barking: 2, apartment: 3 },
  { name: 'Rottweiler',                    slug: 'rottweiler',                               size: 'large', energy: 3, grooming: 2, shedding: 3, kids: 3, pets: 3, beginner: 2, barking: 2, apartment: 2 },
  { name: 'Siberian Husky',                slug: 'siberian-husky',                           size: 'large', energy: 5, grooming: 3, shedding: 5, kids: 4, pets: 3, beginner: 1, barking: 3, apartment: 2 },
  { name: 'Boxer',                         slug: 'boxer',                                    size: 'large', energy: 5, grooming: 1, shedding: 3, kids: 4, pets: 3, beginner: 3, barking: 2, apartment: 3 },
  { name: 'Doberman Pinscher',             slug: 'doberman-pinscher',                        size: 'large', energy: 5, grooming: 1, shedding: 2, kids: 4, pets: 3, beginner: 2, barking: 2, apartment: 2 },
  { name: 'Great Dane',                    slug: 'great-dane',                               size: 'large', energy: 2, grooming: 1, shedding: 3, kids: 4, pets: 4, beginner: 3, barking: 1, apartment: 3 },
  { name: 'Bernese Mountain Dog',          slug: 'bernese-mountain-dog',                     size: 'large', energy: 3, grooming: 4, shedding: 5, kids: 5, pets: 4, beginner: 3, barking: 2, apartment: 2 },
  { name: 'Saint Bernard',                 slug: 'saint-bernard',                            size: 'large', energy: 2, grooming: 4, shedding: 4, kids: 5, pets: 4, beginner: 3, barking: 1, apartment: 2 },
  { name: 'Mastiff',                       slug: 'mastiff',                                  size: 'large', energy: 2, grooming: 1, shedding: 3, kids: 4, pets: 3, beginner: 2, barking: 1, apartment: 3 },
];
