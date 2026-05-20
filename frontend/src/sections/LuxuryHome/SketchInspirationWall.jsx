import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const collageItems = [
  {
    image: '/images/4890348bba669719bc53ad1d78fc7767.jpg',
    className: 'w-64 h-80 md:w-72 md:h-96 top-12 left-[5%] z-10',
    parallaxSpeed: 0.6,
  },
  {
    image: '/images/8a557a778f4aab0d384a8388df19e6ce.jpg',
    className: 'w-56 h-72 md:w-64 md:h-80 top-4 right-[8%] z-20',
    parallaxSpeed: 0.4,
  },
  {
    image: '/images/8e079dac8cfc7ed18d5f56eb57fbd7eb.jpg',
    className: 'w-72 h-56 md:w-80 md:h-64 bottom-16 left-[12%] z-30',
    parallaxSpeed: 0.8,
  },
  {
    image: '/images/ff6ebb60eeb2fef83fe4f59ac4ba1aea.jpg',
    className: 'w-48 h-64 md:w-56 md:h-72 bottom-8 right-[5%] z-10',
    parallaxSpeed: 0.3,
  },
];

export default function SketchInspirationWall() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1.5,
        },
        y: 80,
        opacity: 0,
        duration: 1,
      });

      itemsRef.current.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1.2,
          },
          y: 120 + i * 30,
          opacity: 0,
          rotation: i % 2 === 0 ? -8 : 8,
          duration: 1.5,
        });

        gsap.to(el, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
          y: (i) => (i % 2 === 0 ? -60 : 60),
          ease: 'none',
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
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-bg via-white to-luxury-bg" />

      <div className="absolute inset-0 overflow-hidden">
        {collageItems.map((item, i) => (
          <motion.div
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            whileHover={{ scale: 1.03, zIndex: 40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute ${item.className} shadow-xl`}
          >
            <div className="w-full h-full overflow-hidden">
              <img
                src={item.image}
                alt={`Sketch inspiration ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-50 text-center px-6">
        <p
          ref={textRef}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-dark-800 tracking-tight"
        >
          Inspiration begins
          <br />
          <span className="text-dark-400 font-light italic">with sketches</span>
        </p>
      </div>
    </section>
  );
}
