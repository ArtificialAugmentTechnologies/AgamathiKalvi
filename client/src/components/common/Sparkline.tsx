type Point = { year: number; closingCutoff: number };

type Props = { points: Point[]; label: string; className?: string };

/** Tiny line chart of closing cutoffs by year, with the latest point highlighted. */
export function Sparkline({ points, label, className }: Props) {
  if (points.length < 2) return null;
  const W = 96;
  const H = 32;
  const pad = 4;
  const values = points.map((p) => p.closingCutoff);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const xy = points.map((p, i) => ({
    x: pad + (i * (W - pad * 2)) / (points.length - 1),
    y: H - pad - ((p.closingCutoff - min) / span) * (H - pad * 2),
    ...p,
  }));
  const last = xy[xy.length - 1]!;
  const summary = points.map((p) => `${p.year}: ${p.closingCutoff}`).join(', ');

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      className={className}
      role="img"
      aria-label={`${label}: ${summary}`}
    >
      <title>{`${label}: ${summary}`}</title>
      <polyline
        points={xy.map((p) => `${p.x},${p.y}`).join(' ')}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.6}
      />
      {xy.map((p) => (
        <circle key={p.year} cx={p.x} cy={p.y} r={p === last ? 3.5 : 2} fill="currentColor" />
      ))}
    </svg>
  );
}
