import { SectionLabel } from "../components/SectionLabel";
import { storyboardMetrics } from "../data/fashionCategories";

export function StoryIntro() {
  return (
    <section id="story" className="scene-intro relative min-h-screen overflow-hidden px-5 py-28">
      <div className="intro-layer-back pointer-events-none absolute left-[-10vw] top-24 h-[38vw] w-[38vw] rounded-full bg-[radial-gradient(circle,var(--color-pink-soft),transparent_66%)] blur-2xl" />
      <div className="intro-layer-front pointer-events-none absolute bottom-10 right-[-8vw] h-[44vw] w-[44vw] rounded-full bg-[radial-gradient(circle,var(--color-purple-soft),transparent_64%)] blur-2xl" />

      <div className="mx-auto grid w-[min(1220px,100%)] grid-cols-1 items-center gap-12 lg:grid-cols-[0.92fr_1fr]">
        <div className="story-copy-block relative z-10">
          <div data-reveal>
            <SectionLabel
              eyebrow="Scene 02 / Story intro"
              title="Your moodboard becomes a moving product system."
              copy="Sketch to Stitch reads visual intent like an editorial director: silhouette, styling, fabric atmosphere, and try-on readiness are sequenced into one cinematic flow."
            />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {storyboardMetrics.map((metric) => (
              <div
                key={metric.label}
                data-reveal
                className="rounded-[28px] border border-[rgba(32,26,31,0.1)] bg-[rgba(255,247,240,0.64)] p-5 shadow-[0_24px_70px_rgba(255,79,163,0.12)] backdrop-blur-2xl"
              >
                <strong className="block text-4xl font-black text-[var(--color-ink)]">{metric.value}</strong>
                <span className="mt-2 block text-sm font-bold text-[rgba(32,26,31,0.58)]">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[620px]">
          <div className="absolute left-[8%] top-[5%] h-[70%] w-[62%] overflow-hidden rounded-[36px] shadow-[0_42px_120px_rgba(255,79,163,0.2)]">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=90"
              alt="Dress editorial mood frame"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute right-[2%] top-[18%] w-[46%] rounded-[30px] border border-[rgba(32,26,31,0.1)] bg-[rgba(255,247,240,0.72)] p-5 shadow-[0_28px_90px_rgba(141,92,255,0.14)] backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-pink)]">AI read</p>
            <div className="mt-5 space-y-3">
              {["Silhouette: evening", "Texture: satin glow", "Fit: draped vertical"].map((item) => (
                <div key={item} className="rounded-full bg-[rgba(255,79,163,0.1)] px-4 py-3 text-sm font-bold text-[var(--color-ink)]">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-[3%] right-[10%] h-[36%] w-[44%] overflow-hidden rounded-[30px] shadow-[0_30px_100px_rgba(255,79,163,0.18)]">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=90"
              alt="Luxury fashion garment study"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
