import { Link } from "react-router-dom";

const patterns = [
  {
    id: "geometric-weave",
    title: "Geometric Weave",
    category: "Structural",
    description: "Interlocking angular shapes with a premium texture feel.",
    mood: "Bold / Architectural",
  },
  {
    id: "organic-floral",
    title: "Organic Floral",
    category: "Nature",
    description: "Soft cascading botanical motifs for fluid silhouettes.",
    mood: "Romantic / Flowing",
  },
  {
    id: "abstract-sweep",
    title: "Abstract Sweep",
    category: "Artistic",
    description: "Broad painterly strokes with gradient fade effects.",
    mood: "Expressive / Modern",
  },
  {
    id: "micro-dot",
    title: "Micro Dot Field",
    category: "Texture",
    description: "Fine-grain dotted texture for depth at close distance.",
    mood: "Subtle / Luxe",
  },
  {
    id: "pinstripe",
    title: "Pinstripe Precision",
    category: "Tailored",
    description: "Clean vertical lines with adjustable spacing.",
    mood: "Sharp / Professional",
  },
  {
    id: "watercolor-wash",
    title: "Watercolor Wash",
    category: "Artistic",
    description: "Diffused color bleed effect for soft drape garments.",
    mood: "Dreamy / Ethereal",
  },
];

export default function Patterns() {
  return (
    <section className="patterns-page px-5 py-10">
      <div className="mx-auto w-[min(1240px,100%)]">
        <div className="mb-10">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--color-pink)]">
            Pattern Studio
          </p>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4.4rem)] font-black leading-[0.9]">
            AI Pattern Generation
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[rgba(32,26,31,0.62)]">
            Generated patterns can be applied to your garment design and previewed in 3D.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {patterns.map((pattern) => (
            <article
              key={pattern.id}
              className="group relative overflow-hidden rounded-3xl border border-[rgba(32,26,31,0.1)] bg-[rgba(255,247,240,0.56)] p-6 shadow-[0_12px_40px_rgba(255,79,163,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,79,163,0.16)]"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full bg-[rgba(255,79,163,0.1)] px-3 py-1 text-xs font-black text-[var(--color-pink)]">
                  {pattern.category}
                </span>
                <span className="text-xs font-bold text-[rgba(32,26,31,0.36)]">
                  {pattern.mood}
                </span>
              </div>
              <div className="mb-4 grid h-36 w-full grid-cols-3 gap-1.5 overflow-hidden rounded-2xl">
                {Array.from({ length: 3 }).map((_, i) => {
                  const hues = ["var(--color-pink)", "var(--color-purple)", "var(--color-beige)"];
                  return (
                    <div
                      key={i}
                      className="rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${hues[i]}22, ${hues[(i + 1) % 3]}44)`,
                      }}
                    />
                  );
                })}
              </div>
              <h3 className="font-display text-2xl font-black text-[var(--color-ink)]">
                {pattern.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[rgba(32,26,31,0.58)]">
                {pattern.description}
              </p>
              <button className="mt-4 w-full rounded-full border border-[rgba(32,26,31,0.1)] bg-[rgba(255,247,240,0.6)] px-4 py-2.5 text-sm font-bold text-[var(--color-ink)] backdrop-blur-xl transition hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)]">
                Apply to Design
              </button>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/studio/design"
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-[rgba(32,26,31,0.06)] px-10 font-black text-[var(--color-ink)] transition hover:bg-[rgba(32,26,31,0.12)]"
          >
            ← Back to Design Studio
          </Link>
        </div>
      </div>
    </section>
  );
}
