'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function RedHornCoffeePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-stone-50 via-red-50 to-amber-50">

      {/* Hero Section - Minimal & Elegant */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Pattern */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-amber-900"
        >
          {/* Coffee Bean Pattern */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20 + i * 2, repeat: Infinity, ease: "linear" }}
                className="absolute w-16 h-24 bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
          </div>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* Logo - Minimalist Approach */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="mb-12"
          >
            <div className="inline-block glass-strong rounded-full p-8 mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-amber-600 flex items-center justify-center text-6xl animate-float">
                ☕
              </div>
            </div>

            <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 font-serif tracking-tighter">
              Red Horn
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-red-300"></div>
              <p className="text-3xl text-red-200 font-light tracking-widest">COFFEE HOUSE</p>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-red-300"></div>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl md:text-3xl text-white/90 mb-12 font-light italic max-w-2xl mx-auto"
          >
            "Where Every Cup Tells a Story"
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto"
          >
            {[
              { num: "15+", label: "Coffee Origins" },
              { num: "100%", label: "Fair Trade" },
              { num: "Daily", label: "Fresh Roasted" }
            ].map((stat, i) => (
              <div key={i} className="glass p-6 rounded-2xl">
                <div className="text-4xl font-bold text-white mb-1">{stat.num}</div>
                <div className="text-sm text-red-200 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="group relative bg-white text-red-900 font-bold text-lg px-12 py-4 rounded-full overflow-hidden transition-all duration-300">
              <span className="relative z-10">View Our Menu</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">View Our Menu</span>
            </button>
            <button className="border-2 border-white/50 glass-strong text-white font-bold text-lg px-12 py-4 rounded-full hover:bg-white/20 transition-all duration-300 magnetic-btn">
              Visit Us Today
            </button>
          </motion.div>
        </div>

        {/* Floating Coffee Cup */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 text-9xl opacity-20 hidden lg:block"
        >
          ☕
        </motion.div>
      </section>

      {/* Coffee Selection - Grid Layout */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-bold mb-4 gradient-text from-red-900 to-amber-800 font-serif">
              Artisan Coffee Selection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expertly sourced, carefully roasted, perfectly brewed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Ethiopian Yirgacheffe", notes: "Floral, Citrus, Tea-like", intensity: 3 },
              { name: "Colombian Supremo", notes: "Chocolate, Caramel, Smooth", intensity: 4 },
              { name: "Sumatra Mandheling", notes: "Earthy, Herbal, Bold", intensity: 5 },
              { name: "Costa Rican Tarrazu", notes: "Bright, Balanced, Clean", intensity: 3 },
            ].map((coffee, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-white to-red-50 p-8 rounded-3xl hover-lift border border-red-100 h-full">
                  {/* Coffee Cup Icon */}
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    ☕
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-gray-900">{coffee.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 italic">{coffee.notes}</p>

                  {/* Intensity Meter */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <div
                        key={j}
                        className={`h-1.5 w-full rounded-full ${
                          j < coffee.intensity ? 'bg-gradient-to-r from-red-600 to-amber-600' : 'bg-gray-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Intensity: {coffee.intensity}/5</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Quote Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0.4, 0.6], ['0%', '20%']),
            scale: useTransform(scrollYProgress, [0.4, 0.6], [1, 1.1])
          }}
          className="absolute inset-0 bg-gradient-to-r from-red-800 to-amber-800"
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-strong p-12 rounded-3xl"
          >
            <p className="text-4xl md:text-5xl font-serif italic text-white leading-relaxed">
              "Life's too short for bad coffee. We serve only the exceptional."
            </p>
            <p className="text-red-200 mt-6 text-xl">— Red Horn Philosophy</p>
          </motion.div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-24 px-6 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16 gradient-text from-red-900 to-amber-800 font-serif"
          >
            Café Favorites
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { item: "Signature Espresso", price: "$4", desc: "Double shot, rich and smooth" },
              { item: "Cappuccino", price: "$5", desc: "Perfect foam, bold flavor" },
              { item: "Caramel Macchiato", price: "$6", desc: "Sweet, creamy, indulgent" },
              { item: "Cold Brew", price: "$5", desc: "Smooth, refreshing, bold" },
              { item: "Matcha Latte", price: "$6", desc: "Premium matcha, silky texture" },
              { item: "Cortado", price: "$4.50", desc: "Balanced, smooth, perfect" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-strong p-6 rounded-2xl hover-lift group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors">
                    {item.item}
                  </h3>
                  <span className="text-xl font-bold text-red-700">{item.price}</span>
                </div>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-lg px-12 py-4 rounded-full transition-all duration-300 magnetic-btn shadow-2xl">
              See Full Menu
            </button>
          </motion.div>
        </div>
      </section>

      {/* Visit Us CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-red-900 via-red-800 to-amber-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong p-12 rounded-3xl"
          >
            <div className="text-7xl mb-6">📍</div>
            <h2 className="text-5xl font-bold text-white mb-6 font-serif">Visit Us in Cedar Park</h2>
            <p className="text-xl text-red-100 mb-4">Open Daily | 6:00 AM - 8:00 PM</p>
            <p className="text-lg text-red-200 mb-8">Cedar Park, TX | Locally Owned & Operated</p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-red-900 font-bold text-lg px-10 py-4 rounded-full hover:bg-red-50 transition-all duration-300 magnetic-btn shadow-xl">
                Get Directions
              </button>
              <button className="border-2 border-white text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-white/10 transition-all duration-300 magnetic-btn backdrop-blur-lg">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
