'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HopsAndGrainPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-green-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-800 via-lime-700 to-yellow-600">
        {/* Floating Hops */}
        {[...Array(12)].map((_, i) => (
          <motion.div key={i} className="absolute text-6xl"
            style={{ left: `${(i * 8) % 100}%`, top: `${(i * 9) % 100}%` }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 9 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}>
            🌿
          </motion.div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 1.2 }} className="mb-10">
            <div className="w-44 h-44 mx-auto bg-lime-500 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <span className="text-8xl">🍺</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tight"
            style={{ fontFamily: 'Impact, sans-serif', textShadow: '5px 5px 0px rgba(50,100,30,0.8)' }}>
            HOPS & GRAIN
          </motion.h1>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }} className="h-3 w-80 bg-lime-600 mx-auto mb-8" />

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }} className="text-4xl font-bold text-lime-200 mb-12 tracking-wide">
            Handcrafted Small-Batch Beer
          </motion.h2>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }} className="bg-black/40 backdrop-blur-md border-4 border-lime-500 rounded-2xl p-10 mb-12 max-w-3xl mx-auto">
            <h3 className="text-5xl font-black text-lime-300 mb-4">SUSTAINABLE BREWING</h3>
            <p className="text-green-200 text-2xl mb-6">
              100% Renewable Energy • Locally Sourced
            </p>
            <div className="grid grid-cols-3 gap-4">
              {['Small Batch', 'Eco-Friendly', 'Austin Born'].map((tag, i) => (
                <div key={i} className="bg-green-800/50 border-2 border-lime-400 rounded-lg p-3">
                  <p className="text-white font-bold text-sm">{tag}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }} className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '🌿', label: 'Fresh Hops', color: 'from-green-500 to-lime-500' },
              { icon: '🌾', label: 'Local Grain', color: 'from-yellow-500 to-amber-500' },
              { icon: '♻️', label: 'Sustainable', color: 'from-emerald-500 to-green-600' },
              { icon: '🍺', label: 'Craft Beer', color: 'from-orange-500 to-amber-600' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.08 }}
                className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl border-4 border-white shadow-xl`}>
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-white font-black text-sm uppercase">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-lime-600 text-white font-black text-2xl px-16 py-6 rounded-full hover:bg-lime-500 transition-all shadow-2xl border-4 border-white uppercase">
            Visit Taproom
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }} className="mt-12 text-white text-lg">
            📍 507 Calles St #101 • Thu-Sun Taproom Hours
          </motion.p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black mb-8 text-green-800">
            BREWING WITH PURPOSE
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="space-y-6 text-xl leading-relaxed text-gray-700">
            <p>
              At Hops & Grain, we believe great beer starts with great ingredients
              and a commitment to sustainability.
            </p>
            <p className="text-2xl text-green-700 font-bold">
              100% renewable energy. Zero waste to landfill.
            </p>
            <p>
              Every batch is small, every ingredient is local when possible, and
              every decision considers our impact on the planet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Lineup */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-100 to-lime-100">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black text-center mb-16 text-green-900">
            FLAGSHIP BEERS
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Alt-eration', desc: 'German-style amber ale, balanced and smooth', abv: '5.5% ABV' },
              { name: 'Pale Dog', desc: 'American pale ale, citrusy and refreshing', abv: '5.4% ABV' },
              { name: 'The One They Call Zoe', desc: 'Robust porter with chocolate notes', abv: '5.6% ABV' },
              { name: 'Greenhouse IPA', desc: 'Hoppy IPA with tropical fruit flavors', abv: '6.8% ABV' }
            ].map((beer, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border-4 border-green-600 rounded-2xl p-6 hover:shadow-2xl transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-3xl font-black text-green-900">{beer.name}</h3>
                  <span className="bg-lime-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {beer.abv}
                  </span>
                </div>
                <p className="text-gray-700 text-lg">{beer.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-800 to-lime-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-5xl font-black mb-12">
            GREEN BREWING
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: '100%', subtitle: 'Renewable Energy', icon: '⚡' },
              { title: 'Zero', subtitle: 'Waste to Landfill', icon: '♻️' },
              { title: 'Local', subtitle: 'Ingredients First', icon: '🌾' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="bg-white/10 backdrop-blur-md border-2 border-lime-400 rounded-xl p-8">
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-4xl font-black text-lime-300 mb-2">{item.title}</h3>
                <p className="text-green-200">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
