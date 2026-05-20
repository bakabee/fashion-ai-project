import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import ThreeDBackground from './ThreeDBackground';

const floatingLabels = [
  { text: 'AI-Powered', x: '15%', y: '20%', delay: 0.2 },
  { text: '3D Preview', x: '75%', y: '30%', delay: 0.6 },
  { text: 'Pattern Ready', x: '80%', y: '65%', delay: 1.0 },
  { text: 'Runway Quality', x: '10%', y: '70%', delay: 0.8 },
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const labelsRef = useRef([]);
  const statsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(titleRef.current, { y: 80, opacity: 0, duration: 1.4, delay: 0.2 })
        .from(subtitleRef.current, { y: 50, opacity: 0, duration: 1 }, '-=0.6')
        .from(imageRef.current, { scale: 0.85, opacity: 0, duration: 1.8 }, '-=0.8')
        .from(ctaRef.current, { y: 40, opacity: 0, duration: 0.8 }, '-=0.4')
        .from(statsRef.current, { y: 30, opacity: 0, duration: 0.8 }, '-=0.3');

      labelsRef.current.forEach((el, i) => {
        gsap.from(el, {
          duration: 1.2, opacity: 0, x: i % 2 === 0 ? -30 : 30,
          delay: 0.8 + i * 0.25, ease: 'power2.out',
        });
      });

      gsap.to(imageRef.current, {
        y: -10, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-luxury-bg to-luxury-surface"
    >
      <ThreeDBackground variant="orbs" />

      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-black/[0.015] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-black/[0.01] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-black/[0.008] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white/90 to-transparent" />
      </div>

      {floatingLabels.map((label, i) => (
        <div
          key={label.text}
          ref={(el) => (labelsRef.current[i] = el)}
          className="absolute z-20 hidden md:block"
          style={{ left: label.x, top: label.y }}
        >
          <div className="bg-white/80 backdrop-blur-sm border border-black/5 px-4 py-2 shadow-sm rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
            <span className="text-[10px] tracking-[0.2em] uppercase text-dark-500 font-medium">
              {label.text}
            </span>
          </div>
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-20 w-full justify-center">
          <div className="flex-1 max-w-lg text-center lg:text-right order-2 lg:order-1">
            <p className="text-[10px] tracking-[0.3em] uppercase text-dark-500 mb-4 font-medium">
              Fashion Intelligence Platform
            </p>

            <h1
              ref={titleRef}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-dark-800 tracking-tight leading-[1.05]"
            >
              AI Fashion
              <br />
              <span className="text-dark-500 font-light italic">Design Studio</span>
            </h1>

            <p
              ref={subtitleRef}
              className="mt-6 text-base md:text-lg text-dark-600 font-light leading-relaxed max-w-sm mx-auto lg:ml-auto"
            >
              Where sketches become wearable fashion. From concept to creation — your complete AI-powered atelier.
            </p>

            <motion.button
              ref={ctaRef}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/studio')}
              className="mt-8 px-10 py-4 bg-black text-white text-sm font-medium tracking-widest uppercase hover:bg-dark-800 transition-all duration-500 inline-flex items-center gap-3"
            >
              Start Designing
              <span className="text-lg">→</span>
            </motion.button>

            <div ref={statsRef} className="mt-8 flex items-center gap-6 justify-center lg:justify-end">
              {[
                { number: '10K+', label: 'Designs Created' },
                { number: '500+', label: 'Fashion Brands' },
                { number: '99%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-xl font-bold text-dark-800">{stat.number}</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-dark-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="flex-shrink-0 w-48 sm:w-56 md:w-72 lg:w-96 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-8 bg-black/[0.02] rounded-full blur-3xl" />
              <div className="absolute -inset-2 border border-black/5 rotate-3" />
              <img
                src="/images/ea5f01f0ac1fcd13e8be1ed74f18678a.jpg"
                alt="AI Fashion Design Studio"
                className="w-full h-auto object-contain relative z-10"
              />
              <div className="absolute -bottom-3 -right-3 bg-white/90 backdrop-blur-sm border border-black/5 px-3 py-2 z-20 shadow-sm">
                <p className="text-[8px] tracking-[0.2em] uppercase text-dark-500">Collection</p>
                <p className="text-xs font-medium text-dark-700">Spring/Summer 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
