import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SVGCanvas({
  mannequinPath = '/images/master/fashion_clean.svg',
  selectedNeckline = null,
  combinedTopPath = null,
  selectedSleeve = null,
  forwardRef = null,
}) {
  const [mannequinLoaded, setMannequinLoaded] = useState(false);

  return (
    <motion.div
      ref={forwardRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-beige-50 via-skyBlue-50/20 to-beige-100/30 rounded-2xl"
    >
      <div className="relative w-full max-w-sm aspect-[2/3] bg-white shadow-2xl rounded-2xl overflow-hidden border border-teal-400/10">
        {/* BODY: Mannequin Base - always shown */}
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={mannequinPath}
          alt="Mannequin"
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={() => setMannequinLoaded(true)}
        />

        {/* NECKLINE PREVIEW: shown only when neckline selected but no combined top yet */}
        {selectedNeckline && !combinedTopPath && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={selectedNeckline}
            alt="Neckline"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* GENERATED_TOP: combined top from tops_with_necks when both neckline+silhouette selected */}
        {combinedTopPath && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={combinedTopPath}
            alt="Combined Top"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* SLEEVE: sleeve overlay */}
        {selectedSleeve && selectedSleeve !== '__no_sleeve__' && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            src={selectedSleeve}
            alt="Sleeves"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {!mannequinLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <div className="text-dark-400 text-sm">Loading...</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
