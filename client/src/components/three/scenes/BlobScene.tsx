import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, type ElementRef } from 'react';
import * as THREE from 'three';
import { Glow } from '../Glow';
import { StudioEnvironment } from '../StudioEnvironment';
import { PALETTE, type SceneProps } from '../types';

type DistortMaterial = ElementRef<typeof MeshDistortMaterial>;

/** A liquid shape that keeps morphing and shifting colour — clay → sky → violet and back. */
export default function BlobScene({ inputs, quality, reducedMotion }: SceneProps) {
  const { viewport } = useThree();
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<DistortMaterial>(null);
  const halo = useRef<THREE.Sprite>(null);
  const colors = useMemo(
    () => [PALETTE.clay, PALETTE.sky, PALETTE.violet].map((c) => new THREE.Color(c)),
    [],
  );
  const tmp = useMemo(() => new THREE.Color(), []);
  const radius = Math.min(viewport.width, viewport.height) * 0.25;

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const k = 1 - Math.exp(-delta * 2.5);

    if (material.current) {
      // Evolve: breathe the distortion and walk the colour around the palette.
      material.current.distort = 0.38 + Math.sin(t * 0.45) * 0.14;
      const phase = (t * 0.08) % colors.length;
      const from = colors[Math.floor(phase)]!;
      const to = colors[(Math.floor(phase) + 1) % colors.length]!;
      tmp.copy(from).lerp(to, THREE.MathUtils.smoothstep(phase % 1, 0, 1));
      material.current.color.copy(tmp);
      (halo.current?.material as THREE.SpriteMaterial | undefined)?.color.copy(tmp);
    }
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.12;
      const target = 1 + inputs.scroll.progress * 0.25;
      mesh.current.scale.setScalar(mesh.current.scale.x + (target - mesh.current.scale.x) * k);
      mesh.current.position.x += (inputs.pointer.x * 0.35 - mesh.current.position.x) * k;
      mesh.current.position.y += (inputs.pointer.y * 0.25 - mesh.current.position.y) * k;
    }
  });

  return (
    <>
      <StudioEnvironment />
      <ambientLight intensity={0.9} />
      <hemisphereLight args={[PALETTE.ivory, PALETTE.navy, 0.8]} />
      <directionalLight position={[3, 4, 5]} intensity={2} color="#fff1e6" />
      <directionalLight position={[-4, -3, 2]} intensity={1.1} color={PALETTE.sky} />
      <pointLight position={[0, 0, 3]} intensity={8} distance={8} color={PALETTE.clay} />
      {/* Rim lights behind the blob, so its silhouette glows instead of going dark. */}
      <pointLight position={[2.5, 1.5, -3]} intensity={30} distance={10} color={PALETTE.sky} />
      <pointLight position={[-2.5, -1, -3]} intensity={24} distance={10} color={PALETTE.violet} />

      <Float
        speed={reducedMotion ? 0 : 1.2}
        rotationIntensity={reducedMotion ? 0 : 0.5}
        floatIntensity={reducedMotion ? 0 : 0.8}
      >
        {/* Sits behind the cards (lower half) so headings stay readable. */}
        <group scale={radius} position={[0, -viewport.height * 0.1, -1]}>
          <Glow ref={halo} color={PALETTE.clay} scale={3.4} opacity={0.35} />
          <mesh ref={mesh}>
            <icosahedronGeometry args={[1, quality === 'high' ? 48 : 24]} />
            <MeshDistortMaterial
              ref={material}
              color={PALETTE.clay}
              roughness={0.3}
              metalness={0.2}
              clearcoat={1}
              clearcoatRoughness={0.25}
              distort={0.4}
              speed={reducedMotion ? 0 : 1.4}
            />
          </mesh>
        </group>
      </Float>
    </>
  );
}
