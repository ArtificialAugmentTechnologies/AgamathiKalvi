import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
  lazy,
  Suspense,
  useMemo,
  useState,
  type ComponentType,
  type LazyExoticComponent,
} from 'react';
import { isCoarsePointer } from './capability';
import type { Quality, SceneLoader, SceneProps, StageInputs } from './types';

type Props = {
  scene: SceneLoader;
  inputs: StageInputs;
  active: boolean;
  reducedMotion: boolean;
  onReady: () => void;
};

// One lazy component per scene module, so re-renders never re-trigger the import.
const sceneCache = new WeakMap<SceneLoader, LazyExoticComponent<ComponentType<SceneProps>>>();
const lazyScene = (loader: SceneLoader) => {
  let c = sceneCache.get(loader);
  if (!c) {
    c = lazy(loader);
    sceneCache.set(loader, c);
  }
  return c;
};

export default function ThreeCanvas({ scene, inputs, active, reducedMotion, onReady }: Props) {
  const Scene = useMemo(() => lazyScene(scene), [scene]);
  // Phones start on the light profile; desktops drop to it if frame rate suffers.
  const [quality, setQuality] = useState<Quality>(() => (isCoarsePointer() ? 'low' : 'high'));
  const maxDpr = quality === 'high' ? 1.75 : 1.25;

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, maxDpr]}
      camera={{ position: [0, 0, 8], fov: 40, near: 0.1, far: 60 }}
      gl={{ alpha: true, antialias: quality === 'high', powerPreference: 'high-performance' }}
      // Paused off-screen; reduced motion renders on demand (a single still frame).
      frameloop={active && !reducedMotion ? 'always' : 'demand'}
      onCreated={() => requestAnimationFrame(onReady)}
    >
      <PerformanceMonitor onDecline={() => setQuality('low')} flipflops={2} />
      <AdaptiveDpr pixelated={false} />
      <Suspense fallback={null}>
        <Scene inputs={inputs} quality={quality} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}
