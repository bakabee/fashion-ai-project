import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

function Mannequin() {
  const group = useRef();
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = Math.sin(clock.getElapsedTime() / 4) * 0.15;
  });

  return (
    <group ref={group} rotation={[0, 0, 0]}>
      {/* Head */}
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color={"#f5f5f5"} metalness={0.1} roughness={0.6} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.45, 0.55, 1, 32]} />
        <meshStandardMaterial color={"#222"} metalness={0.05} roughness={0.5} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.6, 0.25, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.18, 0.7, 0.18]} />
        <meshStandardMaterial color={"#222"} metalness={0.02} roughness={0.5} />
      </mesh>

      {/* Right arm */}
      <mesh position={[0.6, 0.25, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.18, 0.7, 0.18]} />
        <meshStandardMaterial color={"#222"} metalness={0.02} roughness={0.5} />
      </mesh>

      {/* Simple skirt / base */}
      <mesh position={[0, -0.6, 0]}> 
        <coneGeometry args={[0.6, 0.6, 32]} />
        <meshStandardMaterial color={"#111"} metalness={0.02} roughness={0.6} />
      </mesh>
    </group>
  );
}

export default function Scene4ThreeDPreview() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        duration: 1,
      });

      gsap.from(canvasRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'center center',
          end: 'bottom center',
          scrub: 1,
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
      });

      // Floating animation for canvas container
      gsap.to(canvasRef.current, {
        y: -12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-luxury-surface to-luxury-bg px-4"
      aria-label="3D Garment Visualization"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-fashionPurple/30 blur-3xl rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-fashionPink/20 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h2 ref={textRef} className="font-display text-6xl md:text-7xl font-bold text-white mb-8">
          Visualize your creation in
          <br />
          3D before production
        </h2>

        <div ref={canvasRef} className="glass-effect p-6 rounded-2xl backdrop-blur-xl mx-auto max-w-lg w-full h-96">
          <Canvas camera={{ position: [0, 1.2, 3], fov: 35 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <spotLight position={[-5, 5, 5]} angle={0.4} intensity={0.4} />
            <Mannequin />
            <mesh rotation-x={-Math.PI / 2} position={[0, -1.0, 0]}>
              <planeGeometry args={[10, 10]} />
              <meshStandardMaterial color={'#0f0f0f'} metalness={0} roughness={1} />
            </mesh>
            {/* subtle auto-rotate camera-like control but no user interaction */}
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          </Canvas>
        </div>

        <p className="text-gray-400 text-sm mt-4">Subtle mannequin preview — full studio viewer available in the Design Studio.</p>
      </div>
    </section>
  );
}
