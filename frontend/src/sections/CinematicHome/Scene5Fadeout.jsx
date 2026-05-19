import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Scene5Fadeout() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
        opacity: 1,
      });

      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'center center',
          end: 'bottom center',
          scrub: 1,
        },
        opacity: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-luxury-bg to-black px-4"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-fashionPurple/20 via-transparent to-fashionPink/20" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
          Ready to create?
        </h2>
        <p className="text-lg text-gray-300">
          Join designers and visionaries shaping the future of fashion
        </p>
      </div>
    </div>
  );
}
