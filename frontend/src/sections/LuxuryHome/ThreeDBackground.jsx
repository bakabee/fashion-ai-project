import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, TorusKnot, Box, Icosahedron } from '@react-three/drei';

function FloatingOrbs() {
  const groupRef = useRef();
  const items = useMemo(() => Array.from({ length: 10 }, () => ({
    pos: [(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6 - 4],
    scale: 0.08 + Math.random() * 0.18,
    speed: 0.2 + Math.random() * 0.4,
  })), []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.015) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {items.map((d, i) => (
        <Float key={i} speed={d.speed} floatIntensity={0.6} rotationIntensity={0.1}>
          <Sphere args={[d.scale, 16, 16]} position={d.pos}>
            <MeshDistortMaterial color="#5DA9A6" transparent opacity={0.08} roughness={0.3} metalness={0.1} distort={0.15} speed={0.5} />
          </Sphere>
        </Float>
      ))}
      {[0, 1, 2].map((i) => (
        <mesh key={`r${i}`} position={[(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 3, -3 - Math.random() * 2]} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
          <torusGeometry args={[0.5 + i * 0.2, 0.008, 8, 32]} />
          <meshBasicMaterial color="#A7C7E7" transparent opacity={0.06} wireframe />
        </mesh>
      ))}
    </group>
  );
}

function FloatingKnots() {
  const groupRef = useRef();
  const items = useMemo(() => Array.from({ length: 6 }, () => ({
    pos: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 5 - 3],
    scale: 0.15 + Math.random() * 0.2,
    speed: 0.15 + Math.random() * 0.3,
  })), []);

  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.01) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {items.map((d, i) => (
        <Float key={i} speed={d.speed} floatIntensity={0.8} rotationIntensity={0.2}>
          <TorusKnot args={[d.scale, d.scale * 0.4, 32, 8]} position={d.pos}>
            <meshBasicMaterial color="#5DA9A6" transparent opacity={0.06} wireframe />
          </TorusKnot>
        </Float>
      ))}
    </group>
  );
}

function FloatingBoxes() {
  const groupRef = useRef();
  const items = useMemo(() => Array.from({ length: 8 }, () => ({
    pos: [(Math.random() - 0.5) * 11, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 6 - 3],
    scale: 0.1 + Math.random() * 0.15,
    speed: 0.2 + Math.random() * 0.35,
  })), []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.03;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {items.map((d, i) => (
        <Float key={i} speed={d.speed} floatIntensity={0.5} rotationIntensity={0.3}>
          <Box args={[d.scale, d.scale, d.scale]} position={d.pos}>
            <meshBasicMaterial color="#A7C7E7" transparent opacity={0.05} wireframe />
          </Box>
        </Float>
      ))}
      {[0, 1].map((i) => (
        <Float key={`o${i}`} speed={0.2} floatIntensity={0.4}>
          <Icosahedron args={[0.3 + i * 0.15, 0]} position={[(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, -4]}>
            <meshBasicMaterial color="#5DA9A6" transparent opacity={0.04} wireframe />
          </Icosahedron>
        </Float>
      ))}
    </group>
  );
}

function FloatingRings() {
  const groupRef = useRef();
  const items = useMemo(() => Array.from({ length: 7 }, () => ({
    pos: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 5 - 3],
    radius: 0.3 + Math.random() * 0.4,
    speed: 0.1 + Math.random() * 0.3,
  })), []);

  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {items.map((d, i) => (
        <Float key={i} speed={d.speed} floatIntensity={0.6}>
          <mesh position={d.pos} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
            <ringGeometry args={[d.radius * 0.7, d.radius, 24]} />
            <meshBasicMaterial color="#A7C7E7" transparent opacity={0.04} side={2} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function FloatingBlobs() {
  const groupRef = useRef();
  const items = useMemo(() => Array.from({ length: 8 }, () => ({
    pos: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 5 - 3],
    scale: 0.12 + Math.random() * 0.2,
    speed: 0.2 + Math.random() * 0.3,
  })), []);

  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.015;
  });

  return (
    <group ref={groupRef}>
      {items.map((d, i) => (
        <Float key={i} speed={d.speed} floatIntensity={0.7} rotationIntensity={0.15}>
          <Sphere args={[d.scale, 24, 24]} position={d.pos}>
            <MeshDistortMaterial color="#E8DCCB" transparent opacity={0.08} roughness={0.2} metalness={0.05} distort={0.25} speed={0.8} />
          </Sphere>
        </Float>
      ))}
      {[0, 1, 2].map((i) => (
        <mesh key={`r${i}`} position={[(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3, -4]} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
          <torusGeometry args={[0.4 + i * 0.15, 0.006, 8, 24]} />
          <meshBasicMaterial color="#5DA9A6" transparent opacity={0.04} wireframe />
        </mesh>
      ))}
    </group>
  );
}

function FloatingStars() {
  const groupRef = useRef();
  const items = useMemo(() => Array.from({ length: 9 }, () => ({
    pos: [(Math.random() - 0.5) * 11, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6 - 3],
    scale: 0.1 + Math.random() * 0.16,
    speed: 0.15 + Math.random() * 0.35,
  })), []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.025;
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.012) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {items.map((d, i) => (
        <Float key={i} speed={d.speed} floatIntensity={0.6} rotationIntensity={0.4}>
          <Icosahedron args={[d.scale, 0]} position={d.pos}>
            <meshBasicMaterial color="#E8DCCB" transparent opacity={0.05} wireframe />
          </Icosahedron>
        </Float>
      ))}
      {[0, 1].map((i) => (
        <Float key={`s${i}`} speed={0.25} floatIntensity={0.5}>
          <mesh position={[(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 4, -4]}>
            <dodecahedronGeometry args={[0.2 + i * 0.1, 0]} />
            <meshBasicMaterial color="#A7C7E7" transparent opacity={0.04} wireframe />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

const variants = {
  orbs: FloatingOrbs,
  knots: FloatingKnots,
  boxes: FloatingBoxes,
  rings: FloatingRings,
  blobs: FloatingBlobs,
  stars: FloatingStars,
};

export default function ThreeDBackground({ variant = 'orbs' }) {
  const Component = variants[variant] || FloatingOrbs;

  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 4]} intensity={0.4} />
        <Component />
      </Canvas>
    </div>
  );
}
