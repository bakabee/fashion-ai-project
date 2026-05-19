import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function registerScrollStory() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return () => {};

  const ctx = gsap.context(() => {
    gsap.set("[data-reveal]", { y: 64, opacity: 0, filter: "blur(16px)" });
    gsap.set("[data-frame]", { y: 90, opacity: 0, scale: 0.96 });

    gsap.to(".hero-title-word", {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1.1,
      stagger: 0.075,
      ease: "power4.out",
    });

    gsap.to(".hero-camera", {
      yPercent: -16,
      scale: 1.1,
      rotate: -1.6,
      ease: "none",
      scrollTrigger: {
        trigger: ".scene-hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.7,
      },
    });

    gsap.to(".hero-orbit", {
      yPercent: 22,
      xPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: ".scene-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.utils.toArray(".story-copy-block").forEach((block) => {
      gsap.to(block.querySelectorAll("[data-reveal]"), {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: block,
          start: "top 72%",
          end: "bottom 48%",
          scrub: 0.8,
        },
      });
    });

    gsap.to(".intro-layer-back", {
      yPercent: -18,
      ease: "none",
      scrollTrigger: {
        trigger: ".scene-intro",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".intro-layer-front", {
      yPercent: 24,
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: ".scene-intro",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    const storyboardTrack = gsap.to(".category-track", {
      xPercent: -75,
      ease: "none",
      scrollTrigger: {
        trigger: ".scene-storyboard",
        start: "top top",
        end: "+=4200",
        scrub: 0.7,
        pin: true,
        anticipatePin: 1,
      },
    });

    gsap.utils.toArray(".category-frame").forEach((frame, index) => {
      gsap.to(frame.querySelectorAll("[data-frame]"), {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: frame,
          containerAnimation: storyboardTrack,
          start: "left 72%",
          end: "left 32%",
          scrub: 0.8,
        },
      });

      gsap.to(frame.querySelector(".category-hero-image"), {
        yPercent: index % 2 === 0 ? -10 : 10,
        scale: index % 2 === 0 ? 1.08 : 0.98,
        ease: "none",
        scrollTrigger: {
          trigger: frame,
          containerAnimation: storyboardTrack,
          start: "left right",
          end: "right left",
          scrub: true,
        },
      });
    });

    gsap.utils.toArray(".catalog-card").forEach((card, index) => {
      gsap.to(card, {
        y: 0,
        opacity: 1,
        scale: 1,
        delay: index * 0.02,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 86%",
          end: "top 58%",
          scrub: 0.45,
        },
      });
    });

    gsap.to(".mockup-panel", {
      y: 0,
      opacity: 1,
      rotateX: 0,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".scene-ai",
        start: "top 70%",
        end: "center 38%",
        scrub: 0.8,
      },
    });

    gsap.to(".tryon-scan-line", {
      yPercent: 620,
      repeat: -1,
      duration: 2.2,
      ease: "sine.inOut",
      yoyo: true,
    });

    gsap.to(".final-glow", {
      scale: 1.2,
      opacity: 0.84,
      ease: "none",
      scrollTrigger: {
        trigger: ".scene-final",
        start: "top bottom",
        end: "center center",
        scrub: true,
      },
    });
  });

  ScrollTrigger.refresh();

  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}
