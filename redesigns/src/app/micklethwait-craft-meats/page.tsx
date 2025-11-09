'use client';

import { motion } from 'framer-motion';

export default function MicklethwaitCraftMeatsPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-800 via-red-700 to-amber-700">
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} className="absolute text-7xl" style={{ left: `${(i * 11) % 100}%`, top: `${(i * 13) % 100}%` }}
            animate={{ y: [0, -25, 0], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 9 + i, repeat: Infinity, delay: i * 0.6 }}>
            {['🥩', '🔥', '🪵'][i % 3]}
          </motion.div>
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} className="mb-10">
            <div className="w-44 h-44 mx-auto bg-red-800 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <span className="text-8xl">🥩</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-6xl font-black text-white mb-6" style={{ textShadow: '5px 5px 0px rgba(120,30,0,0.7)' }}>
            MICKLETHWAIT
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-amber-200 mb-12">
            Craft Meats • East Austin
          </motion.h2>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="bg-white text-red-800 font-black text-2xl px-16 py-6 rounded-full hover:bg-amber-50 transition-all shadow-2xl uppercase">
            View Menu
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-12 text-white text-lg">
            📍 1309 Rosewood Ave
          </motion.p>
        </div>
      </section>
    </div>
  );
}
