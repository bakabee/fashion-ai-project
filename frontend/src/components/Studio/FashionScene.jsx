import { useRef, useMemo, useEffect } from 'react';
import { useGLTF, ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const CLOTHING_GROUPS = {
  boat_bandeau: ['boat_bandeau'],
  half_sleeve: ['half_sleeve_L', 'half_sleeve_R'],
  full_sleeve: ['full_fitted_sleeve_L', 'full_fitted_sleeve_R'],
  shorts: ['Shorts'],
  long_pants: ['Object001'],
  beach_shorts: ['beach_shorts'],
  cargo_pants: ['cargo_pants'],
  denim_shorts: ['denim_shorts'],
  hemmed_skirt: ['hemmed_skirt'],
  long_skirt: ['long_skirt'],
};

const ALL_CLOTHING_NAMES = [...new Set(Object.values(CLOTHING_GROUPS).flat())];
const TOP_MESH_NAMES = CLOTHING_GROUPS.boat_bandeau;
const SLEEVE_MESH_NAMES = [
  ...CLOTHING_GROUPS.half_sleeve,
  ...CLOTHING_GROUPS.full_sleeve,
];
const BOTTOM_GROUP_KEYS = ['shorts', 'long_pants', 'beach_shorts', 'cargo_pants', 'denim_shorts', 'hemmed_skirt', 'long_skirt'];
const BOTTOM_MESH_NAMES = BOTTOM_GROUP_KEYS.flatMap((key) => CLOTHING_GROUPS[key] || []);
const BODY_MESH_NAMES = ['Female base'];

function isBodyMesh(name) {
  return BODY_MESH_NAMES.includes(name);
}

// Validate mesh names in GLB against expected names
function validateMeshNames(scene) {
  const availableMeshes = new Set();
  scene.traverse((child) => {
    if (child.isMesh) {
      availableMeshes.add(child.name);
    }
  });

  console.group('[Validation] Mesh Name Check');
  const missingMeshes = [];
  const allExpectedMeshes = ALL_CLOTHING_NAMES.concat(BODY_MESH_NAMES);
  
  allExpectedMeshes.forEach((expectedName) => {
    if (!availableMeshes.has(expectedName)) {
      missingMeshes.push(expectedName);
    }
  });

  if (missingMeshes.length > 0) {
    console.error('[Validation] Missing meshes:', missingMeshes);
    console.log('[Validation] Available meshes in GLB:', Array.from(availableMeshes));
    console.warn('[Validation] These meshes are missing - visibility may fail for them');
  } else {
    console.log('[Validation] All expected meshes found ✓');
  }
  console.log('[Validation] Full mesh inventory:', Array.from(availableMeshes));
  console.groupEnd();

  return missingMeshes;
}

function getActiveGroups(selectedBody, selectedSleeve, selectedBottom) {
  const activeGroups = [];
  if (selectedBody === 'boat_bandeau') activeGroups.push('boat_bandeau');
  if (selectedSleeve === 'half_sleeve') activeGroups.push('half_sleeve');
  if (selectedSleeve === 'full_sleeve') activeGroups.push('full_sleeve');
  if (selectedBottom && CLOTHING_GROUPS[selectedBottom]) activeGroups.push(selectedBottom);
  return activeGroups;
}

function applyVisibility(scene, activeGroups) {
  // STEP 1: Collect all objects (including groups/non-meshes)
  const allObjects = [];
  const meshMap = new Map();
  const meshDuplicates = new Map();
  
  scene.traverse((child) => {
    allObjects.push(child);
    
    if (!child.isMesh) return;
    
    // Check for duplicates
    if (meshMap.has(child.name)) {
      if (!meshDuplicates.has(child.name)) {
        meshDuplicates.set(child.name, 1);
      }
      meshDuplicates.set(child.name, meshDuplicates.get(child.name) + 1);
    }
    meshMap.set(child.name, child);
  });
  
  // Log available meshes for debugging
  console.group('[Visibility] Mesh inventory');
  console.log('Total objects in scene:', allObjects.length);
  console.log('Total meshes found:', meshMap.size);
  if (meshDuplicates.size > 0) {
    console.warn('⚠️ DUPLICATE MESH NAMES FOUND:', Array.from(meshDuplicates.entries()));
  }
  console.log('Available meshes:', Array.from(meshMap.keys()));
  console.log('Active clothing groups:', activeGroups);
  
  // Log all clothing meshes and their current visibility
  console.log('\nCurrent visibility state BEFORE reset:');
  ALL_CLOTHING_NAMES.forEach((clothingName) => {
    const mesh = meshMap.get(clothingName);
    if (mesh) {
      console.log(`  ${clothingName}: visible=${mesh.visible}, parent=${mesh.parent?.name || 'root'}`);
    } else {
      console.warn(`  ${clothingName}: NOT FOUND`);
    }
  });
  console.groupEnd();
  
  // STEP 2: STRICT RESET - Hide ALL clothing meshes
  console.log('[Visibility] STEP 2: Hiding all clothing...');
  ALL_CLOTHING_NAMES.forEach((meshName) => {
    const mesh = meshMap.get(meshName);
    if (mesh) {
      const wasBefore = mesh.visible;
      mesh.visible = false;
      const isAfter = mesh.visible;
      console.log(`  Hidden: ${meshName} (was ${wasBefore}, now ${isAfter})`);
      
      // CRITICAL: Verify it actually changed
      if (wasBefore === true && isAfter === false) {
        // Good, it worked
      } else if (wasBefore === false && isAfter === false) {
        // Already hidden, that's fine
      } else {
        console.error(`  ⚠️ WARNING: ${meshName} failed to hide! Still ${isAfter}`);
      }
    }
  });
  
  // STEP 3: Show ONLY selected items
  console.log('[Visibility] STEP 3: Showing selected items...');
  const meshesToShow = new Set();
  activeGroups.forEach((groupName) => {
    const groupMeshes = CLOTHING_GROUPS[groupName] || [];
    groupMeshes.forEach((meshName) => {
      meshesToShow.add(meshName);
    });
  });
  
  meshesToShow.forEach((meshName) => {
    const mesh = meshMap.get(meshName);
    if (mesh) {
      mesh.visible = true;
      console.log(`  Showed: ${meshName}`);
    } else {
      console.warn(`  Mesh not found: ${meshName}`);
    }
  });
  
  // STEP 4: Always show body
  console.log('[Visibility] STEP 4: Showing body...');
  const bodyMesh = meshMap.get('Female base');
  if (bodyMesh) {
    bodyMesh.visible = true;
    console.log('  Showed: Female base');
  } else {
    console.warn('[Visibility] Body mesh not found: Female base');
  }
  
  // STEP 5: EXTRA CHECK - Force bottoms to be hidden except selected
  console.log('[Visibility] STEP 5: Extra bottom enforcement...');
  BOTTOM_MESH_NAMES.forEach((bottomMeshName) => {
    const mesh = meshMap.get(bottomMeshName);
    if (mesh) {
      const shouldBeVisible = meshesToShow.has(bottomMeshName);
      if (shouldBeVisible !== mesh.visible) {
        console.warn(`  FIXING: ${bottomMeshName} should be ${shouldBeVisible} but is ${mesh.visible}`);
        mesh.visible = shouldBeVisible;
      }
    }
  });
  
  // Log final visibility state
  console.group('[Visibility] FINAL STATE - VERIFICATION PASS');
  const visibleClothing = Array.from(meshMap.entries())
    .filter(([name, mesh]) => mesh.visible && ALL_CLOTHING_NAMES.includes(name))
    .map(([name]) => name);
  const hiddenClothing = Array.from(meshMap.entries())
    .filter(([name, mesh]) => !mesh.visible && ALL_CLOTHING_NAMES.includes(name))
    .map(([name]) => name);
  console.log('Visible clothing:', visibleClothing.length > 0 ? visibleClothing : 'None');
  console.log('Hidden clothing count:', hiddenClothing.length);
  console.log('Expected visible count:', meshesToShow.size);
  console.log('Actual visible count:', visibleClothing.length);
  
  // CRITICAL CHECK: Is Pleated Skirt visible when it shouldn't be?
  if (visibleClothing.includes('Pleated Skirt') && !meshesToShow.has('Pleated Skirt')) {
    console.error('🚨 CRITICAL BUG: Pleated Skirt is visible but should be hidden!');
    const mesh = meshMap.get('Pleated Skirt');
    console.error('  Before force: mesh.visible =', mesh.visible);
    mesh.visible = false;
    console.error('  After force: mesh.visible =', mesh.visible);
    
    // VERIFY by re-traversing
    console.error('  Re-checking via scene traverse...');
    scene.traverse((child) => {
      if (child.name === 'Pleated Skirt') {
        console.error('    Found in traverse: name=' + child.name + ', visible=' + child.visible);
      }
    });
  }
  console.groupEnd();
}

function cloneMaterialSafely(material) {
  if (!material) return material;
  if (Array.isArray(material)) return material.map((entry) => cloneMaterialSafely(entry));
  if (typeof material.clone === 'function') {
    const m = material.clone();
    if (m.color?.isColor) m.userData.originalColor = m.color.clone();
    return m;
  }
  if (material.color?.isColor && material.userData && !material.userData.originalColor) {
    material.userData.originalColor = material.color.clone();
  }
  return material;
}

function getMaterials(material) {
  if (!material) return [];
  return Array.isArray(material) ? material.filter(Boolean) : [material];
}

function collectMaterialsFromMeshes(meshNames, meshRefs) {
  return meshNames.flatMap((name) => getMaterials(meshRefs[name]?.material));
}

function applyMaterialColorToMaterials(materials, color) {
  materials.forEach((material) => {
    if (!material?.color?.isColor) return;
    if (color) material.color.set(color);
    else if (material.userData.originalColor?.isColor) material.color.copy(material.userData.originalColor);
    material.needsUpdate = true;
  });
}

function restoreOriginalMaterialColors(materials) {
  materials.forEach((material) => {
    if (!material?.color?.isColor || !material.userData.originalColor?.isColor) return;
    material.color.copy(material.userData.originalColor);
    material.needsUpdate = true;
  });
}

function GradientBackground() {
  const meshRef = useRef();
  
  return (
    <mesh ref={meshRef} scale={1000}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#ADD8E6" side={THREE.BackSide} />
    </mesh>
  );
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
  selectedBottom = null,
  clothingColor = null,
  topColor = null,
  sleeveColor = null,
  bottomColor = null,
  resetVersion = 0,
}) {
  const controlsRef = useRef();
  const sceneGroupRef = useRef();
  const camera = useThree((s) => s.camera);

  const fashionSrc = useGLTF('/models/fashion.glb').scene;
  const masterSrc = useGLTF('/models/master.glb').scene;
  const hasSelections = Boolean(selectedBody || selectedSleeve || selectedBottom);

  const { scene: activeScene, isFashion } = useMemo(() => {
    console.log('[FashionScene] Creating scene - hasSelections:', hasSelections, { selectedBody, selectedSleeve, selectedBottom });
    if (!hasSelections) {
      const s = fashionSrc.clone(true);
      s.visible = true;
      console.log('[FashionScene] Using fashion.glb (no selections)');
      return { scene: s, isFashion: true };
    }
    const s = masterSrc.clone(true);
    s.visible = true;
    
    // Count meshes to verify scene loaded
    let meshCount = 0;
    s.traverse((child) => {
      if (child.isMesh) meshCount++;
      if (!child.isMesh) return;
      child.material = cloneMaterialSafely(child.material);
    });
    
    console.log('[FashionScene] Using master.glb (has selections) - meshCount:', meshCount);
    if (meshCount < 10) {
      console.warn('[FashionScene] WARNING: Scene may not be fully loaded! Expected ~14 meshes, got:', meshCount);
    }
    return { scene: s, isFashion: false };
  }, [fashionSrc, masterSrc, hasSelections, selectedBody, selectedSleeve, selectedBottom]);

  const activeGroups = useMemo(
    () => getActiveGroups(selectedBody, selectedSleeve, selectedBottom),
    [selectedBody, selectedSleeve, selectedBottom]
  );

  useEffect(() => {
    console.log('[Visibility Effect] Running - isFashion:', isFashion, 'hasSelections:', hasSelections);
    if (isFashion) {
      console.log('[Visibility Effect] Skipping - using fashion.glb');
      return;
    }
    
    // Check if scene is fully loaded
    let meshCount = 0;
    const foundMeshes = [];
    activeScene.traverse((child) => {
      if (child.isMesh) {
        meshCount++;
        foundMeshes.push(child.name);
      }
    });
    
    console.log('[Visibility Effect] Found meshes:', foundMeshes);
    console.log('[Visibility Effect] meshCount:', meshCount);
    
    if (meshCount < 10) {
      console.warn('[Visibility Effect] Skipping - scene not fully loaded yet. Meshes:', meshCount, foundMeshes);
      return;
    }
    
    console.log('[Visibility Effect] Scene ready! Applying visibility logic');
    // Validate mesh names on first load
    validateMeshNames(activeScene);
    
    // Log selected outfit state
    console.group('[FashionScene] Outfit Selection State');
    console.log({
      selectedBody,
      selectedSleeve,
      selectedBottom,
      activeGroups,
      hasSelections,
    });
    console.groupEnd();
    
    applyVisibility(activeScene, activeGroups);
    
    // Log result
    console.log('[FashionScene] Visibility applied successfully');
  }, [activeScene, activeGroups, isFashion, selectedBody, selectedSleeve, selectedBottom, hasSelections]);

  const clothingMeshRefs = useRef({});
  const materialGroupsRef = useRef({
    topMaterials: [], sleeveMaterials: [],
    sleeveMaterialsByGroup: { half_sleeve: [], full_sleeve: [] },
    bottomMaterials: [], bottomMaterialsByGroup: {},
  });

  useEffect(() => {
    if (isFashion) return;
    const refs = {};
    activeScene.traverse((child) => {
      if (child.isMesh && ALL_CLOTHING_NAMES.includes(child.name)) {
        refs[child.name] = child;
      }
    });
    clothingMeshRefs.current = refs;

    const bottomMaterialsByGroup = {};
    BOTTOM_GROUP_KEYS.forEach((key) => {
      bottomMaterialsByGroup[key] = collectMaterialsFromMeshes(CLOTHING_GROUPS[key] || [], refs);
    });
    materialGroupsRef.current = {
      topMaterials: collectMaterialsFromMeshes(TOP_MESH_NAMES, refs),
      sleeveMaterials: collectMaterialsFromMeshes(SLEEVE_MESH_NAMES, refs),
      sleeveMaterialsByGroup: {
        half_sleeve: collectMaterialsFromMeshes(CLOTHING_GROUPS.half_sleeve, refs),
        full_sleeve: collectMaterialsFromMeshes(CLOTHING_GROUPS.full_sleeve, refs),
      },
      bottomMaterials: collectMaterialsFromMeshes(BOTTOM_MESH_NAMES, refs),
      bottomMaterialsByGroup,
    };
  }, [activeScene, isFashion]);

  useEffect(() => {
    if (isFashion) return;
    const resolvedTopColor = topColor || clothingColor;
    const { topMaterials, sleeveMaterialsByGroup, bottomMaterialsByGroup, bottomMaterials } = materialGroupsRef.current;
    const sleeves = activeGroups.filter((g) => g === 'half_sleeve' || g === 'full_sleeve');
    const activeSleeveMaterials = sleeves.flatMap((g) => sleeveMaterialsByGroup[g] || []);
    const activeBottomMaterials = selectedBottom && CLOTHING_GROUPS[selectedBottom]
      ? (bottomMaterialsByGroup[selectedBottom] || bottomMaterials) : [];

    applyMaterialColorToMaterials(topMaterials, resolvedTopColor);
    restoreOriginalMaterialColors(materialGroupsRef.current.sleeveMaterials);
    applyMaterialColorToMaterials(activeSleeveMaterials, sleeveColor);
    restoreOriginalMaterialColors(bottomMaterials);
    applyMaterialColorToMaterials(activeBottomMaterials, bottomColor);
  }, [activeScene, activeGroups, topColor, sleeveColor, bottomColor, clothingColor, resetVersion, isFashion, selectedBottom]);

  useEffect(() => {
    if (isFashion || resetVersion === 0) return;
    restoreOriginalMaterialColors([
      ...materialGroupsRef.current.topMaterials,
      ...materialGroupsRef.current.sleeveMaterials,
      ...materialGroupsRef.current.bottomMaterials,
    ]);
  }, [resetVersion, isFashion]);

  useEffect(() => {
    if (!camera) return;
    camera.position.set(0, 0.5, 5.5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <GradientBackground />
      <ambientLight intensity={0.55} color="#A7C7E7" />
      <directionalLight position={[5, 7, 4]} intensity={1.6} castShadow color="#ffffff" />
      <directionalLight position={[-4, 3, -3]} intensity={0.7} color="#5DA9A6" />
      <directionalLight position={[0, -2, 6]} intensity={0.4} color="#E8DCCB" />
      <spotLight position={[0, 6, 2]} angle={0.3} intensity={0.5} penumbra={1} color="#A7C7E7" />
      <Environment preset="studio" />
      <group ref={sceneGroupRef}>
        <group position={[0, -0.9, 0]}>
          <primitive object={activeScene} scale={1} />
        </group>
      </group>
      <ContactShadows position={[0, -1.2, 0]} opacity={0.35} scale={7} blur={3} far={3} />
      <GroundPlane />
      <OrbitControls
        ref={controlsRef}
        enableDamping dampingFactor={0.08}
        minDistance={1.0} maxDistance={10}
        minPolarAngle={0.05} maxPolarAngle={Math.PI / 2.05}
        enablePan={false}
        autoRotate={autoRotate} autoRotateSpeed={1.0}
        target={[0, 0, 0]}
      />
    </>
  );
}
