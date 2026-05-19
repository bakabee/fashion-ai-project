import { SectionLabel } from "../components/SectionLabel";

const steps = ["Upload look", "Map silhouette", "Preview try-on", "Save fit notes"];

export function AIFeature() {
  return (
    <section id="ai-try-on" className="scene-ai relative min-h-screen overflow-hidden px-5 py-28">
      <div className="pointer-events-none absolute left-[8%] top-[16%] h-[32vw] w-[32vw] rounded-full bg-[radial-gradient(circle,var(--color-pink-soft),transparent_65%)] blur-2xl" />
      <div className="mx-auto grid w-[min(1240px,100%)] grid-cols-1 items-center gap-12 lg:grid-cols-[0.88fr_1fr]">
        <SectionLabel
          eyebrow="Scene 05 / AI fashion feature"
          title="Try-on that feels like a studio instrument."
          copy="The interface turns editorial choices into measurable fit signals: garment category, drape, body landmarks, and saved styling intent."
        />

        <div className="relative min-h-[680px]">
          <div className="mockup-panel absolute left-0 top-[4%] w-[72%] rounded-[36px] border border-[rgba(32,26,31,0.1)] bg-[rgba(255,247,240,0.76)] p-5 opacity-0 shadow-[0_38px_120px_rgba(255,79,163,0.18)] backdrop-blur-2xl" style={{ transform: "translateY(90px) rotateX(18deg)" }}>
            <div className="relative h-[520px] overflow-hidden rounded-[28px] bg-[rgba(255,79,163,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1100&q=90"
                alt="AI try-on fashion model preview"
                className="h-full w-full object-cover"
              />
              <span className="tryon-scan-line absolute left-0 top-8 h-[2px] w-full bg-[linear-gradient(90deg,transparent,var(--color-pink),var(--color-purple),transparent)] shadow-[0_0_28px_rgba(255,79,163,0.72)]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[24px] bg-[rgba(255,247,240,0.76)] p-4 backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-pink)]">Fit intelligence</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {["Drape 94", "Color 88", "Fit 91"].map((label) => (
                    <span key={label} className="rounded-full bg-[rgba(255,79,163,0.1)] px-3 py-2 text-center text-xs font-black text-[var(--color-ink)]">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mockup-panel absolute bottom-[6%] right-0 w-[46%] rounded-[32px] border border-[rgba(32,26,31,0.1)] bg-[rgba(255,247,240,0.82)] p-5 opacity-0 shadow-[0_30px_90px_rgba(141,92,255,0.16)] backdrop-blur-2xl" style={{ transform: "translateY(90px) rotateX(18deg)" }}>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-pink)]">Workflow</p>
            <div className="mt-5 space-y-3">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-[20px] bg-[rgba(255,79,163,0.09)] p-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-ink)] text-sm font-black text-[var(--color-bg)]">
                    {index + 1}
                  </span>
                  <strong className="text-sm text-[var(--color-ink)]">{step}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="mockup-panel absolute right-[8%] top-[12%] w-[38%] rounded-[30px] border border-[rgba(32,26,31,0.1)] bg-[rgba(255,247,240,0.78)] p-5 opacity-0 shadow-[0_28px_90px_rgba(255,79,163,0.14)] backdrop-blur-2xl" style={{ transform: "translateY(90px) rotateX(18deg)" }}>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-pink)]">AI output</p>
            <strong className="mt-3 block text-4xl font-black text-[var(--color-ink)]">12 sec</strong>
            <p className="mt-2 text-sm leading-6 text-[rgba(32,26,31,0.62)]">
              From selected look to preview-ready try-on board.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
