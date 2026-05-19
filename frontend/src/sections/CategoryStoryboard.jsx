import { fashionCategories } from "../data/fashionCategories";

export function CategoryStoryboard() {
  return (
    <section id="categories" className="scene-storyboard relative h-screen overflow-hidden">
      <div className="category-track flex h-full w-[400vw]">
        {fashionCategories.map((category, index) => (
          <article
            key={category.id}
            className="category-frame grid h-screen w-screen flex-none grid-cols-1 items-center gap-10 px-5 pt-24 lg:grid-cols-[0.74fr_1fr] lg:px-[max(24px,calc((100vw-1240px)/2))]"
          >
            <div className="relative z-10">
              <p data-frame className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[var(--color-pink)]">
                Scene 03.{index + 1} / {category.category}
              </p>
              <h2 data-frame className="font-display text-[clamp(3.4rem,8vw,8.6rem)] font-black leading-[0.84] text-[var(--color-ink)]">
                {category.category}
              </h2>
              <p data-frame className="mt-6 max-w-xl text-lg leading-8 text-[rgba(32,26,31,0.68)]">
                {category.theme}
              </p>
              <div data-frame className="mt-8 inline-flex rounded-full border border-[rgba(32,26,31,0.1)] bg-[rgba(255,247,240,0.68)] px-5 py-3 text-sm font-black text-[var(--color-ink)] shadow-[0_18px_60px_rgba(255,79,163,0.12)] backdrop-blur-xl">
                {category.accent}
              </div>
            </div>

            <div className="relative min-h-[62vh]">
              <div data-frame className="absolute left-[4%] top-[5%] h-[82%] w-[64%] overflow-hidden rounded-[36px] shadow-[0_44px_130px_rgba(255,79,163,0.2)]">
                <img className="category-hero-image h-[112%] w-full object-cover" src={category.images[0].src} alt={category.images[0].alt} />
              </div>
              <div data-frame className="absolute right-[4%] top-[14%] h-[42%] w-[38%] overflow-hidden rounded-[30px] shadow-[0_28px_90px_rgba(141,92,255,0.16)]">
                <img className="h-full w-full object-cover" src={category.images[1].src} alt={category.images[1].alt} />
              </div>
              <div data-frame className="absolute bottom-[2%] right-[14%] h-[34%] w-[34%] overflow-hidden rounded-[28px] shadow-[0_24px_80px_rgba(255,79,163,0.16)]">
                <img className="h-full w-full object-cover" src={category.images[2].src} alt={category.images[2].alt} />
              </div>
              <div data-frame className="absolute bottom-[8%] left-0 rounded-[26px] border border-[rgba(32,26,31,0.1)] bg-[rgba(255,247,240,0.74)] p-5 shadow-[0_24px_80px_rgba(255,79,163,0.16)] backdrop-blur-2xl">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-pink)]">Category rule</span>
                <p className="mt-2 max-w-[260px] text-sm font-bold leading-6 text-[rgba(32,26,31,0.7)]">
                  Every image in this frame stays inside the {category.category.toLowerCase()} visual language.
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
