'use client';

import { motion } from 'framer-motion';

export default function KontikiBeachClubPage() {
  return (
    <div className="min-h-screen bg-blue-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-500 to-purple-600">
        {[...Array(12)].map((_, i) => (
          <motion.div key={i} className="absolute text-6xl"
            style={{ left: `${(i * 8) % 100}%`, top: `${(i * 10) % 100}%` }}
            animate={{ y: [0, -25, 0], rotate: [0, 360], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8 + i, repeat: Infinity, delay: i * 0.5 }}>
            {['🍹', '🌴', '🏖️', '🌊'][i % 4]}
          </motion.div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 1 }} className="mb-10">
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <span className="text-9xl">🏖️</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-7xl md:text-8xl font-black text-white mb-6"
            style={{ fontFamily: 'Impact, sans-serif', textShadow: '6px 6px 0px rgba(50,100,150,0.7)' }}>
            KON-TIKI
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }} className="text-4xl font-bold text-cyan-200 mb-12">
            Beach Club on Lake Austin
          </motion.h2>

          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '🍹', label: 'Tropical Drinks' },
              { icon: '🏖️', label: 'Sandy Beach' },
              { icon: '🎵', label: 'Live Music' },
              { icon: '🌊', label: 'Lake Access' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border-4 border-cyan-600 shadow-xl">
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-cyan-700 font-black text-sm uppercase">{item.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-white text-cyan-700 font-black text-2xl px-16 py-6 rounded-full hover:bg-cyan-50 transition-all shadow-2xl uppercase">
            Reserve Table
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }} className="mt-12 text-white text-lg">
            📍 Volente Beach Resort • Lakeside Dining
          </motion.p>
        </div>
      </section>
    </div>
  );
}
