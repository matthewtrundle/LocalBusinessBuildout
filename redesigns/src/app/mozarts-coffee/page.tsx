'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function MozartsCoffeePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700">
          {[...Array(6)].map((_, i) => (
            <motion.div key={i} className="absolute text-6xl" style={{ left: `${10 + i * 15}%`, top: `${20 + i * 10}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 8 + i, repeat: Infinity, delay: i }}>
              🎵
            </motion.div>
          ))}
        </motion.div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} className="mb-8">
            <div className="w-32 h-32 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/50">
              <span className="text-6xl">☕</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-7xl md:text-9xl font-thin text-white mb-6 tracking-widest" style={{ fontFamily: 'Georgia, serif' }}>
            MOZART'S
          </motion.h1>
          <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-3xl text-blue-100 mb-16 italic">
            Coffee Roasters on Lake Austin
          </motion.p>
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}
            className="grid md:grid-cols-3 gap-8 mb-12">
            {[{ icon: '🌊', label: 'Lakeside Views' }, { icon: '🎼', label: 'Live Music' }, { icon: '☕', label: 'Fresh Roasted' }].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/30">
                <div className="text-5xl mb-3">{item.icon}</div>
                <p className="text-white font-bold text-lg">{item.label}</p>
              </div>
            ))}
          </motion.div>
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="bg-white text-indigo-900 font-bold text-xl px-14 py-5 rounded-full hover:bg-blue-50 transition-all">
            Visit Lakeside
          </motion.button>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="mt-12 text-blue-100 text-sm">
            3825 Lake Austin Blvd • (512) 477-2900 • Open Daily 7AM-Midnight
          </motion.p>
        </div>
      </section>
    </div>
  );
}
