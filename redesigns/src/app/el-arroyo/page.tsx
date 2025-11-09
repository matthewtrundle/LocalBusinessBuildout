'use client';

import { motion } from 'framer-motion';

export default function ElArroyoPage() {
  return (
    <div className="min-h-screen bg-pink-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-600 via-red-500 to-orange-500">
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} className="absolute text-6xl" style={{ left: `${(i * 10) % 100}%`, top: `${(i * 12) % 100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 7 + i, repeat: Infinity, delay: i * 0.4 }}>
            {['🌮', '💬', '😂'][i % 3]}
          </motion.div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} className="mb-10">
            <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center border-8 border-pink-600 shadow-2xl">
              <span className="text-7xl">💬</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-8xl font-black text-white mb-6" style={{ fontFamily: 'Impact, sans-serif', textShadow: '6px 6px 0px rgba(150,20,50,0.7)' }}>
            EL ARROYO
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-pink-200 mb-12">
            Famous Signs • Tex-Mex • Margaritas
          </motion.h2>

          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}
            className="bg-white p-8 rounded-2xl border-4 border-pink-700 shadow-2xl max-w-2xl mx-auto mb-12">
            <h3 className="text-4xl font-black text-pink-700 mb-3">WORLD-FAMOUS SIGN</h3>
            <p className="text-gray-700 text-xl">Hilarious daily quotes that go viral</p>
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="bg-white text-pink-700 font-black text-2xl px-16 py-6 rounded-full hover:bg-pink-50 transition-all shadow-2xl uppercase">
            Visit Us
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-12 text-white text-lg">
            📍 1624 W 5th St • Austin Icon
          </motion.p>
        </div>
      </section>
    </div>
  );
}
