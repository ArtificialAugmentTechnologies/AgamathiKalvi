export const COMMUNITIES = ['OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST'] as const;
export type Community = (typeof COMMUNITIES)[number];

export type Chance = 'safe' | 'moderate' | 'dream';

export type BranchRef = {
  code: string;
  name: string;
  nameTa: string | null;
  nameHi: string | null;
};

export type CollegeRef = {
  id: string;
  name: string;
  shortName: string | null;
  district: string;
  type: string;
  website: string | null;
  isSample: boolean;
};

export type CollegeOption = { id: string; college: CollegeRef; branch: BranchRef };

export type Prediction = CollegeOption & {
  history: { year: number; closingCutoff: number }[];
  closingCutoff: number;
  year: number;
  margin: number;
  chance: Chance;
};

export type PredictResponse = {
  input: { cutoff: number; community: Community; branches: string[]; districts: string[] };
  isSample: boolean;
  groups: Record<Chance, Prediction[]>;
  districtCounts: Record<string, number>;
};

export type Scholarship = {
  id: string;
  slug: string;
  name: string;
  nameTa: string | null;
  nameHi: string | null;
  provider: string;
  description: string;
  amount: string;
  classLevels: string[];
  communities: string[];
  incomeMax: number | null;
  gender: 'female' | 'male' | 'any';
  streams: string[];
  link: string | null;
  isSample: boolean;
};

export type QuizQuestion = {
  id: string;
  text: string;
  textTa: string | null;
  textHi: string | null;
  options: { label: string; labelTa?: string; labelHi?: string }[];
};

export type ClusterScore = { cluster: string; score: number; percent: number };
