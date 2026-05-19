import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export default function ViewerPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.viewer-content', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-luxury-bg pt-32 pb-16">
      <div className="section-padding max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            3D Viewer
          </h1>
          <p className="text-gray-400 text-lg">
            Visualize your designs in interactive 3D
          </p>
        </motion.div>

        {/* Viewer Container */}
        <div className="viewer-content">
          {/* Main Viewer */}
          <div className="glass-effect rounded-3xl backdrop-blur-xl overflow-hidden mb-8">
            <div className="aspect-video w-full bg-gradient-to-br from-fashionPurple/10 to-fashionPink/10 flex items-center justify-center relative">
              {/* 3D Preview Placeholder - Ready for Three.js integration */}
              <div className="text-center">
                <div className="text-9xl mb-6 animate-bounce">🧍</div>
                <h2 className="text-4xl font-bold text-white mb-2">3D Mannequin Preview</h2>
                <p className="text-gray-400 text-lg">
                  Three.js integration ready for high-fidelity 3D models
                </p>
              </div>

              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-fashionPurple rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -100, 0],
                      x: [0, Math.random() * 50 - 25, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>🔄</span> Rotation
              </h3>
              <p className="text-gray-400 text-sm">
                Click and drag to rotate the 3D model. Use scroll to zoom in/out.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>💡</span> Lighting
              </h3>
              <p className="text-gray-400 text-sm">
                Professional studio lighting for accurate color and texture visualization.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>📸</span> Export
              </h3>
              <p className="text-gray-400 text-sm">
                Capture screenshots or export your design in multiple formats.
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-4 rounded-xl bg-gradient-to-r from-fashionPurple to-fashionPink text-white font-bold transition-all hover:shadow-xl hover:shadow-fashionPurple/50"
            >
              Download Model
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-4 rounded-xl glass-effect glass-hover text-white font-bold transition-all"
            >
              Share Design
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
