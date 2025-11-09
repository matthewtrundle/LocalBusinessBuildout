'use client';

import { motion } from 'framer-motion';

export default function KerbeyLaneNorthPage() {
  return (
    <div className="min-h-screen bg-yellow-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500 via-yellow-500 to-amber-400">
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} className="absolute text-7xl"
            style={{ left: `${(i * 12) % 100}%`, top: `${(i * 15) % 100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.5 }}>
            {['🥞', '🍳', '☕'][i % 3]}
          </motion.div>
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 1 }} className="mb-8">
            <div className="w-40 h-40 mx-auto bg-white rounded-full flex items-center justify-center border-8 border-orange-600 shadow-2xl">
              <span className="text-7xl">🌙</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-8xl font-black text-white mb-6"
            style={{ textShadow: '5px 5px 0px rgba(150,70,0,0.7)' }}>
            KERBEY LANE
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }} className="text-4xl font-bold text-orange-200 mb-12">
            24/7 Breakfast & More
          </motion.h2>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white text-orange-600 font-black text-2xl px-14 py-5 rounded-full hover:bg-orange-50 transition-all shadow-2xl uppercase">
            View Menu
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }} className="mt-12 text-white text-lg">
            📍 Multiple Austin Locations • Open 24/7
          </motion.p>
        </div>
      </section>
    </div>
  );
}
