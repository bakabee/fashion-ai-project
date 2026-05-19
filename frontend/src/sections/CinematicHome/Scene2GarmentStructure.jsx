import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Scene2GarmentStructure() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [bodyType, setBodyType] = useState('standard');

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

      // subtle mannequin pulse
      gsap.to('.mannequin-wire', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 2,
        },
        rotate: 1,
        y: -6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-luxury-bg to-luxury-surface px-4" aria-label="Garment Structure: Body and Form">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-16 top-24 w-72 h-72 bg-fashionPurple/10 rounded-full blur-3xl" />
        <div className="absolute right-16 bottom-24 w-72 h-72 bg-fashionPink/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <h2 ref={titleRef} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Define structure, fit, and silhouette</h2>
          <p className="text-gray-300 mb-6">Select body type, base construction, and precise fit parameters to anchor your garment.</p>

          <div className="flex gap-3 justify-center md:justify-start">
            {['petite','standard','curvy'].map((type) => (
              <motion.button
                key={type}
                onClick={() => setBodyType(type)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`btn-glass px-4 py-2 rounded-md text-sm ${bodyType===type? 'ring-2 ring-fashionPurple':''}`}
              >
                {type.toUpperCase()}
              </motion.button>
            ))}
          </div>

          <div className="mt-6 text-sm text-gray-400">
            <p>Tailornova logic: body type selection • garment base construction • fit definition</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="mannequin-wire glass-effect p-6 rounded-2xl backdrop-blur-xl flex flex-col items-center justify-center">
            {/* Subtle mannequin wireframe placeholder */}
            <svg width="220" height="380" viewBox="0 0 220 380" className="opacity-90">
              <g stroke="#ffffff" strokeWidth="1" fill="none" strokeOpacity="0.9">
                <ellipse cx="110" cy="60" rx="44" ry="34" />
                <path d="M66 94 C80 140 80 240 110 300 C140 240 140 140 154 94" />
                <line x1="110" y1="120" x2="110" y2="300" strokeDasharray="4 4" />
                <rect x="42" y="180" width="136" height="120" rx="10" strokeDasharray="6 4" />
              </g>
            </svg>

            <div className="mt-4 text-sm text-gray-300 text-center">Selected: <span className="text-white">{bodyType}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
