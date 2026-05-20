import { useState } from 'react';
import { motion } from 'framer-motion';

const categories = [
  { id: 'shirt', label: 'Shirt' },
  { id: 'pants', label: 'Pants' },
  { id: 'dress', label: 'Dress' },
  { id: 'jacket', label: 'Jacket' },
  { id: 'top', label: 'Top' },
  { id: 'skirt', label: 'Skirt' },
];

const mockItems = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  category: categories[i % categories.length].id,
  name: `Design ${i + 1}`,
  image: null,
  description: 'Premium design collection',
}));

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('shirt');
  const filteredItems = mockItems.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
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
          className="flex flex-wrap gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-charcoal-800 text-white'
                : 'bg-white/80 border border-teal-400/20 text-dark-600 hover:bg-white hover:border-teal-400/30'
            }`}
          >
            All
          </motion.button>

          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-charcoal-800 text-white'
                  : 'bg-white/80 border border-teal-400/20 text-dark-600 hover:bg-white hover:border-teal-400/30'
              }`}
            >
              {cat.label}
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
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden group cursor-pointer border border-teal-400/15 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="aspect-square bg-gradient-to-br from-teal-400/5 via-beige-200/30 to-skyBlue-200/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                <div className="w-24 h-24 border-2 border-teal-400/30 rounded-full flex items-center justify-center">
                  <div className="text-charcoal-300 font-display text-4xl font-bold tracking-tight">
                    {String(item.id).padStart(2, '0')}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-px bg-teal-400/40" />
                  <span className="text-[9px] tracking-[0.2em] uppercase text-teal-500 font-medium">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-charcoal-800 mb-2">{item.name}</h3>
                <p className="text-dark-400 text-sm">{item.description}</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-4 w-full py-2.5 rounded-lg bg-charcoal-800 text-white font-medium tracking-wider text-sm uppercase hover:bg-charcoal-900 transition-all"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
