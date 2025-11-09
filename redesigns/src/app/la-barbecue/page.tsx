'use client';

import { motion } from 'framer-motion';

export default function LaBarbecuePage() {
  return (
    <div className="min-h-screen bg-orange-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-800 via-orange-700 to-amber-600">
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white/10 blur-3xl"
            style={{ width: `${200 + i * 80}px`, height: `${200 + i * 80}px`, left: `${15 + i * 12}%`, top: `${20 + i * 10}%` }}
            animate={{ y: [0, -50, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, delay: i * 1 }} />
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} className="mb-10">
            <div className="w-44 h-44 mx-auto bg-red-700 rounded-full flex items-center justify-center border-8 border-amber-500 shadow-2xl">
              <span className="text-8xl">🔥</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-8xl font-black text-amber-100 mb-6" style={{ textShadow: '5px 5px 0px rgba(100,30,10,0.8)' }}>
            LA BARBECUE
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-orange-200 mb-12">
            East Austin BBQ Excellence
          </motion.h2>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="bg-amber-500 text-red-900 font-black text-2xl px-16 py-6 rounded-full hover:bg-amber-400 transition-all shadow-2xl uppercase">
            Order Now
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-12 text-white text-lg">
            📍 2401 E Cesar Chavez St
          </motion.p>
        </div>
      </section>
    </div>
  );
}
