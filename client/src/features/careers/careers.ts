import type { InterestOption } from '@/config/tamil-nadu';

/** Maps a career's quiz cluster to the booking dialog's "area of interest". */
const CLUSTER_TO_INTEREST: Record<string, InterestOption> = {
  technology: 'engineering',
  healthcare: 'medicine',
  agriculture: 'artsScience',
  finance: 'commerce',
  'law-public': 'law',
  creative: 'artsScience',
  hospitality: 'notSure',
};

export const interestForCluster = (cluster: string): InterestOption =>
  CLUSTER_TO_INTEREST[cluster] ?? 'notSure';
