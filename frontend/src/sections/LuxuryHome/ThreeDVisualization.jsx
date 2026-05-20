import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThreeDBackground from './ThreeDBackground';

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: 'top center', end: 'center center', scrub: 1.5 },
        y: 60, opacity: 0, duration: 1,
      });
      gsap.from(imageWrapRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'center center', scrub: 1.5 },
        scale: 0.85, opacity: 0, duration: 1.5,
      });
      gsap.to(imageRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 },
        scale: 1.06, ease: 'none',
      });
      featuresRef.current.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: containerRef.current, start: 'center bottom', end: 'bottom center', scrub: 1.2 },
          x: -30, opacity: 0, duration: 1, delay: i * 0.1,
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
      <ThreeDBackground variant="boxes" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-luxury-bg to-white" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div ref={textRef} className="text-center mb-6 md:mb-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-dark-500 mb-2 font-medium">
            3D Visualization
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dark-800 leading-tight">
            Visualize your design{' '}
            <span className="text-dark-500 font-light italic">in 3D</span>
            <br />
            before production
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
          <div className="flex-1 space-y-3 w-full">
            {features.map((feat, i) => (
              <div
                key={feat.number}
                ref={(el) => (featuresRef.current[i] = el)}
                className="flex items-start gap-4 group cursor-default"
              >
                <span className="text-lg font-display font-bold text-dark-300 group-hover:text-dark-500 transition-colors duration-300 mt-0.5">
                  {feat.number}
                </span>
                <div className="flex-1 border-b border-black/5 pb-3 group-hover:border-black/10 transition-colors duration-300">
                  <h3 className="text-xs font-semibold text-dark-700 uppercase tracking-wider">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-dark-500 font-light mt-0.5 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div ref={imageWrapRef} className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="relative">
              <div className="absolute -inset-3 bg-black/[0.02] blur-2xl" />
              <div className="relative bg-white shadow-lg">
                <div className="absolute top-0 left-0 w-1 h-full bg-dark-800/10" />
                <img
                  ref={imageRef}
                  src="/images/4890348bba669719bc53ad1d78fc7767.jpg"
                  alt="3D garment visualization"
                  className="w-full h-auto object-cover max-h-[40vh] lg:max-h-none"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white border border-black/5 px-3 py-1.5 shadow-sm">
                <p className="text-[9px] tracking-[0.15em] uppercase text-dark-500">Powered by Three.js</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
