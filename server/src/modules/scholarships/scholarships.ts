// Pure eligibility matching for the scholarship finder.

export type ScholarshipCriteria = {
  classLevel?: string;
  community?: string;
  income?: number;
  gender?: 'female' | 'male';
  stream?: string;
};

export type ScholarshipRules = {
  classLevels: unknown;
  communities: unknown;
  incomeMax: number | null;
  gender: 'female' | 'male' | 'any';
  streams: unknown;
};

const list = (v: unknown): string[] => (Array.isArray(v) ? v.map(String) : []);

/** An empty list on the scholarship means "open to everyone" for that criterion. */
export function isEligible(s: ScholarshipRules, c: ScholarshipCriteria): boolean {
  const classes = list(s.classLevels);
  const communities = list(s.communities);
  const streams = list(s.streams);

  if (c.classLevel && classes.length && !classes.includes(c.classLevel)) return false;
  if (c.community && communities.length && !communities.includes(c.community)) return false;
  if (c.income !== undefined && s.incomeMax !== null && c.income > s.incomeMax) return false;
  if (c.gender && s.gender !== 'any' && s.gender !== c.gender) return false;
  if (c.stream && streams.length && !streams.includes(c.stream)) return false;
  return true;
}
