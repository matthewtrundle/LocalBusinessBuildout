'use client';

import { motion } from 'framer-motion';

export default function ChuysPage() {
  return (
    <div className="min-h-screen bg-yellow-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-600 via-yellow-500 to-lime-500">
        {[...Array(12)].map((_, i) => (
          <motion.div key={i} className="absolute text-7xl"
            style={{ left: `${(i * 8) % 100}%`, top: `${(i * 10) % 100}%` }}
            animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 7 + i, repeat: Infinity, delay: i * 0.5 }}>
            {['🌮', '🌯', '🫔', '🎨'][i % 4]}
          </motion.div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1 }} className="mb-10">
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <span className="text-9xl">🎨</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-8xl md:text-9xl font-black text-white mb-6"
            style={{ fontFamily: 'Impact, sans-serif', textShadow: '6px 6px 0px rgba(150,80,0,0.7)' }}>
            CHUY'S
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }} className="text-5xl font-black text-yellow-300 mb-12">
            TEX-MEX with BIG PERSONALITY
          </motion.h2>

          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '🌮', label: 'Big As Yo Face' },
              { icon: '🍹', label: 'Margaritas' },
              { icon: '🎨', label: 'Funky Decor' },
              { icon: '🌯', label: 'Fresh Made' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border-4 border-orange-600 shadow-xl">
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-orange-700 font-black text-sm uppercase leading-tight">{item.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-white text-orange-600 font-black text-2xl px-16 py-6 rounded-full hover:bg-yellow-50 transition-all shadow-2xl border-4 border-orange-700 uppercase">
            Find Location
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }} className="mt-12 text-white text-lg font-bold">
            📍 Multiple Austin Locations • Austin Born 1982
          </motion.p>
        </div>
      </section>
    </div>
  );
}
