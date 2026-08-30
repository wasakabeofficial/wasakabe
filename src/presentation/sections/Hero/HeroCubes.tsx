import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Object3D } from "three";
import type { Group, InstancedMesh, Mesh } from "three";

type ShapeKind = "box" | "octahedron" | "torus" | "icosahedron";

interface ShapeConfig {
  kind: ShapeKind;
  position: [number, number, number];
  size: number;
  speed: number;
  floatSpeed: number;
  floatOffset: number;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

function ShapeGeometry({ kind, size }: { kind: ShapeKind; size: number }) {
  switch (kind) {
    case "octahedron":
      return <octahedronGeometry args={[size, 0]} />;
    case "torus":
      return <torusGeometry args={[size, size * 0.32, 12, 32]} />;
    case "icosahedron":
      return <icosahedronGeometry args={[size, 0]} />;
    default:
      return <boxGeometry args={[size, size, size]} />;
  }
}

function FloatingShape({ kind, position, size, speed, floatSpeed, floatOffset }: ShapeConfig) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh || prefersReducedMotion()) return;
    const t = state.clock.getElapsedTime();
    mesh.rotation.x = t * speed * 0.4;
    mesh.rotation.y = t * speed * 0.6;
    mesh.position.y = position[1] + Math.sin(t * floatSpeed + floatOffset) * 0.35;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <ShapeGeometry kind={kind} size={size} />
      <meshBasicMaterial color="#2f5fa8" wireframe />
    </mesh>
  );
}

const SHAPES: ShapeConfig[] = [
  { kind: "box", position: [-2.6, -1.1, -1.5], size: 1, speed: 0.8, floatSpeed: 0.9, floatOffset: 1.4 },
  { kind: "octahedron", position: [2.4, 1.5, -2], size: 0.85, speed: 1.1, floatSpeed: 0.7, floatOffset: 2.8 },
  { kind: "torus", position: [2, -1.7, -1], size: 0.5, speed: 0.7, floatSpeed: 1.1, floatOffset: 4.2 },
  { kind: "icosahedron", position: [-2.2, 1.7, -1.8], size: 0.6, speed: 0.9, floatSpeed: 0.8, floatOffset: 3.1 },
  { kind: "box", position: [0.4, 2.1, -2.4], size: 0.4, speed: 1.3, floatSpeed: 1.3, floatOffset: 0.6 },
];

/* ─── Continentes (puntos sobre la esfera, sin texturas externas) ───
   La silueta de cada continente se aproxima con bandas de lat/lon;
   `wobble` rompe los bordes rectos para que las costas se vean orgánicas. */
const CONTINENT_RADIUS = 2.006;
const CONTINENT_DOT_SIZE = 0.028;
const CONTINENT_COLOR = "#a9c8f0";

function wobble(lon: number, seed: number): number {
  return Math.sin((lon + seed) * 0.12) * 3 + Math.sin((lon + seed) * 0.31) * 1.4;
}

function isLand(lat: number, lon: number): boolean {
  // Norteamérica
  if (lon >= -168 && lon <= -52) {
    if (lat >= 49 + wobble(lon, 10) && lat <= 71) return true;
    if (lat >= 25 + wobble(lon, 20) && lat < 49 && lon >= -125 && lon <= -66) return true;
    if (lat >= 14 + wobble(lon, 30) && lat < 25 && lon >= -105 && lon <= -84) return true;
  }
  // Sudamérica
  if (lon >= -82 && lon <= -34) {
    if (lat >= -4 && lat <= 13 + wobble(lon, 40) && lon >= -79 && lon <= -50) return true;
    if (lat >= -20 && lat < -4 && lon >= -82 && lon <= -35) return true;
    if (lat >= -56 && lat < -20 && lon >= -75 && lon <= -53 + wobble(lon, 50)) return true;
  }
  // África
  if (lon >= -18 && lon <= 52) {
    if (lat >= 0 && lat <= 37 + wobble(lon, 60)) return true;
    if (lat >= -35 && lat < 0 && lon >= 10 && lon <= 42) return true;
  }
  // Eurasia
  if (lat >= 36 && lat <= 75 && lon >= -11 && lon <= 40) return true;
  if (lat >= 5 && lat <= 78 && lon > 40 && lon <= 180) return true;
  if (lat >= 12 && lat <= 40 && lon > 35 && lon <= 60) return true;
  if (lat >= -10 && lat <= 20 && lon > 92 && lon <= 141) return true;
  // Australia
  if (lat >= -44 && lat <= -10 && lon >= 112 && lon <= 154) return true;

  return false;
}

function latLonToPosition(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

const CONTINENT_POINTS: [number, number, number][] = (() => {
  const points: [number, number, number][] = [];
  for (let lat = -70; lat <= 78; lat += 3) {
    for (let lon = -180; lon < 180; lon += 3) {
      if (isLand(lat, lon)) points.push(latLonToPosition(lat, lon, CONTINENT_RADIUS));
    }
  }
  return points;
})();

function Continents() {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    CONTINENT_POINTS.forEach(([x, y, z], i) => {
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh || prefersReducedMotion()) return;
    mesh.rotation.y = state.clock.getElapsedTime() * 0.18;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, CONTINENT_POINTS.length]}>
      <icosahedronGeometry args={[CONTINENT_DOT_SIZE, 0]} />
      <meshBasicMaterial color={CONTINENT_COLOR} />
    </instancedMesh>
  );
}

/* ─── Planeta Tierra estilizado (sin texturas externas) ─── */
function Earth() {
  const coreRef = useRef<Mesh>(null);
  const wireRef = useRef<Mesh>(null);
  const cloudRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (prefersReducedMotion()) return;
    const t = state.clock.getElapsedTime();
    if (coreRef.current) coreRef.current.rotation.y = t * 0.18;
    if (wireRef.current) wireRef.current.rotation.y = t * 0.18;
    if (cloudRef.current) cloudRef.current.rotation.y = t * 0.28;
  });

  return (
    <group position={[0, 0.4, 0]} rotation={[0, 0, 0.41]}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[2, 48, 48]} />
        <meshBasicMaterial color="#12233f" />
      </mesh>
      <Continents />
      <mesh ref={wireRef}>
        <sphereGeometry args={[2.01, 24, 18]} />
        <meshBasicMaterial color="#4c86d6" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={cloudRef}>
        <sphereGeometry args={[2.08, 20, 14]} />
        <meshBasicMaterial color="#dfe9fb" wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function Scene() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group || prefersReducedMotion()) return;
    group.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.25;
  });

  const shapes = useMemo(() => SHAPES, []);

  return (
    <group ref={groupRef}>
      <Earth />
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
    </group>
  );
}

export default function HeroCubes() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      style={{ pointerEvents: "none", touchAction: "pan-y" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
