import { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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

function downloadTextFile(contents, filename, type) {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default function DesignStudioPage() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('top');
  const [selectedItems, setSelectedItems] = useState({
    frontNeck: null,
    silhouette: null,
    sleeve: null,
    bottomStyle: null,
    onePieceStyle: null,
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
      bottomStyle: null,
      onePieceStyle: null,
    });
  };

  const handleViewIn3D = () => {
    const sleeve = selectedItems.sleeve;
    const bottom = selectedItems.bottomStyle;
    const params = new URLSearchParams();
    if (selectedItems.silhouette) params.set('body', selectedItems.silhouette);
    if (sleeve?.includes('half_sleeves')) params.set('sleeve', 'half_sleeve');
    else if (sleeve?.includes('full_fitted_sleeves')) params.set('sleeve', 'full_sleeve');
    if (bottom) params.set('bottom', bottom.split('/').pop().replace('.svg', ''));
    const qs = params.toString();
    navigate(`/studio/viewer${qs ? `?${qs}` : ''}`);
  };

  const exportAsImage = async (format) => {
    if (!canvasRef.current) {
      alert('Canvas not ready. Please wait and try again.');
      return;
    }
    try {
      if (format === 'png') {
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(canvasRef.current, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
        });
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `fashion-design-${Date.now()}.png`;
        link.click();
      } else if (format === 'svg') {
        const layers = [
          { label: 'Mannequin', path: '/images/master/fashion_clean.svg' },
          combinedTopPath && { label: 'Top', path: combinedTopPath },
          selectedItems.frontNeck && !combinedTopPath && !selectedItems.onePieceStyle && {
            label: 'Neckline',
            path: selectedItems.frontNeck,
          },
          selectedItems.sleeve && selectedItems.sleeve !== '__no_sleeve__' && !selectedItems.onePieceStyle && {
            label: 'Sleeves',
            path: selectedItems.sleeve,
          },
          selectedItems.bottomStyle && !selectedItems.onePieceStyle && {
            label: 'Bottom',
            path: selectedItems.bottomStyle,
          },
          selectedItems.onePieceStyle && {
            label: 'One Piece',
            path: selectedItems.onePieceStyle,
          },
        ].filter(Boolean);

        const origin = window.location.origin;
        const imageLayers = layers.map((layer) => (
          `  <image href="${escapeXml(origin + layer.path)}" x="0" y="0" width="400" height="600" preserveAspectRatio="xMidYMid slice">
    <title>${escapeXml(layer.label)}</title>
  </image>`
        )).join('\n');

        const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="400" height="600">
  <rect width="400" height="600" fill="#ffffff"/>
${imageLayers}
</svg>`;
        downloadTextFile(svgStr, `fashion-design-${Date.now()}.svg`, 'image/svg+xml;charset=utf-8');
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed. PNG recommended.');
    }
  };

  const saveDesign = () => {
    const design = {
      id: `fashion-design-${Date.now()}`,
      createdAt: new Date().toISOString(),
      selectedItems,
      combinedTopPath,
      summary: currentSelectionSummary(),
    };
    const existing = JSON.parse(localStorage.getItem('fashionDesigns') || '[]');
    localStorage.setItem('fashionDesigns', JSON.stringify([design, ...existing].slice(0, 20)));
    downloadTextFile(
      JSON.stringify(design, null, 2),
      `${design.id}.json`,
      'application/json;charset=utf-8'
    );
  };

  const currentSelectionSummary = () => {
    const lines = [];
    if (selectedItems.frontNeck) lines.push(`Neck: ${selectedItems.frontNeck.split('/').pop().replace('.svg', '').replace(/_/g, ' ')}`);
    if (selectedItems.silhouette) lines.push(`Silhouette: ${selectedItems.silhouette.split('/').pop().replace('.svg', '').replace(/_/g, ' ')}`);
    if (selectedItems.sleeve) {
      if (selectedItems.sleeve === '__no_sleeve__') lines.push('Sleeves: None');
      else lines.push(`Sleeves: ${selectedItems.sleeve.split('/').pop().replace('.svg', '').replace(/_/g, ' ')}`);
    }
    if (selectedItems.bottomStyle) lines.push(`Bottom: ${selectedItems.bottomStyle.split('/').pop().replace('.svg', '').replace(/_/g, ' ')}`);
    if (selectedItems.onePieceStyle) lines.push(`Dress: ${selectedItems.onePieceStyle.split('/').pop().replace('.svg', '').replace(/_/g, ' ')}`);
    return lines;
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
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
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
                selectedBottom={selectedItems.bottomStyle}
                selectedOnePiece={selectedItems.onePieceStyle}
              />
            </div>

            <div className="flex flex-col gap-3 justify-center">
              <motion.button
                onClick={() => exportAsImage('png')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-skyBlue-400/80 text-white font-semibold hover:bg-skyBlue-500 transition-all shadow-lg text-sm tracking-wider"
                title="Export PNG"
              >
                PNG
              </motion.button>
              <motion.button
                onClick={() => exportAsImage('svg')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-teal-400/80 text-white font-semibold hover:bg-teal-500 transition-all shadow-lg text-sm tracking-wider"
                title="Export SVG"
              >
                SVG
              </motion.button>
              <motion.button
                onClick={handleViewIn3D}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg text-sm tracking-wider"
                title="View in 3D"
              >
                View 3D
              </motion.button>
              <motion.button
                onClick={saveDesign}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-charcoal-800 text-white font-semibold hover:bg-charcoal-900 transition-all shadow-lg text-sm tracking-wider"
                title="Save Design"
              >
                Save
              </motion.button>
              <motion.button
                onClick={resetSelection}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-white/80 border border-teal-400/15 text-charcoal-700 font-semibold hover:bg-white hover:border-teal-400/30 transition-all text-sm tracking-wider"
                title="Reset"
              >
                Reset
              </motion.button>
            </div>
          </div>
        </motion.div>

        {currentSelectionSummary().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex-shrink-0"
          >
            <div className="inline-flex flex-wrap gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-teal-400/10 text-xs text-dark-600">
              {currentSelectionSummary().map((line, i) => (
                <span key={i} className="font-medium">{line}</span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
