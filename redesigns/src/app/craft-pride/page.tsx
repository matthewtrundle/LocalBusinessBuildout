'use client';

import { motion } from 'framer-motion';

export default function CraftPridePage() {
  return (
    <div className="min-h-screen bg-orange-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-700 via-amber-600 to-yellow-500">
        {/* Beer Icons */}
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} className="absolute text-7xl"
            style={{ left: `${(i * 10) % 100}%`, top: `${(i * 12) % 100}%` }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 7 + i, repeat: Infinity, delay: i * 0.5 }}>
            🍺
          </motion.div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 1 }} className="mb-10">
            <div className="w-40 h-40 mx-auto bg-orange-600 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <span className="text-8xl">🍻</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-8xl md:text-9xl font-black text-white mb-6"
            style={{ fontFamily: 'Impact, sans-serif', textShadow: '5px 5px 0px rgba(120,50,0,0.8)' }}>
            CRAFT PRIDE
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }} className="text-4xl font-bold text-orange-200 mb-12">
            Texas Craft Beer Paradise
          </motion.h2>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }} className="bg-black/40 backdrop-blur-md border-4 border-orange-400 rounded-2xl p-10 mb-12 max-w-2xl mx-auto">
            <h3 className="text-4xl font-black text-orange-200 mb-4">54 TEXAS TAPS</h3>
            <p className="text-white text-xl">
              100% Texas Craft Beer • Supporting Local Breweries
            </p>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }} className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: '🍺', label: '54 Taps' },
              { icon: '🌟', label: 'All Texas' },
              { icon: '🎉', label: 'Rainey St' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.1 }}
                className="bg-white p-6 rounded-2xl border-4 border-orange-600 shadow-xl">
                <div className="text-6xl mb-2">{item.icon}</div>
                <p className="text-orange-700 font-black text-lg uppercase">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="bg-orange-600 text-white font-black text-2xl px-16 py-6 rounded-full hover:bg-orange-500 transition-all shadow-2xl border-4 border-white uppercase">
            See Tap List
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }} className="mt-12 text-white text-lg">
            📍 61 Rainey St • Daily 4 PM - 2 AM
          </motion.p>
        </div>
      </section>
    </div>
  );
}
