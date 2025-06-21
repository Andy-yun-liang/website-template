import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const slides = [
  {
    title: "Welcome to MyCompany",
    description: "Building innovative solutions that matter.",
    bg: "bg-antiflashwhite",
  },
  {
    title: "Join Our Team",
    description: "Explore careers that make an impact.",
    bg: "bg-neutral-200",
  },
  {
    title: "Contact Us Today",
    description: "Let’s talk about your next big idea.",
    bg: "bg-zinc-200",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = left, 1 = right

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => paginate(1),
    onSwipedRight: () => paginate(-1),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    const interval = setInterval(() => paginate(1), 10000);
    return () => clearInterval(interval);
  }, [current]);

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.4 },
    }),
  };

  return (
    <section
      {...swipeHandlers}
      className={`relative h-[65vh] overflow-hidden text-gray-800 ${slides[current].bg}`}
    >
      {/* Left Arrow */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-3xl text-gray-600 hover:text-gray-900"
        onClick={() => paginate(-1)}
        aria-label="Previous Slide"
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-3xl text-gray-600 hover:text-gray-900"
        onClick={() => paginate(1)}
        aria-label="Next Slide"
      >
        ›
      </button>

      {/* Slide Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <AnimatePresence custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute text-center px-6 max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {slides[current].title}
            </h1>
            <p className="text-lg md:text-xl">{slides[current].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center z-10">
        <div className="flex space-x-2 mb-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === current ? "bg-gray-800 scale-125" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
