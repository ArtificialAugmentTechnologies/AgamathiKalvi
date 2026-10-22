import { useReducedMotion } from 'framer-motion';
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { canUse3D, isCoarsePointer } from './capability';
import type { SceneLoader, StageInputs } from './types';

// The WebGL canvas (three.js + R3F) is its own chunk, fetched only when a scene first mounts.
const ThreeCanvas = lazy(() => import('./ThreeCanvas'));

type Props = {
  scene: SceneLoader;
  className?: string;
  /** Static stand-in shown until (or instead of) the 3D scene. */
  fallback?: ReactNode;
  /** Wait this long after first becoming visible before mounting (keeps hero text/LCP first). */
  delayMs?: number;
};

/**
 * Decorative 3D layer. Mounts lazily when near the viewport, pauses when off-screen or the tab
 * is hidden, and renders a single still frame for reduced-motion users. Never blocks content.
 */
export function ThreeStage({ scene, className, fallback, delayMs = 0 }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const inputs = useRef<StageInputs>({ pointer: { x: 0, y: 0 }, scroll: { progress: 0 } });
  const [capable] = useState(canUse3D);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const reducedMotion = Boolean(useReducedMotion());

  // Visibility: mount on first approach, then just pause/resume.
  useEffect(() => {
    const el = host.current;
    if (!el || !capable) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        setInView(visible);
        if (visible && !timer) timer = window.setTimeout(() => setMounted(true), delayMs);
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [capable, delayMs]);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Inputs: pointer / device tilt and scroll progress, written into a ref (no re-renders).
  useEffect(() => {
    if (!mounted || reducedMotion) return;
    const p = inputs.current.pointer;
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      p.x = (e.clientX / window.innerWidth) * 2 - 1;
      p.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      p.x = clamp(e.gamma / 25);
      p.y = clamp((45 - e.beta) / 25); // phones are usually held ~45° upright
    };
    const onScroll = () => {
      const r = host.current?.getBoundingClientRect();
      if (r)
        inputs.current.scroll.progress = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height)));
    };

    onScroll();
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    if (isCoarsePointer()) window.addEventListener('deviceorientation', onTilt, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('deviceorientation', onTilt);
    };
  }, [mounted, reducedMotion]);

  return (
    <div ref={host} aria-hidden className={cn('pointer-events-none', className)}>
      {fallback && (
        <div
          className={cn('absolute inset-0 transition-opacity duration-1000', ready && 'opacity-0')}
        >
          {fallback}
        </div>
      )}
      {capable && mounted && (
        <Suspense fallback={null}>
          <div
            className={cn(
              'absolute inset-0 opacity-0 transition-opacity duration-1000',
              ready && 'opacity-100',
            )}
          >
            <ThreeCanvas
              scene={scene}
              inputs={inputs.current}
              active={inView && tabVisible}
              reducedMotion={reducedMotion}
              onReady={() => setReady(true)}
            />
          </div>
        </Suspense>
      )}
    </div>
  );
}
