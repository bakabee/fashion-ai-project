import { motion } from "framer-motion";

export function FashionCard({ item }) {
  return (
    <motion.article
      className="catalog-card group relative min-h-[440px] overflow-hidden rounded-[28px] border border-[rgba(32,26,31,0.1)] bg-[rgba(255,247,240,0.62)] opacity-0 shadow-[0_28px_90px_rgba(255,79,163,0.14)] backdrop-blur-2xl will-change-transform"
      style={{ transform: "translateY(80px) scale(0.96)" }}
      whileHover={{ y: -12, rotate: -0.6 }}
      transition={{ type: "spring", stiffness: 170, damping: 18 }}
    >
      <img
        src={item.image}
        alt={item.alt}
        className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(32,26,31,0.72)] via-transparent to-transparent opacity-80" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-[var(--color-bg)]">
        <span className="rounded-full border border-[rgba(255,247,240,0.32)] bg-[rgba(255,247,240,0.16)] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] backdrop-blur-lg">
          {item.category}
        </span>
        <h3 className="mt-4 text-2xl font-black">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[rgba(255,247,240,0.78)]">{item.details}</p>
      </div>
      <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--color-pink)] opacity-0 blur-3xl transition duration-500 group-hover:opacity-60" />
    </motion.article>
  );
}
