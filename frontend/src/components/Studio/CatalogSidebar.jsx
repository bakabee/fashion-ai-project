import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function CatalogSidebar({
  category = 'tops',
  onSelect = () => {},
  selectedItems = {},
}) {
  const [openSections, setOpenSections] = useState({
    silhouettes: true,
    necklinesFront: false,
    necklinesBack: false,
    sleeves: false,
  });

  const [svgAssets, setSvgAssets] = useState({
    silhouettes: [],
    necklinesFront: [],
    necklinesBack: [],
    sleeves: [],
  });

  const categoryConfig = {
    tops: {
      sections: [
        { id: 'silhouettes', label: 'Silhouettes', folder: '/images/silhoutes' },
        { id: 'necklinesFront', label: 'Front Necklines', folder: '/images/front neck' },
        { id: 'necklinesBack', label: 'Back Necklines', folder: '/images/back neck' },
        { id: 'sleeves', label: 'Sleeves', folder: '/images/sleeves' },
      ],
    },
    bottoms: {
      sections: [
        { id: 'silhouettes', label: 'Bottoms', folder: '/images/silhoutes' },
      ],
    },
    onepiece: {
      sections: [
        { id: 'silhouettes', label: 'Dresses', folder: '/images/silhoutes' },
      ],
    },
  };

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  useEffect(() => {
    const config = categoryConfig[category] || categoryConfig.tops;
    const assets = {};

    config.sections.forEach(section => {
      assets[section.id] = [];
    });

    setSvgAssets(assets);
  }, [category]);

  const sections = categoryConfig[category]?.sections || categoryConfig.tops.sections;

  const getDisplayName = (filename) => {
    return filename
      .replace('.svg', '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full md:w-80 bg-white/80 backdrop-blur-sm border-r border-teal-400/15 rounded-2xl overflow-y-auto flex flex-col"
    >
      <div className="sticky top-0 p-6 border-b border-teal-400/10 bg-white/90 backdrop-blur-sm">
        <h2 className="text-lg font-bold text-charcoal-800 capitalize">
          {category === 'onepiece' ? 'One Piece' : category}
        </h2>
        <p className="text-xs text-dark-400 mt-1">Select components</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sections.map(section => (
          <div key={section.id} className="border-b border-teal-400/10 last:border-b-0">
            <motion.button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-beige-50/50 transition-colors group"
            >
              <span className="font-semibold text-charcoal-800 text-sm group-hover:text-teal-400 transition-colors">
                {section.label}
              </span>
              <motion.div
                animate={{ rotate: openSections[section.id] ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={18} className="text-dark-400" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {openSections[section.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-4 space-y-2"
                >
                  <CatalogItems
                    section={section}
                    sectionId={section.id}
                    onSelect={onSelect}
                    isSelected={selectedItems[section.id]}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CatalogItems({ section, sectionId, onSelect, isSelected }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssets();
  }, [section.folder]);

  const loadAssets = async () => {
    setLoading(true);
    try {
      // Map folder names to actual asset lists
      const assetMap = {
        '/images/silhoutes': [
          'bandeau_top.svg',
          'fitted_top.svg',
          'pepium_top.svg',
          'tank_top.svg',
          'tshirt_top.svg',
        ],
        '/images/front neck': [
          'boat_front_neck.svg',
          'florentine_front_neck.svg',
          'heartneck_front.svg',
          'round_front_neck.svg',
          'scoop_front_neck.svg',
          'sqaure_front_neck.svg',
          'turtle_front_neck.svg',
          'V_front_neck.svg',
        ],
        '/images/back neck': [],
        '/images/sleeves': [
          'bell_sleeves.svg',
          'cap_sleeve.svg',
          'cuff_sleeves.svg',
          'full_fitted_sleeves.svg',
          'half_sleeves.svg',
          'puff_sleeves.svg',
        ],
      };

      const assets = assetMap[section.folder] || [];
      setItems(assets.map(filename => ({
        id: filename.replace('.svg', ''),
        name: filename
          .replace('.svg', '')
          .replace(/_/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase()),
        path: `${section.folder}/${filename}`,
      })));
    } catch (error) {
      console.error('Error loading assets:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-xs text-dark-400">Loading...</div>;
  }

  if (items.length === 0) {
    return <div className="text-xs text-dark-400">No items available</div>;
  }

  return (
    <div className="space-y-2">
      {items.map(item => (
        <motion.button
          key={item.id}
          onClick={() => onSelect(sectionId, item.path)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full p-3 rounded-lg text-left text-xs font-medium transition-all ${
            isSelected === item.path
              ? 'bg-teal-400/20 border border-teal-400/40 text-teal-600'
              : 'bg-beige-50/50 border border-teal-400/10 text-charcoal-700 hover:bg-beige-100/50 hover:border-teal-400/20'
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-sm border-2 transition-all ${
                isSelected === item.path
                  ? 'bg-teal-400 border-teal-400'
                  : 'border-teal-400/30'
              }`}
            />
            <span className="truncate">{item.name}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
