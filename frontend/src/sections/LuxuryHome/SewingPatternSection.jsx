import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: '01',
    title: 'Garment Construction Logic',
    desc: 'Analyze design intent and map structural seams, darts, and panel divisions for optimal assembly sequence.',
  },
  {
    number: '02',
    title: 'Stitching Flow Representation',
    desc: 'Visualize the sequential stitching path — from shoulder assembly to hem finishing — with precision order mapping.',
  },
  {
    number: '03',
    title: 'Cutting Layout Optimization',
    desc: 'Maximize fabric yield with AI-optimized marker plans. Reduce waste by up to 15% per production run.',
  },
  {
    number: '04',
    title: 'Production-Ready Export',
    desc: 'Generate industry-standard patterns in PDF, DXF, or AAMA format. Ready for grading and mass production.',
  },
];

export default function SewingPatternSection() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const stepsRef = useRef([]);
  const badgeRef = useRef(null);

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

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: 1.5,
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
      });

      gsap.from(badgeRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'center center',
          end: 'bottom center',
          scrub: 1.2,
        },
        y: 30,
        opacity: 0,
        duration: 1,
      });

      stepsRef.current.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'center center',
            end: 'bottom center',
            scrub: 1.2,
          },
          x: -30,
          opacity: 0,
          duration: 1,
          delay: i * 0.12,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-luxury-surface"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-luxury-bg to-luxury-surface" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-black/[0.008] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div ref={textRef} className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-dark-400 mb-4 font-medium">
            Technical Pattern
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-dark-800 leading-tight">
            Convert designs into
            <br />
            <span className="text-dark-400 font-light italic">production-ready patterns</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Image */}
          <div ref={imageRef} className="flex-1 w-full">
            <div className="relative">
              <div className="absolute -inset-3 bg-black/[0.03] blur-2xl" />
              <div className="relative bg-white border border-black/5 shadow-lg p-2">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-dark-300/20 to-transparent" />
                <img
                  src="/images/ff6ebb60eeb2fef83fe4f59ac4ba1aea.jpg"
                  alt="Sewing pattern technical drawing"
                  className="w-full h-auto object-contain"
                />
                {/* Grid overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                  <svg className="w-full h-full">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="black" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
              </div>
              <div
                ref={badgeRef}
                className="absolute -bottom-3 -left-3 bg-white/95 backdrop-blur-sm border border-black/5 px-4 py-3 shadow-sm"
              >
                <p className="text-[10px] tracking-[0.2em] uppercase text-dark-400">Production Ready</p>
                <p className="text-xs text-dark-600 font-medium">Pattern Grade A · Size Run 2-16</p>
              </div>
            </div>
          </div>

          {/* Right: Steps */}
          <div className="flex-1 space-y-5 w-full">
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => (stepsRef.current[i] = el)}
                className="flex items-start gap-4 group cursor-default"
              >
                <span className="text-xl font-display font-bold text-dark-200 group-hover:text-dark-400 transition-colors duration-300 mt-0.5">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-dark-700">{step.title}</h3>
                  <p className="text-xs text-dark-400 font-light mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
