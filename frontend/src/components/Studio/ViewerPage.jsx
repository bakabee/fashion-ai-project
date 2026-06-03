import { Suspense, useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useProgress, Html } from '@react-three/drei';
import { gsap } from 'gsap';
import FashionScene from './FashionScene';

const colorPalettes = [
  {
    label: 'Pastel',
    colors: [
      { name: 'Powder Rose', hex: '#F8BBD0' },
      { name: 'Runway Pink', hex: '#F48FB1' },
      { name: 'Soft Orchid', hex: '#CE93D8' },
      { name: 'Lilac Drape', hex: '#B39DDB' },
      { name: 'Sky Atelier', hex: '#81D4FA' },
    ],
  },
  {
    label: 'Luxury Neutral',
    colors: [
      { name: 'Noir', hex: '#1C1C1C' },
      { name: 'Graphite', hex: '#2C2C2C' },
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Cashmere', hex: '#D7CCC8' },
      { name: 'Optic White', hex: '#FFFFFF' },
    ],
  },
  {
    label: 'Trendy',
    colors: [
      { name: 'Coral Flash', hex: '#FF6B6B' },
      { name: 'Aqua Pop', hex: '#4ECDC4' },
      { name: 'Lemon Vinyl', hex: '#FFE66D' },
      { name: 'Electric Violet', hex: '#6C5CE7' },
      { name: 'Mint Signal', hex: '#00B894' },
    ],
  },
  {
    label: 'Earthy',
    colors: [
      { name: 'Taupe', hex: '#A1887F' },
      { name: 'Cocoa', hex: '#8D6E63' },
      { name: 'Clay Silk', hex: '#D7CCC8' },
      { name: 'Sage', hex: '#81C784' },
      { name: 'Warm Ivory', hex: '#FFF3E0' },
    ],
  },
];

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-dark-300 border-t-dark-600 rounded-full animate-spin" />
        <p className="text-xs tracking-[0.15em] uppercase text-dark-500 font-mono">
          {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  );
}

export default function ViewerPage() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const controlsRef = useRef(null);
  const paletteRef = useRef(null);
  const navRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const rawSelectedBody = searchParams.get('body') || null;
  const selectedSleeve = searchParams.get('sleeve') || null;
  const selectedBottom = searchParams.get('bottom') || null;
  const selectedBody = rawSelectedBody === 'boat_bandeau' ? rawSelectedBody : null;
  const [autoRotate, setAutoRotate] = useState(true);
  const [clothingColor, setClothingColor] = useState(null);
  const [topColor, setTopColor] = useState(searchParams.get('topColor') || null);
  const [sleeveColor, setSleeveColor] = useState(searchParams.get('sleeveColor') || null);
  const [bottomColor, setBottomColor] = useState(searchParams.get('bottomColor') || null);
  const [resetVersion, setResetVersion] = useState(0);

  useEffect(() => {
    setClothingColor(null);
  }, [selectedBody, selectedSleeve, selectedBottom]);

  useEffect(() => {
    const noOutfitSelected = !selectedBody && !selectedSleeve && !selectedBottom;
    console.groupCollapsed('[ViewerPage] incoming outfit state');
    console.log('Raw query state from design page:', {
      body: rawSelectedBody,
      sleeve: selectedSleeve,
      bottom: selectedBottom,
      top: searchParams.get('top'),
      topSelected: searchParams.get('topSelected'),
      explicitTop: searchParams.get('explicitTop'),
    });
    console.log('Normalized 3D outfit state:', {
      selectedBody,
      selectedSleeve,
      selectedBottom,
    });
    if (noOutfitSelected) {
      console.log('NO OUTFIT SELECTED');
    }
    console.groupEnd();
  }, [rawSelectedBody, selectedBody, selectedSleeve, selectedBottom, searchParams]);

  const updateColorParam = (param, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(param, value);
    } else {
      next.delete(param);
    }
    setSearchParams(next, { replace: true });
  };

  const handleTopColor = (hex) => {
    const next = topColor === hex ? null : hex;
    setTopColor(next);
    updateColorParam('topColor', next);
  };

  const handleSleeveColor = (hex) => {
    const next = sleeveColor === hex ? null : hex;
    setSleeveColor(next);
    updateColorParam('sleeveColor', next);
  };

  const handleBottomColor = (hex) => {
    const next = bottomColor === hex ? null : hex;
    setBottomColor(next);
    updateColorParam('bottomColor', next);
  };

  const resetViewerState = () => {
    setTopColor(null);
    setSleeveColor(null);
    setBottomColor(null);
    setClothingColor(null);
    setResetVersion((version) => version + 1);
    const next = new URLSearchParams(searchParams);
    next.delete('topColor');
    next.delete('sleeveColor');
    next.delete('bottomColor');
    setSearchParams(next, { replace: true });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, { duration: 0.8, y: 50, opacity: 0, ease: 'power3.out' });
      gsap.from('.viewer-canvas-wrap', { duration: 1, y: 60, opacity: 0, ease: 'power3.out', delay: 0.15 });
      gsap.from(controlsRef.current?.children || [], { duration: 0.8, y: 40, opacity: 0, stagger: 0.08, ease: 'power3.out', delay: 0.3 });
      gsap.from(paletteRef.current, { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out', delay: 0.45 });
      gsap.from(navRef.current?.children || [], { duration: 0.8, y: 30, opacity: 0, stagger: 0.05, ease: 'power3.out', delay: 0.6 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const displayLabel = selectedSleeve === 'half_sleeve' ? 'Half Sleeves'
    : selectedSleeve === 'full_sleeve' ? 'Full Fitted Sleeves'
    : selectedBody === 'boat_bandeau' ? 'Boat Bandeau Body'
    : selectedBottom ? selectedBottom.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : 'Naked Mannequin';

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-offWhite via-beige-200/20 to-teal-400/10 pt-24 md:pt-28 pb-12 md:pb-16">
      <div className="section-padding max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal-800 mb-1">
              Virtual Try-On
            </h1>
            <p className="text-dark-500 text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 inline-block" />
              {displayLabel}
            </p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="hidden md:flex px-5 py-2.5 rounded-lg bg-white/80 border border-teal-400/20 text-dark-600 text-sm font-medium tracking-wider uppercase hover:bg-white hover:border-teal-400/30 transition-all items-center gap-2"
          >
            Back to Design
          </button>
        </div>

        <div className="viewer-canvas-wrap bg-white/90 border border-teal-400/20 rounded-2xl shadow-sm overflow-hidden mb-4">
          <div className="relative w-full" style={{ aspectRatio: '16 / 10' }}>
            <Canvas
              camera={{ position: [0, 1.2, 4.5], fov: 28 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: false, outputColorSpace: 'srgb' }}
              shadows
              onCreated={({ gl }) => {
                gl.setClearColor('#F6F4F1');
                gl.toneMapping = 3;
                gl.toneMappingExposure = 1.1;
              }}
            >
              <Suspense fallback={<Loader />}>
                <FashionScene 
                  autoRotate={autoRotate} 
                  selectedBody={selectedBody}
                  selectedSleeve={selectedSleeve}
                  selectedBottom={selectedBottom}
                  clothingColor={clothingColor}
                  topColor={topColor}
                  sleeveColor={sleeveColor}
                  bottomColor={bottomColor}
                  resetVersion={resetVersion}
                />
              </Suspense>
            </Canvas>
          </div>
        </div>

        <div ref={controlsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[
            { icon: '↔', label: 'Drag to Rotate', desc: 'Left click and drag' },
            { icon: '⊕', label: 'Scroll to Zoom', desc: 'Pinch or scroll wheel' },
            { icon: '⟳', label: 'Auto Rotate', desc: autoRotate ? 'Active' : 'Paused' },
            { icon: '◻', label: 'Studio Lighting', desc: 'Professional setup' },
          ].map((ctrl) => (
            <div key={ctrl.label} className="bg-white/80 border border-teal-400/20 rounded-xl p-3 md:p-4 text-center backdrop-blur-sm">
              <p className="text-sm mb-1 text-teal-400">{ctrl.icon}</p>
              <p className="text-[11px] font-semibold text-charcoal-800 uppercase tracking-wider">{ctrl.label}</p>
              <p className="text-[9px] text-dark-500 mt-0.5">{ctrl.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setAutoRotate(!autoRotate)}
            className="flex-1 py-3 rounded-xl bg-charcoal-800 text-white text-sm font-medium tracking-wider uppercase hover:bg-charcoal-900 transition-all"
          >
            {autoRotate ? 'Pause Rotation' : 'Resume Rotation'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const canvas = document.querySelector('canvas');
              if (canvas) {
                const link = document.createElement('a');
                link.download = `fashion-${selectedSleeve || 'body'}-preview.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
              }
            }}
            className="flex-1 py-3 rounded-xl bg-white/80 border border-teal-400/20 text-charcoal-700 text-sm font-medium tracking-wider uppercase hover:bg-white hover:border-teal-400/30 transition-all"
          >
            Screenshot
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetViewerState}
            className="flex-1 py-3 rounded-xl bg-white/80 border border-rose-300/40 text-charcoal-700 text-sm font-medium tracking-wider uppercase hover:bg-white hover:border-rose-300/70 transition-all"
          >
            Reset
          </motion.button>
        </div>

        <div ref={paletteRef} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] tracking-[0.2em] uppercase text-dark-500 font-medium">
              Color Customization
            </p>
            {(topColor || sleeveColor || bottomColor) && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={resetViewerState}
                className="text-[9px] tracking-wider uppercase text-dark-400 hover:text-dark-600 transition-colors px-3 py-1 rounded-lg border border-teal-400/15 hover:border-teal-400/30"
              >
                Reset All
              </motion.button>
            )}
          </div>
          <div className="space-y-5">
            <div>
              <p className="text-[9px] tracking-[0.15em] uppercase text-dark-400 font-medium mb-3">
                Top / Body Color
              </p>
              <div className="space-y-3">
                {colorPalettes.map((group) => (
                  <div key={group.label}>
                    <p className="text-[8px] tracking-[0.15em] uppercase text-dark-500 mb-2 opacity-70">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {group.colors.map((swatch) => (
                        <motion.button
                          key={`top-${swatch.hex}`}
                          whileHover={{ scale: 1.12, y: -2 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => handleTopColor(swatch.hex)}
                          className="flex flex-col items-center gap-1.5"
                        >
                          <div
                            className={`w-7 h-7 rounded-full border-2 transition-all ${
                              topColor === swatch.hex
                                ? 'border-charcoal-800 shadow-lg scale-110'
                                : 'border-teal-400/20 hover:border-teal-400/40'
                            }`}
                            style={{ backgroundColor: swatch.hex }}
                          />
                          <span className="text-[6px] tracking-wide text-dark-400 text-center leading-tight">
                            {swatch.name}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-teal-400/15 pt-4">
              <p className="text-[9px] tracking-[0.15em] uppercase text-dark-400 font-medium mb-3">
                Sleeves Color
              </p>
              <div className="space-y-3">
                {colorPalettes.map((group) => (
                  <div key={`sleeve-${group.label}`}>
                    <p className="text-[8px] tracking-[0.15em] uppercase text-dark-500 mb-2 opacity-70">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {group.colors.map((swatch) => (
                        <motion.button
                          key={`sleeve-${swatch.hex}`}
                          whileHover={{ scale: 1.12, y: -2 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => handleSleeveColor(swatch.hex)}
                          className="flex flex-col items-center gap-1.5"
                        >
                          <div
                            className={`w-7 h-7 rounded-full border-2 transition-all ${
                              sleeveColor === swatch.hex
                                ? 'border-charcoal-800 shadow-lg scale-110'
                                : 'border-teal-400/20 hover:border-teal-400/40'
                            }`}
                            style={{ backgroundColor: swatch.hex }}
                          />
                          <span className="text-[6px] tracking-wide text-dark-400 text-center leading-tight">
                            {swatch.name}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-teal-400/15 pt-4">
              <p className="text-[9px] tracking-[0.15em] uppercase text-dark-400 font-medium mb-3">
                Bottoms Color
              </p>
              <div className="space-y-3">
                {colorPalettes.map((group) => (
                  <div key={`bottom-${group.label}`}>
                    <p className="text-[8px] tracking-[0.15em] uppercase text-dark-500 mb-2 opacity-70">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {group.colors.map((swatch) => (
                        <motion.button
                          key={`bottom-${swatch.hex}`}
                          whileHover={{ scale: 1.12, y: -2 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => handleBottomColor(swatch.hex)}
                          className="flex flex-col items-center gap-1.5"
                        >
                          <div
                            className={`w-7 h-7 rounded-full border-2 transition-all ${
                              bottomColor === swatch.hex
                                ? 'border-charcoal-800 shadow-lg scale-110'
                                : 'border-teal-400/20 hover:border-teal-400/40'
                            }`}
                            style={{ backgroundColor: swatch.hex }}
                          />
                          <span className="text-[6px] tracking-wide text-dark-400 text-center leading-tight">
                            {swatch.name}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
