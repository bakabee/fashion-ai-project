import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Scene1Hero from '../sections/CinematicHome/Scene1Hero';
import Scene2Inspiration from '../sections/CinematicHome/Scene2Inspiration';
import Scene3Transitions from '../sections/CinematicHome/Scene3Transitions';
import Scene4ThreeDPreview from '../sections/CinematicHome/Scene4ThreeDPreview';
import Scene5Fadeout from '../sections/CinematicHome/Scene5Fadeout';
import CTAScreen from '../sections/CinematicHome/CTAScreen';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="w-full bg-luxury-bg">
      <Scene1Hero />
      <Scene2Inspiration />
      <Scene3Transitions />
      <Scene4ThreeDPreview />
      <Scene5Fadeout />
      <CTAScreen />
    </div>
  );
}

