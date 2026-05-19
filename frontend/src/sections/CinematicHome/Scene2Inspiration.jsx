import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Scene2Inspiration() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

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

      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.15,
      });

      // Parallax for collage items
      gsap.to('.inspo-parallax', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: (i) => i * 40,
        rotation: (i) => (i % 2 === 0 ? -2 : 2),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-luxury-surface to-luxury-bg px-4"
      aria-label="Inspiration: Vision Board"
    >
      {/* Collage background - Pinterest editorial feel */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="inspo-parallax absolute left-10 top-16 w-56 h-80 bg-cover bg-center rounded-xl shadow-lg" style={{backgroundImage: 'linear-gradient(135deg, rgba(141,92,255,0.12), rgba(255,79,163,0.08))'}} />
        <div className="inspo-parallax absolute right-16 top-24 w-72 h-48 bg-cover bg-center rounded-xl shadow-2xl" style={{backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.25), rgba(255,255,255,0.02))'}} />
        <div className="inspo-parallax absolute left-1/3 bottom-20 w-80 h-56 bg-cover bg-center rounded-xl shadow-xl" style={{backgroundImage: 'linear-gradient(90deg, rgba(141,92,255,0.06), rgba(255,79,163,0.06))'}} />
        <div className="inspo-parallax absolute right-1/4 bottom-6 w-44 h-64 bg-cover bg-center rounded-xl shadow" style={{backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.18), rgba(255,79,163,0.03))'}} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 ref={titleRef} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
          Every garment begins with inspiration
        </h2>
        <p ref={subtitleRef} className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Explore silhouettes, moods, and fashion identity — build a curated vision board to seed your design.
        </p>

        <p className="mt-6 text-sm text-gray-400">Idea Phase — Collect mood, runway, fabric, and editorial references</p>
      </div>
    </section>
  );
}
