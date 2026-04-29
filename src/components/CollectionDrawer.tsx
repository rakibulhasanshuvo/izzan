"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { X } from "lucide-react";
import { Product } from "@/generated/client";
import { ProductCard } from "./ProductCard";
import { useEffect, useRef } from "react";

const staggerGrid: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.15,
    },
  },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
  },
};

interface CollectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  products: Product[];
}

export function CollectionDrawer({ isOpen, onClose, title, products }: CollectionDrawerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset scroll position when opening
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-[60]"
          />

          {/* Full-screen overlay */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 top-0 z-[70] flex flex-col bg-[#fdfbf7] dark:bg-[#1a1f1b]"
          >
            {/* Compact sticky header */}
            <div className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-black/[0.06] dark:border-white/[0.06] bg-[#fdfbf7] dark:bg-[#1a1f1b] sticky top-0 z-10">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl md:text-2xl font-display font-semibold text-gray-900 dark:text-gray-100">
                  {title}
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-600 dark:text-gray-400 bg-black/[0.05] dark:bg-white/[0.08] px-3 py-1.5 rounded-full">
                  {products.length} {products.length === 1 ? "item" : "items"}
                </span>
              </div>
              <button
                onClick={onClose}
                className="group flex items-center space-x-2 px-4 py-2 rounded-full border border-black/[0.1] dark:border-white/[0.1] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
                aria-label="Close collection"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-700 dark:text-gray-300 hidden md:block">Close</span>
                <X size={18} className="text-gray-700 dark:text-gray-300 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Scrollable product grid */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerGrid}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8"
                >
                  {products.map((product) => (
                    <motion.div key={product.id} variants={cardItem}>
                      <ProductCard item={product} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
