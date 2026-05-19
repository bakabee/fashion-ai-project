import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Scene1Hero from '../sections/CinematicHome/Scene1Hero';
import Scene2Inspiration from '../sections/CinematicHome/Scene2Inspiration';
import Scene2GarmentStructure from '../sections/CinematicHome/Scene2GarmentStructure';
import Scene3DesignCustomization from '../sections/CinematicHome/Scene3DesignCustomization';
import Scene4ThreeDPreview from '../sections/CinematicHome/Scene4ThreeDPreview';
import Scene5PatternGeneration from '../sections/CinematicHome/Scene5PatternGeneration';
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
      <Scene2GarmentStructure />
      <Scene3DesignCustomization />
      <Scene4ThreeDPreview />
      <Scene5PatternGeneration />
      <CTAScreen />
    </div>
  );
}

