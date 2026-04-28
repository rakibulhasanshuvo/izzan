"use client";

import { motion, Variants } from "framer-motion";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const steps = [
  { step: 1, title: "Trim the Wick", desc: "Always trim your wick to 1/4\" before every lighting to prevent soot and uneven burning." },
  { step: 2, title: "The First Melt", desc: "Allow the melted wax pool to reach the edges of the jar on the first burn to prevent tunneling." },
  { step: 3, title: "Burn Safely", desc: "Never burn a candle for more than 4 hours at a time, and keep away from drafts." }
];

export function CareGuide() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
        <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display mb-4 dark:text-gray-100">The Perfect Burn</motion.h2>
        <motion.p variants={fadeIn} className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Follow these simple steps to ensure your Izzan candle lasts longer and burns cleaner.</motion.p>
      </motion.div>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {steps.map((item, idx) => (
          <motion.div key={idx} variants={fadeIn} className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-secondary-light dark:bg-secondary-dark flex items-center justify-center text-primary font-display text-2xl font-bold">{item.step}</div>
            <h3 className="font-bold tracking-wider uppercase text-sm dark:text-gray-100">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
