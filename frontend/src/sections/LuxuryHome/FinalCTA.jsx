import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import ThreeDBackground from './ThreeDBackground';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: '✦', label: 'AI-Powered Design' },
  { icon: '◈', label: '3D Visualization' },
  { icon: '⊞', label: 'Pattern Generation' },
  { icon: '◉', label: 'Production Ready' },
];

export default function FinalCTA() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const highlightsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: 'top center', end: 'center center', scrub: 1.5 },
        y: 60, opacity: 0, duration: 1.2,
      });
      gsap.from(buttonRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: 'top center', end: 'center center', scrub: 1.5 },
        y: 40, opacity: 0, duration: 1, delay: 0.2,
      });
      highlightsRef.current.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: containerRef.current, start: 'top center', end: 'center center', scrub: 1.2 },
          y: 20, opacity: 0, duration: 0.8, delay: 0.3 + i * 0.08,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [navigate]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-luxury-surface via-white to-white"
    >
      <ThreeDBackground variant="stars" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-black/[0.012] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        <div ref={contentRef}>
          <p className="text-[10px] tracking-[0.35em] uppercase text-dark-500 mb-4 font-medium">
            Begin Your Journey
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-dark-800 mb-3 leading-tight">
            Create the future
            <br />
            <span className="text-dark-500 font-light italic">of fashion</span>
          </h2>
          <p className="text-dark-600 font-light max-w-md mx-auto mb-6 text-sm md:text-base leading-relaxed">
            From first sketch to finished pattern — your complete AI fashion atelier. Join thousands of designers already shaping tomorrow's collections.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 md:gap-5 mb-8 flex-wrap">
          {highlights.map((h, i) => (
            <div key={h.label} ref={(el) => (highlightsRef.current[i] = el)} className="flex items-center gap-1.5">
              <span className="text-dark-400 text-xs">{h.icon}</span>
              <span className="text-[9px] tracking-[0.15em] uppercase text-dark-500">{h.label}</span>
            </div>
          ))}
        </div>

        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.04, y: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/studio')}
          className="relative px-12 py-4 bg-white/80 backdrop-blur-md border border-black/10 text-dark-800 text-sm font-medium tracking-widest uppercase shadow-sm hover:shadow-md hover:bg-white/95 hover:border-black/20 transition-all duration-500 inline-flex items-center gap-3"
        >
          <span className="relative z-10">START DESIGNING</span>
          <span className="text-base relative z-10">→</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.02] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
        </motion.button>

        <p className="mt-4 text-[9px] tracking-[0.2em] uppercase text-dark-400">
          No credit card required · Free tier available
        </p>
      </div>
    </section>
  );
}
