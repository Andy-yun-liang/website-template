// components/Navbar.jsx
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopInfoBar from "../topInfoBar";
import BookNowButton from "./BookNowButton";
import { navbarData } from "../../data/editNavbarData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      toggleRef.current &&
      !toggleRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    const lockScroll = () => document.body.classList.add("overflow-hidden");
    const unlockScroll = () => document.body.classList.remove("overflow-hidden");

    if (isOpen) {
      document.addEventListener("pointerdown", handleClickOutside);
      lockScroll();
    } else {
      document.removeEventListener("pointerdown", handleClickOutside);
      unlockScroll();
    }

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      unlockScroll();
    };
  }, [isOpen, handleClickOutside]);

  const colors = navbarData.colors;

  const linkVariants = {
    rest: { scale: 1, color: colors.secondary },
    hover: { scale: 1.05, color: "#fbcfe8" },
  };

  return (
    <header className="sticky top-0 z-50">
      <TopInfoBar />
      <nav className="shadow-2xl py-6" style={{ backgroundColor: colors.background }}>
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 navbar-colors"
          style={{
            "--text": colors.secondary,
            "--accent": colors.accent,
            "--primary": colors.primary,
            "--background": colors.background,
          }}
        >
          <div className="flex items-center justify-between h-16 px-2">
            {/* Logo */}
            <div className="text-3xl font-bold uppercase tracking-widest" style={{ color: colors.primary }}>
              <a href="/">{navbarData.navbar.title}</a>
            </div>

            {/* Desktop Nav + Button */}
            <div className="hidden md:flex items-center gap-6">
              <ul className="flex space-x-8 items-center">
                {navbarData.navbar.links.map(({ label, href }) => (
                  <motion.li key={label} initial="rest" whileHover="hover" animate="rest">
                    <motion.a
                      href={href}
                      variants={linkVariants}
                      className="text-lg font-medium cursor-pointer"
                      style={{ color: colors.secondary }}
                    >
                      {label}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
              <BookNowButton />
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden" ref={toggleRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                className="focus:outline-none"
                style={{ color: colors.text }}
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {isOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={sidebarRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-3/5 h-full md:hidden shadow-2xl px-6 pt-32 flex flex-col justify-between z-50 navbar-colors"
              style={{ backgroundColor: colors.background }}
            >
              <div>
                <p className="text-xs uppercase tracking-widest mb-6" style={{ color: colors.secondary }}>
                  Menu
                </p>
                <ul className="space-y-6">
                  {navbarData.navbar.links.map(({ label, href }) => (
                    <motion.li key={label} initial="rest" whileHover="hover" animate="rest">
                      <motion.a
                        href={href}
                        onClick={() => setIsOpen(false)}
                        variants={linkVariants}
                        className="text-2xl font-semibold flex justify-between items-center cursor-pointer"
                        style={{ color: colors.secondary }}
                      >
                        {label}
                        <span className="text-xl text-gray-900">›</span>
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Mobile BOOK NOW */}
              <div className="py-6 w-full">
                <BookNowButton />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
