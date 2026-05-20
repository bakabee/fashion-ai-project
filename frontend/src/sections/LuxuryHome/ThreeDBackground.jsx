import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';

function FloatingOrbs() {
  const groupRef = useRef();

  const orbs = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6 - 4,
        ],
        scale: 0.08 + Math.random() * 0.18,
        speed: 0.2 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.015) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed} floatIntensity={0.6} rotationIntensity={0.1}>
          <Sphere args={[orb.scale, 16, 16]} position={orb.position}>
            <MeshDistortMaterial
              color="#d4d4d4"
              transparent
              opacity={0.12 + Math.random() * 0.1}
              roughness={0.3}
              metalness={0.1}
              distort={0.15}
              speed={0.5}
            />
          </Sphere>
        </Float>
      ))}
      {/* Thin wireframe torus rings */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={`ring-${i}`}
          position={[
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 3,
            -3 - Math.random() * 2,
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <torusGeometry args={[0.5 + i * 0.2, 0.008, 8, 32]} />
          <meshBasicMaterial color="#999" transparent opacity={0.06} wireframe />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeDBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 4]} intensity={0.4} />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
