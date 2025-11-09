'use client';

import { motion } from 'framer-motion';

export default function AlamoDrafthousePage() {
  return (
    <div className="min-h-screen bg-red-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-800 via-red-700 to-orange-700">
        {[...Array(12)].map((_, i) => (
          <motion.div key={i} className="absolute text-6xl"
            style={{ left: `${(i * 8) % 100}%`, top: `${(i * 10) % 100}%` }}
            animate={{ rotate: 360, opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10 + i, repeat: Infinity, delay: i * 0.5 }}>
            {['🎬', '🍿', '🎥'][i % 3]}
          </motion.div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 1 }} className="mb-10">
            <div className="w-48 h-48 mx-auto bg-red-600 rounded-lg flex items-center justify-center border-8 border-white shadow-2xl">
              <span className="text-9xl">🎬</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-7xl md:text-9xl font-black text-white mb-6"
            style={{ fontFamily: 'Impact, sans-serif', textShadow: '6px 6px 0px rgba(100,0,0,0.7)' }}>
            ALAMO DRAFTHOUSE
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }} className="text-4xl font-bold text-red-200 mb-12">
            Cinema • Food • No Talking
          </motion.h2>

          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '🎬', label: 'New Releases' },
              { icon: '🍕', label: 'Full Menu' },
              { icon: '🍺', label: 'Craft Beer' },
              { icon: '🤫', label: 'No Talking!' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border-4 border-red-700 shadow-xl">
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-red-700 font-black text-sm uppercase">{item.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-white text-red-700 font-black text-2xl px-16 py-6 rounded-full hover:bg-red-50 transition-all shadow-2xl uppercase">
            Get Tickets
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }} className="mt-12 text-white text-lg">
            📍 Multiple Austin Locations • Born in Austin 1997
          </motion.p>
        </div>
      </section>
    </div>
  );
}
