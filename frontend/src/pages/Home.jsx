import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Hero } from "../sections/Hero";
import { StoryIntro } from "../sections/StoryIntro";
import { CategoryStoryboard } from "../sections/CategoryStoryboard";
import { CatalogShowcase } from "../sections/CatalogShowcase";
import { AIFeature } from "../sections/AIFeature";
import { FinalCTA } from "../sections/FinalCTA";
import { useLenis } from "../hooks/useLenis";
import { useScrollStory } from "../hooks/useScrollStory";

export default function Home() {
  useLenis();
  useScrollStory();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        className="fashion-story min-h-screen overflow-x-hidden bg-[var(--color-bg)] text-[var(--color-ink)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Header />
        <Hero />
        <StoryIntro />
        <CategoryStoryboard />
        <CatalogShowcase />
        <AIFeature />
        <FinalCTA />
      </motion.main>
    </AnimatePresence>
  );
}
