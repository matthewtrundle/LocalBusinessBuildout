'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function MattsElRanchoPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-yellow-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400">
        {/* Mexican Pattern Background */}
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} className="absolute text-7xl"
            style={{ left: `${(i * 10) % 100}%`, top: `${(i * 13) % 100}%` }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 8 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}>
            {['🌮', '🌶️', '🫔', '🥑'][i % 4]}
          </motion.div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2 }} className="mb-8">
            <div className="w-44 h-44 mx-auto bg-yellow-400 rounded-full flex items-center justify-center border-8 border-red-600 shadow-2xl">
              <span className="text-8xl">🎉</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-8xl md:text-9xl font-black text-white mb-4 tracking-tight"
            style={{ fontFamily: 'Impact, sans-serif', textShadow: '6px 6px 0px rgba(180,30,20,0.8)' }}>
            MATT'S
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }} className="text-6xl font-black text-yellow-300 mb-12 tracking-wide"
            style={{ fontFamily: 'Impact, sans-serif' }}>
            EL RANCHO
          </motion.h2>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.7 }} className="h-3 w-80 mx-auto mb-8"
            style={{ background: 'repeating-linear-gradient(90deg, #DC2626 0px, #DC2626 40px, #FFF 40px, #FFF 80px, #22C55E 80px, #22C55E 120px)' }} />

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }} className="bg-black/30 backdrop-blur-sm border-4 border-yellow-400 rounded-2xl p-10 mb-12 max-w-3xl mx-auto">
            <h3 className="text-5xl font-black text-yellow-300 mb-4">AUSTIN TRADITION</h3>
            <p className="text-white text-2xl mb-6">
              Family-Owned Tex-Mex Since 1952
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-700/50 border-2 border-yellow-400 rounded-lg p-4">
                <p className="text-yellow-200 text-sm uppercase mb-1">Established</p>
                <p className="text-white text-3xl font-black">1952</p>
              </div>
              <div className="bg-red-700/50 border-2 border-yellow-400 rounded-lg p-4">
                <p className="text-yellow-200 text-sm uppercase mb-1">Generations</p>
                <p className="text-white text-3xl font-black">3rd</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '🍹', label: 'Famous Margaritas' },
              { icon: '🫔', label: 'Bob Armstrong Dip' },
              { icon: '🌮', label: 'Authentic Tacos' },
              { icon: '🎊', label: 'Family Atmosphere' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-white p-6 rounded-2xl border-4 border-red-600 shadow-xl">
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-red-600 font-black text-sm uppercase leading-tight">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="bg-yellow-400 text-red-700 font-black text-2xl px-16 py-6 rounded-full hover:bg-yellow-300 transition-all shadow-2xl border-4 border-red-700 uppercase">
            View Menu
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }} className="mt-12 text-white text-lg">
            📍 2613 S Lamar Blvd • Daily 11 AM - 10 PM
          </motion.p>
        </div>
      </section>

      {/* The Bob Armstrong Dip */}
      <section className="py-24 px-6 bg-gradient-to-br from-yellow-100 to-orange-100">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black mb-8 text-red-700">
            LEGENDARY BOB ARMSTRONG DIP
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="bg-white border-4 border-red-600 rounded-2xl p-10 max-w-3xl mx-auto">
            <div className="text-7xl mb-6">🫔</div>
            <p className="text-2xl text-gray-800 mb-6 leading-relaxed">
              Created in the 1980s and named after Texas Land Commissioner Bob Armstrong,
              this legendary dip has become a Texas icon.
            </p>
            <div className="bg-red-600 text-white p-6 rounded-xl">
              <h3 className="text-3xl font-black mb-4">WHAT'S IN IT?</h3>
              <p className="text-xl">
                Queso • Guacamole • Sour Cream • Seasoned Beef • Served with Fresh Tortilla Chips
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black text-center mb-16 text-red-700">
            TEX-MEX FAVORITES
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Bob Armstrong Dip', price: '$11.95', desc: 'The legendary original', highlight: true },
              { name: 'Enchiladas Verdes', price: '$14.95', desc: 'Green sauce, chicken, cheese' },
              { name: 'Fajitas', price: '$18.95', desc: 'Sizzling beef or chicken' },
              { name: 'Matt\'s Special', price: '$13.95', desc: 'Cheese enchilada, taco, guacamole' },
              { name: 'El Matador Margarita', price: '$9.50', desc: 'Famous frozen margarita' },
              { name: 'Queso Flameado', price: '$10.95', desc: 'Melted cheese with chorizo' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`${item.highlight
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white border-4 border-yellow-400'
                  : 'bg-yellow-50 border-4 border-red-600'
                } rounded-2xl p-6 hover:shadow-2xl transition-shadow`}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className={`text-3xl font-black ${item.highlight ? 'text-yellow-300' : 'text-red-700'}`}>
                    {item.name}
                  </h3>
                  {item.highlight && (
                    <span className="bg-yellow-400 text-red-700 text-xs font-black px-3 py-1 rounded-full">
                      FAMOUS!
                    </span>
                  )}
                </div>
                <p className={`text-lg mb-3 ${item.highlight ? 'text-yellow-100' : 'text-gray-700'}`}>
                  {item.desc}
                </p>
                <p className={`text-3xl font-black ${item.highlight ? 'text-yellow-300' : 'text-red-600'}`}>
                  {item.price}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Austin Legacy */}
      <section className="py-24 px-6 bg-gradient-to-br from-red-700 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-5xl font-black mb-8">
            70+ YEARS OF AUSTIN HISTORY
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="space-y-6 text-xl leading-relaxed">
            <p>
              Since 1952, Matt's El Rancho has been serving Austin families authentic
              Tex-Mex in the same South Lamar location.
            </p>
            <p className="text-2xl text-yellow-300 font-bold">
              Three generations. One timeless recipe.
            </p>
            <p>
              From creating the legendary Bob Armstrong Dip to serving our famous margaritas,
              Matt's has been an Austin institution for over seven decades.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-3 gap-8">
            {[
              { value: '1952', label: 'Founded' },
              { value: '3rd Gen', label: 'Family Owned' },
              { value: '70+', label: 'Years Strong' }
            ].map((stat, i) => (
              <div key={i} className="bg-yellow-400/20 backdrop-blur-sm border-2 border-yellow-400 rounded-xl p-6">
                <p className="text-5xl font-black text-yellow-300 mb-2">{stat.value}</p>
                <p className="text-sm uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
