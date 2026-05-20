import { Suspense, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useProgress, Html } from '@react-three/drei';
import { gsap } from 'gsap';
import FashionScene from './FashionScene';

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
    <div ref={containerRef} className="min-h-screen bg-luxury-bg pt-24 md:pt-28 pb-12 md:pb-16">
      <div className="section-padding max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 viewer-header"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-dark-800 mb-2">
            3D Viewer
          </h1>
          <p className="text-dark-500 text-base">
            Interactive fashion model visualization
          </p>
        </motion.div>

        <div className="viewer-canvas-wrap bg-white border border-black/5 rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="relative w-full" style={{ aspectRatio: '16 / 10' }}>
            <Canvas
              camera={{ position: [0, 1.8, 3.5], fov: 28 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: false, outputColorSpace: 'srgb' }}
              shadows
              onCreated={({ gl }) => {
                gl.setClearColor('#f5f5f5');
                gl.toneMapping = 3;
                gl.toneMappingExposure = 1.1;
              }}
            >
              <Suspense fallback={<Loader />}>
                <FashionScene autoRotate={autoRotate} />
              </Suspense>
            </Canvas>

            <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-[10px] tracking-[0.15em] uppercase text-dark-400 font-medium">
                Live Preview
              </span>
            </div>
          </div>
        </div>

        <div ref={controlsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { icon: '↔', label: 'Drag to Rotate', desc: 'Left click & drag' },
            { icon: '⊕', label: 'Scroll to Zoom', desc: 'Pinch or scroll wheel' },
            { icon: '⟳', label: 'Auto Rotate', desc: autoRotate ? 'Active' : 'Paused' },
            { icon: '◻', label: 'Studio Lighting', desc: 'Professional setup' },
          ].map((ctrl) => (
            <div key={ctrl.label} className="bg-white border border-black/5 rounded-xl p-3 md:p-4 text-center">
              <p className="text-sm mb-1 text-dark-400">{ctrl.icon}</p>
              <p className="text-[11px] font-semibold text-dark-700 uppercase tracking-wider">{ctrl.label}</p>
              <p className="text-[9px] text-dark-500 mt-0.5">{ctrl.desc}</p>
            </div>
          ))}
        </div>

        <div ref={actionsRef} className="flex flex-col md:flex-row gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setAutoRotate(!autoRotate)}
            className="flex-1 py-3 rounded-xl bg-black text-white text-sm font-medium tracking-wider uppercase hover:bg-dark-800 transition-all"
          >
            {autoRotate ? 'Pause Rotation' : 'Resume Rotation'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.reload()}
            className="flex-1 py-3 rounded-xl bg-white border border-black/10 text-dark-700 text-sm font-medium tracking-wider uppercase hover:bg-dark-50 hover:border-black/20 transition-all"
          >
            Reset View
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const canvas = document.querySelector('canvas');
              if (canvas) {
                const link = document.createElement('a');
                link.download = 'fashion-preview.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
              }
            }}
            className="flex-1 py-3 rounded-xl bg-white border border-black/10 text-dark-700 text-sm font-medium tracking-wider uppercase hover:bg-dark-50 hover:border-black/20 transition-all"
          >
            Screenshot
          </motion.button>
        </div>
      </div>
    </div>
  );
}
