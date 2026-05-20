import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThreeDBackground from './ThreeDBackground';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: '01',
    title: 'Garment Construction Logic',
    desc: 'Map structural seams, darts, and panel divisions for optimal assembly sequence.',
  },
  {
    number: '02',
    title: 'Stitching Flow Representation',
    desc: 'Visualize the sequential stitching path — from shoulder assembly to hem finishing.',
  },
  {
    number: '03',
    title: 'Cutting Layout Optimization',
    desc: 'Maximize fabric yield with AI-optimized marker plans. Reduce waste by up to 15%.',
  },
  {
    number: '04',
    title: 'Production-Ready Export',
    desc: 'Generate industry-standard patterns in PDF, DXF, or AAMA format.',
  },
];

export default function SewingPatternSection() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const stepsRef = useRef([]);
  const badgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: 'top center', end: 'center center', scrub: 1.5 },
        y: 60, opacity: 0, duration: 1,
      });
      gsap.from(imageRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'center center', scrub: 1.5 },
        scale: 0.9, opacity: 0, duration: 1.5,
      });
      gsap.from(badgeRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: 'center center', end: 'bottom center', scrub: 1.2 },
        y: 20, opacity: 0, duration: 1,
      });
      stepsRef.current.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: containerRef.current, start: 'center bottom', end: 'bottom center', scrub: 1.2 },
          x: -20, opacity: 0, duration: 1, delay: i * 0.1,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-skyBlue-200/25 via-beige-200/20 to-offWhite py-16 md:py-20"
    >
      <ThreeDBackground variant="blobs" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div ref={textRef} className="text-center mb-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-dark-500 mb-2 font-medium">
            Technical Pattern
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dark-800 leading-tight">
            Convert designs into
            <br />
            <span className="text-dark-500 font-light italic">production-ready patterns</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
          <div ref={imageRef} className="flex-1 w-full max-w-sm lg:max-w-lg">
            <div className="relative">
              <div className="absolute -inset-4 bg-black/[0.03] blur-2xl" />
              <div className="relative bg-white border border-black/5 shadow-lg p-2">
                <img
                  src="/images/ff6ebb60eeb2fef83fe4f59ac4ba1aea.jpg"
                  alt="Sewing pattern technical drawing"
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                  <svg className="w-full h-full">
                    <defs>
                      <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
                        <path d="M 16 0 L 0 0 0 16" fill="none" stroke="black" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
              </div>
              <div ref={badgeRef} className="absolute -bottom-3 -left-3 bg-white/95 backdrop-blur-sm border border-black/5 px-4 py-2.5 shadow-sm">
                <p className="text-[9px] tracking-[0.2em] uppercase text-dark-500">Production Ready</p>
                <p className="text-xs text-dark-600 font-medium">Pattern Grade A · Size Run 2-16</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4 w-full lg:max-w-lg">
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => (stepsRef.current[i] = el)}
                className="flex items-start gap-4 group cursor-default"
              >
                <span className="text-lg font-display font-bold text-dark-300 group-hover:text-dark-500 transition-colors duration-300 mt-0.5">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-dark-700">{step.title}</h3>
                  <p className="text-sm text-dark-500 font-light mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
