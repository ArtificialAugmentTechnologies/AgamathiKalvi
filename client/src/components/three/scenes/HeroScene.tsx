import { Edges, Float, Sparkles } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Glow } from '../Glow';
import { PALETTE, type SceneProps } from '../types';

type Vec3 = [number, number, number];

/** Graduation cap, open book and glowing globe orbiting the hero. */
export default function HeroScene({ inputs, quality, reducedMotion }: SceneProps) {
  const { viewport, size } = useThree();
  const rig = useRef<THREE.Group>(null);
  const items = useRef<(THREE.Group | null)[]>([]);
  const compact = size.width < 1024;

  // Positions are fractions of the visible area so the layout tracks the screen shape.
  // Desktop: centred in the right half of the hero. Phones: tucked into the corners.
  const layout = useMemo(() => {
    const { width: w, height: h } = viewport;
    const scale = compact ? Math.min(0.62, w / 5.5) : Math.min(1, w / 10);
    const positions: Vec3[] = compact
      ? [
          [w * 0.36, h * 0.4, -1.5],
          [-w * 0.44, h * 0.37, -2],
          [w * 0.34, -h * 0.05, -2],
        ]
      : [
          [w * 0.25, h * 0.04, -0.8],
          [w * 0.1, h * 0.31, 0.5],
          [w * 0.29, -h * 0.27, 0.6],
        ];
    return { scale, positions };
  }, [viewport, compact]);

  useFrame((state, delta) => {
    const k = 1 - Math.exp(-delta * 3); // frame-rate independent smoothing
    const { pointer, scroll } = inputs;
    const s = reducedMotion ? 0 : scroll.progress;

    if (rig.current) {
      rig.current.rotation.y += (pointer.x * 0.18 - rig.current.rotation.y) * k;
      rig.current.rotation.x += (-pointer.y * 0.1 - rig.current.rotation.x) * k;
    }
    // Scrolling down flies the camera forward while the objects drift apart.
    state.camera.position.z += (8 - s * 2.6 - state.camera.position.z) * k;
    state.camera.position.x += (pointer.x * 0.25 - state.camera.position.x) * k;
    items.current.forEach((g, i) => {
      const base = layout.positions[i];
      if (!g || !base) return;
      const spread = 1 + s * 0.9;
      g.position.set(base[0] * spread, base[1] * spread + s * (i - 1) * 0.6, base[2] + s * 1.5);
    });
  });

  const float = reducedMotion
    ? { speed: 0, rotationIntensity: 0, floatIntensity: 0 }
    : { speed: 1.4, rotationIntensity: 0.5, floatIntensity: 0.9 };

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 6]} intensity={1.8} color="#fff1e6" />
      <directionalLight position={[-6, -2, 3]} intensity={0.9} color={PALETTE.sky} />

      <group ref={rig}>
        <group
          ref={(g) => void (items.current[0] = g)}
          scale={layout.scale * (compact ? 1.1 : 1.2)}
        >
          <Float {...float}>
            <Globe spin={!reducedMotion} />
          </Float>
        </group>
        <group
          ref={(g) => void (items.current[1] = g)}
          scale={layout.scale * (compact ? 0.7 : 0.7)}
        >
          <Float {...float} speed={float.speed * 1.2}>
            <GradCap />
          </Float>
        </group>
        <group
          ref={(g) => void (items.current[2] = g)}
          scale={layout.scale * (compact ? 0.8 : 0.6)}
        >
          <Float {...float} speed={float.speed * 0.9}>
            <OpenBook />
          </Float>
        </group>
      </group>

      <Sparkles
        count={quality === 'high' ? 90 : 40}
        scale={[viewport.width, viewport.height, 5]}
        size={quality === 'high' ? 2.4 : 3}
        speed={reducedMotion ? 0 : 0.25}
        opacity={0.55}
        color={PALETTE.ivory}
      />
      <Sparkles
        count={quality === 'high' ? 30 : 14}
        scale={[viewport.width * 0.8, viewport.height * 0.8, 4]}
        size={4}
        speed={reducedMotion ? 0 : 0.35}
        opacity={0.7}
        color={PALETTE.clay}
      />
    </>
  );
}

function Globe({ spin }: { spin: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (spin && ref.current) ref.current.rotation.y += delta * 0.18;
  });
  return (
    <group rotation={[0.35, 0, -0.2]}>
      <Glow color={PALETTE.sky} scale={4.4} opacity={0.45} />
      <group ref={ref}>
        <mesh>
          <sphereGeometry args={[1, 48, 48]} />
          <meshStandardMaterial
            color="#0f2247"
            emissive="#0b1d45"
            emissiveIntensity={0.6}
            roughness={0.55}
            metalness={0.25}
          />
        </mesh>
        {/* Geodesic grid reads as latitude/longitude lines from a distance. */}
        <mesh scale={1.012}>
          <icosahedronGeometry args={[1, 3]} />
          <meshBasicMaterial
            color={PALETTE.sky}
            wireframe
            transparent
            opacity={0.4}
            toneMapped={false}
          />
        </mesh>
      </group>
      <mesh scale={1.16}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={PALETTE.sky} transparent opacity={0.09} side={THREE.BackSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2.3, 0.25, 0]}>
        <torusGeometry args={[1.55, 0.014, 8, 160]} />
        <meshBasicMaterial color={PALETTE.clay} toneMapped={false} />
      </mesh>
      <mesh position={[1.5, 0.12, 0.35]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={PALETTE.yellow} toneMapped={false} />
      </mesh>
    </group>
  );
}

function GradCap() {
  const capMaterial = (
    <meshStandardMaterial
      color="#1b2747"
      roughness={0.45}
      metalness={0.35}
      side={THREE.DoubleSide}
    />
  );
  return (
    <group rotation={[0.45, 0.7, -0.18]}>
      <Glow color={PALETTE.clay} scale={3.2} opacity={0.3} />
      {/* Mortarboard */}
      <mesh position={[0, 0.3, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[2, 0.07, 2]} />
        {capMaterial}
        <Edges color={PALETTE.clay} threshold={15} />
      </mesh>
      {/* Skull cap */}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.72, 0.8, 0.62, 48, 1, true]} />
        {capMaterial}
      </mesh>
      {/* Button, cord and tassel in the Agamathi yellow */}
      <mesh position={[0, 0.36, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial
          color={PALETTE.yellow}
          emissive={PALETTE.yellow}
          emissiveIntensity={0.7}
        />
      </mesh>
      <mesh position={[0.66, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.018, 0.018, 1.32, 8]} />
        <meshStandardMaterial
          color={PALETTE.yellow}
          emissive={PALETTE.yellow}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[1.32, -0.08, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.86, 8]} />
        <meshStandardMaterial
          color={PALETTE.yellow}
          emissive={PALETTE.yellow}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[1.32, -0.6, 0]}>
        <coneGeometry args={[0.1, 0.34, 16]} />
        <meshStandardMaterial
          color={PALETTE.yellow}
          emissive={PALETTE.yellow}
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

/** A plane bent into a gentle page curl (x from the spine outward). */
function usePageGeometry(side: 1 | -1) {
  return useMemo(() => {
    const width = 1.25;
    const g = new THREE.PlaneGeometry(width, 1.7, 28, 1);
    const pos = g.attributes.position!;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i) + width / 2; // 0 at the spine
      const t = x / width;
      pos.setXYZ(i, side * x, pos.getY(i), Math.sin(t * Math.PI) * 0.2 + t * 0.12);
    }
    g.computeVertexNormals();
    return g;
  }, [side]);
}

function OpenBook() {
  const left = usePageGeometry(-1);
  const right = usePageGeometry(1);
  const lines = [0.5, 0.3, 0.1, -0.1, -0.3, -0.5];

  return (
    <group rotation={[-0.75, -0.35, 0.12]}>
      <Glow color={PALETTE.ivory} scale={3.4} opacity={0.18} />
      <mesh geometry={left}>
        <meshStandardMaterial color={PALETTE.ivory} roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={right}>
        <meshStandardMaterial color="#efe7d6" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
      {/* Hint of text lines on the right page */}
      {lines.map((y) => (
        <mesh key={y} position={[0.62, y, 0.34]}>
          <planeGeometry args={[0.8, 0.035]} />
          <meshBasicMaterial color={PALETTE.sky} transparent opacity={0.45} />
        </mesh>
      ))}
      {/* Cover */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[2.7, 1.82, 0.05]} />
        <meshStandardMaterial color={PALETTE.clayDeep} roughness={0.6} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 1.72, 8]} />
        <meshStandardMaterial
          color={PALETTE.clay}
          emissive={PALETTE.clay}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}
