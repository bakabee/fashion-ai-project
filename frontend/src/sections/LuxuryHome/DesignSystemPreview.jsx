import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const swatches = [
  { name: 'Silk Crepe de Chine', color: 'bg-[#e8e0d8]', code: 'SC-01', weight: '45 gsm' },
  { name: 'Wool Twill', color: 'bg-[#d4cfc8]', code: 'WT-04', weight: '180 gsm' },
  { name: 'Cotton Poplin', color: 'bg-[#f0ece6]', code: 'CP-02', weight: '110 gsm' },
  { name: 'Linen Blend', color: 'bg-[#e3ddd5]', code: 'LB-03', weight: '150 gsm' },
  { name: 'Viscose Jersey', color: 'bg-[#e6dfd6]', code: 'VJ-05', weight: '130 gsm' },
];

const tools = [
  { label: 'Pattern Drafting', icon: '⊞' },
  { label: 'Grading', icon: '⊟' },
  { label: 'Marker Making', icon: '≡' },
  { label: 'Seam Allocation', icon: '⋮' },
  { label: 'Notch Placement', icon: '◜' },
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
          y: 60 + i * 25,
          opacity: 0,
          duration: 1,
          delay: i * 0.08,
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
        <div ref={textRef} className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-dark-400 mb-4 font-medium">
            Design System
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dark-800 leading-tight">
            From concept to{' '}
            <span className="text-dark-400 font-light italic">structured garment</span>
            <br />
            design
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {/* Panel 1: Fabric Library */}
          <div
            ref={(el) => (panelsRef.current[0] = el)}
            className="bg-white/90 backdrop-blur-sm border border-black/5 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-dark-400 mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-dark-300" />
              Fabric Library
            </p>
            <div className="space-y-3">
              {swatches.map((s) => (
                <div key={s.name} className="flex items-center gap-3 group cursor-pointer">
                  <div className={`w-10 h-10 ${s.color} border border-black/5 group-hover:border-black/20 transition-colors`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-dark-700 truncate">{s.name}</p>
                    <p className="text-[9px] text-dark-400 font-mono">{s.code} · {s.weight}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[9px] tracking-[0.15em] uppercase text-dark-300 text-center">Premium material library — 200+ fabrics</p>
          </div>

          {/* Panel 2: Construction Tools */}
          <div
            ref={(el) => (panelsRef.current[1] = el)}
            className="bg-white/90 backdrop-blur-sm border border-black/5 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-dark-400 mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-dark-300" />
              Construction Tools
            </p>
            <div className="space-y-3">
              {tools.map((t) => (
                <div key={t.label} className="flex items-center gap-3 group cursor-pointer">
                  <span className="text-base text-dark-400 w-6 text-center">{t.icon}</span>
                  <span className="text-xs text-dark-600 font-light group-hover:text-dark-800 transition-colors">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Stitching flow visualization */}
            <div className="mt-6 pt-4 border-t border-black/5">
              <p className="text-[9px] tracking-[0.2em] uppercase text-dark-400 mb-3">Stitching Flow</p>
              <div className="flex items-center gap-1.5">
                {['CUT', 'SEW', 'PRESS', 'FINISH', 'INSPECT'].map((step, i) => (
                  <div key={step} className="flex-1 text-center">
                    <div className="h-1.5 bg-dark-200 rounded-full mb-1.5" />
                    <span className="text-[7px] tracking-[0.1em] text-dark-400">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel 3: Pattern Lines */}
          <div
            ref={(el) => (panelsRef.current[2] = el)}
            className="bg-white/90 backdrop-blur-sm border border-black/5 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-dark-400 mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-dark-300" />
              Pattern Lines
            </p>
            <svg viewBox="0 0 200 160" className="w-full">
              {/* Front panel */}
              <rect x="15" y="10" width="75" height="95" rx="3" stroke="#1a1a1a" strokeWidth="0.5" fill="none" strokeDasharray="4 3" />
              <path d="M15 40 L90 40" stroke="#6b7280" strokeWidth="0.3" />
              <text x="52" y="7" fontSize="5" fill="#6b7280" textAnchor="middle">FRONT</text>
              {/* Back panel */}
              <rect x="110" y="10" width="75" height="95" rx="3" stroke="#1a1a1a" strokeWidth="0.5" fill="none" strokeDasharray="4 3" />
              <path d="M110 45 L185 45" stroke="#6b7280" strokeWidth="0.3" />
              <text x="147" y="7" fontSize="5" fill="#6b7280" textAnchor="middle">BACK</text>
              {/* Sleeve */}
              <rect x="60" y="115" width="80" height="35" rx="2" stroke="#6b7280" strokeWidth="0.5" fill="none" />
              <text x="100" y="111" fontSize="5" fill="#6b7280" textAnchor="middle">SLEEVE</text>
              {/* Grainline arrows */}
              <line x1="52" y1="20" x2="52" y2="30" stroke="#1a1a1a" strokeWidth="0.4" />
              <polygon points="52,18 51,22 53,22" fill="#1a1a1a" />
              <polygon points="52,32 51,28 53,28" fill="#1a1a1a" />
              {/* Notch markers */}
              <circle cx="90" cy="55" r="1.5" fill="#1a1a1a" fillOpacity="0.3" />
              <circle cx="90" cy="65" r="1.5" fill="#1a1a1a" fillOpacity="0.3" />
              {/* Centre line */}
              <line x1="100" y1="60" x2="100" y2="105" stroke="#1a1a1a" strokeWidth="0.2" strokeDasharray="1.5 1.5" />
            </svg>
            <div className="mt-2 flex justify-center gap-4 text-[8px] text-dark-400">
              <span>⌵ Grainline</span>
              <span>◌ Notch</span>
              <span>― Seam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
