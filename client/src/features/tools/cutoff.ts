/** TNEA engineering cutoff out of 200: Maths + Physics/2 + Chemistry/2 (marks out of 100). */
export function computeTneaCutoff(maths: number, physics: number, chemistry: number): number {
  return round2(maths + physics / 2 + chemistry / 2);
}

export const isValidMark = (n: number) => Number.isFinite(n) && n >= 0 && n <= 100;

const round2 = (n: number) => Math.round(n * 100) / 100;
