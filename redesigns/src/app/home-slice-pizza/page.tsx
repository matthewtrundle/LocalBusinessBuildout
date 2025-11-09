'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HomeSlicePizzaPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-yellow-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400">
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} className="absolute text-7xl" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ rotate: 360, y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, delay: i * 0.5 }}>
            🍕
          </motion.div>
        ))}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.h1 initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}
            className="text-8xl md:text-9xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: 'Impact, sans-serif', textShadow: '8px 8px 0px rgba(0,0,0,0.3)' }}>
            HOME SLICE
          </motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="h-3 w-96 mx-auto mb-6" style={{ background: 'repeating-linear-gradient(90deg, #DC2626 0px, #DC2626 30px, #FFF 30px, #FFF 60px)' }} />
          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-5xl font-black text-white mb-12 tracking-wide" style={{ fontFamily: 'Impact, sans-serif' }}>
            NEW YORK STYLE PIZZA
          </motion.h2>
          <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-2xl text-white font-bold mb-16">
            South Congress Avenue • Since 2005
          </motion.p>
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            {[{ icon: '🍕', label: 'By The Slice' }, { icon: '🍺', label: 'Cold Beer' }, { icon: '🌶️', label: 'Hot Wings' }, { icon: '🎉', label: 'Late Night' }].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-white p-6 rounded-2xl border-4 border-red-600 shadow-xl">
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-red-600 font-black text-lg uppercase">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="bg-white text-red-600 font-black text-2xl px-16 py-6 rounded-full hover:scale-105 transition-transform shadow-2xl border-4 border-red-800 uppercase">
            Order Now
          </motion.button>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            className="mt-12 text-white text-lg">
            📍 1415 S Congress Ave • Sun-Thu 11AM-11PM • Fri-Sat 11AM-Midnight
          </motion.p>
        </div>
      </section>
    </div>
  );
}
