import { useState } from 'react';
import { motion } from 'framer-motion';

const categories = [
  { id: 'shirt', label: 'Shirt', icon: '👔' },
  { id: 'pants', label: 'Pants', icon: '👖' },
  { id: 'dress', label: 'Dress', icon: '👗' },
  { id: 'jacket', label: 'Jacket', icon: '🧥' },
  { id: 'top', label: 'Top', icon: '👕' },
  { id: 'skirt', label: 'Skirt', icon: '⛱️' },
];

const mockItems = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  category: categories[i % categories.length].id,
  name: `Design ${i + 1}`,
  image: `🎨`,
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
    <div className="min-h-screen bg-luxury-bg pt-32 pb-16">
      <div className="section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Design Catalog
          </h1>
          <p className="text-gray-400 text-lg">
            Browse and explore our premium fashion designs
          </p>
        </motion.div>

        {/* Category Filter */}
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
                ? 'bg-gradient-to-r from-fashionPurple to-fashionPink text-white'
                : 'glass-effect glass-hover text-gray-300'
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
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-fashionPurple to-fashionPink text-white'
                  : 'glass-effect glass-hover text-gray-300'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
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
              whileHover={{ scale: 1.02 }}
              className="glass-effect rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="aspect-square bg-gradient-to-br from-fashionPurple/20 to-fashionPink/20 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-300">
                {item.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-fashionPurple/30 to-fashionPink/30 hover:from-fashionPurple/50 hover:to-fashionPink/50 text-white font-semibold transition-all"
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
