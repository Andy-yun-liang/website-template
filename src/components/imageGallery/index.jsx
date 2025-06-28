import { useState, useRef } from "react";
import { motion, useMotionValue, useAnimation, AnimatePresence } from "framer-motion";

import writing from "../../assets/writing.jpg";
import handshake from "../../assets/handshake.jpg";
import businessIntel from "../../assets/businessIntelligence.jpg";

const items = [
  {
    src: writing.src,
    alt: "Writing Image",
    title: "Crafting the Narrative",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
           Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.`,
  },
  {
    src: handshake.src,
    alt: "Handshake",
    title: "Building Relationships",
    text: `In condimentum facilisis porta. Sed nec diam eu diam mattis viverra 
           nulla fringilla, nec tempor nisl.`,
  },
  {
    src: businessIntel.src,
    alt: "Analytics",
    title: "Data-Driven Insights",
    text: `Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, 
           eu vulputate magna eros eu erat.`,
  },
];

const imageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.4 } },
};

export default function ImageGalleryWithText() {
  const [selected, setSelected] = useState(0);
  const x = useMotionValue(0);
  const containerRef = useRef(null);

  const clampIndex = (i) => Math.max(0, Math.min(items.length - 1, i));

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    const swipe = Math.abs(offset) > 100 || Math.abs(velocity) > 500;
    if (!swipe) return;

    if (offset < 0) {
      setSelected((prev) => clampIndex(prev + 1));
    } else {
      setSelected((prev) => clampIndex(prev - 1));
    }
  };

  const item = items[selected];

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20 py-24">
      <div className="flex flex-col-reverse lg:flex-row gap-12 items-center justify-between">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <h2 className="text-4xl font-bold tracking-tight text-mudgreen">
            {item.title}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">{item.text}</p>
          <button
            onClick={() => console.log("CTA clicked for", item.title)}
            className="px-6 py-3 bg-mudgreen text-white rounded-xl shadow hover:bg-opacity-90 transition"
          >
            Learn More
          </button>

          {/* Dot Navigation */}
          <div className="flex justify-center lg:justify-start gap-2 mt-6">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === selected ? "bg-mudgreen scale-125" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Swipeable Image Area */}
        <div className="w-full lg:w-1/2 overflow-hidden">
          <motion.div
            ref={containerRef}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-xl"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            style={{ x }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={item.src}
                src={item.src}
                alt={item.alt}
                className="absolute w-full h-full object-cover"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={imageVariants}
                draggable={false}
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
