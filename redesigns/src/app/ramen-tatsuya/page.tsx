'use client';

import { motion } from 'framer-motion';

export default function RamenTatsuyaPage() {
  return (
    <div className="min-h-screen bg-red-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-900 via-orange-800 to-amber-700">
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} className="absolute text-6xl"
            style={{ left: `${(i * 10) % 100}%`, top: `${(i * 11) % 100}%` }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 7 + i, repeat: Infinity, delay: i * 0.5 }}>
            🍜
          </motion.div>
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 1 }} className="mb-10">
            <div className="w-44 h-44 mx-auto bg-red-700 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <span className="text-8xl">🍜</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-7xl md:text-8xl font-black text-white mb-6"
            style={{ textShadow: '5px 5px 0px rgba(100,20,0,0.8)' }}>
            RAMEN TATSU-YA
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }} className="text-4xl font-bold text-orange-200 mb-12">
            Authentic Japanese Ramen
          </motion.h2>

          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }} className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            {[
              { icon: '🍜', label: 'Tonkotsu' },
              { icon: '🥚', label: 'Soft Egg' },
              { icon: '🌶️', label: 'Spicy Miso' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border-4 border-red-700 shadow-xl">
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-red-700 font-black uppercase">{item.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-white text-red-700 font-black text-2xl px-16 py-6 rounded-full hover:bg-red-50 transition-all shadow-2xl uppercase">
            View Menu
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
