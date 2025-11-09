'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function LiveOakBrewingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-amber-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-800 via-yellow-700 to-orange-600">
        {/* Floating Oak Leaves */}
        {[...Array(15)].map((_, i) => (
          <motion.div key={i} className="absolute text-6xl"
            style={{ left: `${(i * 7) % 100}%`, top: `${(i * 11) % 100}%` }}
            animate={{
              y: [0, -35, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10 + i * 0.8, repeat: Infinity, delay: i * 0.4 }}>
            🍂
          </motion.div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 1.2, type: 'spring' }} className="mb-10">
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <span className="text-9xl">🌳</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-8xl md:text-9xl font-black text-white mb-6 tracking-tight"
            style={{ fontFamily: 'Arial Black, sans-serif', textShadow: '5px 5px 0px rgba(100,50,0,0.8)' }}>
            LIVE OAK
          </motion.h1>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }} className="h-3 w-72 bg-orange-700 mx-auto mb-6" />

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }} className="text-5xl font-bold text-amber-200 mb-16 tracking-wide">
            BREWING COMPANY
          </motion.h2>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }} className="bg-black/40 backdrop-blur-md border-4 border-amber-500 rounded-2xl p-10 mb-12 max-w-3xl mx-auto">
            <h3 className="text-5xl font-black text-amber-200 mb-4">GERMAN LAGER TRADITION</h3>
            <p className="text-orange-200 text-2xl mb-6">
              Austin's Original Craft Brewery • Since 1997
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-amber-800/50 border-2 border-amber-400 rounded-lg p-4">
                <p className="text-6xl mb-2">🍺</p>
                <p className="text-white font-bold text-sm">Traditional</p>
              </div>
              <div className="bg-amber-800/50 border-2 border-amber-400 rounded-lg p-4">
                <p className="text-6xl mb-2">🌳</p>
                <p className="text-white font-bold text-sm">Oak Aged</p>
              </div>
              <div className="bg-amber-800/50 border-2 border-amber-400 rounded-lg p-4">
                <p className="text-6xl mb-2">🎯</p>
                <p className="text-white font-bold text-sm">Craft Focus</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }} className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '🍺', label: 'Pilz', color: 'from-yellow-400 to-amber-500' },
              { icon: '🥨', label: 'Hefeweizen', color: 'from-orange-400 to-orange-600' },
              { icon: '🌰', label: 'Big Bark', color: 'from-amber-600 to-orange-700' },
              { icon: '🍃', label: 'Seasonal', color: 'from-green-600 to-emerald-700' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.08, rotate: 3 }}
                className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl border-4 border-white shadow-xl`}>
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-white font-black text-sm uppercase">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-orange-700 text-white font-black text-2xl px-16 py-6 rounded-full hover:bg-orange-600 transition-all shadow-2xl border-4 border-amber-400 uppercase">
            Visit Taproom
          </motion.button>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }} className="mt-12 text-white">
            <p className="text-xl font-bold mb-2">📍 1615 Crozier Ln</p>
            <p className="text-lg">Taproom: Thu-Sun • Tours Available</p>
            <p className="text-sm mt-3 text-amber-200">Austin's First Craft Brewery</p>
          </motion.div>
        </div>

        {/* Bottom Glow */}
        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-orange-900/60 to-transparent" />
      </section>

      {/* Brewing Process */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black text-center mb-16 text-amber-800">
            GERMAN LAGER TRADITION
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} className="space-y-6 text-lg leading-relaxed text-gray-700">
              <p>
                Since 1997, Live Oak has been brewing authentic German-style lagers
                using traditional methods and the finest ingredients.
              </p>
              <p className="text-2xl text-amber-700 font-bold">
                Slow-fermented. Naturally carbonated. Worth the wait.
              </p>
              <p>
                Our flagship Pilz and award-winning HefeWeizen showcase our commitment
                to brewing excellence and traditional German craftsmanship.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} className="grid grid-cols-2 gap-6">
              {[
                { title: 'Traditional', subtitle: 'German Methods', icon: '🍺' },
                { title: 'Lagered', subtitle: 'Slow Fermented', icon: '⏱️' },
                { title: 'Natural', subtitle: 'No Shortcuts', icon: '🌿' },
                { title: 'Quality', subtitle: 'Every Batch', icon: '✨' }
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-amber-100 to-orange-100 border-4 border-amber-600 rounded-xl p-6 text-center">
                  <div className="text-5xl mb-3">{item.icon}</div>
                  <p className="text-amber-900 font-black text-lg mb-1">{item.title}</p>
                  <p className="text-gray-600 text-sm">{item.subtitle}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Beers */}
      <section className="py-24 px-6 bg-amber-100">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black text-center mb-16 text-amber-900">
            YEAR-ROUND BEERS
          </motion.h2>

          <div className="space-y-6">
            {[
              { name: 'Pilz', desc: 'Czech-style pilsner with noble hops', abv: '4.7% ABV', highlight: true },
              { name: 'HefeWeizen', desc: 'Bavarian wheat beer with banana and clove', abv: '5.3% ABV' },
              { name: 'Big Bark', desc: 'Amber lager with toasted malt character', abv: '5.5% ABV' },
              { name: 'Primus', desc: 'German-style pilsner, crisp and clean', abv: '5.3% ABV' },
              { name: 'Seasonal Releases', desc: 'Rotating selection throughout the year', abv: 'Varies' }
            ].map((beer, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`${beer.highlight
                  ? 'bg-gradient-to-r from-amber-700 to-orange-700 text-white border-4 border-yellow-400'
                  : 'bg-white border-4 border-amber-700'
                } rounded-2xl p-6 flex justify-between items-center hover:shadow-2xl transition-shadow`}>
                <div>
                  <h3 className={`text-3xl font-black mb-2 ${beer.highlight ? 'text-yellow-300' : 'text-amber-900'}`}>
                    {beer.name}
                  </h3>
                  <p className={`text-lg ${beer.highlight ? 'text-orange-200' : 'text-gray-700'}`}>
                    {beer.desc}
                  </p>
                </div>
                <p className={`text-2xl font-black ${beer.highlight ? 'text-yellow-300' : 'text-amber-700'}`}>
                  {beer.abv}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Austin Legacy */}
      <section className="py-24 px-6 bg-gradient-to-br from-amber-900 to-orange-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-5xl font-black mb-8">
            AUSTIN'S ORIGINAL CRAFT BREWERY
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="space-y-6 text-xl leading-relaxed">
            <p>
              Founded in 1997, Live Oak was the first craft brewery in Austin to focus
              exclusively on traditional German-style lagers.
            </p>
            <p className="text-2xl text-amber-300 font-bold italic">
              "Patience makes perfect beer."
            </p>
            <p>
              While others rush to market, we take our time - lagering our beers for weeks
              to develop the clean, crisp flavors that German lagers are famous for.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-3 gap-8">
            {[
              { value: '1997', label: 'Founded' },
              { value: 'First', label: 'Craft in Austin' },
              { value: '100%', label: 'Lagers' }
            ].map((stat, i) => (
              <div key={i} className="bg-black/30 backdrop-blur-sm border-2 border-amber-500 rounded-xl p-6">
                <p className="text-5xl font-black text-amber-300 mb-2">{stat.value}</p>
                <p className="text-sm uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
