'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function UchikoPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Sophisticated Japanese Background */}
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          {/* Cherry Blossom Petals */}
          {[...Array(20)].map((_, i) => (
            <motion.div key={i} className="absolute text-4xl" style={{ left: `${Math.random() * 100}%`, top: `${-10 + Math.random() * 110}%` }}
              animate={{
                y: [0, 800],
                x: [0, Math.random() * 100 - 50],
                rotate: [0, 360],
                opacity: [0, 0.6, 0]
              }}
              transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay: i * 0.8 }}>
              🌸
            </motion.div>
          ))}

          {/* Japanese Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <defs>
              <pattern id="japanese-waves" width="120" height="60" patternUnits="userSpaceOnUse">
                <path d="M0 30 Q 30 20, 60 30 T 120 30" fill="none" stroke="white" strokeWidth="2"/>
                <path d="M0 40 Q 30 30, 60 40 T 120 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#japanese-waves)" />
          </svg>
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 1.5, type: 'spring', bounce: 0.3 }} className="mb-12">
            <div className="w-40 h-40 mx-auto bg-gradient-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
              <span className="text-7xl">🌸</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-8xl md:text-9xl font-thin text-white mb-8 tracking-[0.3em]"
            style={{ fontFamily: 'Didot, serif' }}>
            UCHIKO
          </motion.h1>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }} className="h-px w-96 bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto mb-8" />

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }} className="text-3xl font-light text-blue-200 mb-16 tracking-widest"
            style={{ fontFamily: 'Georgia, serif' }}>
            うち子 • Child of Uchi
          </motion.h2>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }} className="bg-black/40 backdrop-blur-md border border-white/30 rounded-sm p-10 mb-12 max-w-2xl mx-auto">
            <p className="text-blue-200 text-2xl font-light italic mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              "Contemporary Japanese with Texas Soul"
            </p>
            <div className="h-px w-32 bg-red-400 mx-auto mb-6"></div>
            <p className="text-white/90 text-lg font-light">
              From Chef Tyson Cole • Sister Restaurant to Uchi
            </p>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }} className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '🍣', label: 'Sushi' },
              { icon: '🥟', label: 'Tastings' },
              { icon: '🍶', label: 'Sake' },
              { icon: '🔥', label: 'Robata' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -8 }}
                className="bg-gradient-to-b from-slate-800 to-slate-900 border border-white/20 p-6 rounded-sm">
                <div className="text-5xl mb-3">{item.icon}</div>
                <p className="text-blue-100 font-light text-sm uppercase tracking-widest">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-red-600 text-white font-light text-lg px-14 py-5 rounded-sm hover:bg-red-500 transition-all uppercase tracking-widest border border-red-500">
            Reserve Table
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }} className="mt-12 text-blue-200 text-sm uppercase tracking-widest">
            📍 4200 N Lamar Blvd • Reservations Recommended
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6 bg-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-5xl font-light mb-12 text-slate-800 tracking-wide"
            style={{ fontFamily: 'Didot, serif' }}>
            THE UCHIKO PHILOSOPHY
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="space-y-6 text-xl font-light leading-relaxed text-slate-700">
            <p>
              Uchiko honors traditional Japanese technique while embracing innovative flavors
              and ingredients from around the world.
            </p>
            <p className="text-2xl text-indigo-700 italic" style={{ fontFamily: 'Georgia, serif' }}>
              "The child grows beyond the parent."
            </p>
            <p>
              Our menu features bold, creative dishes that complement Uchi's offerings while
              establishing Uchiko's own distinctive identity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-5xl font-light text-center mb-16 text-slate-800 tracking-wide"
            style={{ fontFamily: 'Didot, serif' }}>
            SIGNATURE CREATIONS
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Jar Jar Duck', desc: 'Smoked duck, orange, black pepper', category: 'Cold' },
              { name: 'Hama Chili', desc: 'Yellowtail, ponzu, Thai chili', category: 'Maki' },
              { name: 'Uchiko Fried Chicken', desc: 'Sake marinade, Japanese spices', category: 'Hot' },
              { name: 'Brussels Sprouts', desc: 'Lemon, chili, pecorino', category: 'Vegetable' },
              { name: 'Wagyu Tataki', desc: 'Japanese A5, truffle ponzu', category: 'Premium' },
              { name: 'Sake Tasting', desc: 'Curated selection of premium sake', category: 'Pairing' }
            ].map((dish, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="border-b-2 border-slate-200 pb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-light text-slate-800" style={{ fontFamily: 'Georgia, serif' }}>
                    {dish.name}
                  </h3>
                  <span className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full uppercase tracking-wide">
                    {dish.category}
                  </span>
                </div>
                <p className="text-slate-600 font-light">{dish.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-5xl font-light mb-8 tracking-wide"
            style={{ fontFamily: 'Didot, serif' }}>
            THE EXPERIENCE
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="space-y-6 text-lg font-light leading-relaxed text-blue-200">
            <p>
              Uchiko offers an intimate dining experience that balances elegance with
              Austin's relaxed energy.
            </p>
            <p>
              From our chef's tastings to our expansive sake collection, every detail
              is crafted to create an unforgettable evening.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-3 gap-8">
            {[
              { value: 'Chef Tyson Cole', label: 'James Beard Winner' },
              { value: '4200', label: 'N Lamar Location' },
              { value: 'Daily', label: 'Dinner Service' }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-6">
                <p className="text-2xl font-light text-blue-300 mb-2">{item.value}</p>
                <p className="text-sm uppercase tracking-wider text-blue-200/80">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
