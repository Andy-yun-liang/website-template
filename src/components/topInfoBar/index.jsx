import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navbarData } from "../../data/editNavbarData.ts";

const TopInfoBar = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % navbarData.topbar.flashMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentMessage = navbarData.topbar.flashMessages[current];
  const Wrapper = currentMessage.href ? "a" : "div";

  return (
    <div
      className="text-sm font-medium h-10 flex items-center justify-center relative overflow-hidden"
      style={{
        "--bar-bg": navbarData.topbar.barColor,
        "--bar-text": navbarData.topbar.textColor,
      }}

    >
      <style>
        {`
          .top-info-bar {
            background-color: var(--bar-bg);
            color: var(--bar-text);
          }
        `}
      </style>
      <div className="top-info-bar w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full max-w-screen-sm px-4 sm:px-6 text-center"
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
