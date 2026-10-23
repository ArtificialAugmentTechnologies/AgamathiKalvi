import { motion } from 'framer-motion';
import { HEADER_ART, type HeaderArtKey } from '@/config/headerArt';
import { cn } from '@/lib/utils';

// Where the four orbit icons sit on the ring (degrees, clockwise from the top).
const ANGLES = [-20, 70, 160, 250];
// A few twinkling dots around the orb (percent positions).
const SPARKS = [
  { top: '8%', left: '22%', delay: '0s' },
  { top: '18%', left: '84%', delay: '1.2s' },
  { top: '72%', left: '92%', delay: '2.1s' },
  { top: '88%', left: '30%', delay: '0.6s' },
  { top: '46%', left: '4%', delay: '1.7s' },
];

/**
 * Decorative topic illustration for page headers — glowing orb, spinning gradient ring and
 * orbiting topic icons. Pure CSS/SVG (no images), hidden from screen readers.
 */
export function HeaderArt({ art, className }: { art: HeaderArtKey; className?: string }) {
  const { icon: Icon, orbit } = HEADER_ART[art];

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'pointer-events-none relative mx-auto aspect-square w-full max-w-[22rem] select-none',
        className,
      )}
    >
      {/* Soft glow */}
      <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-primary/35 via-sky/20 to-transparent blur-3xl" />

      {/* Orbit track, rotating slowly; icons counter-rotate so they stay upright. */}
      <div className="absolute inset-[4%] rounded-full border border-dashed border-foreground/15 motion-safe:animate-[orbit_48s_linear_infinite]">
        {orbit.map((OrbitIcon, i) => {
          const a = ((ANGLES[i] ?? 0) * Math.PI) / 180;
          return (
            <div
              key={i}
              className="absolute size-14 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + 50 * Math.sin(a)}%`, top: `${50 - 50 * Math.cos(a)}%` }}
            >
              <div className="grid size-full place-items-center rounded-2xl border border-white/10 bg-card/70 text-primary shadow-xl shadow-black/25 backdrop-blur-md motion-safe:animate-[orbit_48s_linear_infinite_reverse]">
                <OrbitIcon className="size-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Inner ring with a slowly spinning conic gradient */}
      <div className="absolute inset-[24%] rounded-full bg-[conic-gradient(from_0deg,var(--primary),var(--sky),#f2b48f,var(--primary))] p-[2px] opacity-90 motion-safe:animate-[orbit_14s_linear_infinite]">
        <div className="size-full rounded-full bg-background/85 backdrop-blur" />
      </div>

      {/* The orb with the page's main icon, gently bobbing */}
      <div className="absolute inset-[31%] motion-safe:animate-[float_6s_ease-in-out_infinite]">
        <div className="grid size-full place-items-center rounded-full bg-gradient-to-br from-primary to-[#f2b48f] text-primary-foreground shadow-[0_20px_60px_-15px] shadow-primary/60">
          <Icon className="size-[42%]" strokeWidth={1.6} />
        </div>
      </div>

      {SPARKS.map((s, i) => (
        <span
          key={i}
          className={cn(
            'absolute size-1.5 rounded-full motion-safe:animate-[twinkle_3.2s_ease-in-out_infinite]',
            i % 2 ? 'bg-sky' : 'bg-brand-yellow',
          )}
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        />
      ))}
    </motion.div>
  );
}
