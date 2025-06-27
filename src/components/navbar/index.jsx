import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopInfoBar from "../topInfoBar/index.jsx"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

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
  }, [isOpen]);

  return (
    <>
    <div className = "z-50 sticky top-0">
    <TopInfoBar/>
    <nav className="bg-tan shadow-2xl py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="text-3xl font-bold text-richnavy uppercase tracking-widest">
            VelyBeauty
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {["About", "Careers", "Contact"].map((label) => (
              <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="text-richnavy hover:text-white font-medium transition"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Hamburger Toggle */}
          <div className="md:hidden" ref={toggleRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
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
                  <path d="M6 18L18 6M6 6l12 12" /> // X icon
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" /> // Hamburger
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Slide-in Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
          ref={sidebarRef}
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed top-0 left-0 w-3/5 h-full bg-antiflashwhite shadow-2xl px-6 pt-32 flex flex-col md:hidden"
          >
            <p className="text-xs uppercase text-gray-500 tracking-widest mb-6">Menu</p>
            <ul className="space-y-6">
              {[
                { label: "About", href: "#about" },
                { label: "Careers", href: "#careers" },
                { label: "Contact", href: "#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center text-2xl font-semibold text-gray-700 hover:text-mudgreen transition"
                    >
                    {label}
                    <span className="text-gray-400 text-xl">›</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </div>
    </>
  );
}
