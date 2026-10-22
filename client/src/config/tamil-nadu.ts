// Mirrors server/src/lib/tamil-nadu.ts — keep the two lists in sync.
export const TN_DISTRICTS = [
  'Ariyalur',
  'Chengalpattu',
  'Chennai',
  'Coimbatore',
  'Cuddalore',
  'Dharmapuri',
  'Dindigul',
  'Erode',
  'Kallakurichi',
  'Kancheepuram',
  'Kanniyakumari',
  'Karur',
  'Krishnagiri',
  'Madurai',
  'Mayiladuthurai',
  'Nagapattinam',
  'Namakkal',
  'Nilgiris',
  'Perambalur',
  'Pudukkottai',
  'Ramanathapuram',
  'Ranipet',
  'Salem',
  'Sivaganga',
  'Tenkasi',
  'Thanjavur',
  'Theni',
  'Thoothukudi',
  'Tiruchirappalli',
  'Tirunelveli',
  'Tirupathur',
  'Tiruppur',
  'Tiruvallur',
  'Tiruvannamalai',
  'Tiruvarur',
  'Vellore',
  'Viluppuram',
  'Virudhunagar',
] as const;

export const OUTSIDE_TN = 'Outside Tamil Nadu';
export const DISTRICT_OPTIONS = [...TN_DISTRICTS, OUTSIDE_TN] as const;
export type District = (typeof DISTRICT_OPTIONS)[number];

export const CLASS_OPTIONS = [
  'class9',
  'class10',
  'class11',
  'class12',
  'college',
  'parent',
] as const;
export type ClassOption = (typeof CLASS_OPTIONS)[number];

export const INTEREST_OPTIONS = [
  'engineering',
  'medicine',
  'artsScience',
  'commerce',
  'law',
  'abroad',
  'notSure',
] as const;
export type InterestOption = (typeof INTEREST_OPTIONS)[number];
