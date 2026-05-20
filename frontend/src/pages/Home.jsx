import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import HeroSection from '../sections/LuxuryHome/HeroSection';
import SketchInspirationWall from '../sections/LuxuryHome/SketchInspirationWall';
import ThreeDVisualization from '../sections/LuxuryHome/ThreeDVisualization';
import DesignSystemPreview from '../sections/LuxuryHome/DesignSystemPreview';
import SewingPatternSection from '../sections/LuxuryHome/SewingPatternSection';
import FinalCTA from '../sections/LuxuryHome/FinalCTA';
import ThreeDBackground from '../sections/LuxuryHome/ThreeDBackground';

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
    <div className="w-full bg-white relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ThreeDBackground />
      </div>
      <div className="relative z-10">
        <HeroSection />
        <SketchInspirationWall />
        <ThreeDVisualization />
        <DesignSystemPreview />
        <SewingPatternSection />
        <FinalCTA />
      </div>
    </div>
  );
}
