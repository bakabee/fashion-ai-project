import { motion } from "framer-motion";

export function GradientButton({ children, href = "#catalog" }) {
  return (
    <motion.a
      href={href}
      className="inline-flex min-h-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-pink),var(--color-purple))] px-7 text-sm font-black uppercase tracking-[0.14em] text-[var(--color-bg)] shadow-[0_22px_70px_rgba(255,79,163,0.34)]"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 210, damping: 18 }}
    >
      {children}
    </motion.a>
  );
}
