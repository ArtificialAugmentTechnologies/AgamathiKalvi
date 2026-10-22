import { useReducedMotion } from 'framer-motion';
import { useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  /** Rounded corners of the card, so the shine is clipped to match. */
  radius?: string;
};

const supportsHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * CSS-3D tilt with a moving light shine. Mouse only; touch screens and reduced motion get a flat card.
 * Children can use `[transform:translateZ(..)]` to float above the surface.
 */
export function TiltCard({ children, className, max = 9, radius = 'rounded-3xl' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const reduced = useReducedMotion();
  const [enabled] = useState(supportsHover);
  const active = enabled && !reduced;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!active || e.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--rx', `${(0.5 - py) * max}deg`);
      el.style.setProperty('--ry', `${(px - 0.5) * max}deg`);
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    ref.current?.style.setProperty('--rx', '0deg');
    ref.current?.style.setProperty('--ry', '0deg');
  };

  return (
    <div className={cn('group/tilt h-full [perspective:1000px]', className)}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={cn(
          'relative h-full [transform-style:preserve-3d]',
          active &&
            'transition-transform duration-300 ease-out [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] will-change-transform',
        )}
      >
        {children}
        {active && (
          <div
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100',
              radius,
            )}
            style={{
              background:
                'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(255 255 255 / 0.13), transparent 45%)',
            }}
          />
        )}
      </div>
    </div>
  );
}
