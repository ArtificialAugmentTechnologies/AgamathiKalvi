import { forwardRef, useMemo } from 'react';
import * as THREE from 'three';

let texture: THREE.CanvasTexture | undefined;

/** Soft radial gradient texture, generated once and shared by every glow sprite. */
function glowTexture() {
  if (texture) return texture;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.45)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  texture = new THREE.CanvasTexture(canvas);
  return texture;
}

type GlowProps = {
  color: string;
  scale?: number;
  opacity?: number;
  position?: [number, number, number];
};

/** Cheap additive "bloom" halo — avoids a full post-processing pass on mobile GPUs. */
export const Glow = forwardRef<THREE.Sprite, GlowProps>(function Glow(
  { color, scale = 3, opacity = 0.5, position },
  ref,
) {
  const map = useMemo(glowTexture, []);
  return (
    <sprite ref={ref} scale={scale} position={position}>
      <spriteMaterial
        map={map}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </sprite>
  );
});
