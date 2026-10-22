/** Indian short money format: 350000 → "3.5 L", 2500000 → "25 L", 12000000 → "1.2 Cr". */
export function formatInrShort(amount: number): string {
  const trim = (n: number) => String(Number(n.toFixed(1)));
  if (amount >= 1_00_00_000) return `${trim(amount / 1_00_00_000)} Cr`;
  if (amount >= 1_00_000) return `${trim(amount / 1_00_000)} L`;
  return amount.toLocaleString('en-IN');
}

export function formatDate(iso: string, language: string): string {
  return new Date(iso).toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Picks the Tamil field when the UI is in Tamil and a translation exists. */
export const localized = (isTamil: boolean, en: string, ta?: string | null) =>
  (isTamil && ta) || en;
