import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function CTAScreen() {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(buttonRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        duration: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black px-4"
    >
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-fashionPurple/40 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-fashionPink/40 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="font-display text-6xl md:text-7xl font-bold text-white mb-8">
          Start Designing Today
        </h2>

        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/studio')}
          className="btn-glass text-lg md:text-xl font-bold px-12 py-4 rounded-xl bg-gradient-to-r from-fashionPurple/30 to-fashionPink/30 hover:from-fashionPurple/50 hover:to-fashionPink/50 border border-white/20 transition-all duration-300"
        >
          START DESIGNING
          <span className="ml-2">→</span>
        </motion.button>

        <p className="text-gray-400 mt-8 text-sm">
          No credit card required • Free tier available
        </p>
      </div>
    </div>
  );
}
