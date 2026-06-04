// =============================================================================
// SYMPTOM CHECKER DATA  —  powers /symptom-checker.
//
// IMPORTANT: This is an educational guidance tool, NOT a diagnosis. The page
// shows strong disclaimers and always points users to a vet. Conditions are
// matched by how many of the user's selected signs they involve.
// =============================================================================

export interface Symptom {
  id: string;
  label: string;
  emoji: string;
  emergency?: boolean; // a red-flag sign that should trigger the emergency banner
}

export interface Condition {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'both';
  urgency: 'emergency' | 'high' | 'moderate' | 'low';
  symptoms: string[]; // symptom ids this condition commonly involves
  advice: string;
}

export const SYMPTOMS: Symptom[] = [
  { id: 'vomiting', label: 'Vomiting', emoji: '🤮' },
  { id: 'diarrhea', label: 'Diarrhoea', emoji: '💩' },
  { id: 'lethargy', label: 'Lethargy / low energy', emoji: '😴' },
  { id: 'loss-of-appetite', label: 'Not eating', emoji: '🍽️' },
  { id: 'coughing', label: 'Coughing', emoji: '😮‍💨' },
  { id: 'sneezing', label: 'Sneezing', emoji: '🤧' },
  { id: 'nasal-discharge', label: 'Runny nose', emoji: '👃' },
  { id: 'excessive-thirst', label: 'Drinking a lot more', emoji: '🚰' },
  { id: 'frequent-urination', label: 'Urinating more often', emoji: '💧' },
  { id: 'straining-to-urinate', label: 'Straining to urinate', emoji: '🚽', emergency: true },
  { id: 'limping', label: 'Limping / stiffness', emoji: '🦴' },
  { id: 'itching', label: 'Itching / scratching', emoji: '🐾' },
  { id: 'hair-loss', label: 'Hair loss / bald patches', emoji: '🪮' },
  { id: 'head-shaking', label: 'Head shaking / ear scratching', emoji: '👂' },
  { id: 'eye-discharge', label: 'Red or runny eyes', emoji: '👁️' },
  { id: 'weight-loss', label: 'Weight loss', emoji: '⚖️' },
  { id: 'bad-breath', label: 'Bad breath', emoji: '😬' },
  { id: 'drooling', label: 'Excessive drooling', emoji: '💦' },
  { id: 'blood-in-stool-urine', label: 'Blood in stool or urine', emoji: '🩸' },
  { id: 'difficulty-breathing', label: 'Difficulty breathing', emoji: '🫁', emergency: true },
  { id: 'pale-gums', label: 'Pale or blue gums', emoji: '😶', emergency: true },
  { id: 'collapse-or-seizure', label: 'Collapse or seizure', emoji: '⚡', emergency: true },
  { id: 'bloated-abdomen', label: 'Swollen, hard belly', emoji: '🎈', emergency: true },
  { id: 'trembling', label: 'Trembling / shaking', emoji: '🥶' },
];

export const CONDITIONS: Condition[] = [
  { id: 'gastro', name: 'Digestive upset (gastroenteritis)', species: 'both', urgency: 'moderate',
    symptoms: ['vomiting', 'diarrhea', 'loss-of-appetite', 'lethargy'],
    advice: 'Often mild. Offer water, consider a brief bland diet. See a vet if it lasts over 24 hours, worsens, or there is blood.' },
  { id: 'dental', name: 'Dental disease', species: 'both', urgency: 'low',
    symptoms: ['bad-breath', 'drooling', 'loss-of-appetite'],
    advice: 'Very common and treatable. Book a dental check-up — untreated dental disease is painful and affects overall health.' },
  { id: 'ear-infection', name: 'Ear infection', species: 'both', urgency: 'moderate',
    symptoms: ['head-shaking', 'itching'],
    advice: 'Have the ears examined. Never insert cotton buds — most ear infections need vet-prescribed treatment.' },
  { id: 'skin-allergy', name: 'Skin allergy / dermatitis', species: 'both', urgency: 'moderate',
    symptoms: ['itching', 'hair-loss'],
    advice: 'Could be allergies, fleas or mites. A vet can pinpoint the cause and relieve the itching.' },
  { id: 'kidney', name: 'Kidney problems', species: 'both', urgency: 'high',
    symptoms: ['excessive-thirst', 'frequent-urination', 'weight-loss', 'vomiting', 'lethargy'],
    advice: 'Increased thirst and urination with weight loss needs prompt vet blood/urine testing.' },
  { id: 'diabetes', name: 'Diabetes', species: 'both', urgency: 'high',
    symptoms: ['excessive-thirst', 'frequent-urination', 'weight-loss'],
    advice: 'Excessive thirst, urination and weight loss can signal diabetes. See a vet soon for testing.' },
  { id: 'respiratory', name: 'Respiratory infection', species: 'both', urgency: 'moderate',
    symptoms: ['coughing', 'sneezing', 'nasal-discharge', 'lethargy', 'loss-of-appetite'],
    advice: 'Such as kennel cough or cat flu. See a vet promptly if breathing is laboured or it persists.' },
  { id: 'bloat', name: 'Bloat / GDV — life-threatening', species: 'dog', urgency: 'emergency',
    symptoms: ['bloated-abdomen', 'drooling', 'trembling', 'difficulty-breathing'],
    advice: 'A swollen, hard belly with unproductive retching is a life-threatening emergency in dogs. Go to a vet IMMEDIATELY.' },
  { id: 'parasites', name: 'Parasites (worms or fleas)', species: 'both', urgency: 'low',
    symptoms: ['itching', 'weight-loss', 'diarrhea'],
    advice: 'Check for fleas and worms. Routine deworming and flea control usually resolve it; ask your vet about a schedule.' },
  { id: 'arthritis', name: 'Joint pain / arthritis', species: 'both', urgency: 'low',
    symptoms: ['limping', 'lethargy'],
    advice: 'Common in older pets. A vet can confirm and provide pain relief and joint support.' },
  { id: 'eye', name: 'Eye infection / conjunctivitis', species: 'both', urgency: 'moderate',
    symptoms: ['eye-discharge'],
    advice: 'Never use human eye drops. Have the eye examined to protect your pet’s vision.' },
  { id: 'poisoning', name: 'Possible poisoning / toxin', species: 'both', urgency: 'emergency',
    symptoms: ['vomiting', 'drooling', 'trembling', 'collapse-or-seizure', 'pale-gums'],
    advice: 'Suspected poisoning is an emergency. Call a vet or pet poison line NOW with details of what was eaten.' },
  { id: 'urinary-blockage', name: 'Urinary blockage (FLUTD)', species: 'cat', urgency: 'emergency',
    symptoms: ['straining-to-urinate', 'frequent-urination', 'blood-in-stool-urine'],
    advice: 'Straining to urinate — especially in male cats — can be a fatal blockage. Seek EMERGENCY care immediately.' },
];
