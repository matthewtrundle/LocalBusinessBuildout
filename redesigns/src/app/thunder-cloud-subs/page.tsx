'use client';

import { motion } from 'framer-motion';

export default function ThunderCloudSubsPage() {
  return (
    <div className="min-h-screen bg-blue-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-700 via-cyan-600 to-teal-500">
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} className="absolute text-7xl" style={{ left: `${(i * 10) % 100}%`, top: `${(i * 11) % 100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 7 + i, repeat: Infinity, delay: i * 0.4 }}>
            {['🥪', '⚡', '☁️'][i % 3]}
          </motion.div>
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} className="mb-10">
            <div className="w-44 h-44 mx-auto bg-cyan-500 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <span className="text-8xl">⚡</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-7xl font-black text-white mb-6" style={{ textShadow: '5px 5px 0px rgba(30,80,120,0.7)' }}>
            THUNDERCLOUD SUBS
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-cyan-200 mb-12">
            Fresh Subs • Austin Born 1975
          </motion.h2>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="bg-white text-blue-700 font-black text-2xl px-16 py-6 rounded-full hover:bg-cyan-50 transition-all shadow-2xl uppercase">
            Order Online
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-12 text-white text-lg">
            📍 Multiple Austin Locations • Since 1975
          </motion.p>
        </div>
      </section>
    </div>
  );
}
