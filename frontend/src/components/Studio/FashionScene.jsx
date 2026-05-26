import { useRef, useMemo, useEffect } from 'react';
import { useGLTF, Center, ContactShadows, Environment, OrbitControls, Bounds } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MESH_GROUPS = {
  body: ['Female_base'],
  halfSleeves: ['halfsleeves'],
  fullSleeves: ['full_fitted_sleeves001'],
};

const MODEL_PATHS = {
  body: '/models/master.glb',
  halfSleeves: '/models/half_sleeves.glb',
  fullSleeves: '/models/fully_fitted_sleeves.glb',
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

export default function FashionScene({ 
  autoRotate = true, 
  selectedBody = null,
  selectedSleeve = null,
  clothingColor = null,
  topColor = null,
  sleeveColor = null,
}) {
  const controlsRef = useRef();
  const sceneGroupRef = useRef();
  const camera = useThree((s) => s.camera);

  const bodySrc = useGLTF(MODEL_PATHS.body).scene;
  const halfSrc = useGLTF(MODEL_PATHS.halfSleeves).scene;
  const fullSrc = useGLTF(MODEL_PATHS.fullSleeves).scene;

  const clonedBody = useMemo(() => bodySrc.clone(), [bodySrc]);
  const clonedHalf = useMemo(() => halfSrc.clone(), [halfSrc]);
  const clonedFull = useMemo(() => fullSrc.clone(), [fullSrc]);

  const materialGroupsRef = useRef({
    body: [],
    halfSleeves: [],
    fullSleeves: [],
  });

  useEffect(() => {
    if (camera) {
      camera.position.set(0, 1.2, 4.5);
      camera.lookAt(0, 0, 0);
    }
  }, [camera]);

  useEffect(() => {
    const groups = { body: [], halfSleeves: [], fullSleeves: [] };

    clonedBody.traverse((child) => {
      if (!child.isMesh) return;
      child.material = Array.isArray(child.material)
        ? child.material.map(m => m.clone())
        : child.material.clone();
      if (MESH_GROUPS.body.includes(child.name)) {
        groups.body.push(child);
      }
    });

    clonedHalf.traverse((child) => {
      if (!child.isMesh) return;
      child.material = Array.isArray(child.material)
        ? child.material.map(m => m.clone())
        : child.material.clone();
      if (MESH_GROUPS.halfSleeves.includes(child.name)) {
        groups.halfSleeves.push(child);
      }
    });

    clonedFull.traverse((child) => {
      if (!child.isMesh) return;
      child.material = Array.isArray(child.material)
        ? child.material.map(m => m.clone())
        : child.material.clone();
      if (MESH_GROUPS.fullSleeves.includes(child.name)) {
        groups.fullSleeves.push(child);
      }
    });

    materialGroupsRef.current = groups;
  }, [clonedBody, clonedHalf, clonedFull]);

  useEffect(() => {
    const bodyVisible = selectedBody === 'boat_bandeau';
    const halfVisible = selectedSleeve === 'half_sleeve';
    const fullVisible = selectedSleeve === 'full_sleeve';

    materialGroupsRef.current.body.forEach((mesh) => {
      mesh.visible = bodyVisible;
    });

    materialGroupsRef.current.halfSleeves.forEach((mesh) => {
      mesh.visible = halfVisible;
    });

    materialGroupsRef.current.fullSleeves.forEach((mesh) => {
      mesh.visible = fullVisible;
    });
  }, [selectedBody, selectedSleeve]);

  useEffect(() => {
    const bodyColor = topColor || clothingColor;
    materialGroupsRef.current.body.forEach((mesh) => {
      if (!mesh.material) return;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => {
        if (bodyColor) {
          m.color.copy(new THREE.Color(bodyColor));
        } else {
          m.color.set('#ffffff');
        }
        m.needsUpdate = true;
      });
    });
  }, [clonedBody, topColor, clothingColor]);

  useEffect(() => {
    const sleeveColorVal = sleeveColor || clothingColor;
    materialGroupsRef.current.halfSleeves.forEach((mesh) => {
      if (!mesh.material) return;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => {
        if (sleeveColorVal) {
          m.color.copy(new THREE.Color(sleeveColorVal));
        } else {
          m.color.set('#ffffff');
        }
        m.needsUpdate = true;
      });
    });

    materialGroupsRef.current.fullSleeves.forEach((mesh) => {
      if (!mesh.material) return;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => {
        if (sleeveColorVal) {
          m.color.copy(new THREE.Color(sleeveColorVal));
        } else {
          m.color.set('#ffffff');
        }
        m.needsUpdate = true;
      });
    });
  }, [clonedHalf, clonedFull, sleeveColor, clothingColor]);

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
            <primitive object={clonedBody} scale={1} />
            <primitive object={clonedHalf} scale={1} />
            <primitive object={clonedFull} scale={1} />
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
