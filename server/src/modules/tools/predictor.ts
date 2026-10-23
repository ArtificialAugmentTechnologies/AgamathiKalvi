// Pure prediction logic — kept free of Prisma so it is easy to unit-test.

export type Chance = 'safe' | 'moderate' | 'dream';

/** Cutoff margins (student cutoff − last year's closing cutoff) that separate the groups. */
export const BANDS = { safe: 1.5, dreamFloor: -5 } as const;

export function classify(margin: number): Chance | null {
  if (margin >= BANDS.safe) return 'safe';
  if (margin >= -BANDS.safe) return 'moderate';
  if (margin >= BANDS.dreamFloor) return 'dream';
  return null; // too far below last year's closing cutoff to be realistic
}

export type HistoryRow = { year: number; closingCutoff: number };

export type Candidate<T> = T & { history: HistoryRow[] };

export type Prediction<T> = T & {
  history: HistoryRow[];
  closingCutoff: number;
  year: number;
  margin: number;
  chance: Chance;
};

/**
 * Classifies each college-branch by comparing the student's cutoff with the most recent
 * closing cutoff for their community. Groups are sorted strongest college first.
 */
export function predict<T>(cutoff: number, candidates: Candidate<T>[], perGroup = 40) {
  const groups: Record<Chance, Prediction<T>[]> = { safe: [], moderate: [], dream: [] };

  for (const c of candidates) {
    if (!c.history.length) continue;
    const history = [...c.history].sort((a, b) => a.year - b.year);
    const latest = history[history.length - 1]!;
    const margin = Math.round((cutoff - latest.closingCutoff) * 100) / 100;
    const chance = classify(margin);
    if (!chance) continue;
    groups[chance].push({
      ...c,
      history,
      closingCutoff: latest.closingCutoff,
      year: latest.year,
      margin,
      chance,
    });
  }

  for (const key of Object.keys(groups) as Chance[]) {
    groups[key].sort((a, b) => b.closingCutoff - a.closingCutoff);
    groups[key] = groups[key].slice(0, perGroup);
  }
  return groups;
}
