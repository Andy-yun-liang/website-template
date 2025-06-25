// src/components/ImageGalleryWithText.jsx
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

export default function ImageGalleryWithText() {
  const [selected, setSelected] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const imgVariant = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const offsetStep = 40; // smaller offsets so cascade fits smaller screens better
  const baseZ = items.length;

  // Responsive image widths
  const getImageWidth = () => {
    if (window.innerWidth < 640) return 180; // sm and below
    if (window.innerWidth < 1024) return 240; // md and below
    return 320; // lg and above
  };

  // Compute total cascade width based on image width & offsetStep
  const imageWidth = getImageWidth();
  const totalCascadeWidth = imageWidth + offsetStep * (items.length - 1);

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20 py-24">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-16">
        {/* Left: image cascade */}
        <motion.div
          className="relative w-full lg:w-1/2 h-[520px]"
          variants={container}
          initial="hidden"
          animate={controls}
        >
          <div
            className="relative h-full mx-auto"
            style={{
              width: totalCascadeWidth,
              maxWidth: "90vw", // keep it within viewport on small screens
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {items.map(({ src, alt }, idx) => {
              const defaultZ = baseZ - idx;
              const top = offsetStep * idx;
              const left = offsetStep * idx;
              const zIndex = idx === selected ? baseZ + 1 : defaultZ;

              return (
                <motion.img
                  key={alt}
                  src={src}
                  alt={alt}
                  variants={imgVariant}
                  whileHover="hover"
                  onClick={() => setSelected(idx)}
                  style={{
                    position: "absolute",
                    top,
                    left,
                    zIndex,
                    width: imageWidth,
                    maxWidth: "100%",
                  }}
                  className={`rounded-2xl shadow-2xl border-4 border-white object-cover cursor-pointer transition-transform duration-200 ${
                    selected === idx ? "ring-4 ring-mudgreen" : ""
                  }`}
                  draggable={false}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Right: dynamic text */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold uppercase tracking-wide text-mudgreen">
            {items[selected].title}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">{items[selected].text}</p>
          <button
            className="inline-block px-6 py-3 bg-mudgreen text-white rounded-2xl shadow hover:bg-opacity-90 transition"
            onClick={() => console.log("CTA clicked for", items[selected].title)}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
