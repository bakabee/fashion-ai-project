import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    number: '01',
    title: '360° Rotation',
    desc: 'Inspect every angle with full rotational control. Zoom into fabric texture and stitch detail.',
  },
  {
    number: '02',
    title: 'Real-time Rendering',
    desc: 'Photorealistic material simulation with dynamic lighting that adapts to your studio environment.',
  },
  {
    number: '03',
    title: 'Fabric Simulation',
    desc: 'AI-driven drape and movement prediction. See how silk flows vs. how structured wool holds form.',
  },
];

export default function ThreeDVisualization() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const featuresRef = useRef([]);
  const dividerRef = useRef(null);

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

      gsap.from(dividerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'center center',
          end: 'bottom center',
          scrub: 1.2,
        },
        scaleX: 0,
        opacity: 0,
        duration: 1,
      });

      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
        scale: 1.06,
        ease: 'none',
      });

      featuresRef.current.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'center center',
            end: 'bottom center',
            scrub: 1.2,
          },
          x: -40,
          opacity: 0,
          duration: 1,
          delay: i * 0.15,
        });
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
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-black/[0.01] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div ref={textRef} className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-dark-400 mb-4 font-medium">
            3D Visualization
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-dark-800 leading-tight">
            Visualize your design{' '}
            <span className="text-dark-400 font-light italic">in 3D</span>
            <br />
            before production
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Feature cards */}
          <div className="flex-1 space-y-6 w-full">
            {features.map((feat, i) => (
              <div
                key={feat.number}
                ref={(el) => (featuresRef.current[i] = el)}
                className="flex items-start gap-5 group cursor-default"
              >
                <span className="text-2xl font-display font-bold text-dark-200 group-hover:text-dark-400 transition-colors duration-300">
                  {feat.number}
                </span>
                <div className="flex-1 border-b border-black/5 pb-5 group-hover:border-black/10 transition-colors duration-300">
                  <h3 className="text-sm font-semibold text-dark-700 uppercase tracking-wider">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-dark-400 font-light mt-1 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Image */}
          <div ref={imageWrapRef} className="flex-1 w-full">
            <div className="relative">
              <div className="absolute -inset-4 bg-black/[0.02] blur-2xl" />
              <div className="relative bg-white shadow-xl">
                <div className="absolute top-0 left-0 w-1 h-full bg-dark-800/10" />
                <img
                  ref={imageRef}
                  src="/images/4890348bba669719bc53ad1d78fc7767.jpg"
                  alt="3D garment visualization"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-white border border-black/5 px-4 py-2 shadow-sm">
                <p className="text-[10px] tracking-[0.15em] uppercase text-dark-400">Powered by Three.js</p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={dividerRef}
          className="mt-10 h-px bg-black/5 origin-left max-w-2xl mx-auto"
        />
      </div>
    </section>
  );
}
