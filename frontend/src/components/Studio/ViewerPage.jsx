import { Suspense, useRef, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useProgress, Html } from '@react-three/drei';
import { gsap } from 'gsap';
import FashionScene from './FashionScene';

const clothingItems = [
  { id: 'top1', name: 'Top 1', image: '/images/top1.jpg' },
  { id: 'top2', name: 'Top 2', image: '/images/top2.png' },
  { id: 'top3', name: 'Top 3', image: '/images/top3.jpg' },
  { id: 'shorts', name: 'Shorts', image: '/images/shorts.jpg' },
  { id: 'sleeveless', name: 'Sleeveless Sweater', image: '/images/ea5f01f0ac1fcd13e8be1ed74f18678a.jpg' },
  { id: 'sleeved', name: 'Sleeved Sweater', image: '/images/sleevedsweater.jpg' },
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
  const navRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const modelId = searchParams.get('model') || 'top1';
  const [autoRotate, setAutoRotate] = useState(true);
  const currentItem = clothingItems.find((i) => i.id === modelId) || clothingItems[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, { duration: 0.8, y: 50, opacity: 0, ease: 'power3.out' });
      gsap.from('.viewer-canvas-wrap', { duration: 1, y: 60, opacity: 0, ease: 'power3.out', delay: 0.15 });
      gsap.from(controlsRef.current?.children || [], { duration: 0.8, y: 40, opacity: 0, stagger: 0.08, ease: 'power3.out', delay: 0.3 });
      gsap.from(navRef.current?.children || [], { duration: 0.8, y: 30, opacity: 0, stagger: 0.05, ease: 'power3.out', delay: 0.5 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

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
              {currentItem.name}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/studio/catalog')}
            className="hidden md:flex px-5 py-2.5 rounded-lg bg-white/80 border border-teal-400/20 text-dark-600 text-sm font-medium tracking-wider uppercase hover:bg-white hover:border-teal-400/30 transition-all items-center gap-2"
          >
            Back to Catalog
          </motion.button>
        </div>

        <div className="viewer-canvas-wrap bg-white/90 border border-teal-400/20 rounded-2xl shadow-sm overflow-hidden mb-4">
          <div className="relative w-full" style={{ aspectRatio: '16 / 10' }}>
            <Canvas
              camera={{ position: [0, 1.8, 4.5], fov: 28 }}
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
                <FashionScene autoRotate={autoRotate} modelId={modelId} />
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
                link.download = `${modelId}-preview.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
              }
            }}
            className="flex-1 py-3 rounded-xl bg-white/80 border border-teal-400/20 text-charcoal-700 text-sm font-medium tracking-wider uppercase hover:bg-white hover:border-teal-400/30 transition-all"
          >
            Screenshot
          </motion.button>
        </div>

        <div ref={navRef}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-dark-500 mb-3 font-medium">
            Try another garment
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {clothingItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/studio/viewer?model=${item.id}`)}
                className={`rounded-xl overflow-hidden border-2 transition-all ${
                  modelId === item.id
                    ? 'border-teal-400 shadow-lg'
                    : 'border-transparent hover:border-teal-400/30'
                }`}
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-teal-400/5 via-beige-200/20 to-skyBlue-200/15">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`py-1.5 px-1.5 text-center ${modelId === item.id ? 'bg-teal-400/10' : 'bg-white/60'}`}>
                  <p className={`text-[9px] font-medium truncate ${modelId === item.id ? 'text-teal-600' : 'text-dark-600'}`}>
                    {item.name}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}