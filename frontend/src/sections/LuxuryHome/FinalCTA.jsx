import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1.5,
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
      });

      gsap.from(buttonRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1.5,
        },
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [navigate]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-luxury-surface via-white to-white"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-black/[0.015] rounded-full blur-3xl" />
      </div>

      <div ref={contentRef} className="relative z-10 text-center max-w-2xl mx-auto px-6">
        <p className="text-xs tracking-[0.3em] uppercase text-dark-400 mb-6 font-medium">
          Begin Your Journey
        </p>
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-dark-800 mb-4 leading-tight">
          Create the future
          <br />
          <span className="text-dark-400 font-light italic">of fashion</span>
        </h2>
        <p className="text-dark-400 font-light max-w-md mx-auto mb-10 text-lg">
          From first sketch to finished pattern — your complete AI fashion atelier.
        </p>

        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.04, y: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/studio')}
          className="relative px-12 py-5 bg-white/80 backdrop-blur-md border border-black/10 text-dark-800 text-sm font-medium tracking-widest uppercase shadow-sm hover:shadow-md hover:bg-white/95 transition-all duration-500"
        >
          <span className="relative z-10">START DESIGNING</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.02] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
        </motion.button>
      </div>
    </section>
  );
}
