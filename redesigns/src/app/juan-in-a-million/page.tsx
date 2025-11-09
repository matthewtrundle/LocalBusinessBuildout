'use client';

import { motion } from 'framer-motion';

export default function JuanInAMillionPage() {
  return (
    <div className="min-h-screen bg-orange-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-700 via-orange-600 to-yellow-500">
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} className="absolute text-7xl"
            style={{ left: `${(i * 9) % 100}%`, top: `${(i * 12) % 100}%` }}
            animate={{ y: [0, -25, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.4 }}>
            {['🌮', '🍳', '🫔'][i % 3]}
          </motion.div>
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 1 }} className="mb-10">
            <div className="w-48 h-48 mx-auto bg-red-600 rounded-full flex items-center justify-center border-8 border-yellow-400 shadow-2xl">
              <span className="text-9xl">⭐</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-6xl md:text-7xl font-black text-white mb-6"
            style={{ textShadow: '5px 5px 0px rgba(120,40,0,0.8)' }}>
            JUAN IN A MILLION
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }} className="text-4xl font-bold text-yellow-200 mb-12">
            Home of the Don Juan Taco
          </motion.h2>

          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }} className="bg-black/30 backdrop-blur-sm border-4 border-yellow-400 rounded-2xl p-8 mb-12 max-w-2xl mx-auto">
            <h3 className="text-5xl font-black text-yellow-300 mb-3">DON JUAN TACO</h3>
            <p className="text-white text-xl">Potato, Egg, Bacon, Cheese - A Legend</p>
          </motion.div>

          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }} className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            {[
              { icon: '🌮', label: 'Famous Tacos' },
              { icon: '🍳', label: 'Breakfast' },
              { icon: '❤️', label: 'Family Owned' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border-4 border-red-700 shadow-xl">
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-red-700 font-black uppercase">{item.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="bg-yellow-400 text-red-700 font-black text-2xl px-16 py-6 rounded-full hover:bg-yellow-300 transition-all shadow-2xl border-4 border-red-700 uppercase">
            Visit Us
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }} className="mt-12 text-white text-lg">
            📍 2300 E Cesar Chavez St • Since 1981
          </motion.p>
        </div>
      </section>
    </div>
  );
}
