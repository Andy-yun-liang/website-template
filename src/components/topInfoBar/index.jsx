import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navbarData } from "../../data/editNavbarData.ts";

const TopInfoBar = () => {
  const messages = navbarData.topbar.flashMessages;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next (slide left), -1 = prev (slide right)
  const intervalRef = useRef(null);

  // Clear & restart interval for auto-advance (better UX)
  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 5000);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % messages.length);
    resetInterval();
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + messages.length) % messages.length);
    resetInterval();
  };

  const currentMessage = messages[current];
  const Wrapper = currentMessage.href ? "a" : "div";

  // Motion variants for sliding horizontally with direction
  const variants = {
    enter: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
    }),
  };

  return (
    <div
      className="text-sm font-medium h-10 flex items-center justify-center relative overflow-hidden select-none"
      style={{
        "--bar-bg": navbarData.topbar.barColor,
        "--bar-text": navbarData.topbar.textColor,
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <style>{`
        .top-info-bar {
          background-color: var(--bar-bg);
          color: var(--bar-text);
        }
      `}</style>

      <div className="top-info-bar w-full h-full flex items-center justify-center relative px-14 sm:px-20">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-2 sm:left-4 text-2xl sm:text-3xl text-[color:var(--bar-text)] hover:text-white transition-colors z-10"
          aria-label="Previous message"
          type="button"
        >
          ‹
        </button>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-2 sm:right-4 text-2xl sm:text-3xl text-[color:var(--bar-text)] hover:text-white transition-colors z-10"
          aria-label="Next message"
          type="button"
        >
          ›
        </button>

        {/* Animated message container */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute w-full max-w-screen-sm px-4 sm:px-6 text-center whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ willChange: "transform, opacity" }}
          >
            <Wrapper
              href={currentMessage.href}
              className={`inline-flex items-center justify-center gap-1 transition-colors duration-300 px-2 rounded
                text-[color:var(--bar-text)]
                ${
                  currentMessage.href
                    ? "hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bar-bg)]"
                    : ""
                }
              `}
              tabIndex={0}
            >
              <span className="truncate">{currentMessage.text}</span>
              {currentMessage.href && <span aria-hidden>›</span>}
            </Wrapper>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TopInfoBar;
