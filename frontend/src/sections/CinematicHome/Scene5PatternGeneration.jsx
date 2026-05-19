import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Scene5PatternGeneration() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pattern-panel', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
      });

      gsap.to('.stitch-flow', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        strokeDashoffset: 0,
        duration: 2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-luxury-bg to-luxury-surface px-4" aria-label="Pattern Generation">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-12 top-20 w-72 h-72 bg-fashionPurple/6 rounded-full blur-3xl" />
        <div className="absolute right-12 bottom-20 w-72 h-72 bg-fashionPink/6 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Convert design into production-ready patterns</h2>
          <p className="text-gray-300 mb-6">2D panels, cutting layout and stitching sequence — preview front, back, sleeve panels and flow.</p>
        </div>

        <div className="flex-1 grid grid-cols-3 gap-4">
          <div className="pattern-panel glass-effect p-4 rounded-lg flex flex-col items-center justify-center">
            <svg width="140" height="160" viewBox="0 0 140 160">
              <rect x="10" y="10" width="120" height="140" rx="6" fill="#111" stroke="#fff" strokeOpacity="0.08"/>
              <path className="stitch-flow" d="M20 30 L120 30 L120 130 L20 130 Z" stroke="#fff" strokeWidth="1" strokeDasharray="400" strokeDashoffset="400" fill="none" strokeOpacity="0.55"/>
            </svg>
            <div className="mt-2 text-sm text-gray-300">Front Panel</div>
          </div>

          <div className="pattern-panel glass-effect p-4 rounded-lg flex flex-col items-center justify-center">
            <svg width="140" height="160" viewBox="0 0 140 160">
              <rect x="10" y="10" width="120" height="140" rx="6" fill="#111" stroke="#fff" strokeOpacity="0.08"/>
              <path className="stitch-flow" d="M70 15 L110 40 L80 140 L50 40 Z" stroke="#fff" strokeWidth="1" strokeDasharray="300" strokeDashoffset="300" fill="none" strokeOpacity="0.55"/>
            </svg>
            <div className="mt-2 text-sm text-gray-300">Back Panel</div>
          </div>

          <div className="pattern-panel glass-effect p-4 rounded-lg flex flex-col items-center justify-center">
            <svg width="140" height="160" viewBox="0 0 140 160">
              <rect x="10" y="10" width="120" height="140" rx="6" fill="#111" stroke="#fff" strokeOpacity="0.08"/>
              <path className="stitch-flow" d="M30 20 Q70 80 110 20" stroke="#fff" strokeWidth="1" strokeDasharray="220" strokeDashoffset="220" fill="none" strokeOpacity="0.55"/>
            </svg>
            <div className="mt-2 text-sm text-gray-300">Sleeve</div>
          </div>
        </div>
      </div>
    </section>
  );
}
