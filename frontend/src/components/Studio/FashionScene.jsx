import { useRef, useMemo, useEffect, useState } from 'react';
import { useGLTF, Center, ContactShadows, Environment, OrbitControls, Bounds } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const clothingConfig = {
  top1:        { image: '/images/top1.jpg',        zone: 'upper', label: 'Top 1' },
  top2:        { image: '/images/top2.png',        zone: 'upper', label: 'Top 2' },
  top3:        { image: '/images/top3.jpg',        zone: 'upper', label: 'Top 3' },
  shorts:      { image: '/images/shorts.jpg',      zone: 'lower', label: 'Shorts' },
  sleeveless:  { image: '/images/ea5f01f0ac1fcd13e8be1ed74f18678a.jpg', zone: 'upper', label: 'Sleeveless Sweater' },
  sleeved:     { image: '/images/sleevedsweater.jpg', zone: 'full',  label: 'Sleeved Sweater' },
};

const zoneMaterialRules = {
  upper: [/top|shirt|upper|torso|chest|collar|sleeve/i, /body|skin|pants|bottom|leg/i],
  lower: [/pants|bottom|lower|leg|shorts/i, /body|skin|top|shirt|upper|torso|chest/i],
  full:  [/.*/, /skin|body|base/i],
};

function applyClothingTexture(scene, modelId, textureCache) {
  const config = clothingConfig[modelId];
  if (!config || !scene) return;

  const texture = textureCache[modelId];
  if (!texture) return;

  const [includePattern, excludePattern] = zoneMaterialRules[config.zone] || zoneMaterialRules.full;
  let matchedAny = false;

  scene.traverse((child) => {
    if (!child.isMesh) return;
    const mat = child.material;
    const matName = mat.name || child.name || '';

    const shouldInclude = includePattern.test(matName);
    const shouldExclude = excludePattern.test(matName);
    if (!shouldInclude || shouldExclude) return;

    matchedAny = true;
    if (Array.isArray(mat)) {
      mat.forEach((m) => applyTextureToMaterial(m, texture));
    } else {
      applyTextureToMaterial(mat, texture);
    }
  });

  if (!matchedAny) {
    scene.traverse((child) => {
      if (!child.isMesh) return;
      const mat = child.material;
      const matName = mat.name || child.name || '';
      if (/skin|base|body/i.test(matName) && config.zone !== 'full') return;
      if (Array.isArray(mat)) {
        mat.forEach((m) => applyTextureToMaterial(m, texture));
      } else {
        applyTextureToMaterial(mat, texture);
      }
    });
  }
}

function applyTextureToMaterial(mat, texture) {
  mat.map = texture;
  mat.color.set('#ffffff');
  mat.needsUpdate = true;
}

function preloadTextures(cb) {
  const loader = new THREE.TextureLoader();
  const cache = {};
  const entries = Object.entries(clothingConfig);
  let loaded = 0;

  entries.forEach(([id, config]) => {
    loader.load(
      config.image,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        cache[id] = tex;
        loaded++;
        if (loaded === entries.length) cb(cache);
      },
      undefined,
      () => {
        const fallback = new THREE.DataTexture(new Uint8Array([128, 128, 128]), 1, 1);
        fallback.needsUpdate = true;
        cache[id] = fallback;
        loaded++;
        if (loaded === entries.length) cb(cache);
      }
    );
  });
}

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

export default function FashionScene({ autoRotate = true, modelId = 'top1' }) {
  const controlsRef = useRef();
  const sceneGroupRef = useRef();
  const camera = useThree((s) => s.camera);
  const [texturesReady, setTexturesReady] = useState(false);
  const [textureCache, setTextureCache] = useState({});

  const { scene: mannequin } = useGLTF('/models/fashion.glb');
  const clonedScene = useMemo(() => mannequin.clone(), [mannequin, modelId]);

  useEffect(() => {
    preloadTextures((cache) => {
      setTextureCache(cache);
      setTexturesReady(true);
    });
  }, []);

  useEffect(() => {
    if (!texturesReady || !clonedScene) return;
    applyClothingTexture(clonedScene, modelId, textureCache);
  }, [modelId, texturesReady, textureCache, clonedScene]);

  useEffect(() => {
    if (camera) {
      camera.position.set(0, 1.2, 3.2);
      camera.lookAt(0, 0.4, 0);
    }
  }, [camera, modelId]);

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

      <Center center top>
        <Bounds fit clip damping={6} margin={1.25}>
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
        target={[0, 0.3, 0]}
      />
    </>
  );
}