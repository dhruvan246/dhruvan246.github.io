// Name pools for the Pet Name Generator (/name-generator).
// Add as many as you like — more names = more variety.

export const GENDER_NAMES: Record<string, Record<string, string[]>> = {
  dog: {
    male: ['Max', 'Charlie', 'Cooper', 'Buddy', 'Rocky', 'Bear', 'Duke', 'Zeus', 'Jack', 'Toby', 'Milo', 'Oscar', 'Leo', 'Finn', 'Murphy', 'Buster'],
    female: ['Bella', 'Luna', 'Lucy', 'Daisy', 'Lola', 'Sadie', 'Molly', 'Bailey', 'Maggie', 'Ruby', 'Rosie', 'Penny', 'Stella', 'Coco', 'Nala', 'Willow'],
  },
  cat: {
    male: ['Oliver', 'Leo', 'Milo', 'Simba', 'Jasper', 'Loki', 'Felix', 'Tom', 'Salem', 'Oreo', 'Smokey', 'Tiger', 'Gus', 'Binx', 'Ziggy', 'Apollo'],
    female: ['Luna', 'Bella', 'Lily', 'Cleo', 'Nala', 'Chloe', 'Mia', 'Willow', 'Penny', 'Olive', 'Misty', 'Pepper', 'Hazel', 'Daisy', 'Ivy', 'Pumpkin'],
  },
};

export const STYLE_NAMES: Record<string, string[]> = {
  cute: ['Peanut', 'Biscuit', 'Cuddles', 'Button', 'Pippin', 'Noodle', 'Pebbles', 'Marshmallow', 'Cupcake', 'Waffles', 'Bubbles', 'Snickers'],
  classic: ['Bella', 'Max', 'Charlie', 'Lucy', 'Duke', 'Rex', 'Lady', 'Buddy', 'Princess', 'King', 'Daisy', 'Toby'],
  funny: ['Sir Barks-a-Lot', 'Chewbacca', 'Bark Twain', 'Waffles', 'Sir Wiggles', 'Snoop Dog', 'Furrgus', 'Droolius Caesar', 'Hairy Pawter', 'Chairman Meow', 'Pup Tart', 'Bork'],
  unique: ['Zephyr', 'Onyx', 'Indigo', 'Juno', 'Atlas', 'Kairo', 'Nova', 'Sol', 'Vesper', 'Orion', 'Echo', 'Lyric'],
  food: ['Mochi', 'Biscuit', 'Pickle', 'Olive', 'Pepper', 'Nacho', 'Mango', 'Cookie', 'Nugget', 'Basil', 'Latte', 'Taco'],
  nature: ['River', 'Willow', 'Storm', 'Aspen', 'Maple', 'Clover', 'Fern', 'Sky', 'Pine', 'Meadow', 'Cedar', 'Dawn'],
};

export const NAME_STYLES = [
  { v: 'any', l: 'Any style', e: '🎲' },
  { v: 'cute', l: 'Cute', e: '🥰' },
  { v: 'classic', l: 'Classic', e: '👑' },
  { v: 'funny', l: 'Funny', e: '😂' },
  { v: 'unique', l: 'Unique', e: '✨' },
  { v: 'food', l: 'Food-inspired', e: '🍪' },
  { v: 'nature', l: 'Nature', e: '🌿' },
];
