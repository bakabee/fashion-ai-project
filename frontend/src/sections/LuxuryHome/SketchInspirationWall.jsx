import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import ThreeDBackground from './ThreeDBackground';

gsap.registerPlugin(ScrollTrigger);

const collageItems = [
  {
    image: '/images/4890348bba669719bc53ad1d78fc7767.jpg',
    className: 'w-56 h-72 md:w-72 md:h-96 top-8 left-[3%] z-10',
    rotate: -3, parallaxSpeed: 0.5,
    label: 'Editorial Sketch • S/S 2026',
  },
  {
    image: '/images/8a557a778f4aab0d384a8388df19e6ce.jpg',
    className: 'w-48 h-64 md:w-60 md:h-80 top-2 right-[6%] z-20',
    rotate: 2, parallaxSpeed: 0.35,
    label: 'Structural Study',
  },
  {
    image: '/images/8e079dac8cfc7ed18d5f56eb57fbd7eb.jpg',
    className: 'w-64 h-52 md:w-80 md:h-64 bottom-20 left-[10%] z-30',
    rotate: -1, parallaxSpeed: 0.7,
    label: 'Drape Analysis',
  },
  {
    image: '/images/ff6ebb60eeb2fef83fe4f59ac4ba1aea.jpg',
    className: 'w-40 h-56 md:w-52 md:h-72 bottom-4 right-[3%] z-10',
    rotate: 4, parallaxSpeed: 0.25,
    label: 'Construction Notes',
  },
];

export default function SketchInspirationWall() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const descRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: 'top center', end: 'center center', scrub: 1.5 },
        y: 80, opacity: 0, duration: 1,
      });
      gsap.from(descRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: 'top center', end: 'center center', scrub: 1.5 },
        y: 60, opacity: 0, duration: 1, delay: 0.15,
      });
      itemsRef.current.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'center center', scrub: 1.2 },
          y: 150 + i * 40, opacity: 0, rotation: collageItems[i].rotate * 2, duration: 1.5,
        });
        gsap.to(el, {
          scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
          y: (i) => (i % 2 === 0 ? -80 : 80), ease: 'none',
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white"
    >
      <ThreeDBackground variant="knots" />
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-bg via-white to-luxury-bg" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {collageItems.map((item, i) => (
          <div
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            style={{ rotate: `${item.rotate}deg` }}
            className={`absolute ${item.className} pointer-events-auto`}
          >
            <motion.div
              whileHover={{ scale: 1.04, rotate: '0deg', zIndex: 50 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full relative group cursor-pointer"
            >
              <div className="w-full h-full overflow-hidden shadow-lg">
                <img src={item.image} alt={`Sketch ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-[9px] tracking-[0.15em] uppercase font-medium">{item.label}</p>
              </div>
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-dark-400 shadow-sm border border-white/50" />
            </motion.div>
          </div>
        ))}
      </div>

      <div className="relative z-40 text-center px-6 max-w-2xl">
        <p ref={textRef} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-dark-800 tracking-tight leading-tight">
          Inspiration begins
          <br />
          <span className="text-dark-500 font-light italic">with sketches</span>
        </p>
        <p ref={descRef} className="mt-4 text-sm md:text-base text-dark-600 font-light max-w-md mx-auto">
          Every collection starts with a line on paper. Explore curated sketches, structural studies, and editorial concepts.
        </p>
        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] uppercase text-dark-500">
          <span className="w-8 h-px bg-dark-300" />
          <span>Explore the inspiration wall</span>
          <span className="w-8 h-px bg-dark-300" />
        </div>
      </div>
    </section>
  );
}
