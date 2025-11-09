'use client';

import { motion } from 'framer-motion';

export default function HopDoddyBurgerBarPage() {
  return (
    <div className="min-h-screen bg-yellow-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-600 via-red-600 to-pink-600">
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} className="absolute text-7xl" style={{ left: `${(i * 9) % 100}%`, top: `${(i * 12) % 100}%` }}
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 7 + i, repeat: Infinity, delay: i * 0.4 }}>
            🍔
          </motion.div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} className="mb-10">
            <div className="w-48 h-48 mx-auto bg-red-600 rounded-full flex items-center justify-center border-8 border-yellow-400 shadow-2xl">
              <span className="text-9xl">🍔</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-7xl md:text-8xl font-black text-white mb-6"
            style={{ fontFamily: 'Impact, sans-serif', textShadow: '6px 6px 0px rgba(120,30,0,0.7)' }}>
            HOPDODDY
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-5xl font-black text-yellow-300 mb-12">
            BURGER BAR
          </motion.h2>

          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}
            className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            {[
              { icon: '🍔', label: 'Fresh Ground Daily' },
              { icon: '🍞', label: 'Baked Buns' },
              { icon: '🍺', label: 'Craft Shakes' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border-4 border-red-700 shadow-xl">
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-red-700 font-black uppercase text-sm">{item.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="bg-yellow-400 text-red-700 font-black text-2xl px-16 py-6 rounded-full hover:bg-yellow-300 transition-all shadow-2xl uppercase">
            Order Online
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-12 text-white text-lg">
            📍 Multiple Austin Locations
          </motion.p>
        </div>
      </section>
    </div>
  );
}
