import { motion } from "framer-motion";

export default function InfoCard({ title, children }) {
  return (
    <motion.div
      className="bg-antiflashwhite rounded-lg p-6 shadow-md border border-mudgreen"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-sm font-semibold text-mudgreen uppercase tracking-widest mb-3">
        {title}
      </h2>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </motion.div>
  );
}
