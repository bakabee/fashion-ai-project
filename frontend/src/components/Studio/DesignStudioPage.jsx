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

  const formSectionClass = 'form-section bg-white/90 backdrop-blur-sm border border-teal-400/15 shadow-sm p-8 rounded-2xl';

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-offWhite via-beige-200/20 to-skyBlue-200/15 pt-32 pb-16">
      <div className="section-padding max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-dark-800 mb-4">
            Design Studio
          </h1>
          <p className="text-dark-500 text-lg">
            Create your custom fashion design with AI assistance
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Fabric Selection */}
          <div className={formSectionClass}>
            <h2 className="text-2xl font-bold text-dark-800 mb-6 flex items-center gap-2">
              Fabric Selection
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
                      ? 'bg-black text-white'
                      : 'bg-white border border-black/10 text-dark-600 hover:bg-dark-50 hover:border-black/20'
                  }`}
                >
                  {fabric}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Sleeve Design */}
          <div className={formSectionClass}>
            <h2 className="text-2xl font-bold text-dark-800 mb-6 flex items-center gap-2">
              Sleeve Design
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
                      ? 'bg-black text-white'
                      : 'bg-white border border-black/10 text-dark-600 hover:bg-dark-50 hover:border-black/20'
                  }`}
                >
                  {sleeve}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Neck Design */}
          <div className={formSectionClass}>
            <h2 className="text-2xl font-bold text-dark-800 mb-6 flex items-center gap-2">
              Neck Design
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
                      ? 'bg-black text-white'
                      : 'bg-white border border-black/10 text-dark-600 hover:bg-dark-50 hover:border-black/20'
                  }`}
                >
                  {neck}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div className={formSectionClass}>
            <h2 className="text-2xl font-bold text-dark-800 mb-6 flex items-center gap-2">
              Color
            </h2>
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <label className="block text-dark-500 mb-2">Select Color</label>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => handleChange('color', e.target.value)}
                  className="w-full h-16 rounded-lg cursor-pointer border border-black/20"
                />
              </div>
              <div
                className="w-32 h-32 rounded-lg border-4 border-black/10"
                style={{ backgroundColor: formData.color }}
              />
            </div>
          </div>

          {/* Measurements */}
          <div className={formSectionClass}>
            <h2 className="text-2xl font-bold text-dark-800 mb-6 flex items-center gap-2">
              Body Measurements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['chest', 'waist', 'length'].map((field) => (
                <div key={field}>
                  <label className="block text-dark-500 mb-2 capitalize">{field} (cm)</label>
                  <input
                    type="number"
                    value={formData.measurements[field]}
                    onChange={(e) => handleMeasurementChange(field, e.target.value)}
                    placeholder={field}
                    className="w-full px-4 py-2 rounded-lg bg-white border border-black/10 text-dark-800 placeholder-dark-300 focus:border-dark-500 outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Style Description */}
          <div className={formSectionClass}>
            <h2 className="text-2xl font-bold text-dark-800 mb-6 flex items-center gap-2">
              Style Description
            </h2>
            <textarea
              value={formData.styleDescription}
              onChange={(e) => handleChange('styleDescription', e.target.value)}
              placeholder="Describe your design vision... e.g., 'Modern minimalist with flowing lines, sustainable materials'"
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-white border border-black/10 text-dark-800 placeholder-dark-300 focus:border-dark-500 outline-none transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 rounded-xl bg-black text-white font-bold text-lg transition-all hover:bg-dark-800"
          >
            Generate Design
          </motion.button>
        </form>
      </div>
    </div>
  );
}
