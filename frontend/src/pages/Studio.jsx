import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import StudioNavBar from '../components/Studio/StudioNavBar';
import CatalogPage from '../components/Studio/CatalogPage';
import DesignStudioPage from '../components/Studio/DesignStudioPage';
import ViewerPage from '../components/Studio/ViewerPage';
import PatternsPage from '../components/Studio/PatternsPage';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function Studio() {
  return (
    <div className="min-h-screen bg-luxury-bg">
      <StudioNavBar />

      <AnimatePresence mode="wait">
        <motion.div
          key="studio-content"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/design" element={<DesignStudioPage />} />
            <Route path="/viewer" element={<ViewerPage />} />
            <Route path="/patterns" element={<PatternsPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

