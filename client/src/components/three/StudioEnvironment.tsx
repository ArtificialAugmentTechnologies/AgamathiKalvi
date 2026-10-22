import { Environment, Lightformer } from '@react-three/drei';
import { PALETTE } from './types';

/**
 * Reflections for glossy materials, generated in-scene from light panels — no HDR download.
 * Rendered once (frames=1) at low resolution, so it costs almost nothing per frame.
 * Without it, clearcoat surfaces reflect an empty (black) world and grow dark rims.
 */
export function StudioEnvironment() {
  return (
    <Environment frames={1} resolution={64}>
      <Lightformer
        form="rect"
        intensity={2}
        color={PALETTE.ivory}
        position={[0, 4, 3]}
        scale={[8, 3, 1]}
      />
      <Lightformer
        form="rect"
        intensity={1.6}
        color={PALETTE.sky}
        position={[-5, 0, 1]}
        rotation-y={Math.PI / 2}
        scale={[6, 4, 1]}
      />
      <Lightformer
        form="rect"
        intensity={1.4}
        color={PALETTE.clay}
        position={[5, -1, 1]}
        rotation-y={-Math.PI / 2}
        scale={[6, 4, 1]}
      />
      <Lightformer
        form="ring"
        intensity={1}
        color={PALETTE.violet}
        position={[0, -3, -4]}
        scale={3}
      />
    </Environment>
  );
}
