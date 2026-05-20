import { Suspense, useRef, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useProgress, Html } from '@react-three/drei';
import { gsap } from 'gsap';
import FashionScene from './FashionScene';

const modelNames = {
  top1: 'Top 1',
  top2: 'Top 2',
  top3: 'Top 3',
  shorts: 'Shorts',
  sleeveless: 'Sleeveless Sweater',
  sleeved: 'Sleeved Sweater',
};

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
  const controlsRef = useRef(null);
  const actionsRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const modelId = searchParams.get('model') || 'top1';
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.viewer-header', {
        duration: 0.8, y: 50, opacity: 0, ease: 'power3.out',
      });
      gsap.from('.viewer-canvas-wrap', {
        duration: 1, y: 60, opacity: 0, ease: 'power3.out', delay: 0.15,
      });
      gsap.from(controlsRef.current?.children || [], {
        duration: 0.8, y: 40, opacity: 0, stagger: 0.08, ease: 'power3.out', delay: 0.3,
      });
      gsap.from(actionsRef.current?.children || [], {
        duration: 0.8, y: 30, opacity: 0, stagger: 0.06, ease: 'power3.out', delay: 0.5,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-offWhite via-beige-200/20 to-teal-400/10 pt-24 md:pt-28 pb-12 md:pb-16">
      <div className="section-padding max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 viewer-header"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal-800 mb-2">
                3D Viewer
              </h1>
              <p className="text-dark-500 text-base">
                {modelNames[modelId] || 'Fashion Model'}
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
        </motion.div>

        <div className="viewer-canvas-wrap bg-white/90 border border-teal-400/20 rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="relative w-full" style={{ aspectRatio: '16 / 10' }}>
            <Canvas
              camera={{ position: [0, 1.2, 3.2], fov: 30 }}
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

            <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span className="text-[10px] tracking-[0.15em] uppercase text-dark-400 font-medium">
                Live Preview
              </span>
            </div>
          </div>
        </div>

        <div ref={controlsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
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

        <div ref={actionsRef} className="flex flex-col md:flex-row gap-3">
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
          <div className="flex gap-3 flex-1">
            {Object.keys(modelNames).filter((id) => id !== modelId).slice(0, 2).map((id) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/studio/viewer?model=${id}`)}
                className="flex-1 py-3 rounded-xl bg-white/80 border border-teal-400/20 text-charcoal-700 text-[10px] font-medium tracking-wider uppercase hover:bg-white hover:border-teal-400/30 transition-all truncate"
              >
                {modelNames[id]}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
