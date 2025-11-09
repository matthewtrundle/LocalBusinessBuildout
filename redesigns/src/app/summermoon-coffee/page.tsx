'use client';

import { motion } from 'framer-motion';

export default function SummerMoonCoffeePage() {
  return (
    <div className="min-h-screen bg-yellow-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-600 via-orange-500 to-amber-500">
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} className="absolute text-7xl"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -25, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 7 + i, repeat: Infinity }}>
            🌙
          </motion.div>
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 1 }} className="mb-10">
            <div className="w-44 h-44 mx-auto bg-yellow-400 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <span className="text-8xl">🌙</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-7xl md:text-8xl font-black text-white mb-6"
            style={{ textShadow: '5px 5px 0px rgba(130,80,0,0.7)' }}>
            SUMMER MOON
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }} className="text-4xl font-bold text-yellow-200 mb-8">
            Wood-Fired Coffee
          </motion.h2>

          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }} className="bg-black/30 backdrop-blur-sm border-4 border-yellow-400 rounded-2xl p-8 mb-12 max-w-2xl mx-auto">
            <h3 className="text-4xl font-black text-yellow-300 mb-3">MOON MILK</h3>
            <p className="text-white text-xl">Sweet Cream Masterpiece</p>
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-yellow-400 text-orange-800 font-black text-2xl px-16 py-6 rounded-full hover:bg-yellow-300 transition-all shadow-2xl uppercase">
            Find Location
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }} className="mt-12 text-white text-lg">
            📍 Multiple Austin Locations
          </motion.p>
        </div>
      </section>
    </div>
  );
}
