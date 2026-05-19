import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const landingScenes = [
  {
    kicker: "Frame 01",
    title: "Imagine the silhouette",
    copy: "The first panel opens with soft atelier light, drifting material studies, and a visual direction that feels more like a fashion film than a dashboard.",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1300&q=88",
  },
  {
    kicker: "Frame 02",
    title: "Direct the campaign",
    copy: "Cards slide through the frame as if a storyboard wall is moving past the camera, each one carrying color, fabric, and movement cues.",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1300&q=88",
  },
  {
    kicker: "Frame 03",
    title: "Translate motion into craft",
    copy: "The experience narrows from atmosphere into construction, guiding the designer from cinematic reference to editable fashion systems.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1300&q=88",
  },
  {
    kicker: "Frame 04",
    title: "Enter the studio",
    copy: "The final scene resolves into the product workspace, ready for catalog exploration, body measurements, 3D inspection, and pattern handoff.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1300&q=88",
  },
];

const designCards = [
  {
    title: "Runway Mood",
    copy: "Editorial pacing, soft bloom, and camera-led transitions.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Fabric System",
    copy: "Material references move with depth, blur, and layered glass.",
    image:
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Motion Board",
    copy: "Scroll becomes a timeline for story, product, and craft.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
  },
];

const particles = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  delay: `${(index % 9) * -0.42}s`,
  size: `${3 + (index % 4)}px`,
}));

function CinematicLanding({ onEnter, onProgress, onSceneChange }) {
  const rootRef = useRef(null);
  const storyboardRef = useRef(null);

  useEffect(() => {
    let frameId;
    const lenis = new Lenis({
      duration: 1.16,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.86,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cinematic-word",
        { yPercent: 115, opacity: 0, rotateX: 24 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.15,
          stagger: 0.08,
          ease: "power4.out",
        }
      );

      gsap.to(".hero-visual-stack", {
        yPercent: -16,
        scale: 1.14,
        rotate: -2,
        ease: "none",
        scrollTrigger: {
          trigger: ".landing-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".landing-background", {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      const storyTween = gsap.to(".story-track", {
        xPercent: -75,
        ease: "none",
        scrollTrigger: {
          trigger: storyboardRef.current,
          start: "top top",
          end: "+=3600",
          scrub: 0.75,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const nextScene = Math.min(
              landingScenes.length - 1,
              Math.floor(self.progress * landingScenes.length)
            );
            onProgress?.(self.progress);
            onSceneChange?.(nextScene);
          },
        },
      });

      gsap.utils.toArray(".landing-panel").forEach((panel, index) => {
        gsap.fromTo(
          panel.querySelector(".panel-copy"),
          { y: 90, opacity: 0, filter: "blur(16px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: storyTween,
              start: "left 72%",
              end: "left 34%",
              scrub: 0.8,
            },
          }
        );

        gsap.to(panel.querySelector(".panel-image"), {
          yPercent: index % 2 === 0 ? -11 : 11,
          scale: index % 2 === 0 ? 1.1 : 0.96,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: storyTween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
      });

      gsap.fromTo(
        ".interactive-card",
        { y: 130, opacity: 0, rotateX: 18 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".landing-cards",
            start: "top 70%",
            end: "center 40%",
            scrub: 0.8,
          },
        }
      );
    }, root);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [onProgress, onSceneChange]);

  return (
    <section ref={rootRef} className="landing-cinema screen-enter">
      <FloatingAtmosphere />
      <HeroCinematic onEnter={onEnter} />
      <StoryboardSequence storyboardRef={storyboardRef} />
      <InteractiveCards />
      <TransitionSection />
      <FinalCTA onEnter={onEnter} />
    </section>
  );
}

function FloatingAtmosphere() {
  return (
    <div className="landing-atmosphere" aria-hidden="true">
      <div className="landing-background" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="landing-particle"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

function HeroCinematic({ onEnter }) {
  return (
    <section className="landing-hero">
      <div className="hero-copy">
        <p className="landing-kicker">Maison Neural Motion System</p>
        <h1>
          {["Fashion", "Stories", "That", "Move"].map((word) => (
            <span key={word} className="cinematic-line">
              <span className="cinematic-word">{word}</span>
            </span>
          ))}
        </h1>
        <motion.button
          className="landing-primary-cta"
          onClick={onEnter}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Enter Studio
        </motion.button>
      </div>

      <div className="hero-visual-stack" aria-hidden="true">
        <img
          className="hero-frame hero-frame-main"
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1300&q=90"
          alt=""
        />
        <img
          className="hero-frame hero-frame-side"
          src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=88"
          alt=""
        />
        <div className="hero-glass-note">
          <span>Scroll-driven film</span>
          <strong>04 scene board</strong>
        </div>
      </div>
    </section>
  );
}

function StoryboardSequence({ storyboardRef }) {
  return (
    <section ref={storyboardRef} className="storyboard-sequence">
      <div className="story-track" id="story-track">
        {landingScenes.map((scene, index) => (
          <article key={scene.title} className="landing-panel">
            <div className="panel-copy">
              <span>{scene.kicker}</span>
              <h2>{scene.title}</h2>
              <p>{scene.copy}</p>
            </div>
            <div className={`panel-image-wrap panel-${index + 1}`}>
              <img className="panel-image" src={scene.image} alt={scene.title} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function InteractiveCards() {
  return (
    <section className="landing-cards">
      <div className="cards-heading">
        <p className="landing-kicker">Interactive cards</p>
        <h2>Every layer has its own rhythm.</h2>
      </div>
      <div className="cards-grid">
        {designCards.map((card, index) => (
          <motion.article
            key={card.title}
            className="interactive-card"
            whileHover={{ y: -12, rotate: index === 1 ? 1.5 : -1.5 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >
            <img src={card.image} alt={card.title} />
            <div>
              <span>0{index + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function TransitionSection() {
  return (
    <section className="landing-transition">
      <p className="landing-kicker">Camera move</p>
      <h2>From inspiration wall to working studio.</h2>
      <div className="transition-strip" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

function FinalCTA({ onEnter }) {
  return (
    <section className="landing-final">
      <motion.div
        className="final-glass"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="landing-kicker">Final frame</p>
        <h2>Design the next scene.</h2>
        <p>
          Move into the fashion studio with the narrative already established:
          concept, material, silhouette, visualization, and production handoff.
        </p>
        <button className="landing-primary-cta" onClick={onEnter}>
          Begin Designing
        </button>
      </motion.div>
    </section>
  );
}

export default CinematicLanding;
