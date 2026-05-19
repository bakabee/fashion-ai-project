import { GradientButton } from "../components/GradientButton";
import { ParticleField } from "../components/ParticleField";

const titleWords = ["Fashion", "AI", "that", "feels", "alive"];

export function Hero() {
  return (
    <section id="top" className="scene-hero relative min-h-screen overflow-hidden px-5 pt-28">
      <ParticleField />
      <div className="hero-orbit pointer-events-none absolute left-1/2 top-20 h-[58vw] max-h-[760px] w-[58vw] max-w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-pink-soft),transparent_62%)] blur-2xl" />
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] w-[min(1240px,100%)] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.86fr]">
        <div className="relative z-10">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[var(--color-pink)]">
            Pinterest moodboards meet Apple motion design
          </p>
          <h1 className="font-display text-[clamp(4.4rem,11vw,12rem)] font-black leading-[0.78] tracking-normal text-[var(--color-ink)]">
            {titleWords.map((word) => (
              <span key={word} className="block overflow-hidden pb-3">
                <span className="hero-title-word block translate-y-full opacity-0 will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[rgba(32,26,31,0.7)]">
            A scroll-driven fashion film where AI reads moodboards, turns them into curated category stories, and prepares every look for try-on.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <GradientButton href="#story">Begin the story</GradientButton>
            <span className="text-sm font-bold text-[rgba(32,26,31,0.52)]">
              Scroll controls the storyboard
            </span>
          </div>
        </div>

        <div className="hero-camera relative z-0 min-h-[620px] will-change-transform">
          <img
            className="absolute left-[8%] top-[2%] h-[78%] w-[68%] rounded-[34px] object-cover shadow-[0_44px_130px_rgba(255,79,163,0.22)]"
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1300&q=90"
            alt="Editorial fashion model in a cinematic dress frame"
          />
          <img
            className="absolute bottom-[4%] right-[2%] h-[44%] w-[48%] rounded-[28px] object-cover shadow-[0_34px_100px_rgba(141,92,255,0.18)]"
            src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=90"
            alt="Luxury fashion design studio reference"
          />
          <div className="absolute bottom-[16%] left-0 max-w-[250px] rounded-[28px] border border-[rgba(32,26,31,0.1)] bg-[rgba(255,247,240,0.66)] p-5 shadow-[0_22px_70px_rgba(255,79,163,0.16)] backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-pink)]">
              Live frame
            </p>
            <strong className="mt-2 block text-3xl font-black text-[var(--color-ink)]">
              06 scenes
            </strong>
            <p className="mt-2 text-sm leading-6 text-[rgba(32,26,31,0.62)]">
              Designed as one continuous editorial movement.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[rgba(32,26,31,0.54)]">
        <span>Scroll</span>
        <span className="scroll-hint h-10 w-[2px] rounded-full bg-[var(--color-pink)]" />
      </div>
    </section>
  );
}
