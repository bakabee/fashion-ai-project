import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Scene2Inspiration() {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(text1Ref.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        duration: 1,
      });

      gsap.from(text2Ref.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      });

      // Parallax for background elements
      gsap.to('.parallax-item', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        y: (i) => i * 30,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-luxury-surface to-luxury-bg"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="parallax-item absolute top-10 left-10 w-48 h-48 bg-fashionPurple/20 blur-3xl rounded-full" />
        <div className="parallax-item absolute bottom-10 right-10 w-64 h-64 bg-fashionPink/20 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <h2 ref={text1Ref} className="font-display text-6xl md:text-7xl font-bold text-white mb-4">
          Where imagination
        </h2>
        <h3 ref={text2Ref} className="font-display text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-fashionPurple to-fashionPink bg-clip-text">
          becomes design
        </h3>
      </div>
    </div>
  );
}
