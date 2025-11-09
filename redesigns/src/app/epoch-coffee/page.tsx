'use client';

import { motion } from 'framer-motion';

export default function EpochCoffeePage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-700 via-orange-600 to-yellow-500">
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} className="absolute text-6xl"
            style={{ left: `${(i * 10) % 100}%`, top: `${(i * 12) % 100}%` }}
            animate={{ rotate: 360, opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8 + i, repeat: Infinity, delay: i * 0.5 }}>
            ☕
          </motion.div>
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 1 }} className="mb-10">
            <div className="w-44 h-44 mx-auto bg-orange-600 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <span className="text-8xl">☕</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-8xl md:text-9xl font-black text-white mb-6"
            style={{ textShadow: '6px 6px 0px rgba(100,40,0,0.7)' }}>
            EPOCH COFFEE
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }} className="text-4xl font-bold text-amber-200 mb-12">
            Open 24/7 • North Loop
          </motion.h2>

          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }} className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            {[
              { icon: '☕', label: '24/7 Coffee' },
              { icon: '📚', label: 'Study Spot' },
              { icon: '🎵', label: 'Live Music' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border-4 border-orange-600 shadow-xl">
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-orange-700 font-black uppercase">{item.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-white text-orange-700 font-black text-2xl px-16 py-6 rounded-full hover:bg-orange-50 transition-all shadow-2xl uppercase">
            Visit Us
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }} className="mt-12 text-white text-lg">
            📍 221 W North Loop Blvd • Always Open
          </motion.p>
        </div>
      </section>
    </div>
  );
}
