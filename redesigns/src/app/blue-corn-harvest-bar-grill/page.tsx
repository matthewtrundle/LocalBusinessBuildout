'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function BlueCornHarvestPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">

      {/* Hero Section with Parallax */}
      <section className="relative h-screen overflow-hidden">
        {/* Animated Background */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-800 to-red-900"
        >
          {/* Animated Blobs */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </motion.div>

        {/* Glass Morphism Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 flex items-center justify-center h-full"
        >
          <div className="text-center px-6">
            {/* Logo/Title with Animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="mb-8"
            >
              <div className="inline-block glass-strong rounded-3xl px-8 py-4 mb-6">
                <h1 className="text-7xl md:text-8xl font-bold text-white font-serif tracking-tight">
                  Blue Corn
                </h1>
                <h2 className="text-4xl md:text-5xl font-light text-amber-200 mt-2 tracking-wide">
                  Harvest Bar & Grill
                </h2>
              </div>
            </motion.div>

            {/* Tagline with Stagger Animation */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-2xl md:text-3xl text-white mb-12 font-light max-w-3xl mx-auto"
            >
              Southwest-Inspired Cuisine in the Heart of Cedar Park
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <button className="glass-strong hover:bg-white/30 text-white font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300 magnetic-btn glow">
                View Menu
              </button>
              <button className="bg-white/20 hover:bg-white hover:text-amber-900 text-white font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300 magnetic-btn backdrop-blur-lg border-2 border-white/30">
                Reserve Table
              </button>
            </motion.div>

            {/* Info Cards */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              <div className="glass p-6 rounded-2xl hover-lift">
                <div className="text-4xl mb-3">📍</div>
                <p className="text-white font-semibold">Cedar Park, TX</p>
                <p className="text-amber-200 text-sm mt-1">700 E Whitestone Blvd</p>
              </div>
              <div className="glass p-6 rounded-2xl hover-lift">
                <div className="text-4xl mb-3">🕐</div>
                <p className="text-white font-semibold">Open Daily</p>
                <p className="text-amber-200 text-sm mt-1">11 AM - 10 PM</p>
              </div>
              <div className="glass p-6 rounded-2xl hover-lift">
                <div className="text-4xl mb-3">📞</div>
                <p className="text-white font-semibold">Call Now</p>
                <p className="text-amber-200 text-sm mt-1">(512) 555-CORN</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center text-white/80">
            <p className="text-sm mb-2 font-light">Scroll to explore</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
            >
              <div className="w-1 h-2 bg-white rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Section with Glass Cards */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold text-center mb-6 gradient-text from-amber-900 via-orange-800 to-red-800 font-serif"
          >
            Experience the Southwest
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-xl text-gray-700 text-center mb-16 max-w-3xl mx-auto"
          >
            Fresh ingredients, bold flavors, and authentic hospitality
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🌽", title: "Farm-Fresh", desc: "Locally sourced ingredients from Texas farms" },
              { icon: "🍹", title: "Craft Cocktails", desc: "Handcrafted margaritas & signature drinks" },
              { icon: "🎵", title: "Live Music", desc: "Local artists every Friday & Saturday" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.7 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl hover-lift border border-white/50 shadow-xl">
                  <div className="text-6xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-700">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Image Section */}
      <section className="relative h-96 overflow-hidden">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0.3, 0.7], ['0%', '30%']) }}
          className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center"
        >
          <div className="text-center glass-strong p-12 rounded-3xl">
            <h3 className="text-5xl font-bold text-white mb-4 font-serif">Happy Hour Daily</h3>
            <p className="text-2xl text-amber-100">3-6 PM | Half-Price Apps & $5 Margaritas</p>
          </div>
        </motion.div>
      </section>

      {/* Menu Preview */}
      <section className="py-24 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16 gradient-text from-amber-900 to-orange-800 font-serif"
          >
            Signature Dishes
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Blue Corn Enchiladas", price: "$16", desc: "Three enchiladas with choice of filling, topped with our signature green chili sauce" },
              { name: "Harvest Bowl", price: "$14", desc: "Quinoa, black beans, roasted vegetables, avocado, cilantro-lime dressing" },
              { name: "Southwest Ribeye", price: "$32", desc: "12oz ribeye with chipotle butter, seasonal vegetables, mashed potatoes" },
              { name: "Grilled Salmon Tacos", price: "$18", desc: "Three tacos with mango salsa, cabbage slaw, chipotle aioli" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="glass-strong p-6 rounded-2xl hover-lift group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">{item.name}</h3>
                  <span className="text-2xl font-bold text-amber-700">{item.price}</span>
                </div>
                <p className="text-gray-700">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-lg px-12 py-4 rounded-full transition-all duration-300 magnetic-btn shadow-2xl">
              View Full Menu
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-white mb-6 font-serif"
          >
            Ready to Experience Blue Corn?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-amber-100 mb-10"
          >
            Reserve your table today or order online for pickup
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="bg-white text-amber-900 font-bold text-lg px-12 py-4 rounded-full transition-all duration-300 magnetic-btn hover:bg-amber-50 shadow-2xl">
              Make Reservation
            </button>
            <button className="border-2 border-white text-white font-bold text-lg px-12 py-4 rounded-full transition-all duration-300 magnetic-btn hover:bg-white/10 backdrop-blur-lg">
              Order Online
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
