import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SVGCanvas({
  mannequinPath = '/images/master/fashion_clean.svg',
  selectedTopWithNecks = null,
  selectedSilhouette = null,
  selectedNecklineFront = null,
  selectedNecklineBack = null,
  selectedSleeve = null,
  selectedBottom = null,
  selectedOnepiece = null,
}) {
  const [mannequinLoaded, setMannequinLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-beige-50 via-skyBlue-50/20 to-beige-100/30 rounded-2xl"
    >
      <div className="relative w-full max-w-sm aspect-[2/3] bg-white shadow-2xl rounded-2xl overflow-hidden border border-teal-400/10">
        {/* Mannequin Base */}
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={mannequinPath}
          alt="Mannequin"
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={() => setMannequinLoaded(true)}
        />

        {/* Silhouette Overlay */}
        {selectedSilhouette && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={selectedSilhouette}
            alt="Silhouette"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* Top With Necks Overlay (pre-combined top + neckline) */}
        {selectedTopWithNecks && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={selectedTopWithNecks}
            alt="Top With Neckline"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* Neckline Front Overlay */}
        {selectedNecklineFront && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            src={selectedNecklineFront}
            alt="Front Neckline"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* Neckline Back Overlay */}
        {selectedNecklineBack && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            src={selectedNecklineBack}
            alt="Back Neckline"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* Sleeve Overlay */}
        {selectedSleeve && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            src={selectedSleeve}
            alt="Sleeves"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* Bottom Overlay */}
        {selectedBottom && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            src={selectedBottom}
            alt="Bottom"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* One Piece Overlay */}
        {selectedOnepiece && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            src={selectedOnepiece}
            alt="One Piece"
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
