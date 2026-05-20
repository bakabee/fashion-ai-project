import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const categoryGroups = [
  {
    id: 'tops',
    label: 'Tops',
    items: [
      { id: 'top1', name: 'Top 1', model: '/models/top 1.glb', description: 'Structured woven top with clean neckline' },
      { id: 'top2', name: 'Top 2', model: '/models/top 2.glb', description: 'Draped silhouette with soft shoulder' },
      { id: 'top3', name: 'Top 3', model: '/models/top 3.glb', description: 'Fitted knit top with ribbed finish' },
    ],
  },
  {
    id: 'bottoms',
    label: 'Bottoms',
    items: [
      { id: 'shorts', name: 'Shorts', model: '/models/shorts.glb', description: 'Tailored shorts with pressed crease' },
    ],
  },
  {
    id: 'sweaters',
    label: 'Sweaters',
    items: [
      { id: 'sleeveless', name: 'Sleeveless Sweater', model: '/models/sleaveless sweater.glb', description: 'Fine-gauge sleeveless knit' },
      { id: 'sleeved', name: 'Sleeved Sweater', model: '/models/Sleaved sweater.glb', description: 'Mid-weight sweater with ribbed cuffs' },
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
              <div className="aspect-[4/5] bg-gradient-to-br from-teal-400/8 via-beige-200/30 to-skyBlue-200/25 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-28 h-28 rounded-full border-2 border-teal-400/20 flex items-center justify-center bg-white/40 backdrop-blur-sm">
                  <span className="font-display text-5xl text-charcoal-300 font-bold tracking-tight">
                    {item.name.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-charcoal-800 mb-1.5">{item.name}</h3>
                <p className="text-dark-400 text-sm leading-relaxed mb-4">{item.description}</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(`/studio/viewer?model=${item.id}`)}
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
