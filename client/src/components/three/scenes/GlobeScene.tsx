import { Line, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { DESTINATIONS, INDIA, globeFocus } from '@/features/abroad/destinations';
import { Glow } from '../Glow';
import { PALETTE, type SceneProps } from '../types';

const RADIUS = 1.6;
const DEG = Math.PI / 180;

/** Latitude/longitude → point on the sphere (y up, longitude 0 facing +z after the base spin). */
function toVector(lat: number, lng: number, r = RADIUS) {
  const phi = (90 - lat) * DEG;
  const theta = (lng + 180) * DEG;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

/** Rotating globe with study-destination pins and flight arcs from India. */
export default function GlobeScene({ quality, reducedMotion }: SceneProps) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const pins = useRef<(THREE.Group | null)[]>([]);

  const home = useMemo(() => toVector(INDIA.lat, INDIA.lng), []);
  const points = useMemo(() => DESTINATIONS.map((d) => toVector(d.lat, d.lng)), []);
  const grid = useMemo(() => {
    const r = RADIUS * 1.004;
    const lines: THREE.Vector3[][] = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      lines.push(Array.from({ length: 73 }, (_, i) => toVector(lat, i * 5 - 180, r)));
    }
    for (let lng = -180; lng < 180; lng += 30) {
      lines.push(Array.from({ length: 37 }, (_, i) => toVector(i * 5 - 90, lng, r)));
    }
    return lines;
  }, []);

  const arcs = useMemo(
    () =>
      points.map((p) => {
        // Lift the midpoint above the surface so each arc reads as a flight path.
        const mid = home.clone().add(p).multiplyScalar(0.5);
        mid.setLength(RADIUS + home.distanceTo(p) * 0.45);
        return new THREE.QuadraticBezierCurve3(home, mid, p).getPoints(48);
      }),
    [home, points],
  );

  useFrame((_, delta) => {
    const k = 1 - Math.exp(-delta * 3);
    const focus = globeFocus.index;
    const target = points[focus];
    if (spin.current && tilt.current) {
      if (target) {
        // Turn the focused country to face the camera.
        let ry = -Math.atan2(target.x, target.z);
        const current = spin.current.rotation.y;
        ry = current + Math.atan2(Math.sin(ry - current), Math.cos(ry - current)); // shortest way round
        spin.current.rotation.y += (ry - current) * k;
        tilt.current.rotation.x +=
          (DESTINATIONS[focus]!.lat * DEG * 0.8 - tilt.current.rotation.x) * k;
      } else {
        if (!reducedMotion) spin.current.rotation.y += delta * 0.12;
        tilt.current.rotation.x += (0.3 - tilt.current.rotation.x) * k;
      }
    }
    pins.current.forEach((g, i) => {
      if (!g) return;
      const s = i === focus ? 1.9 : 1;
      g.scale.setScalar(g.scale.x + (s - g.scale.x) * k);
    });
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 3, 5]} intensity={1.8} color="#fff1e6" />
      <directionalLight position={[-5, -2, -3]} intensity={1} color={PALETTE.sky} />

      {/* Kept smaller than the canvas so the halo never shows a hard square edge. */}
      <Glow color={PALETTE.sky} scale={RADIUS * 3.1} opacity={0.35} />
      <group ref={tilt} rotation={[0.3, 0, 0]}>
        {/* Start with India facing the viewer. */}
        <group ref={spin} rotation={[0, -Math.atan2(home.x, home.z), 0]}>
          <mesh>
            <sphereGeometry args={[RADIUS, 64, 64]} />
            <meshStandardMaterial
              color="#0f2247"
              emissive="#0b1d45"
              emissiveIntensity={0.55}
              roughness={0.6}
              metalness={0.2}
            />
          </mesh>
          {/* Latitude / longitude grid so it reads clearly as a globe. */}
          {grid.map((pts, i) => (
            <Line
              key={`g${i}`}
              points={pts}
              color={PALETTE.sky}
              lineWidth={0.8}
              transparent
              opacity={0.35}
            />
          ))}

          {arcs.map((pts, i) => (
            <Line
              key={i}
              points={pts}
              color={PALETTE.clay}
              lineWidth={1.4}
              transparent
              opacity={0.85}
            />
          ))}

          <group position={home}>
            <mesh>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial color={PALETTE.yellow} toneMapped={false} />
            </mesh>
            <Glow color={PALETTE.yellow} scale={0.5} opacity={0.9} />
          </group>

          {points.map((p, i) => (
            <group key={DESTINATIONS[i]!.key} position={p} ref={(g) => void (pins.current[i] = g)}>
              <mesh>
                <sphereGeometry args={[0.045, 16, 16]} />
                <meshBasicMaterial color={PALETTE.ivory} toneMapped={false} />
              </mesh>
              <Glow color={PALETTE.clay} scale={0.42} opacity={0.95} />
            </group>
          ))}
        </group>
      </group>

      <mesh scale={1.14}>
        <sphereGeometry args={[RADIUS, 48, 48]} />
        <meshBasicMaterial color={PALETTE.sky} transparent opacity={0.07} side={THREE.BackSide} />
      </mesh>
      <Sparkles
        count={quality === 'high' ? 60 : 25}
        scale={[7, 7, 4]}
        size={2}
        speed={reducedMotion ? 0 : 0.2}
        opacity={0.5}
        color={PALETTE.ivory}
      />
    </>
  );
}
