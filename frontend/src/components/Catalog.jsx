import { Link } from "react-router-dom";
import { FashionCard } from "./FashionCard";
import { catalogItems, fashionCategories } from "../data/fashionCategories";

export default function Catalog() {
  return (
    <section className="catalog-page px-5 py-10">
      <div className="mx-auto w-[min(1240px,100%)]">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--color-pink)]">
              Catalog
            </p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4.4rem)] font-black leading-[0.9]">
              Fashion Collection
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {fashionCategories.map((category) => (
              <span
                key={category.id}
                className="rounded-full border border-[rgba(32,26,31,0.1)] bg-[rgba(255,247,240,0.66)] px-4 py-2 text-sm font-black text-[var(--color-ink)] shadow-[0_8px_24px_rgba(255,79,163,0.08)] backdrop-blur-xl"
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

        <div className="mt-10 text-center">
          <Link
            to="/studio/design"
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-pink),var(--color-purple))] px-10 font-black text-[var(--color-bg)] shadow-[0_16px_48px_rgba(255,79,163,0.32)] transition hover:-translate-y-1"
          >
            Design Your Look →
          </Link>
        </div>
      </div>
    </section>
  );
}
