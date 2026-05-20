import { useRef, useMemo } from 'react';
import { useGLTF, Center, ContactShadows, Environment, OrbitControls, Bounds } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

function SceneBackground() {
  const { viewport } = useThree();
  return (
    <mesh position={[0, 0, -2]} scale={[viewport.width * 2, viewport.height * 2, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="#F6F4F1" />
    </mesh>
  );
}

function GradientFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
      <planeGeometry args={[12, 12]} />
      <meshStandardMaterial color="#E8DCCB" transparent opacity={0.5} />
    </mesh>
  );
}

export default function FashionScene({ autoRotate = true }) {
  const controlsRef = useRef();
  const { scene } = useGLTF('/models/fashion.glb');

  const sceneCopy = useMemo(() => scene.clone(), [scene]);

  return (
    <>
      <SceneBackground />

      <ambientLight intensity={0.5} color="#A7C7E7" />

      <directionalLight
        position={[5, 6, 4]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#ffffff"
      />

      <directionalLight
        position={[-4, 2, -3]}
        intensity={0.6}
        color="#5DA9A6"
      />

      <directionalLight
        position={[0, -1, 5]}
        intensity={0.35}
        color="#E8DCCB"
      />

      <spotLight
        position={[0, 5, 2]}
        angle={0.35}
        intensity={0.4}
        penumbra={1}
        color="#A7C7E7"
      />

      <Environment preset="studio" />

      <Center center top>
        <Bounds fit clip damping={6} margin={1.15}>
          <primitive object={sceneCopy} scale={1} />
        </Bounds>
      </Center>

      <ContactShadows
        position={[0, -1.1, 0]}
        opacity={0.3}
        scale={6}
        blur={2.5}
        far={2.5}
      />

      <GradientFloor />

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        minDistance={1.2}
        maxDistance={8}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI / 2.1}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={1.2}
        target={[0, 0.4, 0]}
      />
    </>
  );
}
