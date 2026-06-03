import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const navItems = ["Story", "Categories", "Catalog", "AI Try-on"];

export function Header() {
  return (
    <motion.header
      className="fixed left-1/2 top-5 z-50 flex w-[min(1180px,calc(100vw-28px))] -translate-x-1/2 items-center justify-between rounded-full border border-[rgba(32,26,31,0.12)] bg-[rgba(255,247,240,0.72)] px-4 py-3 shadow-[0_18px_70px_rgba(255,79,163,0.16)] backdrop-blur-2xl"
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#top" className="font-display text-xl font-black tracking-tight text-[var(--color-ink)]">
        Sketch to Stitch
      </a>
      <nav className="hidden items-center gap-2 md:flex">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
            className="rounded-full px-4 py-2 text-sm font-bold text-[rgba(32,26,31,0.68)] transition hover:bg-[rgba(255,79,163,0.12)] hover:text-[var(--color-ink)]"
          >
            {item}
          </a>
        ))}
      </nav>
      <Link
        to="/studio"
        className="rounded-full bg-[linear-gradient(135deg,var(--color-pink),var(--color-purple))] px-5 py-2 text-sm font-black text-[var(--color-bg)] shadow-[0_16px_44px_rgba(255,79,163,0.32)] transition hover:-translate-y-0.5"
      >
        Enter Studio
      </Link>
    </motion.header>
  );
}
