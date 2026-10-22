import { Float } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Glow } from '../Glow';
import { StudioEnvironment } from '../StudioEnvironment';
import { PALETTE, type SceneProps } from '../types';

type Kind = 'icosa' | 'knot' | 'octa' | 'torus' | 'dodeca';

// x/y as fractions of the visible area — kept to the edges so the cards stay readable.
const SHAPES: { kind: Kind; x: number; y: number; z: number; size: number; hue: number }[] = [
  { kind: 'knot', x: 0.4, y: 0.36, z: -1, size: 0.42, hue: 1 },
  { kind: 'icosa', x: 0.17, y: 0.43, z: -2, size: 0.32, hue: 0 },
  { kind: 'octa', x: 0.45, y: -0.08, z: -1.5, size: 0.38, hue: 2 },
  { kind: 'torus', x: -0.45, y: -0.4, z: -1, size: 0.4, hue: 3 },
  { kind: 'dodeca', x: 0.3, y: -0.42, z: -0.5, size: 0.3, hue: 0 },
  { kind: 'icosa', x: -0.2, y: -0.46, z: -2.5, size: 0.22, hue: 1 },
];

const HUES = [PALETTE.clay, PALETTE.sky, PALETTE.ivory, PALETTE.yellow, PALETTE.violet];

/** Faceted gems, rings and knots drifting behind the tools section, slowly changing colour. */
export default function ShapesScene({ inputs, quality, reducedMotion }: SceneProps) {
  const { viewport } = useThree();
  const rig = useRef<THREE.Group>(null);
  const unit = Math.min(viewport.width, viewport.height);
  const narrow = viewport.width / viewport.height < 0.8;

  useFrame((_, delta) => {
    const k = 1 - Math.exp(-delta * 2.5);
    if (!rig.current) return;
    rig.current.rotation.y += (inputs.pointer.x * 0.15 - rig.current.rotation.y) * k;
    rig.current.rotation.x += (-inputs.pointer.y * 0.1 - rig.current.rotation.x) * k;
    rig.current.position.y += (inputs.scroll.progress * 1.2 - rig.current.position.y) * k;
  });

  return (
    <>
      <StudioEnvironment />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color="#fff1e6" />
      <directionalLight position={[-5, -3, 2]} intensity={1.2} color={PALETTE.sky} />
      <group ref={rig}>
        {SHAPES.map((s, i) => (
          <Float
            key={i}
            speed={reducedMotion ? 0 : 1 + i * 0.15}
            rotationIntensity={reducedMotion ? 0 : 1.2}
            floatIntensity={reducedMotion ? 0 : 1.4}
          >
            <Shape
              {...s}
              // On narrow screens pin every shape to the left/right edge, clear of text.
              position={[
                (narrow ? Math.sign(s.x) * 0.46 : s.x) * viewport.width,
                s.y * viewport.height,
                s.z,
              ]}
              scale={s.size * unit * 0.27}
              detail={quality === 'high' ? 1 : 0}
              spin={!reducedMotion}
            />
          </Float>
        ))}
      </group>
    </>
  );
}

function Shape({
  kind,
  hue,
  position,
  scale,
  detail,
  spin,
}: {
  kind: Kind;
  hue: number;
  position: [number, number, number];
  scale: number;
  detail: number;
  spin: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshPhysicalMaterial>(null);
  const palette = useMemo(() => HUES.map((c) => new THREE.Color(c)), []);
  const offset = useMemo(() => Math.random() * 10, []);

  useFrame(({ clock }, delta) => {
    if (spin && mesh.current) {
      mesh.current.rotation.x += delta * 0.2;
      mesh.current.rotation.y += delta * 0.28;
    }
    if (material.current) {
      // Slowly evolve through the palette, each shape out of phase with the others.
      const phase = ((clock.elapsedTime + offset) * 0.05 + hue) % palette.length;
      const a = palette[Math.floor(phase)]!;
      const b = palette[(Math.floor(phase) + 1) % palette.length]!;
      material.current.color.copy(a).lerp(b, phase % 1);
    }
  });

  const geometry = {
    icosa: <icosahedronGeometry args={[1, detail]} />,
    knot: <torusKnotGeometry args={[0.7, 0.24, 120, 16]} />,
    octa: <octahedronGeometry args={[1, 0]} />,
    torus: <torusGeometry args={[0.8, 0.28, 24, 64]} />,
    dodeca: <dodecahedronGeometry args={[1, 0]} />,
  }[kind];

  return (
    <group position={position} scale={scale}>
      <Glow color={HUES[hue]!} scale={3} opacity={0.22} />
      <mesh ref={mesh}>
        {geometry}
        <meshPhysicalMaterial
          ref={material}
          color={HUES[hue]}
          roughness={0.22}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.2}
          flatShading={kind !== 'knot' && kind !== 'torus'}
        />
      </mesh>
    </group>
  );
}
