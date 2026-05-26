import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function CatalogSidebar({
  category = 'tops',
  onSelect = () => {},
  selectedItems = {},
}) {
  const [openSections, setOpenSections] = useState({
    topWithNecks: true,
    silhouettes: true,
    necklinesFront: false,
    necklinesBack: false,
    sleeves: false,
  });

  const [svgAssets, setSvgAssets] = useState({
    topWithNecks: [],
    silhouettes: [],
    necklinesFront: [],
    necklinesBack: [],
    sleeves: [],
  });

  const categoryConfig = {
    tops: {
      sections: [
        { 
          id: 'topWithNecks', 
          label: 'Tops With Necks', 
          folder: '/images/top with necks',
          displayFolder: '/images/front neck',
          combinedAssets: true 
        },
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
      className="w-full md:w-96 bg-white/80 backdrop-blur-sm border-r border-teal-400/15 rounded-2xl flex flex-col overflow-hidden"
    >
      <div className="sticky top-0 p-6 border-b border-teal-400/10 bg-white/90 backdrop-blur-sm z-20">
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
          'strip_sleeves.svg',
        ],
        '/images/top with necks': [
          'boat_bandeau.svg',
          'boat_fitted.svg',
          'boat_poppium.svg',
          'boat_tank.svg',
          'boat_tshirt.svg',
          'floratine_bandeau.svg',
          'floratine_poppium.svg',
          'florentine_fitted.svg',
          'florentine_tank.svg',
          'florentine_tshirt.svg',
          'heart_bandeau.svg',
          'heart_fitted.svg',
          'heart_poppium.svg',
          'heart_tank.svg',
          'heart_tshirt.svg',
          'round_bandeau.svg',
          'round_fitted.svg',
          'round_poppium.svg',
          'round_tank.svg',
          'round_tshirt.svg',
          'scoop_bandeau.svg',
          'scoop_fitted.svg',
          'scoop_poppium.svg',
          'scoop_tank.svg',
          'scoop_tshirt.svg',
          'sqaure_bandeau.svg',
          'sqaure_fitted.svg',
          'sqaure_poppium.svg',
          'sqaure_tank.svg',
          'sqaure_tshirt.svg',
          'turtle_bandeau.svg',
          'turtle_fitted.svg',
          'turtle_poppium.svg',
          'turtle_tank.svg',
          'turtle_tshirt.svg',
          'V_bandeau.svg',
          'V_fitted.svg',
          'V_poppium.svg',
          'V_tank.svg',
          'V_tshirt.svg',
        ],
      };

      const assets = assetMap[section.folder] || [];
      
      setItems(assets.map(filename => {
        let displayPath = `${section.folder}/${filename}`;
        
        // For combined assets (tops with necks), map to front neck image for preview
        if (section.folder === '/images/top with necks') {
          const necklineNames = {
            'boat_': 'boat_front_neck.svg',
            'floratine_': 'florentine_front_neck.svg',
            'florentine_': 'florentine_front_neck.svg',
            'heart_': 'heart_front_neck.svg',
            'round_': 'round_front_neck.svg',
            'scoop_': 'scoop_front_neck.svg',
            'sqaure_': 'sqaure_front_neck.svg',
            'turtle_': 'turtle_front_neck.svg',
            'V_': 'V_front_neck.svg',
          };
          
          // Find matching front neck image
          for (const [prefix, neckFile] of Object.entries(necklineNames)) {
            if (filename.startsWith(prefix)) {
              displayPath = `/images/front neck/${neckFile}`;
              break;
            }
          }
        }
        
        return {
          id: filename.replace('.svg', ''),
          name: filename
            .replace('.svg', '')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase()),
          path: `${section.folder}/${filename}`,
          displayPath,
        };
      }));
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
    <div className="grid grid-cols-2 gap-3">
      {items.map(item => (
        <motion.button
          key={item.id}
          onClick={() => onSelect(sectionId, item.path)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative rounded-lg overflow-hidden border-2 transition-all aspect-square flex flex-col items-center justify-center ${
            isSelected === item.path
              ? 'bg-teal-400/20 border-teal-400/60'
              : 'bg-white border-teal-400/15 hover:border-teal-400/30'
          }`}
        >
          {/* SVG Preview - use displayPath if available, otherwise use path */}
          <img
            src={item.displayPath || item.path}
            alt={item.name}
            className="w-full h-full object-contain p-2"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          
          {/* Name Label */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2 text-center">
            <span className="text-[10px] font-semibold text-white truncate block">{item.name}</span>
          </div>

          {/* Selection Indicator */}
          {isSelected === item.path && (
            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-teal-400 border-2 border-white" />
          )}
        </motion.button>
      ))}
    </div>
  );
}
