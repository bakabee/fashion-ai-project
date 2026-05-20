import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const patternSections = [
  {
    title: 'Front Panel',
    description: 'Main front piece of the garment',
    steps: [
      'Measure from shoulder to hem',
      'Mark key reference points',
      'Cut along pattern lines',
    ],
  },
  {
    title: 'Back Panel',
    description: 'Supporting back structure',
    steps: [
      'Mirror front panel measurements',
      'Add seam allowances',
      'Prepare for assembly',
    ],
  },
  {
    title: 'Sleeves',
    description: 'Arm coverage pieces',
    steps: [
      'Calculate circumference',
      'Add ease for movement',
      'Create armhole matches',
    ],
  },
  {
    title: 'Collar',
    description: 'Neckline finishing',
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
          <h1 className="font-display text-5xl md:text-6xl font-bold text-dark-800 mb-4">
            Pattern Guides
          </h1>
          <p className="text-dark-500 text-lg">
            Step-by-step sewing patterns and guides for your design
          </p>
        </motion.div>

        {/* Pattern Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {patternSections.map((section, index) => (
            <motion.div
              key={section.title}
              className="pattern-card bg-white border border-black/5 shadow-sm rounded-2xl p-8"
              whileHover={{ scale: 1.02 }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{section.icon}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-dark-800">{section.title}</h2>
                  <p className="text-dark-400 mt-1">{section.description}</p>
                </div>
              </div>

              {/* Pattern Diagram Placeholder */}
              <div className="bg-gradient-to-br from-dark-50 to-dark-100 rounded-lg h-48 mb-6 flex items-center justify-center border border-black/5">
                <div className="text-center">
                  <div className="text-6xl mb-2">{section.icon}</div>
                  <p className="text-dark-400 text-sm">2D Pattern Diagram</p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                <h3 className="font-bold text-dark-800 mb-4">Sewing Steps:</h3>
                {section.steps.map((step, stepIndex) => (
                  <motion.div
                    key={stepIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: stepIndex * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-dark-800 flex items-center justify-center text-xs font-bold text-white">
                      {stepIndex + 1}
                    </div>
                    <p className="text-dark-600 pt-0.5">{step}</p>
                  </motion.div>
                ))}
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 py-3 rounded-lg bg-dark-800 text-white font-semibold transition-all hover:bg-dark-900"
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
          className="bg-white border border-black/5 shadow-sm rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold text-dark-800 mb-6 flex items-center gap-3">
            <span>🪡</span> Assembly Guide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {['Prepare', 'Attach Sleeves', 'Add Collar', 'Final Stitching'].map(
              (stage, index) => (
                <div key={stage} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-dark-800 text-white font-bold mb-3">
                    {index + 1}
                  </div>
                  <p className="text-dark-800 font-semibold">{stage}</p>
                  {index < 3 && (
                    <div className="text-dark-300 text-2xl mt-2">→</div>
                  )}
                </div>
              )
            )}
          </div>

          <p className="text-dark-500 leading-relaxed">
            Follow the numbered stages to assemble your design. Ensure all seams are properly
            aligned and secured before proceeding to the next stage. Use quality thread and
            appropriate needle sizes for your chosen fabric. Professional finishing techniques
            will ensure your design looks polished and professional.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 py-4 px-8 rounded-xl bg-black text-white font-bold transition-all hover:bg-dark-800"
          >
            Download Full Guide
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
