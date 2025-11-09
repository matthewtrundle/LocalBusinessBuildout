'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function KerbeyLaneCafePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-yellow-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-400 via-yellow-400 to-amber-300">
        {/* Floating Food Icons */}
        {[...Array(12)].map((_, i) => (
          <motion.div key={i} className="absolute text-6xl"
            style={{ left: `${(i * 8) % 100}%`, top: `${(i * 13) % 100}%` }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 6 + i * 0.8, repeat: Infinity, delay: i * 0.4 }}>
            {['🥞', '🍳', '☕', '🧇', '🥓', '🍞'][i % 6]}
          </motion.div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, type: 'spring' }} className="mb-8">
            <div className="w-40 h-40 mx-auto bg-white rounded-full flex items-center justify-center border-8 border-orange-500 shadow-2xl">
              <span className="text-7xl">🌙</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-8xl md:text-9xl font-black text-white mb-4 tracking-tight"
            style={{ fontFamily: 'Arial Black, sans-serif', textShadow: '6px 6px 0px rgba(200,80,20,0.7)' }}>
            KERBEY LANE
          </motion.h1>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-3 w-72 bg-orange-600 mx-auto mb-6" />

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }} className="text-5xl font-black text-white mb-8 tracking-wide"
            style={{ fontFamily: 'Arial, sans-serif' }}>
            CAFE
          </motion.h2>

          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }} className="bg-white/20 backdrop-blur-md border-4 border-white rounded-2xl p-8 mb-12 max-w-3xl mx-auto">
            <h3 className="text-5xl font-black text-white mb-3">OPEN 24/7</h3>
            <p className="text-white text-2xl font-bold">
              Austin's Favorite Since 1980
            </p>
            <p className="text-orange-100 text-lg mt-4">
              Breakfast All Day • Every Day • Any Time
            </p>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            {[
              { icon: '🥞', label: 'Famous Pancakes', color: 'from-yellow-400 to-amber-500' },
              { icon: '🌱', label: 'Veggie Options', color: 'from-green-400 to-emerald-500' },
              { icon: '🍳', label: 'All-Day Breakfast', color: 'from-orange-400 to-red-500' },
              { icon: '🌮', label: 'Austin Tacos', color: 'from-yellow-500 to-orange-600' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.08, rotate: 3 }}
                className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl border-4 border-white shadow-xl`}>
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-white font-black text-sm uppercase leading-tight">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }} className="space-y-4">
            <div className="bg-white/30 backdrop-blur-sm border-2 border-white rounded-xl p-6 max-w-xl mx-auto">
              <h4 className="text-2xl font-black text-white mb-3">SIGNATURE QUESO 🧀</h4>
              <p className="text-white text-lg">
                The Original Kerbey Queso - Austin's Most Famous Dip Since 1980
              </p>
            </div>
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-12 bg-white text-orange-600 font-black text-2xl px-16 py-6 rounded-full hover:bg-orange-50 transition-all shadow-2xl border-4 border-orange-700 uppercase">
            View Menu
          </motion.button>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }} className="mt-12 text-white">
            <p className="text-xl font-bold mb-2">📍 Multiple Austin Locations</p>
            <p className="text-lg">Open 24 Hours • 7 Days a Week</p>
            <p className="text-sm mt-3 text-orange-100">Family-Owned • Locally Sourced • Austin Since 1980</p>
          </motion.div>
        </div>

        {/* Bottom Glow */}
        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-orange-600/40 to-transparent" />
      </section>

      {/* Menu Highlights */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black text-center mb-16 text-orange-600">
            MENU FAVORITES
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Pancakes', desc: 'Fluffy buttermilk stacks with real maple syrup', price: '$9.95', emoji: '🥞' },
              { name: 'Kerbey Queso', desc: 'Our legendary cheese dip with chips', price: '$7.95', emoji: '🧀' },
              { name: 'Veggie Royale', desc: 'Plant-based burger with avocado', price: '$12.95', emoji: '🌱' },
              { name: 'Breakfast Tacos', desc: 'Austin-style with fresh tortillas', price: '$3.50 each', emoji: '🌮' },
              { name: 'Migas', desc: 'Scrambled eggs, tortilla chips, cheese', price: '$10.95', emoji: '🍳' },
              { name: 'Belgian Waffle', desc: 'Crispy outside, fluffy inside perfection', price: '$9.95', emoji: '🧇' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 border-4 border-orange-300 rounded-2xl p-6 hover:shadow-2xl transition-shadow">
                <div className="text-6xl mb-4">{item.emoji}</div>
                <h3 className="text-3xl font-black text-orange-700 mb-2">{item.name}</h3>
                <p className="text-gray-700 mb-4">{item.desc}</p>
                <p className="text-2xl font-black text-orange-600">{item.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Austin Legacy */}
      <section className="py-24 px-6 bg-gradient-to-br from-orange-600 to-yellow-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-5xl font-black mb-8">
            AN AUSTIN TRADITION
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="space-y-6 text-xl leading-relaxed">
            <p>
              Since 1980, Kerbey Lane Cafe has been serving Austin with fresh,
              locally-sourced ingredients and a commitment to the community.
            </p>
            <p className="text-2xl font-bold text-yellow-100">
              Whether it's 3 AM or 3 PM, we're here for you.
            </p>
            <p>
              From our famous pancakes to our legendary queso, every dish is made
              with love and served with a smile. That's the Kerbey Lane way.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { label: 'Years Serving Austin', value: '44+' },
              { label: 'Locations', value: '5' },
              { label: 'Hours Open', value: '24/7' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <p className="text-5xl font-black text-yellow-200">{stat.value}</p>
                <p className="text-sm uppercase mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
