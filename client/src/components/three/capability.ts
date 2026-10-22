type NavigatorExtras = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

let cached: boolean | undefined;

/**
 * Decides whether this device should get live WebGL scenes.
 * Low-end hardware, data-saver mode and missing WebGL all fall back to the static design.
 */
export function canUse3D(): boolean {
  if (cached !== undefined) return cached;
  cached = detect();
  return cached;
}

function detect(): boolean {
  try {
    const nav = navigator as NavigatorExtras;
    if (nav.connection?.saveData) return false;
    if ((nav.hardwareConcurrency ?? 4) < 4) return false;
    if (nav.deviceMemory !== undefined && nav.deviceMemory < 3) return false;

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!gl) return false;
    // Release the probe context straight away so it doesn't count against the browser limit.
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export const isCoarsePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
