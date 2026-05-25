import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SVGCanvas({
  mannequinPath = '/images/master/fashion_croquis_clean.svg',
  selectedSilhouette = null,
  selectedNecklineFront = null,
  selectedNecklineBack = null,
  selectedSleeve = null,
  selectedBottom = null,
  selectedOnepiece = null,
}) {
  const [mannequinSVG, setMannequinSVG] = useState('');
  const [selectedSVGs, setSelectedSVGs] = useState({});

  useEffect(() => {
    // Load mannequin
    fetch(mannequinPath)
      .then(res => res.text())
      .then(svg => setMannequinSVG(svg))
      .catch(err => console.error('Error loading mannequin:', err));
  }, [mannequinPath]);

  useEffect(() => {
    // Load selected SVG overlays
    const toLoad = {};

    if (selectedSilhouette) toLoad.silhouette = selectedSilhouette;
    if (selectedNecklineFront) toLoad.necklineFront = selectedNecklineFront;
    if (selectedNecklineBack) toLoad.necklineBack = selectedNecklineBack;
    if (selectedSleeve) toLoad.sleeve = selectedSleeve;
    if (selectedBottom) toLoad.bottom = selectedBottom;
    if (selectedOnepiece) toLoad.onepiece = selectedOnepiece;

    Promise.all(
      Object.entries(toLoad).map(([key, path]) =>
        fetch(path)
          .then(res => res.text())
          .then(svg => ({ key, svg }))
          .catch(() => ({ key, svg: '' }))
      )
    ).then(results => {
      const newSVGs = {};
      results.forEach(({ key, svg }) => {
        if (svg) newSVGs[key] = svg;
      });
      setSelectedSVGs(newSVGs);
    });
  }, [selectedSilhouette, selectedNecklineFront, selectedNecklineBack, selectedSleeve, selectedBottom, selectedOnepiece]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-luxury-surface to-beige-50/30 border-l border-teal-400/15 rounded-2xl"
    >
      <div className="relative w-full max-w-md aspect-[2/3] bg-white/50 backdrop-blur-sm border border-teal-400/15 rounded-2xl shadow-lg overflow-hidden">
        {/* Mannequin Base */}
        <div className="absolute inset-0 flex items-center justify-center">
          {mannequinSVG ? (
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: mannequinSVG }}
            />
          ) : (
            <div className="text-dark-400 text-sm">Loading mannequin...</div>
          )}
        </div>

        {/* Silhouette Overlay */}
        {selectedSVGs.silhouette && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: selectedSVGs.silhouette }}
            />
          </motion.div>
        )}

        {/* Neckline Front Overlay */}
        {selectedSVGs.necklineFront && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: selectedSVGs.necklineFront }}
            />
          </motion.div>
        )}

        {/* Neckline Back Overlay */}
        {selectedSVGs.necklineBack && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: selectedSVGs.necklineBack }}
            />
          </motion.div>
        )}

        {/* Sleeve Overlay */}
        {selectedSVGs.sleeve && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: selectedSVGs.sleeve }}
            />
          </motion.div>
        )}

        {/* Bottom Overlay */}
        {selectedSVGs.bottom && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: selectedSVGs.bottom }}
            />
          </motion.div>
        )}

        {/* One Piece Overlay */}
        {selectedSVGs.onepiece && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: selectedSVGs.onepiece }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
