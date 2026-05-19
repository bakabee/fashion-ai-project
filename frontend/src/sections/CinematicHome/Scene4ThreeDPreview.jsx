import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Scene4ThreeDPreview() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
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

      gsap.from(boxRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'center center',
          end: 'bottom center',
          scrub: 1,
        },
        scale: 0.5,
        opacity: 0,
        duration: 1,
      });

      // Floating animation
      gsap.to(boxRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-luxury-surface to-luxury-bg px-4"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-fashionPurple/30 blur-3xl rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-fashionPink/20 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h2 ref={textRef} className="font-display text-6xl md:text-7xl font-bold text-white mb-12">
          Visualize in
          <br />
          Real-time 3D
        </h2>

        <div
          ref={boxRef}
          className="glass-effect p-16 rounded-2xl backdrop-blur-xl mx-auto max-w-md aspect-square flex items-center justify-center"
        >
          <div className="text-center">
            <div className="text-8xl mb-4">🧍</div>
            <p className="text-gray-300">3D Mannequin Preview</p>
            <p className="text-sm text-gray-400 mt-2">(Three.js Integration)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
