import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export default function DesignStudioPage() {
  const [formData, setFormData] = useState({
    fabricType: 'cotton',
    sleeveLength: 'long',
    neckType: 'round',
    color: '#8d5cff',
    measurements: { chest: '', waist: '', length: '' },
    styleDescription: '',
  });

  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.form-section', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMeasurementChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Design submitted:', formData);
  };

  const formSectionClass = 'form-section glass-effect p-8 rounded-2xl backdrop-blur-xl';

  return (
    <div ref={containerRef} className="min-h-screen bg-luxury-bg pt-32 pb-16">
      <div className="section-padding max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Design Studio
          </h1>
          <p className="text-gray-400 text-lg">
            Create your custom fashion design with AI assistance
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Fabric Selection */}
          <div className={formSectionClass}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span>✨</span> Fabric Selection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['cotton', 'silk', 'wool', 'linen'].map((fabric) => (
                <motion.button
                  key={fabric}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChange('fabricType', fabric)}
                  className={`p-4 rounded-lg capitalize font-semibold transition-all ${
                    formData.fabricType === fabric
                      ? 'bg-gradient-to-r from-fashionPurple to-fashionPink text-white'
                      : 'glass-effect glass-hover text-gray-300'
                  }`}
                >
                  {fabric}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Sleeve Design */}
          <div className={formSectionClass}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span>👕</span> Sleeve Design
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['short', 'long', 'sleeveless'].map((sleeve) => (
                <motion.button
                  key={sleeve}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChange('sleeveLength', sleeve)}
                  className={`p-4 rounded-lg capitalize font-semibold transition-all ${
                    formData.sleeveLength === sleeve
                      ? 'bg-gradient-to-r from-fashionPurple to-fashionPink text-white'
                      : 'glass-effect glass-hover text-gray-300'
                  }`}
                >
                  {sleeve}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Neck Design */}
          <div className={formSectionClass}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🎀</span> Neck Design
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['round', 'v-neck', 'collar'].map((neck) => (
                <motion.button
                  key={neck}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChange('neckType', neck)}
                  className={`p-4 rounded-lg capitalize font-semibold transition-all ${
                    formData.neckType === neck
                      ? 'bg-gradient-to-r from-fashionPurple to-fashionPink text-white'
                      : 'glass-effect glass-hover text-gray-300'
                  }`}
                >
                  {neck}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div className={formSectionClass}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🎨</span> Color
            </h2>
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <label className="block text-gray-300 mb-2">Select Color</label>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => handleChange('color', e.target.value)}
                  className="w-full h-16 rounded-lg cursor-pointer border border-white/20"
                />
              </div>
              <div
                className="w-32 h-32 rounded-lg border-4 border-white/20"
                style={{ backgroundColor: formData.color }}
              />
            </div>
          </div>

          {/* Measurements */}
          <div className={formSectionClass}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📏</span> Body Measurements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['chest', 'waist', 'length'].map((field) => (
                <div key={field}>
                  <label className="block text-gray-300 mb-2 capitalize">{field} (cm)</label>
                  <input
                    type="number"
                    value={formData.measurements[field]}
                    onChange={(e) => handleMeasurementChange(field, e.target.value)}
                    placeholder={field}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-fashionPurple outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Style Description */}
          <div className={formSectionClass}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span>💬</span> Style Description
            </h2>
            <textarea
              value={formData.styleDescription}
              onChange={(e) => handleChange('styleDescription', e.target.value)}
              placeholder="Describe your design vision... e.g., 'Modern minimalist with flowing lines, sustainable materials'"
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-fashionPurple outline-none transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-fashionPurple to-fashionPink text-white font-bold text-lg transition-all hover:shadow-xl hover:shadow-fashionPurple/50"
          >
            Generate Design
          </motion.button>
        </form>
      </div>
    </div>
  );
}
