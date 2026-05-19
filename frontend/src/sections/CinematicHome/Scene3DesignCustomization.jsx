import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const sleeveOptions = ['cap', 'long', 'bell'];
const collarOptions = ['v-neck', 'crew', 'stand'];
const fabrics = ['Silk', 'Twill', 'Wool', 'Linen'];

export default function Scene3DesignCustomization() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [sleeve, setSleeve] = useState(sleeveOptions[0]);
  const [collar, setCollar] = useState(collarOptions[0]);
  const [fabric, setFabric] = useState(fabrics[0]);
  const [color, setColor] = useState('#8d5cff');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
        y: 80,
        opacity: 0,
        duration: 1,
      });

      gsap.to('.floating-detail', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -40,
        rotation: 2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-luxury-surface to-luxury-bg px-4" aria-label="Design Customization">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-12 top-28 w-48 h-48 bg-fashionPurple/10 rounded-full blur-3xl" />
        <div className="absolute right-12 bottom-28 w-48 h-48 bg-fashionPink/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h2 ref={titleRef} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Customize every design detail</h2>
          <p className="text-gray-300 mb-6">Morph necklines, swap sleeves, apply fabrics and colors — a fashion CAD feeling with cinematic layering.</p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm text-gray-400 mb-2">Sleeves</h4>
              <div className="flex gap-2">
                {sleeveOptions.map(s => (
                  <motion.button key={s} onClick={() => setSleeve(s)} whileHover={{ scale: 1.04 }} className={`btn-glass px-3 py-2 text-sm ${sleeve===s? 'ring-2 ring-fashionPink':''}`}>{s}</motion.button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm text-gray-400 mb-2">Neckline</h4>
              <div className="flex gap-2">
                {collarOptions.map(c => (
                  <motion.button key={c} onClick={() => setCollar(c)} whileHover={{ scale: 1.04 }} className={`btn-glass px-3 py-2 text-sm ${collar===c? 'ring-2 ring-fashionPurple':''}`}>{c}</motion.button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm text-gray-400 mb-2">Fabric</h4>
              <div className="flex gap-2 flex-wrap">
                {fabrics.map(f => (
                  <motion.button key={f} onClick={() => setFabric(f)} whileHover={{ scale: 1.03 }} className={`btn-glass px-3 py-2 text-sm ${fabric===f? 'ring-2 ring-fashionPurple':''}`}>{f}</motion.button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm text-gray-400 mb-2">Color</h4>
              <div className="flex items-center gap-2">
                {['#8d5cff','#ff4fa3','#1f2937','#ffffff'].map(c => (
                  <button key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-full border-2 ${color===c? 'ring-2 ring-white':''}`} style={{background:c}} />
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="floating-detail glass-effect p-6 rounded-2xl backdrop-blur-xl max-w-xs w-full text-center">
            {/* Mock CAD preview */}
            <div style={{height:260}} className="relative flex items-center justify-center">
              <svg width="180" height="240" viewBox="0 0 180 240" className="mx-auto">
                <g fill={color} opacity="0.95">
                  <path d="M40 40 C50 20,130 20,140 40 L140 160 C130 200,50 200,40 160 Z" />
                </g>
                <g fill="none" stroke="#fff" strokeOpacity="0.6">
                  <path d="M40 40 C50 20,130 20,140 40" />
                  <path d="M50 160 C70 190,110 190,130 160" strokeDasharray="6 4" />
                </g>
              </svg>

              <div className="absolute bottom-4 left-4 text-xs text-gray-300">Sleeve: <span className="text-white">{sleeve}</span></div>
              <div className="absolute bottom-4 right-4 text-xs text-gray-300">Neck: <span className="text-white">{collar}</span></div>
              <div className="absolute top-4 left-4 text-xs text-gray-300">Fabric: <span className="text-white">{fabric}</span></div>
            </div>

            <div className="mt-4 text-sm text-gray-400">Interactive preview — cinematic transitions reflect choices</div>
          </div>
        </div>
      </div>
    </section>
  );
}
