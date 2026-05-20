import { useRef } from 'react';
import { useGLTF, Center, ContactShadows, Environment, OrbitControls } from '@react-three/drei';

export default function FashionScene({ autoRotate = true }) {
  const controlsRef = useRef();
  const { scene } = useGLTF('/models/fashion.glb');

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[6, 6, 4]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 3, -2]} intensity={0.4} />
      <directionalLight position={[0, -2, 4]} intensity={0.2} />
      <spotLight position={[0, 6, 3]} angle={0.4} intensity={0.3} penumbra={1} />

      <Environment preset="studio" />

      <Center center top>
        <primitive object={scene} scale={1} />
      </Center>

      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.35}
        scale={6}
        blur={2.5}
        far={2}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#f0f0f0" transparent opacity={0.6} />
      </mesh>

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        minDistance={1.5}
        maxDistance={8}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2.2}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={1.5}
        target={[0, 0.8, 0]}
      />
    </>
  );
}
