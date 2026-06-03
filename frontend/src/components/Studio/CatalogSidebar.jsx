import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const assetMap = {
  '/images/front neck': [
    'boat_front_neck.svg', 'florentine_front_neck.svg', 'heartneck_front.svg',
    'round_front_neck.svg', 'scoop_front_neck.svg', 'sqaure_front_neck.svg',
    'turtle_front_neck.svg', 'V_front_neck.svg',
  ],
  '/images/silhoutes': [
    'bandeau_top.svg', 'fitted_top.svg', 'pepium_top.svg',
    'tank_top.svg', 'tshirt_top.svg',
  ],
  '/images/sleeves': [
    'bell_sleeves.svg', 'cap_sleeve.svg', 'cuff_sleeves.svg',
    'full_fitted_sleeves.svg', 'half_sleeves.svg', 'puff_sleeves.svg',
    'strip_sleeves.svg',
  ],
  '/images/bottoms': [
    'beach_shorts.svg', 'cargo_pants.svg', 'denim_shorts.svg',
    'hemmed_skirt.svg', 'long_pants.svg', 'long_skirt.svg',
    'pleated_skirt.svg', 'shorts.svg',
  ],
};

const noAssetFolders = ['/images/onepiece'];

const categories = [
  {
    id: 'top',
    label: 'Top',
    sections: [
      { id: 'frontNeck', label: 'Necklines', folder: '/images/front neck' },
      { id: 'silhouette', label: 'Silhouettes', folder: '/images/silhoutes' },
      { id: 'sleeve', label: 'Sleeves', folder: '/images/sleeves' },
    ],
  },
  {
    id: 'bottom',
    label: 'Bottom',
    sections: [
      { id: 'bottomStyle', label: 'Styles', folder: '/images/bottoms' },
    ],
  },
  {
    id: 'onePiece',
    label: 'One Piece',
    sections: [
      { id: 'onePieceStyle', label: 'Dress Styles', folder: '/images/onepiece' },
    ],
  },
];

function CatalogItems({ section, sectionId, onSelect, isSelected }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssets();
  }, [section.folder]);

  const loadAssets = async () => {
    setLoading(true);
    try {
      if (noAssetFolders.includes(section.folder)) {
        const dummyItems = [
          { id: 'bodycon', name: 'Bodycon', path: `${section.folder}/bodycon.svg` },
          { id: 'a-line', name: 'A-Line', path: `${section.folder}/a-line.svg` },
          { id: 'maxi', name: 'Maxi', path: `${section.folder}/maxi.svg` },
          { id: 'shift', name: 'Shift', path: `${section.folder}/shift.svg` },
        ];
        setItems(dummyItems);
        return;
      }

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
    return <div className="text-xs text-dark-400 px-2 py-2">Loading...</div>;
  }

  if (items.length === 0) {
    return <div className="text-xs text-dark-400 px-2 py-2">No items available</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {sectionId === 'sleeve' && (
        <motion.button
          onClick={() => onSelect(sectionId, '__no_sleeve__')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative rounded-lg overflow-hidden border-2 transition-all aspect-square flex flex-col items-center justify-center ${
            isSelected === '__no_sleeve__'
              ? 'bg-teal-400/20 border-teal-400/60'
              : 'bg-white border-teal-400/15 hover:border-teal-400/30'
          }`}
        >
          <div className="flex items-center justify-center h-full w-full">
            <span className="text-dark-500 text-xs font-medium">None</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2 text-center">
            <span className="text-[10px] font-semibold text-white truncate block">No Sleeve</span>
          </div>
          {isSelected === '__no_sleeve__' && (
            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-teal-400 border-2 border-white" />
          )}
        </motion.button>
      )}
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
          <img
            src={item.path}
            alt={item.name}
            className="w-full h-full object-contain p-2"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2 text-center">
            <span className="text-[10px] font-semibold text-white truncate block">{item.name}</span>
          </div>
          {isSelected === item.path && (
            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-teal-400 border-2 border-white" />
          )}
        </motion.button>
      ))}
    </div>
  );
}

export default function CatalogSidebar({
  onSelect = () => {},
  selectedItems = {},
  activeCategory = 'top',
  onCategoryChange = () => {},
}) {
  const [openSections, setOpenSections] = useState({
    frontNeck: true,
    silhouette: false,
    sleeve: false,
    bottomStyle: true,
    onePieceStyle: true,
  });

  const currentCategory = categories.find(c => c.id === activeCategory) || categories[0];

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full md:w-96 bg-white/80 backdrop-blur-sm border-r border-teal-400/15 rounded-2xl flex flex-col overflow-hidden"
    >
      <div className="sticky top-0 border-b border-teal-400/10 bg-white/90 backdrop-blur-sm z-20">
        <div className="p-4 pb-2">
          <h2 className="text-lg font-bold text-charcoal-800">Components</h2>
          <p className="text-xs text-dark-400 mt-1">Choose a category to customize</p>
        </div>
        <div className="flex px-4 pb-3 gap-2">
          {categories.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat.id
                  ? 'bg-charcoal-800 text-white shadow-md'
                  : 'bg-beige-50/50 text-dark-500 border border-teal-400/10 hover:bg-beige-50'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {currentCategory.sections.map(section => (
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
                  <div className="max-h-48 overflow-y-auto pr-1 space-y-2">
                    <CatalogItems
                      section={section}
                      sectionId={section.id}
                      onSelect={onSelect}
                      isSelected={selectedItems[section.id]}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
