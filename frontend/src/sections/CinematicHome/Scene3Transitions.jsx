import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Scene3Transitions() {
  const containerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current];

      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'center center',
            scrub: 1,
          },
          y: 150,
          opacity: 0,
          rotation: -5 + index * 5,
          duration: 1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-luxury-bg to-luxury-surface px-4"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-fashionPurple/30 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-fashionPink/30 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 max-w-5xl mx-auto justify-center items-center">
        <div
          ref={card1Ref}
          className="glass-effect p-8 rounded-2xl backdrop-blur-xl flex-1 min-h-64 flex flex-col justify-center items-center text-center"
        >
          <div className="text-5xl mb-4">✨</div>
          <h3 className="text-2xl font-bold text-white mb-2">Fabric Selection</h3>
          <p className="text-gray-300">Premium materials curated from global sources</p>
        </div>

        <div
          ref={card2Ref}
          className="glass-effect p-8 rounded-2xl backdrop-blur-xl flex-1 min-h-64 flex flex-col justify-center items-center text-center"
        >
          <div className="text-5xl mb-4">🎨</div>
          <h3 className="text-2xl font-bold text-white mb-2">Sketching</h3>
          <p className="text-gray-300">AI-powered design suggestions in real-time</p>
        </div>

        <div
          ref={card3Ref}
          className="glass-effect p-8 rounded-2xl backdrop-blur-xl flex-1 min-h-64 flex flex-col justify-center items-center text-center"
        >
          <div className="text-5xl mb-4">👗</div>
          <h3 className="text-2xl font-bold text-white mb-2">Visualization</h3>
          <p className="text-gray-300">See your designs come to life instantly</p>
        </div>
      </div>
    </div>
  );
}
