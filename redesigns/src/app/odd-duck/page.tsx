'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function OddDuckPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-green-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Organic Farm Background */}
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-green-600 to-lime-600">
          {/* Floating Vegetables */}
          {[...Array(15)].map((_, i) => (
            <motion.div key={i} className="absolute text-6xl"
              style={{ left: `${(i * 7) % 100}%`, top: `${(i * 11) % 100}%` }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 8 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}>
              {['🥬', '🥕', '🥒', '🍅', '🌿', '🥦'][i % 6]}
            </motion.div>
          ))}

          {/* Textured Overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)`
            }} />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 1.2, type: 'spring', bounce: 0.5 }} className="mb-10">
            <div className="w-48 h-48 mx-auto bg-amber-500 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <span className="text-9xl">🦆</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-8xl md:text-9xl font-black text-white mb-6 tracking-tight"
            style={{ fontFamily: 'Arial Black, sans-serif', textShadow: '5px 5px 0px rgba(20,80,30,0.8)' }}>
            ODD DUCK
          </motion.h1>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }} className="h-2 w-72 bg-amber-500 mx-auto mb-8" />

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }} className="text-4xl font-bold text-green-100 mb-12 tracking-wide">
            Farm-to-Trailer Cuisine
          </motion.h2>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }} className="bg-black/40 backdrop-blur-md border-4 border-white rounded-2xl p-10 mb-12 max-w-3xl mx-auto">
            <h3 className="text-5xl font-black text-white mb-4">FRESH • LOCAL • SEASONAL</h3>
            <p className="text-green-200 text-2xl mb-6">
              Menu Changes Daily Based on Market Availability
            </p>
            <div className="grid grid-cols-3 gap-4">
              {['Farm Fresh', 'Locally Sourced', 'Chef-Driven'].map((tag, i) => (
                <div key={i} className="bg-green-700/50 border-2 border-green-300 rounded-lg p-3">
                  <p className="text-white font-bold text-sm">{tag}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }} className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: '🌱', title: 'Organic', desc: 'Sustainable Farming' },
              { icon: '🚜', title: 'Local', desc: 'Texas Farmers' },
              { icon: '👨‍🍳', title: 'Crafted', desc: 'Artisan Dishes' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.08, rotate: 3 }}
                className="bg-white/90 backdrop-blur-sm border-4 border-green-600 p-8 rounded-2xl shadow-xl">
                <div className="text-6xl mb-3">{item.icon}</div>
                <h4 className="text-3xl font-black text-green-800 mb-2">{item.title}</h4>
                <p className="text-gray-700 text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-amber-500 text-white font-black text-2xl px-16 py-6 rounded-full hover:bg-amber-400 transition-all shadow-2xl border-4 border-white uppercase">
            See Today's Menu
          </motion.button>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }} className="mt-12 text-white">
            <p className="text-xl font-bold mb-2">📍 1201 S Lamar Blvd</p>
            <p className="text-lg">Wed-Sun 11 AM - 9 PM • Outdoor Seating</p>
            <p className="text-sm mt-3 text-green-200">Voted Best Food Trailer • Austin Chronicle</p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black mb-8 text-green-800">
            OUR PHILOSOPHY
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="space-y-6 text-xl leading-relaxed text-gray-700">
            <p>
              At Odd Duck, we believe that the best food starts with the best ingredients.
              That's why we work directly with local farmers and ranchers to source everything fresh.
            </p>
            <p className="text-2xl text-green-700 font-bold italic">
              "Our menu changes daily - because nature doesn't repeat itself."
            </p>
            <p>
              From farm to trailer to table, every dish is crafted with care, creativity,
              and a deep respect for the ingredients and the people who grow them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sample Menu */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-100 to-lime-100">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black text-center mb-4 text-green-900">
            SAMPLE DISHES
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="text-center text-gray-600 mb-16 text-lg italic">
            Menu changes daily based on seasonal availability
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Roasted Beet Salad', desc: 'Local greens, goat cheese, candied pecans', season: '🍂 Fall' },
              { name: 'Duck Confit Tacos', desc: 'Heritage duck, pickled vegetables, aioli', season: '⭐ Signature' },
              { name: 'Grilled Octopus', desc: 'Gulf octopus, charred lemon, herbs', season: '🌊 Fresh' },
              { name: 'Pork Belly Sliders', desc: 'Texas pork, house pickles, brioche', season: '🔥 Popular' },
              { name: 'Seasonal Vegetables', desc: 'Chef\'s selection from this week\'s market', season: '🌱 Weekly' },
              { name: 'House-Made Desserts', desc: 'Rotating selection of sweet endings', season: '🍰 Daily' }
            ].map((dish, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border-4 border-green-600 rounded-2xl p-6 hover:shadow-2xl transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-3xl font-black text-green-900">{dish.name}</h3>
                  <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {dish.season}
                  </span>
                </div>
                <p className="text-gray-700 text-lg">{dish.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-800 to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-5xl font-black mb-12">
            RECOGNIZED EXCELLENCE
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { award: 'Best Food Trailer', source: 'Austin Chronicle', year: '2023' },
              { award: 'Farm-to-Table Leader', source: 'Eater Austin', year: '2022' },
              { award: 'Top 10 Restaurants', source: 'Bon Appétit', year: '2021' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="bg-white/10 backdrop-blur-md border-2 border-green-400 rounded-xl p-6">
                <div className="text-5xl mb-3">🏆</div>
                <h3 className="text-2xl font-black text-green-200 mb-2">{item.award}</h3>
                <p className="text-green-300 mb-1">{item.source}</p>
                <p className="text-sm text-green-400">{item.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
