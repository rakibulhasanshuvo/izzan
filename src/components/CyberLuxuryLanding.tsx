"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Layout, Zap, Lock, Code, ArrowRight } from "lucide-react";
import Image from "next/image";

// --- Mock Data ---
const PRODUCTS = [
  {
    id: "p1",
    title: "Neon Genesis Dashboard",
    price: 129,
    description: "A dark-mode admin template with glassmorphism UI and cyber accents.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "p2",
    title: "Quantum E-Commerce UI Kit",
    price: 89,
    description: "High-conversion storefront components with micro-interactions.",
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "p3",
    title: "Synthwave SaaS Landing",
    price: 59,
    description: "Convert visitors with glowing gradients and neon typography.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "p4",
    title: "Cyber-Security Admin UI",
    price: 149,
    description: "Data-dense layouts perfect for monitoring and analytics.",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000",
  },
];

const FEATURES = [
  { icon: Layout, title: "Modular Architecture", desc: "Built with scalable React components." },
  { icon: Zap, title: "Hyper-Optimized", desc: "Lighthouse scores of 99+ out of the box." },
  { icon: Lock, title: "Secure Foundations", desc: "Follows strict security best practices." },
  { icon: Code, title: "Developer Experience", desc: "Clean, documented, and typed code." },
];

export default function CyberLuxuryLanding() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 font-sans">

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            AURA
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#templates" className="hover:text-cyan-400 transition-colors">Templates</a>
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          </nav>
          <div className="flex items-center">
            <button className="relative p-2 text-gray-400 hover:text-cyan-400 transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute top-0 right-0 bg-cyan-500 text-black text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-black"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black -z-10"></div>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium tracking-wide uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Next-Gen UI Kits
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Design the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Future</span>.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Premium, dark-mode-first React templates for ambitious startups. Glassmorphism, neon accents, and pixel-perfect layouts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#templates" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                Explore Templates
              </a>
              <a href="#features" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300">
                View Features
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section id="templates" className="py-24 px-6 bg-black relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Assets</h2>
              <p className="text-gray-400">High-end digital templates for your next project.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden hover:border-cyan-500/30 transition-colors duration-500"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <Image
                    src={product.img}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-black/50 backdrop-blur-md text-white font-mono text-sm px-2 py-1 rounded border border-white/10">
                      ${product.price}
                    </span>
                  </div>
                </div>
                <div className="p-6 relative">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">{product.title}</h3>
                  <p className="text-sm text-gray-400 mb-6 line-clamp-2">{product.description}</p>

                  <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-cyan-500 text-white hover:text-black border border-white/10 hover:border-cyan-500 py-3 rounded-lg text-sm font-bold transition-all duration-300"
                  >
                    Add to Cart <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineered for Excellence</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Every template is built on a foundation of modern best practices.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20">
                  <feature.icon className="text-cyan-400" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer & Newsletter */}
      <footer className="border-t border-white/10 bg-black pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="text-2xl font-bold tracking-tighter mb-4 text-white">AURA</div>
            <p className="text-gray-400 max-w-sm mb-6">
              Elevating digital experiences with high-end templates and UI kits.
            </p>
          </div>
          <div className="md:justify-self-end w-full max-w-md">
            <h4 className="text-lg font-bold mb-4">Join the Network</h4>
            <p className="text-sm text-gray-400 mb-4">Get notified about new releases and exclusive drops.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Subscribed to the grid."); }}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="Enter your transmission ID (Email)"
                required
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder:text-gray-600"
              />
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-lg transition-colors text-sm"
              >
                Initialize
              </button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} AURA Digital. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
