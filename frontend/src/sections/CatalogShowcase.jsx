import { FashionCard } from "../components/FashionCard";
import { SectionLabel } from "../components/SectionLabel";
import { catalogItems, fashionCategories } from "../data/fashionCategories";

export function CatalogShowcase() {
  return (
    <section id="catalog" className="scene-catalog relative px-5 py-28">
      <div className="mx-auto w-[min(1240px,100%)]">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionLabel
            eyebrow="Scene 04 / Catalog showcase"
            title="A Pinterest-grade catalog with fashion logic."
            copy="Cards are grouped by consistent category worlds, so the visual browsing experience feels curated instead of random."
          />
          <div className="flex flex-wrap gap-3">
            {fashionCategories.map((category) => (
              <span
                key={category.id}
                className="rounded-full border border-[rgba(32,26,31,0.1)] bg-[rgba(255,247,240,0.66)] px-4 py-2 text-sm font-black text-[var(--color-ink)] shadow-[0_16px_46px_rgba(255,79,163,0.1)] backdrop-blur-xl"
              >
                {category.category}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {catalogItems.map((item) => (
            <FashionCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
