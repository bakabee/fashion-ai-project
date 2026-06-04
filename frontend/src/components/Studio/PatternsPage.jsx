import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useSearchParams } from 'react-router-dom';

const sleeveStitchPatterns = {
  'half_sleeve': {
    image: '/images/stitch patterns/half_sleeve_stitch.svg',
    title: 'Half Sleeve',
    description: 'Cut 2 (Mirror)',
    steps: [
      'Use this pattern for both sleeves.',
      'Cut 2 mirrored fabric pieces.',
      'Dotted line indicates where to stitch.',
      'Sew each sleeve along its seam.',
      'Attach sleeves to the armhole of the bodice.',
      'Finish sleeve hem.',
    ],
  },
  'full_sleeve': {
    image: '/images/stitch patterns/full_sleeve_stitch.svg',
    title: 'Full Sleeve',
    description: 'Cut 2 (Mirror)',
    steps: [
      'Use this pattern for both sleeves.',
      'Cut 2 mirrored fabric pieces.',
      'Dotted line indicates where to stitch.',
      'Sew each sleeve seam with slight curve.',
      'Add dart for sleeve cap.',
      'Attach sleeves to the armhole of the bodice.',
      'Finish sleeve hem.',
    ],
  },
};

const frontPanelStitchPatterns = {
  'boat_bandeau': {
    image: '/images/stitch patterns/boat_bandeau_front_stitch.svg',
    title: 'Boat Bandeau Front',
    description: 'Cut 1 on fold — Front bodice piece',
    steps: [
      'Fold fabric in half along the grainline.',
      'Place pattern on fold as indicated.',
      'Trace around pattern with tailor\'s chalk.',
      'Cut along traced lines through both layers.',
      'Dotted line indicates where to stitch.',
      'Mark dart and notch positions.',
      'Stay-stitch neckline curve to prevent stretching.',
    ],
  },
};

const backPanelStitchPatterns = {
  'boat_bandeau': {
    image: '/images/stitch patterns/boat_bandeau_back_stitch.svg',
    title: 'Boat Bandeau Back',
    description: 'Cut 1 on fold — Back bodice piece',
    steps: [
      'Fold fabric in half along the grainline.',
      'Place back pattern on fold as indicated.',
      'Trace around pattern with tailor\'s chalk.',
      'Cut along traced lines through both layers.',
      'Dotted line indicates where to stitch.',
      'Mark center back and any notch positions.',
      'Finish raw edges with zigzag or serger.',
    ],
  },
};

const bottomStitchPatterns = {
  'shorts': {
    image: '/images/stitch patterns/short_stitch.svg',
    title: 'Shorts',
    description: 'Cut 2 (Mirror) — Front and back pieces',
    steps: [
      'Use this pattern for both front and back shorts pieces.',
      'Cut 2 mirrored fabric pieces on the grainline.',
      'Dotted line indicates where to stitch.',
      'Sew inner leg seams and crotch curve.',
      'Attach waistband with elastic casing.',
      'Finish hem with double-fold or blind stitch.',
    ],
  },
};

const patternSections = [
  {
    id: 'front-panel',
    title: 'Front Panel',
    description: 'Main front piece of the garment',
    steps: [
      'Measure from shoulder to hem',
      'Mark key reference points',
      'Cut along pattern lines',
    ],
  },
  {
    id: 'back-panel',
    title: 'Back Panel',
    description: 'Supporting back structure',
    steps: [
      'Mirror front panel measurements',
      'Add seam allowances',
      'Prepare for assembly',
    ],
  },
  {
    id: 'sleeves',
    title: 'Sleeves',
    description: 'Arm coverage pieces',
    steps: [
      'Calculate circumference',
      'Add ease for movement',
      'Create armhole matches',
    ],
  },
  {
    id: 'bottom',
    title: 'Bottom',
    description: 'Lower body garment pieces',
    steps: [
      'Measure waist and hips',
      'Add seam allowances',
      'Prepare hem and waistband',
    ],
  },
];

function downloadBlob(canvas, filename) {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = filename;
  link.click();
}

export default function PatternsPage() {
  const containerRef = useRef(null);
  const [searchParams] = useSearchParams();
  const sleeveType = searchParams.get('sleeve');
  const bodyType = searchParams.get('body');
  const neckType = searchParams.get('neck');
  const bottomType = searchParams.get('bottom');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pattern-card', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const isBoatBandeau = () => {
    if (!bodyType || !neckType) return false;
    const neckFile = neckType.split('/').pop().replace('.svg', '');
    const bodyFile = bodyType.split('/').pop().replace('.svg', '');
    return neckFile === 'boat_front_neck' && bodyFile === 'bandeau_top';
  };

  const getFrontPanelPattern = () => {
    if (!isBoatBandeau()) return null;
    return frontPanelStitchPatterns['boat_bandeau'];
  };

  const getBackPanelPattern = () => {
    if (!isBoatBandeau()) return null;
    return backPanelStitchPatterns['boat_bandeau'];
  };

  const getBottomPanelPattern = () => {
    if (!bottomType) return null;
    const filename = bottomType.split('/').pop().replace('.svg', '');
    if (filename === 'shorts') return bottomStitchPatterns['shorts'];
    return null;
  };

  const handleDownload = async (elementId, filename) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });
      downloadBlob(canvas, filename);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const handleDownloadAll = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const cards = document.querySelectorAll('.pattern-card-content');
      const canvases = [];
      for (const card of cards) {
        const canvas = await html2canvas(card, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
        });
        canvases.push(canvas);
      }
      const totalHeight = canvases.reduce((sum, c) => sum + c.height, 0);
      const width = canvases[0]?.width || 800;
      const composite = document.createElement('canvas');
      composite.width = width;
      composite.height = totalHeight;
      const ctx = composite.getContext('2d');
      let y = 0;
      for (const c of canvases) {
        ctx.drawImage(c, 0, y);
        y += c.height;
      }
      downloadBlob(composite, 'full-pattern-guide.png');
    } catch (err) {
      console.error('Download all failed:', err);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-offWhite via-beige-200/20 to-teal-400/10 pt-32 pb-16">
      <div className="section-padding max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal-800 mb-4">
            Pattern Guides
          </h1>
          <p className="text-dark-500 text-lg">
            Step-by-step sewing patterns and guides for your design
          </p>
        </motion.div>

        {/* Pattern Sections */}
        <div className="flex flex-col gap-12 mb-16">
          {patternSections.map((section, index) => {
            const isSleevesSection = section.id === 'sleeves';
            const sleevePattern = sleeveType ? sleeveStitchPatterns[sleeveType] : null;
            const showSleeveStitch = isSleevesSection && sleevePattern;

            const isFrontPanel = section.id === 'front-panel';
            const frontPanelPattern = getFrontPanelPattern();
            const showFrontPanelStitch = isFrontPanel && frontPanelPattern;

            const isBackPanel = section.id === 'back-panel';
            const backPanelPattern = getBackPanelPattern();
            const showBackPanelStitch = isBackPanel && backPanelPattern;

            const isBottomPanel = section.id === 'bottom';
            const bottomPanelPattern = getBottomPanelPattern();
            const showBottomStitch = isBottomPanel && bottomPanelPattern;

            const activePattern = showSleeveStitch ? sleevePattern
              : showFrontPanelStitch ? frontPanelPattern
              : showBackPanelStitch ? backPanelPattern
              : showBottomStitch ? bottomPanelPattern
              : null;

            const cardId = `pattern-card-${index}`;
            const contentId = `pattern-content-${index}`;

            return (
            <motion.div
              key={section.id}
              id={cardId}
              className="pattern-card bg-white/90 backdrop-blur-sm border border-teal-400/15 shadow-sm rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.01 }}
            >
              <div id={contentId} className="pattern-card-content">
                {/* Header */}
                <div className="px-8 pt-8 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-px bg-teal-400/40" />
                    <span className="text-[9px] tracking-[0.2em] uppercase text-teal-500 font-medium">
                      {activePattern ? 'Pattern' : 'Panel'}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-charcoal-800">
                    {activePattern ? activePattern.title : section.title}
                  </h2>
                  <p className="text-dark-400 mt-1">
                    {activePattern ? activePattern.description : section.description}
                  </p>
                </div>

                {/* Pattern Diagram */}
                <div className="mx-8 mb-6 bg-gradient-to-br from-teal-400/5 via-beige-200/20 to-skyBlue-200/10 rounded-lg min-h-[500px] flex items-center justify-center border border-teal-400/10 overflow-hidden">
                  {activePattern ? (
                    <img
                      src={activePattern.image}
                      alt={activePattern.title}
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <div className="text-center p-8">
                      <p className="text-dark-400 text-base">No pattern diagram available for this selection</p>
                    </div>
                  )}
                </div>

                {/* Steps */}
                <div className="px-8 pb-6">
                  <h3 className="font-bold text-dark-800 mb-4 text-lg">Sewing Steps:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(activePattern ? activePattern.steps : section.steps).map((step, stepIndex) => (
                      <motion.div
                        key={stepIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: stepIndex * 0.1 }}
                        className="flex items-start gap-3 bg-teal-400/5 rounded-lg p-3"
                      >
                        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-charcoal-800 flex items-center justify-center text-sm font-bold text-white">
                          {stepIndex + 1}
                        </div>
                        <p className="text-dark-600 pt-0.5">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <div className="px-8 pb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownload(contentId, `pattern-${section.id}.png`)}
                  className="w-full py-4 rounded-lg bg-charcoal-800 text-white font-semibold transition-all hover:bg-charcoal-900 text-lg"
                >
                  Download Pattern
                </motion.button>
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* Assembly Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm border border-teal-400/15 shadow-sm rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold text-charcoal-800 mb-6">
            Assembly Guide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {['Prepare', 'Attach Sleeves', 'Add Collar', 'Final Stitching'].map(
              (stage, index) => (
                <div key={stage} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-charcoal-800 text-white font-bold mb-3">
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
            onClick={handleDownloadAll}
            className="mt-8 py-4 px-8 rounded-xl bg-charcoal-800 text-white font-bold transition-all hover:bg-charcoal-900"
          >
            Download Full Guide
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
