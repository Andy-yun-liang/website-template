import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const infoMessages = [
  "Book your spa appointments now at The Wink & Wave Spa at Bala Bay Inn",
  "Now offering group discounts – inquire today!",
  "Gift cards available for all occasions"
];

const TopInfoBar = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % infoMessages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-sky-100 text-sm text-center text-slate-900 font-medium py-2 px-4 overflow-hidden h-8 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="absolute"
        >
          {infoMessages[current]} <a href="#" className="underline ml-1">›</a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TopInfoBar;
