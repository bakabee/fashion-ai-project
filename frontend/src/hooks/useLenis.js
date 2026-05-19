import Lenis from "lenis";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.18,
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    lenis.on("scroll", ScrollTrigger.update);
    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);
}
