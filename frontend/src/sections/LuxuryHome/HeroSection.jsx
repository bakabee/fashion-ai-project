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
      tl.from(titleRef.current, { y: 80, opacity: 0, duration: 1.2, delay: 0.3 })
        .from(subtitleRef.current, { y: 60, opacity: 0, duration: 1 }, '-=0.6')
        .from(imageRef.current, { scale: 0.92, opacity: 0, duration: 1.5 }, '-=0.8')
        .from(ctaRef.current, { y: 40, opacity: 0, duration: 0.8 }, '-=0.4');

      gsap.to(imageRef.current, {
        y: -12,
        duration: 4,
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
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-black/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/80 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-6xl mx-auto px-6">
        <div ref={imageRef} className="w-full max-w-md mx-auto mb-10">
          <div className="relative">
            <div className="absolute -inset-4 bg-black/[0.02] rounded-full blur-2xl" />
            <img
              src="/images/ea5f01f0ac1fcd13e8be1ed74f18678a.jpg"
              alt="AI Fashion Design Studio"
              className="w-full h-auto object-contain drop-shadow-xl"
            />
          </div>
        </div>

        <h1
          ref={titleRef}
          className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-dark-800 text-center tracking-tight"
        >
          AI Fashion
          <br />
          Design Studio
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 text-lg md:text-xl text-dark-400 font-light text-center max-w-xl"
        >
          Where sketches become wearable fashion
        </p>

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
