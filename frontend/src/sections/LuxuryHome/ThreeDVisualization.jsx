import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ThreeDVisualization() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);

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

      gsap.from(imageWrapRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: 1.5,
        },
        scale: 0.85,
        opacity: 0,
        duration: 1.5,
      });

      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
        scale: 1.08,
        ease: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-luxury-bg"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-luxury-bg to-white" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div ref={textRef} className="flex-1 text-center md:text-left">
          <p className="text-xs tracking-[0.3em] uppercase text-dark-400 mb-4 font-medium">
            3D Visualization
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-dark-800 leading-tight">
            Visualize your design
            <br />
            <span className="text-dark-400 font-light italic">in 3D before production</span>
          </h2>
          <p className="mt-6 text-dark-400 font-light leading-relaxed max-w-md">
            Preview every angle, drape, and silhouette with photorealistic rendering before committing to sample.
          </p>
        </div>

        <div ref={imageWrapRef} className="flex-1">
          <div className="relative">
            <div className="absolute -inset-6 bg-black/[0.02] blur-3xl" />
            <div className="relative bg-white shadow-2xl">
              <img
                ref={imageRef}
                src="/images/4890348bba669719bc53ad1d78fc7767.jpg"
                alt="3D garment visualization"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/90 backdrop-blur-sm border border-black/5 flex items-center justify-center shadow-sm">
              <span className="text-xs tracking-widest text-dark-500 font-medium">3D</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
