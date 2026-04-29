"use client";

import { motion, Variants } from "framer-motion";
import { Leaf, Hand, Globe, Truck } from "lucide-react";

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

const features = [
  { icon: Leaf, title: "Clean Ingredients", desc: "Clean ingredients for safe and clean environments." },
  { icon: Hand, title: "Handcrafted", desc: "Handcrafted eco-friendly and natural candles." },
  { icon: Globe, title: "Sustainable", desc: "Sustainable wellness for a sustainable planet." },
  { icon: Truck, title: "Fast Shipping", desc: "Fast shipping and tracking for your convenience." }
];

export function Features() {
  return (
    <section id="discover" className="bg-background-light dark:bg-background-dark py-16 transition-colors duration-300 border-t border-gray-100 dark:border-gray-800 contain-layout">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 text-center">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-3xl font-display mb-12">Why Izzan?</motion.h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={fadeIn} className="flex flex-col items-center">
              <feature.icon className="text-primary mb-4 w-10 h-10" />
              <h3 className="font-bold tracking-wider uppercase text-sm mb-2 dark:text-gray-100">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
