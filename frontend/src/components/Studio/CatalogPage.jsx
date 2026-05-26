import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const categoryGroups = [
  {
    id: 'tops',
    label: 'Tops',
    items: [
      { id: 'top1', name: 'Top 1', image: '/images/top1.jpg', description: 'Structured woven top with clean neckline' },
      { id: 'top2', name: 'Top 2', image: '/images/top2.png', description: 'Draped silhouette with soft shoulder' },
      { id: 'top3', name: 'Top 3', image: '/images/top3.jpg', description: 'Fitted knit top with ribbed finish' },
    ],
  },
  {
    id: 'bottoms',
    label: 'Bottoms',
    items: [
      { id: 'shorts', name: 'Shorts', image: '/images/shorts.jpg', description: 'Tailored shorts with pressed crease' },
    ],
  },
  {
    id: 'sweaters',
    label: 'Sweaters',
    items: [
      { id: 'sleeveless', name: 'Sleeveless Sweater', image: '/images/sleevelesssweater.jpg', description: 'Fine-gauge sleeveless knit' },
      { id: 'sleeved', name: 'Sleeved Sweater', image: '/images/sleevedsweater.jpg', description: 'Mid-weight sweater with ribbed cuffs' },
    ],
  },
];

const allItems = categoryGroups.flatMap((g) => g.items);

export default function CatalogPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems =
    selectedCategory === 'all'
      ? allItems
      : categoryGroups.find((g) => g.id === selectedCategory)?.items || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-offWhite via-beige-200/20 to-teal-400/10 pt-32 pb-16">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal-800 mb-4">
            Design Catalog
          </h1>
          <p className="text-dark-500 text-lg">
            Browse and explore our premium fashion designs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all text-sm tracking-wider uppercase ${
              selectedCategory === 'all'
                ? 'bg-charcoal-800 text-white shadow-lg'
                : 'bg-white/80 border border-teal-400/20 text-dark-600 hover:bg-white hover:border-teal-400/30'
            }`}
          >
            All
          </motion.button>
          {categoryGroups.map((group) => (
            <motion.button
              key={group.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedCategory(group.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all text-sm tracking-wider uppercase ${
                selectedCategory === group.id
                  ? 'bg-charcoal-800 text-white shadow-lg'
                  : 'bg-white/80 border border-teal-400/20 text-dark-600 hover:bg-white hover:border-teal-400/30'
              }`}
            >
              {group.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden group border border-teal-400/15 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-[3/4] overflow-hidden relative bg-gradient-to-br from-teal-400/5 via-beige-200/20 to-skyBlue-200/15">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-charcoal-800 mb-1">{item.name}</h3>
                <p className="text-dark-400 text-xs leading-relaxed mb-3">{item.description}</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                   onClick={() => {
                      const s = item.id === 'sleeved' ? 'full_sleeve' : '';
                      navigate(`/studio/viewer?body=boat_bandeau${s ? `&sleeve=${s}` : ''}`);
                    }}
                  className="w-full py-2.5 rounded-lg bg-charcoal-800 text-white font-medium tracking-wider text-xs uppercase hover:bg-charcoal-900 transition-all shadow-sm hover:shadow-md"
                >
                  View in 3D
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}