import type { ComponentType } from 'react';

/** Live inputs shared with a scene. Mutated in place by the host — read them inside useFrame. */
export type StageInputs = {
  /** -1..1 on both axes; mouse on desktop, device tilt on phones. */
  pointer: { x: number; y: number };
  /** 0 when the host's top is at the viewport top, 1 once it has scrolled fully past. */
  scroll: { progress: number };
};

export type Quality = 'high' | 'low';

export type SceneProps = {
  inputs: StageInputs;
  quality: Quality;
  reducedMotion: boolean;
};

export type SceneModule = { default: ComponentType<SceneProps> };
export type SceneLoader = () => Promise<SceneModule>;

export const PALETTE = {
  clay: '#e08a68',
  clayDeep: '#b5532f',
  sky: '#6ea8ff',
  ivory: '#f3eee3',
  navy: '#13213f',
  yellow: '#ffd800',
  violet: '#9d8cff',
} as const;
