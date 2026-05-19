export function SectionLabel({ eyebrow, title, copy, align = "left" }) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
      <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[var(--color-pink)]">
        {eyebrow}
      </p>
      <h2 className="font-display text-[clamp(3rem,7vw,7.8rem)] font-black leading-[0.88] tracking-normal text-[var(--color-ink)]">
        {title}
      </h2>
      {copy && (
        <p className={centered ? "mx-auto mt-7 max-w-2xl text-lg leading-8 text-[rgba(32,26,31,0.68)]" : "mt-7 max-w-2xl text-lg leading-8 text-[rgba(32,26,31,0.68)]"}>
          {copy}
        </p>
      )}
    </div>
  );
}
