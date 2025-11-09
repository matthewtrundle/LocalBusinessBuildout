'use client';

import { motion } from 'framer-motion';

export default function TexasChiliParlorPage() {
  return (
    <div className="min-h-screen bg-red-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-900 via-orange-700 to-yellow-600">
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} className="absolute text-7xl" style={{ left: `${(i * 9) % 100}%`, top: `${(i * 11) % 100}%` }}
            animate={{ rotate: [0, 360], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8 + i, repeat: Infinity, delay: i * 0.5 }}>
            🌶️
          </motion.div>
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} className="mb-10">
            <div className="w-44 h-44 mx-auto bg-red-700 rounded-full flex items-center justify-center border-8 border-yellow-400 shadow-2xl">
              <span className="text-8xl">🌶️</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-7xl font-black text-white mb-6" style={{ textShadow: '5px 5px 0px rgba(120,30,0,0.7)' }}>
            TEXAS CHILI PARLOR
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-yellow-200 mb-12">
            Austin Tradition Since 1976
          </motion.h2>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="bg-yellow-400 text-red-900 font-black text-2xl px-16 py-6 rounded-full hover:bg-yellow-300 transition-all shadow-2xl uppercase">
            Order Chili
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-12 text-white text-lg">
            📍 1409 Lavaca St • Since 1976
          </motion.p>
        </div>
      </section>
    </div>
  );
}
