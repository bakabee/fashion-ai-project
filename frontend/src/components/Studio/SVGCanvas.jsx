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
  const [svgs, setSvgs] = useState({
    mannequin: null,
    silhouette: null,
    necklineFront: null,
    necklineBack: null,
    sleeve: null,
    bottom: null,
    onepiece: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const toLoad = {
      mannequin: mannequinPath,
    };

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
          .then(svgContent => {
            console.log(`Loaded ${key}:`, path);
            return { key, data: svgContent };
          })
          .catch(err => {
            console.error(`Error loading ${key}:`, err);
            return { key, data: null };
          })
      )
    ).then(results => {
      const newSvgs = { ...svgs };
      results.forEach(({ key, data }) => {
        if (data) newSvgs[key] = data;
        else newSvgs[key] = null;
      });
      setSvgs(newSvgs);
      setLoading(false);
    });
  }, [selectedSilhouette, selectedNecklineFront, selectedNecklineBack, selectedSleeve, selectedBottom, selectedOnepiece, mannequinPath]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-beige-50 via-skyBlue-50/20 to-beige-100/30 rounded-2xl"
    >
      <div className="relative w-full max-w-sm aspect-[2/3] bg-white shadow-2xl rounded-2xl overflow-hidden border border-teal-400/10">
        {/* Mannequin Base */}
        {svgs.mannequin && (
          <div className="absolute inset-0">
            <svg
              viewBox="0 0 512 512"
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: svgs.mannequin }}
            />
          </div>
        )}

        {/* Silhouette Overlay */}
        {svgs.silhouette && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <svg
              viewBox="0 0 512 512"
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: svgs.silhouette }}
            />
          </motion.div>
        )}

        {/* Neckline Front Overlay */}
        {svgs.necklineFront && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute inset-0"
          >
            <svg
              viewBox="0 0 512 512"
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: svgs.necklineFront }}
            />
          </motion.div>
        )}

        {/* Neckline Back Overlay */}
        {svgs.necklineBack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="absolute inset-0"
          >
            <svg
              viewBox="0 0 512 512"
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: svgs.necklineBack }}
            />
          </motion.div>
        )}

        {/* Sleeve Overlay */}
        {svgs.sleeve && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute inset-0"
          >
            <svg
              viewBox="0 0 512 512"
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: svgs.sleeve }}
            />
          </motion.div>
        )}

        {/* Bottom Overlay */}
        {svgs.bottom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="absolute inset-0"
          >
            <svg
              viewBox="0 0 512 512"
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: svgs.bottom }}
            />
          </motion.div>
        )}

        {/* One Piece Overlay */}
        {svgs.onepiece && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="absolute inset-0"
          >
            <svg
              viewBox="0 0 512 512"
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: svgs.onepiece }}
            />
          </motion.div>
        )}

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50">
            <div className="text-dark-400 text-sm">Loading...</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
