'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function theaustinbeergardenbrewingcompanyPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-black">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-amber-900 to-orange-900"
        >
          <div className="absolute top-20 left-20 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="glass-strong rounded-full p-12 inline-block mb-8">
              <div className="text-8xl animate-float">🍺</div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-7xl md:text-9xl font-bold text-white mb-6 font-serif"
          >
            The Austin Beer Garden Brewing Company
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl md:text-3xl text-amber-200 mb-12 italic"
          >
            Craft Beer & Good Times
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-lg px-12 py-4 rounded-full magnetic-btn shadow-2xl">
              Visit Us
            </button>
            <button className="glass-strong hover:bg-white/20 text-white font-bold text-lg px-12 py-4 rounded-full border-2 border-white/30 magnetic-btn">
              Learn More
            </button>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-16 glass-strong p-6 rounded-2xl inline-block"
          >
            <p className="text-amber-200 uppercase text-xs mb-1 tracking-wider">Location</p>
            <p className="text-white font-semibold">Austin, TX</p>
          </motion.div>
        </div>
      </section>

      {/* Services/Offerings Section */}
      <section className="py-24 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-bold text-center mb-16 gradient-text from-amber-400 to-white font-serif"
          >
            On Tap
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="glass-strong p-8 rounded-3xl hover-lift"
            >
              <div className="text-6xl mb-4">🍺</div>
              <h3 className="text-2xl font-bold text-white mb-3">Service 1</h3>
              <p className="text-amber-200">Premium quality and exceptional service in every detail.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="glass-strong p-8 rounded-3xl hover-lift"
            >
              <div className="text-6xl mb-4">🍺</div>
              <h3 className="text-2xl font-bold text-white mb-3">Service 2</h3>
              <p className="text-amber-200">Premium quality and exceptional service in every detail.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6000000000000001, duration: 0.7 }}
              className="glass-strong p-8 rounded-3xl hover-lift"
            >
              <div className="text-6xl mb-4">🍺</div>
              <h3 className="text-2xl font-bold text-white mb-3">Service 3</h3>
              <p className="text-amber-200">Premium quality and exceptional service in every detail.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-amber-900 via-orange-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif"
          >
            Visit Us Today
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-amber-200 mb-10"
          >
            Austin, TX
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="bg-white text-amber-900 font-bold text-lg px-12 py-4 rounded-full hover:bg-amber-50 transition-all duration-300 magnetic-btn shadow-2xl">
              Get Directions
            </button>
            <button className="border-2 border-white text-white font-bold text-lg px-12 py-4 rounded-full hover:bg-white/10 transition-all duration-300 magnetic-btn backdrop-blur-lg">
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
