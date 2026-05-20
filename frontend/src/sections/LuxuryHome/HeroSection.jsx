import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(titleRef.current, { y: 60, opacity: 0, duration: 1.2, delay: 0.2 })
        .from(subtitleRef.current, { y: 40, opacity: 0, duration: 1 }, '-=0.5')
        .from(imageRef.current, { scale: 0.9, opacity: 0, duration: 1.5 }, '-=0.7')
        .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.8 }, '-=0.3');

      gsap.to(imageRef.current, {
        y: -8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-luxury-bg to-luxury-surface"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-black/[0.015] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/80 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full justify-center">
          <div className="flex-1 max-w-md text-center md:text-right">
            <h1
              ref={titleRef}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-dark-800 tracking-tight leading-tight"
            >
              AI Fashion
              <br />
              <span className="text-dark-400 font-light italic">Design Studio</span>
            </h1>

            <p
              ref={subtitleRef}
              className="mt-5 text-base md:text-lg text-dark-500 font-light max-w-sm mx-auto md:ml-auto"
            >
              Where sketches become wearable fashion
            </p>
          </div>

          <div ref={imageRef} className="flex-shrink-0 w-56 md:w-72 lg:w-80">
            <div className="relative">
              <div className="absolute -inset-6 bg-black/[0.02] rounded-full blur-3xl" />
              <img
                src="/images/ea5f01f0ac1fcd13e8be1ed74f18678a.jpg"
                alt="AI Fashion Design Studio"
                className="w-full h-auto object-contain drop-xl"
              />
            </div>
          </div>
        </div>

        <motion.button
          ref={ctaRef}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/studio')}
          className="mt-10 px-10 py-4 bg-black text-white text-sm font-medium tracking-widest uppercase rounded-none hover:bg-dark-800 transition-colors duration-500"
        >
          Start Designing
        </motion.button>
      </div>
    </section>
  );
}
