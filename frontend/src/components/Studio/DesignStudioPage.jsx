import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const fabricOptions = [
  { id: 'cotton', label: 'Cotton', weight: '110 gsm' },
  { id: 'denim', label: 'Denim', weight: '280 gsm' },
  { id: 'silk', label: 'Silk', weight: '45 gsm' },
  { id: 'wool', label: 'Wool', weight: '180 gsm' },
  { id: 'polyester', label: 'Polyester', weight: '130 gsm' },
];

const fitOptions = ['slim', 'regular', 'oversized'];
const sleeveOptions = ['short', 'long', 'sleeveless', 'three-quarter', 'dolman', 'raglan'];
const collarOptions = ['round', 'v-neck', 'collar', 'turtleneck', 'boat', 'square', 'asymmetric'];
const stitchOptions = ['standard', 'double', 'flatlock', 'overlock', 'coverstitch', 'blind hem'];
const hemOptions = ['straight', 'curved', 'banded', 'rolled', 'raw edge', 'ribbed'];

const colorPalettes = {
  core: [
    { name: 'Ivory', hex: '#F5F0EB' },
    { name: 'Black', hex: '#1A1A1A' },
    { name: 'Charcoal', hex: '#2B2B2B' },
    { name: 'Cream', hex: '#FBF7F0' },
    { name: 'Navy', hex: '#1C2D3D' },
    { name: 'White', hex: '#FFFFFF' },
  ],
  seasonal: [
    { name: 'Teal', hex: '#5DA9A6' },
    { name: 'Sky Blue', hex: '#A7C7E7' },
    { name: 'Beige', hex: '#E8DCCB' },
    { name: 'Dusty Rose', hex: '#D4A5A5' },
    { name: 'Sage', hex: '#9CAF88' },
    { name: 'Terracotta', hex: '#CC7E5A' },
  ],
  fabric: [
    { name: 'Denim', hex: '#3B5998' },
    { name: 'Camel Hair', hex: '#C19A6B' },
    { name: 'Taupe', hex: '#8B7D6B' },
    { name: 'Burgundy', hex: '#6E2C3D' },
    { name: 'Olive', hex: '#556B2F' },
    { name: 'Steel Gray', hex: '#71797E' },
  ],
};

const measurementFields = [
  { id: 'chest', label: 'Chest' },
  { id: 'waist', label: 'Waist' },
  { id: 'hips', label: 'Hips' },
  { id: 'shoulderWidth', label: 'Shoulder Width' },
  { id: 'sleeveLength', label: 'Sleeve Length' },
  { id: 'garmentLength', label: 'Garment Length' },
  { id: 'neckSize', label: 'Neck Size' },
];

export default function DesignStudioPage() {
  const [formData, setFormData] = useState({
    fabricType: 'cotton',
    fit: 'regular',
    sleeveType: 'long',
    collarType: 'round',
    stitchingStyle: 'standard',
    hemStyle: 'straight',
    color: '#5DA9A6',
    colorPalette: 'seasonal',
    unit: 'cm',
    measurements: {
      chest: '',
      waist: '',
      hips: '',
      shoulderWidth: '',
      sleeveLength: '',
      garmentLength: '',
      neckSize: '',
    },
    styleDescription: '',
  });

  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.form-section', {
        duration: 0.8, y: 50, opacity: 0, stagger: 0.08, ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMeasurementChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      measurements: { ...prev.measurements, [field]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Design submitted:', formData);
  };

  const sectionClass = 'form-section bg-white/90 backdrop-blur-sm border border-teal-400/15 shadow-sm p-6 md:p-8 rounded-2xl';

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-offWhite via-beige-200/20 to-skyBlue-200/15 pt-32 pb-16">
      <div className="section-padding max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal-800 mb-4">
            Design Studio
          </h1>
          <p className="text-dark-500 text-lg">
            Professional fashion CAD tool
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className={sectionClass}>
            <h2 className="text-xl font-bold text-charcoal-800 mb-6 tracking-tight">
              Fabric
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {fabricOptions.map((fabric) => (
                <motion.button
                  key={fabric.id}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleChange('fabricType', fabric.id)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    formData.fabricType === fabric.id
                      ? 'bg-charcoal-800 text-white shadow-lg ring-1 ring-teal-400/30'
                      : 'bg-white/80 border border-teal-400/15 text-dark-600 hover:bg-white hover:border-teal-400/30'
                  }`}
                >
                  <p className="text-sm font-semibold">{fabric.label}</p>
                  <p className={`text-[10px] mt-1 ${formData.fabricType === fabric.id ? 'text-teal-300' : 'text-dark-400'}`}>
                    {fabric.weight}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          <div className={sectionClass}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-charcoal-800 tracking-tight">
                Color
              </h2>
              <div className="flex gap-1.5">
                {Object.keys(colorPalettes).map((palette) => (
                  <motion.button
                    key={palette}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleChange('colorPalette', palette)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] tracking-wider uppercase font-medium transition-all ${
                      formData.colorPalette === palette
                        ? 'bg-charcoal-800 text-white'
                        : 'bg-white/80 border border-teal-400/15 text-dark-500 hover:bg-white'
                    }`}
                  >
                    {palette}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {colorPalettes[formData.colorPalette].map((swatch) => (
                <motion.button
                  key={swatch.hex}
                  type="button"
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChange('color', swatch.hex)}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-full aspect-square rounded-xl border-2 transition-all ${
                      formData.color === swatch.hex
                        ? 'border-charcoal-800 shadow-lg scale-105'
                        : 'border-teal-400/10 hover:border-teal-400/30'
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className="text-[9px] tracking-wide text-dark-500 text-center leading-tight">
                    {swatch.name}
                  </span>
                </motion.button>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-teal-400/10">
              <span className="text-xs text-dark-500 font-medium uppercase tracking-wider">Selected</span>
              <div className="w-8 h-8 rounded-lg border border-charcoal-800/20" style={{ backgroundColor: formData.color }} />
              <span className="text-xs text-dark-600 font-mono">{formData.color}</span>
            </div>
          </div>

          <div className={sectionClass}>
            <h2 className="text-xl font-bold text-charcoal-800 mb-6 tracking-tight">
              Fit
            </h2>
            <div className="flex gap-3">
              {fitOptions.map((fit) => (
                <motion.button
                  key={fit}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleChange('fit', fit)}
                  className={`flex-1 py-3.5 rounded-xl capitalize font-semibold transition-all text-sm ${
                    formData.fit === fit
                      ? 'bg-charcoal-800 text-white shadow-lg'
                      : 'bg-white/80 border border-teal-400/15 text-dark-600 hover:bg-white hover:border-teal-400/30'
                  }`}
                >
                  {fit}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={sectionClass}>
              <h2 className="text-xl font-bold text-charcoal-800 mb-6 tracking-tight">
                Sleeve
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {sleeveOptions.map((sleeve) => (
                  <motion.button
                    key={sleeve}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleChange('sleeveType', sleeve)}
                    className={`py-2.5 px-3 rounded-lg capitalize text-xs font-medium transition-all ${
                      formData.sleeveType === sleeve
                        ? 'bg-charcoal-800 text-white'
                        : 'bg-white/80 border border-teal-400/15 text-dark-600 hover:bg-white hover:border-teal-400/30'
                    }`}
                  >
                    {sleeve}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className={sectionClass}>
              <h2 className="text-xl font-bold text-charcoal-800 mb-6 tracking-tight">
                Collar
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {collarOptions.map((collar) => (
                  <motion.button
                    key={collar}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleChange('collarType', collar)}
                    className={`py-2.5 px-3 rounded-lg capitalize text-xs font-medium transition-all ${
                      formData.collarType === collar
                        ? 'bg-charcoal-800 text-white'
                        : 'bg-white/80 border border-teal-400/15 text-dark-600 hover:bg-white hover:border-teal-400/30'
                    }`}
                  >
                    {collar}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={sectionClass}>
              <h2 className="text-xl font-bold text-charcoal-800 mb-6 tracking-tight">
                Stitching
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {stitchOptions.map((stitch) => (
                  <motion.button
                    key={stitch}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleChange('stitchingStyle', stitch)}
                    className={`py-2.5 px-3 rounded-lg capitalize text-xs font-medium transition-all ${
                      formData.stitchingStyle === stitch
                        ? 'bg-charcoal-800 text-white'
                        : 'bg-white/80 border border-teal-400/15 text-dark-600 hover:bg-white hover:border-teal-400/30'
                    }`}
                  >
                    {stitch}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className={sectionClass}>
              <h2 className="text-xl font-bold text-charcoal-800 mb-6 tracking-tight">
                Hem
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {hemOptions.map((hem) => (
                  <motion.button
                    key={hem}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleChange('hemStyle', hem)}
                    className={`py-2.5 px-3 rounded-lg capitalize text-xs font-medium transition-all ${
                      formData.hemStyle === hem
                        ? 'bg-charcoal-800 text-white'
                        : 'bg-white/80 border border-teal-400/15 text-dark-600 hover:bg-white hover:border-teal-400/30'
                    }`}
                  >
                    {hem}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <div className={sectionClass}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-charcoal-800 tracking-tight">
                Body Measurements
              </h2>
              <div className="flex gap-1.5 bg-white/80 rounded-lg p-1 border border-teal-400/15">
                {['cm', 'in'].map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => handleChange('unit', unit)}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-all ${
                      formData.unit === unit
                        ? 'bg-charcoal-800 text-white'
                        : 'text-dark-500 hover:text-dark-700'
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {measurementFields.map((field) => (
                <div key={field.id}>
                  <label className="block text-[10px] font-medium text-dark-500 uppercase tracking-wider mb-1.5">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.measurements[field.id]}
                      onChange={(e) => handleMeasurementChange(field.id, e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-teal-400/15 text-charcoal-800 placeholder-dark-300 focus:border-teal-400/40 outline-none transition-colors text-sm"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-dark-400 font-mono">
                      {formData.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={sectionClass}>
            <h2 className="text-xl font-bold text-charcoal-800 mb-6 tracking-tight">
              Style Notes
            </h2>
            <textarea
              value={formData.styleDescription}
              onChange={(e) => handleChange('styleDescription', e.target.value)}
              placeholder="Describe your design vision... e.g., 'Structured blazer with soft shoulder, peak lapels, and double-vent back'"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white border border-teal-400/15 text-charcoal-800 placeholder-dark-300 focus:border-teal-400/40 outline-none transition-colors resize-none text-sm"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-charcoal-800 text-white font-bold text-base tracking-wider uppercase transition-all hover:bg-charcoal-900 shadow-lg hover:shadow-xl"
          >
            Generate Design
          </motion.button>
        </form>
      </div>
    </div>
  );
}