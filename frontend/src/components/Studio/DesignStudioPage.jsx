import { useState } from 'react';
import { motion } from 'framer-motion';
import CatalogSidebar from './CatalogSidebar';
import SVGCanvas from './SVGCanvas';

export default function DesignStudioPage() {
  const [activeCategory, setActiveCategory] = useState('tops');
  const [selectedItems, setSelectedItems] = useState({
    silhouettes: null,
    necklinesFront: null,
    necklinesBack: null,
    sleeves: null,
    bottoms: null,
    onepiece: null,
  });

  const categories = [
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'onepiece', label: 'One Piece' },
  ];

  const handleComponentSelect = (sectionId, path) => {
    setSelectedItems(prev => ({
      ...prev,
      [sectionId]: prev[sectionId] === path ? null : path,
    }));
  };

  const clearSelection = () => {
    setSelectedItems({
      silhouettes: null,
      necklinesFront: null,
      necklinesBack: null,
      sleeves: null,
      bottoms: null,
      onepiece: null,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-bg via-beige-50/30 to-skyBlue-50/20 pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal-800 mb-2">
            Design Studio
          </h1>
          <p className="text-dark-500 text-base">
            Compose your fashion design with precision
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-3 mb-8 flex-wrap"
        >
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                clearSelection();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                activeCategory === category.id
                  ? 'bg-charcoal-800 text-white shadow-lg'
                  : 'bg-white/80 border border-teal-400/15 text-charcoal-700 hover:bg-white hover:border-teal-400/30'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Main Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-6"
        >
          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <CatalogSidebar
              category={activeCategory}
              onSelect={handleComponentSelect}
              selectedItems={selectedItems}
            />
          </div>

          {/* Canvas */}
          <div className="flex-1 min-h-[600px]">
            <SVGCanvas
              mannequinPath="/images/master/fashion_croquis_clean.svg"
              selectedSilhouette={selectedItems.silhouettes}
              selectedNecklineFront={selectedItems.necklinesFront}
              selectedNecklineBack={selectedItems.necklinesBack}
              selectedSleeve={selectedItems.sleeves}
              selectedBottom={
                activeCategory === 'bottoms' ? selectedItems.silhouettes : null
              }
              selectedOnepiece={
                activeCategory === 'onepiece' ? selectedItems.silhouettes : null
              }
            />
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 flex justify-center gap-4"
        >
          <motion.button
            onClick={clearSelection}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-white/80 border border-teal-400/15 text-charcoal-700 font-medium hover:bg-white hover:border-teal-400/30 transition-all"
          >
            Clear All
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg bg-charcoal-800 text-white font-medium hover:bg-charcoal-900 transition-all shadow-lg"
          >
            Export Design
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}