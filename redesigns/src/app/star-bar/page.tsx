'use client';

import { motion } from 'framer-motion';

export default function StarBarPage() {
  return (
    <div className="min-h-screen bg-purple-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-800 via-pink-700 to-red-600">
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} className="absolute text-7xl" style={{ left: `${(i * 9) % 100}%`, top: `${(i * 12) % 100}%` }}
            animate={{ rotate: 360, scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8 + i, repeat: Infinity, delay: i * 0.5 }}>
            ⭐
          </motion.div>
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} className="mb-10">
            <div className="w-44 h-44 mx-auto bg-pink-600 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <span className="text-8xl">⭐</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-8xl font-black text-white mb-6" style={{ fontFamily: 'Impact, sans-serif', textShadow: '5px 5px 0px rgba(120,30,80,0.7)' }}>
            STAR BAR
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-pink-200 mb-12">
            East Austin Dive
          </motion.h2>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="bg-white text-purple-800 font-black text-2xl px-16 py-6 rounded-full hover:bg-pink-50 transition-all shadow-2xl uppercase">
            Visit Us
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-12 text-white text-lg">
            📍 East 6th Street
          </motion.p>
        </div>
      </section>
    </div>
  );
}
