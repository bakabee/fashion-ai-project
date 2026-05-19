import { Environment } from "@react-three/drei/core/Environment";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { PerspectiveCamera } from "@react-three/drei/core/PerspectiveCamera";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils";
import * as THREE from "three";

const fabricRoughness = {
  Cotton: 0.72,
  Silk: 0.28,
  Denim: 0.86,
  Wool: 0.92,
  Linen: 0.78,
};

function FashionModelScene({
  mode = "runway",
  cameraMood = "cinematic",
  clothingType = "Top",
  designOptions,
  bodyMeasurements,
  interactive = false,
  showFbxModel = false,
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      camera={{ near: 0.1, far: 100 }}
    >
      {mode === "inspection" ? (
        <PerspectiveCamera makeDefault position={[0, 1.35, 5.1]} fov={30} />
      ) : (
        <PerspectiveCamera makeDefault position={[0, 1.25, 6.2]} fov={38} />
      )}
      <color attach="background" args={["#070609"]} />
      <fog attach="fog" args={["#070609", mode === "inspection" ? 8 : 7, 16]} />
      <ambientLight intensity={mode === "inspection" ? 0.46 : 0.72} />
      <spotLight
        position={[-4, 6, 4.5]}
        angle={0.35}
        penumbra={0.9}
        intensity={mode === "inspection" ? 5.4 : 4.4}
        castShadow
      />
      <spotLight
        position={[4, 4, 3]}
        angle={0.48}
        penumbra={0.7}
        intensity={2.6}
        color="#d6b56d"
      />
      <pointLight position={[0, 1, -3]} intensity={3} color="#9e6aff" />

      {mode === "inspection" && (
        <>
          <spotLight position={[0, 7.5, 4]} angle={0.46} penumbra={0.8} intensity={7.2} castShadow />
          <spotLight position={[-3.5, 4, -2]} angle={0.4} penumbra={0.86} intensity={2.7} color="#d6b56d" />
          <pointLight position={[0, 0.2, 4]} intensity={1.7} color="#9e6aff" />
        </>
      )}

      <CinematicRig mode={mode} cameraMood={cameraMood} interactive={interactive}>
        {showFbxModel ? (
          <Suspense fallback={null}>
            <LoadedFbxModel mode={mode} designOptions={designOptions} interactive={interactive} />
          </Suspense>
        ) : (
          <FashionAvatar
            clothingType={clothingType}
            designOptions={designOptions}
            bodyMeasurements={bodyMeasurements}
          />
        )}
      </CinematicRig>

      <RunwaySet />
      <Environment preset={mode === "inspection" ? "studio" : "city"} />
      {interactive && (
        <OrbitControls
          enablePan={false}
          target={[0, 1.15, 0]}
          minDistance={3.2}
          maxDistance={7.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.55}
          autoRotate
          autoRotateSpeed={0.55}
          enableDamping
          dampingFactor={0.06}
        />
      )}
    </Canvas>
  );
}

function safeCloneMaterial(material) {
  if (!material) return null;

  if (Array.isArray(material)) {
    if (material.length === 0) return material;
    return material.map((m) => safeCloneMaterial(m)).filter(Boolean);
  }

  if (typeof material !== "object") return material;

  if (typeof material.clone !== "function") return material;

  if (material instanceof THREE.ShaderMaterial) return material;

  try {
    const cloned = material.clone();
    if (cloned) {
      cloned.userData = { ...(cloned.userData || {}), fashionClonedMaterial: true };
      return cloned;
    }
  } catch {
    return material;
  }
  return material;
}


function applyMaterialProps(material, mode, designOptions) {
  if (!material) return;
  try {
    material.transparent = true;
    material.opacity = mode === "inspection" ? 0.98 : 0.28;
    material.side = THREE.DoubleSide;

    if (material.roughness !== undefined) {
      material.roughness = fabricRoughness[designOptions?.fabric] || 0.58;
    }

    if (
      mode === "inspection" &&
      designOptions?.color &&
      material.color &&
      typeof material.color.set === "function"
    ) {
      material.color.set(designOptions.color);
    }
  } catch (e) {
    // Ignore unsupported material structures.
  }
}


function LoadedFbxModel({ mode, designOptions, interactive = false }) {
  const modelRef = useRef();
  const fbx = useLoader(FBXLoader, "/models/fbx%20Clean.fbx");

  const preparedModel = useMemo(() => {
    const clone = cloneSkeleton(fbx);

    clone.traverse((child) => {
      if (!child || !child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;

      if (!child.material) return;

      try {
        const clonedMaterial = safeCloneMaterial(child.material);
        if (clonedMaterial) {
          child.material = clonedMaterial;
        }
      } catch {
        // Skip uncloneable materials
      }
    });

    clone.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDimension = Math.max(size.x, size.y, size.z, 1);
    const targetHeight = mode === "inspection" ? 3.35 : 2.9;
    const scale = targetHeight / maxDimension;

    clone.position.sub(center);

    return { scene: clone, scale };
  }, [fbx, mode]);

  useEffect(() => {
    if (!modelRef.current) return;
    modelRef.current.traverse((child) => {
      if (!child.isMesh || !child.material) return;
      if (Array.isArray(child.material)) {
        child.material.forEach((mat) => applyMaterialProps(mat, mode, designOptions));
      } else {
        applyMaterialProps(child.material, mode, designOptions);
      }
    });
  }, [mode, designOptions]);

  useEffect(() => {
    const currentModel = modelRef.current;
    return () => {
      if (!currentModel) return;
      currentModel.traverse((child) => {
        if (!child?.isMesh || !child.material) return;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => {
          if (material?.userData?.fashionClonedMaterial && typeof material.dispose === "function") {
            material.dispose();
          }
        });
      });
    };
  }, [preparedModel]);

  useFrame(({ clock }) => {
    if (!modelRef.current || interactive) return;
    const elapsed = clock.getElapsedTime();
    modelRef.current.rotation.y = elapsed * 0.12;
    modelRef.current.position.y = 1.18 + Math.sin(elapsed * 0.6) * 0.015;
  });

  return (
    <primitive
      ref={modelRef}
      object={preparedModel.scene}
      scale={preparedModel.scale}
      position={[0, 1.18, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function CinematicRig({ children, mode, cameraMood, interactive }) {
  const group = useRef();

  useFrame(({ clock, camera }) => {
    const elapsed = clock.getElapsedTime();
    if (group.current && !interactive) {
      const speed = mode === "runway" ? 0.32 : 0.18;
      group.current.rotation.y = Math.sin(elapsed * speed) * 0.28 + elapsed * 0.12;
      group.current.position.y = Math.sin(elapsed * 1.8) * 0.025;
    }

    if (!interactive) {
      const focusBoost = cameraMood === "focus" ? 0.7 : 0;
      const orbitBoost = cameraMood === "orbit" ? 0.55 : 0;
      camera.position.x = Math.sin(elapsed * 0.22) * (0.5 + orbitBoost);
      camera.position.y = 1.2 + Math.sin(elapsed * 0.18) * 0.12 + focusBoost * 0.12;
      camera.position.z = 5.75 - focusBoost;
      camera.lookAt(0, 1.12, 0);
    }
  });

  return <group ref={group}>{children}</group>;
}

function FashionAvatar({ clothingType, designOptions, bodyMeasurements }) {
  const heightScale = useMemo(() => {
    const height = Number(bodyMeasurements?.height || 175);
    return THREE.MathUtils.clamp(height / 175, 0.9, 1.1);
  }, [bodyMeasurements?.height]);

  const bodyScale = useMemo(() => {
    const chest = Number(bodyMeasurements?.chest || 88);
    return THREE.MathUtils.clamp(chest / 88, 0.92, 1.14);
  }, [bodyMeasurements?.chest]);

  const materialProps = {
    color: designOptions.color,
    metalness: designOptions.fabric === "Silk" ? 0.12 : 0.02,
    roughness: fabricRoughness[designOptions.fabric] || 0.62,
  };

  return (
    <group scale={[bodyScale, heightScale, bodyScale]} position={[0, -0.85, 0]}>
      <mesh castShadow position={[0, 2.72, 0]}>
        <sphereGeometry args={[0.23, 32, 32]} />
        <meshStandardMaterial color="#c99b7c" roughness={0.55} />
      </mesh>
      <mesh castShadow position={[0, 2.38, 0]}>
        <capsuleGeometry args={[0.13, 0.28, 16, 32]} />
        <meshStandardMaterial color="#b8846d" roughness={0.64} />
      </mesh>

      <mesh castShadow position={[0, 1.78, 0]}>
        <capsuleGeometry args={[0.36, 1.04, 24, 42]} />
        <meshStandardMaterial color="#232027" roughness={0.78} />
      </mesh>

      <Garment clothingType={clothingType} designOptions={designOptions} materialProps={materialProps} />
      <Arms designOptions={designOptions} materialProps={materialProps} />
      <Legs clothingType={clothingType} materialProps={materialProps} />
    </group>
  );
}

function Garment({ clothingType, designOptions, materialProps }) {
  const isDress = clothingType === "Dress";
  const isJacket = clothingType === "Jacket";
  const isSkirt = clothingType === "Skirt";
  const isPants = clothingType === "Pants";
  const torsoHeight = isDress ? 1.55 : isJacket ? 1.04 : 0.92;
  const torsoY = isDress ? 1.45 : 1.78;

  return (
    <group>
      {!isPants && (
        <mesh castShadow position={[0, torsoY, 0]}>
          <capsuleGeometry args={[isJacket ? 0.47 : 0.42, torsoHeight, 28, 48]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      )}

      {isPants && (
        <group>
          <mesh castShadow position={[-0.18, 1.02, 0]}>
            <capsuleGeometry args={[0.16, 1.3, 16, 36]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh castShadow position={[0.18, 1.02, 0]}>
            <capsuleGeometry args={[0.16, 1.3, 16, 36]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        </group>
      )}

      {isSkirt && (
        <mesh castShadow position={[0, 1.18, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.62, 1.05, 48, 1]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      )}

      {designOptions.pattern !== "Plain" && (
        <mesh position={[0, 1.88, 0.43]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.32, 0.01, 8, 90]} />
          <meshStandardMaterial
            color={designOptions.pattern === "Embroidered" ? "#fff2c7" : "#141116"}
            roughness={0.4}
          />
        </mesh>
      )}

      {designOptions.neck === "High neck" && (
        <mesh castShadow position={[0, 2.26, 0]}>
          <cylinderGeometry args={[0.22, 0.26, 0.22, 32]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      )}
    </group>
  );
}

function Arms({ designOptions, materialProps }) {
  const sleeveLength = designOptions.sleeves === "Short sleeve" ? 0.42 : 0.95;
  const hideSleeves = designOptions.sleeves === "Sleeveless";
  const sleeveRadius = designOptions.sleeves === "Puff sleeve" ? 0.18 : 0.1;

  return (
    <group>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.52, 1.78, 0]} rotation={[0, 0, side * -0.22]}>
          <mesh castShadow position={[side * 0.05, -0.28, 0]}>
            <capsuleGeometry args={[0.09, 0.88, 12, 24]} />
            <meshStandardMaterial color="#b8846d" roughness={0.64} />
          </mesh>
          {!hideSleeves && (
            <mesh castShadow position={[side * 0.02, 0.05 - sleeveLength / 5, 0]}>
              <capsuleGeometry args={[sleeveRadius, sleeveLength, 16, 28]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

function Legs({ clothingType, materialProps }) {
  const garmentLegs = clothingType === "Pants";

  return (
    <group>
      {[-1, 1].map((side) => (
        <mesh key={side} castShadow position={[side * 0.18, 0.45, 0]}>
          <capsuleGeometry args={[0.1, 1.1, 14, 28]} />
          <meshStandardMaterial
            {...(garmentLegs ? materialProps : { color: "#9a6b58", roughness: 0.68 })}
          />
        </mesh>
      ))}
    </group>
  );
}

function RunwaySet() {
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.92, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#100d12" roughness={0.28} metalness={0.16} />
      </mesh>
      <mesh position={[0, -0.88, -1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.4, 1.46, 96]} />
        <meshBasicMaterial color="#d6b56d" transparent opacity={0.42} />
      </mesh>
      {[-2.8, 2.8].map((x) => (
        <mesh key={x} position={[x, 0.65, -2.6]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[0.05, 2.8, 0.05]} />
          <meshBasicMaterial color="#d6b56d" transparent opacity={0.32} />
        </mesh>
      ))}
    </group>
  );
}

export default FashionModelScene;
