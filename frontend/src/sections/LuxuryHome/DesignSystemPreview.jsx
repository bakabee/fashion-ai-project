import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const swatches = [
  { name: 'Silk Crepe', color: 'bg-[#e8e0d8]' },
  { name: 'Wool Twill', color: 'bg-[#d4cfc8]' },
  { name: 'Cotton Poplin', color: 'bg-[#f0ece6]' },
  { name: 'Linen Blend', color: 'bg-[#e3ddd5]' },
];

const tools = [
  { label: 'Pattern Draft', icon: '⊞' },
  { label: 'Grading', icon: '⊟' },
  { label: 'Markers', icon: '≡' },
];

export default function DesignSystemPreview() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const panelsRef = useRef([]);

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

      panelsRef.current.forEach((panel, i) => {
        gsap.from(panel, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1.2,
          },
          y: 60 + i * 20,
          opacity: 0,
          duration: 1,
          delay: i * 0.1,
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div ref={textRef} className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-dark-400 mb-4 font-medium">
            Design System
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dark-800">
            From concept to structured
            <br />
            <span className="text-dark-400 font-light italic">garment design</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div
            ref={(el) => (panelsRef.current[0] = el)}
            className="bg-white/80 backdrop-blur-sm border border-black/5 p-6 shadow-sm"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-dark-400 mb-4">Fabric Swatches</p>
            <div className="space-y-3">
              {swatches.map((s) => (
                <div key={s.name} className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${s.color} border border-black/5`} />
                  <span className="text-sm text-dark-600 font-light">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={(el) => (panelsRef.current[1] = el)}
            className="bg-white/80 backdrop-blur-sm border border-black/5 p-6 shadow-sm"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-dark-400 mb-4">Construction Tools</p>
            <div className="space-y-3">
              {tools.map((t) => (
                <div key={t.label} className="flex items-center gap-3">
                  <span className="text-lg text-dark-400">{t.icon}</span>
                  <span className="text-sm text-dark-600 font-light">{t.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-black/5">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-dark-200" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-dark-400">Stitching flow</span>
                <div className="h-px flex-1 bg-dark-200" />
              </div>
              <div className="mt-3 flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-1 flex-1 bg-dark-200" />
                ))}
              </div>
            </div>
          </div>

          <div
            ref={(el) => (panelsRef.current[2] = el)}
            className="bg-white/80 backdrop-blur-sm border border-black/5 p-6 shadow-sm"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-dark-400 mb-4">Pattern Lines</p>
            <svg viewBox="0 0 200 150" className="w-full">
              <path d="M20 20 L100 20 L100 100 L20 100 Z" stroke="#1a1a1a" strokeWidth="0.5" fill="none" strokeDasharray="4 3" />
              <path d="M30 30 L90 30 L90 90 L30 90 Z" stroke="#6b7280" strokeWidth="0.5" fill="none" />
              <line x1="100" y1="60" x2="180" y2="60" stroke="#1a1a1a" strokeWidth="0.5" strokeDasharray="3 3" />
              <rect x="140" y="20" width="40" height="80" rx="2" stroke="#6b7280" strokeWidth="0.5" fill="none" />
              <circle cx="60" cy="60" r="3" fill="#1a1a1a" fillOpacity="0.3" />
              <circle cx="80" cy="40" r="2" fill="#1a1a1a" fillOpacity="0.2" />
              <path d="M20 120 Q60 110 100 120 Q140 130 180 120" stroke="#1a1a1a" strokeWidth="0.3" fill="none" strokeDasharray="2 2" />
            </svg>
            <p className="text-[10px] tracking-[0.15em] uppercase text-dark-400 mt-2 text-center">Grainline · Notch · Seam Allowance</p>
          </div>
        </div>
      </div>
    </section>
  );
}
