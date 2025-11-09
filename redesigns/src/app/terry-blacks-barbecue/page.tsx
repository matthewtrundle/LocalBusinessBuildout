'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function TerryBlacksBarbecuePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-orange-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-800 via-orange-700 to-red-800">
        {[...Array(5)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white/10 blur-3xl"
            style={{ width: `${250 + i * 80}px`, height: `${250 + i * 80}px`, left: `${15 + i * 18}%`, top: `${25 + i * 12}%` }}
            animate={{ y: [0, -40, 0], opacity: [0.1, 0.3, 0.1], scale: [1, 1.15, 1] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, delay: i * 1.2 }} />
        ))}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1 }} className="mb-8">
            <div className="w-36 h-36 mx-auto bg-red-700 rounded-full flex items-center justify-center border-8 border-amber-400">
              <span className="text-6xl">🔥</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-7xl md:text-9xl font-black text-amber-100 mb-4 tracking-tight" style={{ fontFamily: 'Georgia, serif', textShadow: '4px 4px 0px rgba(120,30,12,0.8)' }}>
            TERRY BLACK'S
          </motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5 }} className="h-2 w-64 bg-red-600 mx-auto mb-4" />
          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-4xl font-bold text-amber-200 mb-12 tracking-widest" style={{ fontFamily: 'Georgia, serif' }}>
            BARBECUE
          </motion.h2>
          <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-2xl text-amber-100 mb-16 italic">
            "Serving Austin Since 2014"
          </motion.p>
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}
            className="bg-black/30 backdrop-blur-sm border-4 border-amber-600 rounded-lg p-8 mb-12 max-w-2xl mx-auto">
            <h3 className="text-4xl font-black text-amber-100 mb-4">FAMILY TRADITION</h3>
            <p className="text-amber-200 text-xl">
              Four generations of Texas BBQ expertise, passed down from grandfather to grandson
            </p>
          </motion.div>
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12">
            {[{ title: 'Brisket', price: '$18/lb' }, { title: 'Ribs', price: '$26/lb' }, { title: 'Sausage', price: '$12/lb' }].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border-2 border-amber-500">
                <h4 className="text-3xl font-black text-amber-100 mb-2">{item.title}</h4>
                <p className="text-amber-300 text-2xl font-bold">{item.price}</p>
              </div>
            ))}
          </motion.div>
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            className="bg-red-700 text-white font-black text-xl px-14 py-5 rounded-full hover:bg-red-600 transition-all shadow-2xl border-4 border-amber-500 uppercase">
            View Full Menu
          </motion.button>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
            className="mt-12 text-amber-100">
            📍 1003 Barton Springs Rd • Daily 11AM until sold out
          </motion.p>
        </div>
      </section>
    </div>
  );
}
