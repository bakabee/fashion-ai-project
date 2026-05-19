import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function StudioNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Catalog', path: '/studio/catalog' },
    { label: 'Design Studio', path: '/studio/design' },
    { label: '3D Viewer', path: '/studio/viewer' },
    { label: 'Patterns', path: '/studio/patterns' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 h-20 bg-luxury-surface/80 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="w-full flex items-center justify-between px-8">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-white font-display"
          >
            AI Fashion
          </motion.button>

          {/* Navigation Items */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.path}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(item.path)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path) ? 'text-fashionPurple' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fashionPurple to-fashionPink"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="btn-glass text-sm px-6 py-2"
          >
            Back Home
          </motion.button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-luxury-surface/80 backdrop-blur-lg border-b border-white/10 z-50 flex items-center justify-between px-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/')}
          className="text-xl font-bold text-white font-display"
        >
          AI Fashion
        </motion.button>

        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
        className={`md:hidden fixed top-16 left-0 right-0 bg-luxury-surface/90 backdrop-blur-lg border-b border-white/10 ${
          isOpen ? 'block' : 'pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-4 gap-4">
          {navItems.map((item) => (
            <motion.button
              key={item.path}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isActive(item.path) ? 'text-fashionPurple' : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.label}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              navigate('/');
              setIsOpen(false);
            }}
            className="btn-glass text-sm px-6 py-2"
          >
            Back Home
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
