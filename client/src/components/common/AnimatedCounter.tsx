import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Props = { value: number; suffix?: string; display?: string; durationMs?: number };

/** Counts up from 0 when first scrolled into view. `display` (e.g. "1 Lakh+") is shown at the end. */
export function AnimatedCounter({ value, suffix = '', display, durationMs = 1600 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(reduceMotion ? value : 0);
  const [done, setDone] = useState(Boolean(reduceMotion));

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCurrent(Math.round(v)),
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, durationMs]);

  const text = done && display ? display : `${current.toLocaleString('en-IN')}${suffix}`;

  return (
    <span ref={ref} className="tabular-nums">
      {/* Screen readers get the final value straight away, not every animation frame. */}
      <span aria-hidden>{text}</span>
      <span className="sr-only">{display ?? `${value}${suffix}`}</span>
    </span>
  );
}
