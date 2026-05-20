import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SewingPatternSection() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

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

      gsap.from(overlayRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'center center',
          end: 'bottom center',
          scrub: 1.2,
        },
        y: 40,
        opacity: 0,
        duration: 1,
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div ref={imageRef} className="flex-1 w-full">
          <div className="relative">
            <div className="absolute -inset-3 bg-black/[0.03] blur-2xl" />
            <div className="relative bg-white border border-black/5 shadow-lg p-2">
              <img
                src="/images/ff6ebb60eeb2fef83fe4f59ac4ba1aea.jpg"
                alt="Sewing pattern technical drawing"
                className="w-full h-auto object-contain"
              />
            </div>
            <div
              ref={overlayRef}
              className="absolute -bottom-3 -left-3 bg-white/95 backdrop-blur-sm border border-black/5 px-4 py-3 shadow-sm"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-dark-400">Production Ready</p>
              <p className="text-xs text-dark-600 font-medium">Pattern Grade A</p>
            </div>
          </div>
        </div>

        <div ref={textRef} className="flex-1 text-center md:text-left">
          <p className="text-xs tracking-[0.3em] uppercase text-dark-400 mb-4 font-medium">
            Technical Pattern
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-dark-800 leading-tight">
            Convert designs into
            <br />
            <span className="text-dark-400 font-light italic">production-ready patterns</span>
          </h2>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border border-dark-300 flex items-center justify-center">
                <span className="text-[10px] text-dark-500">01</span>
              </div>
              <span className="text-sm text-dark-500 font-light">Garment construction logic</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border border-dark-300 flex items-center justify-center">
                <span className="text-[10px] text-dark-500">02</span>
              </div>
              <span className="text-sm text-dark-500 font-light">Stitching flow representation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border border-dark-300 flex items-center justify-center">
                <span className="text-[10px] text-dark-500">03</span>
              </div>
              <span className="text-sm text-dark-500 font-light">Cutting layout optimization</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
