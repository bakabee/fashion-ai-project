import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

export default function Scene1Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        duration: 1.2,
        y: 100,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3,
      });

      gsap.from(subtitleRef.current, {
        duration: 1.2,
        y: 100,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.6,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-luxury-bg to-luxury-surface"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-fashionPurple blur-3xl rounded-full mix-blend-multiply animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fashionPink blur-3xl rounded-full mix-blend-multiply animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.h1
          ref={titleRef}
          className="font-display text-7xl md:text-8xl font-bold text-white mb-6"
        >
          AI Fashion
          <br />
          Design Studio
        </motion.h1>

        <motion.p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-300 font-light"
        >
          Where imagination becomes design
        </motion.p>
      </div>
    </div>
  );
}
