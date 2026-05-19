import { GradientButton } from "../components/GradientButton";

export function FinalCTA() {
  return (
    <section id="final" className="scene-final relative grid min-h-screen place-items-center overflow-hidden px-5 py-28 text-center">
      <div className="final-glow pointer-events-none absolute h-[62vw] max-h-[820px] w-[62vw] max-w-[820px] rounded-full bg-[radial-gradient(circle,var(--color-pink-soft),var(--color-purple-soft)_42%,transparent_68%)] opacity-60 blur-2xl" />
      <div className="relative z-10 mx-auto max-w-5xl rounded-[42px] border border-[rgba(32,26,31,0.1)] bg-[rgba(255,247,240,0.7)] px-6 py-16 shadow-[0_44px_150px_rgba(255,79,163,0.22)] backdrop-blur-2xl md:px-14 md:py-24">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--color-pink)]">
          Scene 06 / Final call
        </p>
        <h2 className="mt-5 font-display text-[clamp(3.8rem,9vw,9rem)] font-black leading-[0.82] text-[var(--color-ink)]">
          Build the next fashion film.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[rgba(32,26,31,0.68)]">
          Save category worlds, inspect AI-ranked looks, and move from cinematic discovery into production-grade try-on flows.
        </p>
        <div className="mt-10">
          <GradientButton href="#top">Replay the storyboard</GradientButton>
        </div>
      </div>
    </section>
  );
}
