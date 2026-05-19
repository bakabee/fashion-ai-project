import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const patternSections = [
  {
    title: 'Front Panel',
    description: 'Main front piece of the garment',
    icon: '□',
    steps: [
      'Measure from shoulder to hem',
      'Mark key reference points',
      'Cut along pattern lines',
    ],
  },
  {
    title: 'Back Panel',
    description: 'Supporting back structure',
    icon: '◇',
    steps: [
      'Mirror front panel measurements',
      'Add seam allowances',
      'Prepare for assembly',
    ],
  },
  {
    title: 'Sleeves',
    description: 'Arm coverage pieces',
    icon: '◆',
    steps: [
      'Calculate circumference',
      'Add ease for movement',
      'Create armhole matches',
    ],
  },
  {
    title: 'Collar',
    description: 'Neckline finishing',
    icon: '◠',
    steps: [
      'Measure neckline',
      'Cut facing pieces',
      'Prepare collar attachment',
    ],
  },
];

export default function PatternsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pattern-card', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-luxury-bg pt-32 pb-16">
      <div className="section-padding max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Pattern Guides
          </h1>
          <p className="text-gray-400 text-lg">
            Step-by-step sewing patterns and guides for your design
          </p>
        </motion.div>

        {/* Pattern Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {patternSections.map((section, index) => (
            <motion.div
              key={section.title}
              className="pattern-card glass-effect rounded-2xl p-8 backdrop-blur-xl"
              whileHover={{ scale: 1.02 }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{section.icon}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  <p className="text-gray-400 mt-1">{section.description}</p>
                </div>
              </div>

              {/* Pattern Diagram Placeholder */}
              <div className="bg-gradient-to-br from-fashionPurple/10 to-fashionPink/10 rounded-lg h-48 mb-6 flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <div className="text-6xl mb-2">{section.icon}</div>
                  <p className="text-gray-400 text-sm">2D Pattern Diagram</p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                <h3 className="font-bold text-white mb-4">Sewing Steps:</h3>
                {section.steps.map((step, stepIndex) => (
                  <motion.div
                    key={stepIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: stepIndex * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-fashionPurple to-fashionPink flex items-center justify-center text-xs font-bold text-white">
                      {stepIndex + 1}
                    </div>
                    <p className="text-gray-300 pt-0.5">{step}</p>
                  </motion.div>
                ))}
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold transition-all border border-white/10"
              >
                Download PDF
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Assembly Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-12 backdrop-blur-xl"
        >
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🪡</span> Assembly Guide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {['Prepare', 'Attach Sleeves', 'Add Collar', 'Final Stitching'].map(
              (stage, index) => (
                <div key={stage} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-fashionPurple to-fashionPink text-white font-bold mb-3">
                    {index + 1}
                  </div>
                  <p className="text-white font-semibold">{stage}</p>
                  {index < 3 && (
                    <div className="text-fashionPurple text-2xl mt-2">→</div>
                  )}
                </div>
              )
            )}
          </div>

          <p className="text-gray-300 leading-relaxed">
            Follow the numbered stages to assemble your design. Ensure all seams are properly
            aligned and secured before proceeding to the next stage. Use quality thread and
            appropriate needle sizes for your chosen fabric. Professional finishing techniques
            will ensure your design looks polished and professional.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 py-4 px-8 rounded-xl bg-gradient-to-r from-fashionPurple to-fashionPink text-white font-bold transition-all hover:shadow-xl hover:shadow-fashionPurple/50"
          >
            Download Full Guide
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
