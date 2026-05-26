import { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import CatalogSidebar from './CatalogSidebar';
import SVGCanvas from './SVGCanvas';

function getNecklineStem(path) {
  if (!path) return null;
  const filename = path.split('/').pop().replace('.svg', '');
  const mapping = {
    'V_front_neck': 'V',
    'round_front_neck': 'round',
    'boat_front_neck': 'boat',
    'florentine_front_neck': 'florentine',
    'heartneck_front': 'heart',
    'scoop_front_neck': 'scoop',
    'sqaure_front_neck': 'sqaure',
    'turtle_front_neck': 'turtle',
  };
  return mapping[filename] || filename;
}

function getSilhouetteStem(path) {
  if (!path) return null;
  const filename = path.split('/').pop().replace('.svg', '');
  const mapping = {
    'bandeau_top': 'bandeau',
    'fitted_top': 'fitted',
    'pepium_top': 'poppium',
    'tank_top': 'tank',
    'tshirt_top': 'tshirt',
  };
  return mapping[filename] || filename;
}

function getCombinedTopPath(necklinePath, silhouettePath) {
  if (!necklinePath || !silhouettePath) return null;
  const neckFile = necklinePath.split('/').pop().replace('.svg', '');
  let prefix = getNecklineStem(necklinePath);
  const suffix = getSilhouetteStem(silhouettePath);
  if (neckFile === 'florentine_front_neck' && (suffix === 'bandeau' || suffix === 'poppium')) {
    prefix = 'floratine';
  }
  return `/images/top with necks/${prefix}_${suffix}.svg`;
}

export default function DesignStudioPage() {
  const canvasRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState({
    frontNeck: null,
    silhouette: null,
    sleeve: null,
  });

  const combinedTopPath = useMemo(
    () => getCombinedTopPath(selectedItems.frontNeck, selectedItems.silhouette),
    [selectedItems.frontNeck, selectedItems.silhouette]
  );

  const handleComponentSelect = (sectionId, path) => {
    if (sectionId === 'sleeve' && path === '__no_sleeve__') {
      setSelectedItems(prev => ({
        ...prev,
        sleeve: prev.sleeve === '__no_sleeve__' ? null : '__no_sleeve__',
      }));
      return;
    }
    setSelectedItems(prev => ({
      ...prev,
      [sectionId]: prev[sectionId] === path ? null : path,
    }));
  };

  const resetSelection = () => {
    setSelectedItems({
      frontNeck: null,
      silhouette: null,
      sleeve: null,
    });
  };

  const exportAsImage = async (format) => {
    if (!canvasRef.current) {
      alert('Canvas not ready. Please wait and try again.');
      return;
    }
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });
      if (format === 'png') {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `fashion-design-${Date.now()}.png`;
        link.click();
      } else if (format === 'svg') {
        const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="400" height="600">
          <rect width="400" height="600" fill="white"/>
        </svg>`;
        const link = document.createElement('a');
        link.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgStr)}`;
        link.download = `fashion-design-${Date.now()}.svg`;
        link.click();
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed. PNG recommended.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-bg via-beige-50/30 to-skyBlue-50/20 pt-32 pb-16 px-4 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col min-h-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex-shrink-0"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal-800 mb-2">
            Design Studio
          </h1>
          <p className="text-dark-500 text-base">
            Compose your fashion design with precision
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6"
        >
          <div className="w-full lg:w-96 flex-shrink-0 h-full">
            <CatalogSidebar
              onSelect={handleComponentSelect}
              selectedItems={selectedItems}
            />
          </div>

          <div className="flex-1 min-h-0 flex gap-3">
            <div className="flex-1 min-h-0">
              <SVGCanvas
                ref={canvasRef}
                forwardRef={canvasRef}
                mannequinPath="/images/master/fashion_clean.svg"
                selectedNeckline={selectedItems.frontNeck}
                combinedTopPath={combinedTopPath}
                selectedSleeve={selectedItems.sleeve}
              />
            </div>

            <div className="flex flex-col gap-3 justify-center">
              <motion.button
                onClick={() => exportAsImage('png')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2.5 rounded-lg bg-skyBlue-400/80 text-white font-medium hover:bg-skyBlue-500 transition-all shadow-lg text-xs tracking-wide"
                title="Export PNG"
              >
                PNG
              </motion.button>
              <motion.button
                onClick={() => exportAsImage('svg')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2.5 rounded-lg bg-teal-400/80 text-white font-medium hover:bg-teal-500 transition-all shadow-lg text-xs tracking-wide"
                title="Export SVG"
              >
                SVG
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2.5 rounded-lg bg-charcoal-800 text-white font-medium hover:bg-charcoal-900 transition-all shadow-lg text-xs tracking-wide"
                title="Save Design"
              >
                Save
              </motion.button>
              <motion.button
                onClick={resetSelection}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2.5 rounded-lg bg-white/80 border border-teal-400/15 text-charcoal-700 font-medium hover:bg-white hover:border-teal-400/30 transition-all text-xs tracking-wide"
                title="Reset"
              >
                Reset
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
