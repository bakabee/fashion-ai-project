import { useRef, useMemo, useEffect } from 'react';
import { useGLTF, Center, ContactShadows, Environment, OrbitControls, Bounds } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const modelMap = {
  top1: '/models/top 1.glb',
  top2: '/models/top 2.glb',
  top3: '/models/top 3.glb',
  shorts: '/models/Shorts.glb',
  sleeveless: '/models/sweater.glb',
  sleeved: '/models/sweater.glb',
};

function GradientBackground() {
  const { viewport } = useThree();
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      const cols = [
        new THREE.Color('#F6F4F1'),
        new THREE.Color('#E8DCCB'),
        new THREE.Color('#5DA9A6'),
        new THREE.Color('#A7C7E7'),
        new THREE.Color('#F6F4F1'),
      ];
      const s = new THREE.CanvasTexture(generateGradientCanvas(cols, 1024, 1024));
      meshRef.current.material.map = s;
      meshRef.current.material.needsUpdate = true;
    }
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, -3]} scale={[viewport.width * 3, viewport.height * 3, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial />
    </mesh>
  );
}

function generateGradientCanvas(colors, w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, w, h);
  colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), c.getStyle()));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  return canvas;
}

function GroundPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]} receiveShadow>
      <planeGeometry args={[14, 14]} />
      <meshStandardMaterial color="#E8DCCB" transparent opacity={0.35} />
    </mesh>
  );
}

export default function FashionScene({ autoRotate = true, modelId = 'top1', clothingColor = null }) {
  const controlsRef = useRef();
  const sceneGroupRef = useRef();
  const camera = useThree((s) => s.camera);
  const modelPath = modelMap[modelId] || modelMap.top1;

  const { scene } = useGLTF(modelPath);
  const clonedScene = useMemo(() => scene.clone(), [scene, modelId]);

  useEffect(() => {
    if (camera) {
      camera.position.set(0, 1.2, 4.5);
      camera.lookAt(0, 0, 0);
    }
  }, [camera, modelId]);

  useEffect(() => {
    if (!clonedScene) return;
    const color = clothingColor ? new THREE.Color(clothingColor) : null;
    clonedScene.traverse((child) => {
      if (!child.isMesh) return;
      const matName = (child.material?.name || child.name || '').toLowerCase();
      if (/skin|body/.test(matName)) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((m) => {
        if (color) {
          m.color.copy(color);
        } else {
          m.color.set('#ffffff');
        }
        m.needsUpdate = true;
      });
    });
  }, [clonedScene, clothingColor, modelId]);

  return (
    <>
      <GradientBackground />

      <ambientLight intensity={0.55} color="#A7C7E7" />

      <directionalLight
        position={[5, 7, 4]}
        intensity={1.6}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#ffffff"
      />

      <directionalLight
        position={[-4, 3, -3]}
        intensity={0.7}
        color="#5DA9A6"
      />

      <directionalLight
        position={[0, -2, 6]}
        intensity={0.4}
        color="#E8DCCB"
      />

      <spotLight
        position={[0, 6, 2]}
        angle={0.3}
        intensity={0.5}
        penumbra={1}
        color="#A7C7E7"
      />

      <Environment preset="studio" />

      <Center center>
        <Bounds fit clip damping={6} margin={1.6}>
          <group ref={sceneGroupRef}>
            <primitive object={clonedScene} scale={1} />
          </group>
        </Bounds>
      </Center>

      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.35}
        scale={7}
        blur={3}
        far={3}
      />

      <GroundPlane />

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        minDistance={1.0}
        maxDistance={10}
        minPolarAngle={0.05}
        maxPolarAngle={Math.PI / 2.05}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={1.0}
        target={[0, 0, 0]}
      />
    </>
  );
}