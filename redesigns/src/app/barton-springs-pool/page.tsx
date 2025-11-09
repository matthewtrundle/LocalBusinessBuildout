'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function BartonSpringsPoolPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-cyan-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Water Background */}
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-500 to-teal-600">
          {/* Water Ripples */}
          {[...Array(6)].map((_, i) => (
            <motion.div key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/20"
              style={{ width: `${300 + i * 150}px`, height: `${300 + i * 150}px` }}
              animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.7 }} />
          ))}

          {/* Floating Elements */}
          {[...Array(10)].map((_, i) => (
            <motion.div key={i} className="absolute text-5xl"
              style={{ left: `${(i * 10) % 100}%`, top: `${(i * 15) % 100}%` }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.5 }}>
              {['💧', '🌊', '🏊'][i % 3]}
            </motion.div>
          ))}
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 1.3, type: 'spring' }} className="mb-10">
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <span className="text-9xl">🏊</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-7xl md:text-9xl font-black text-white mb-6 tracking-tight"
            style={{ fontFamily: 'Arial Black, sans-serif', textShadow: '6px 6px 0px rgba(20,80,120,0.8)' }}>
            BARTON SPRINGS
          </motion.h1>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }} className="h-3 w-96 bg-cyan-400 mx-auto mb-8" />

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }} className="text-5xl font-bold text-cyan-200 mb-16 tracking-wide">
            NATURAL SPRING-FED POOL
          </motion.h2>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }} className="bg-black/30 backdrop-blur-md border-4 border-cyan-400 rounded-2xl p-10 mb-12 max-w-3xl mx-auto">
            <h3 className="text-5xl font-black text-cyan-200 mb-4">AUSTIN'S CROWN JEWEL</h3>
            <p className="text-blue-200 text-2xl mb-6">
              68-70°F Year-Round • Naturally Filtered Spring Water
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-cyan-700/50 border-2 border-cyan-300 rounded-lg p-4">
                <p className="text-cyan-200 text-sm uppercase mb-1">Length</p>
                <p className="text-white text-3xl font-black">3 Acres</p>
              </div>
              <div className="bg-cyan-700/50 border-2 border-cyan-300 rounded-lg p-4">
                <p className="text-cyan-200 text-sm uppercase mb-1">Flow Rate</p>
                <p className="text-white text-3xl font-black">35M gal/day</p>
              </div>
              <div className="bg-cyan-700/50 border-2 border-cyan-300 rounded-lg p-4">
                <p className="text-cyan-200 text-sm uppercase mb-1">Depth</p>
                <p className="text-white text-3xl font-black">18 ft</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }} className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '🏊', label: 'Natural Pool', color: 'from-cyan-400 to-blue-500' },
              { icon: '🌿', label: 'Eco System', color: 'from-green-400 to-emerald-500' },
              { icon: '🌡️', label: '68-70°F', color: 'from-blue-400 to-cyan-500' },
              { icon: '🦎', label: 'Salamanders', color: 'from-teal-400 to-cyan-500' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.08 }}
                className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl border-4 border-white shadow-xl`}>
                <div className="text-6xl mb-2">{item.icon}</div>
                <p className="text-white font-black text-sm uppercase">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-cyan-500 text-white font-black text-2xl px-16 py-6 rounded-full hover:bg-cyan-400 transition-all shadow-2xl border-4 border-white uppercase">
            Plan Your Visit
          </motion.button>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }} className="mt-12 text-white">
            <p className="text-xl font-bold mb-2">📍 Zilker Park, 2131 William Barton Dr</p>
            <p className="text-lg">Daily 5 AM - 10 PM • $9 Adults / $5 Youth</p>
            <p className="text-sm mt-3 text-cyan-200">Home to the Endangered Barton Springs Salamander</p>
          </motion.div>
        </div>
      </section>

      {/* The Spring */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black mb-8 text-cyan-800">
            A NATURAL WONDER
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="space-y-6 text-xl leading-relaxed text-gray-700">
            <p>
              Barton Springs Pool is fed by underground springs from the Edwards Aquifer,
              maintaining a constant temperature of 68-70°F year-round.
            </p>
            <p className="text-2xl text-cyan-700 font-bold italic">
              "The soul of Austin" - locals
            </p>
            <p>
              This three-acre pool flows at a rate of 35 million gallons per day,
              creating a pristine natural swimming experience beloved by Austinites for generations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visitor Info */}
      <section className="py-24 px-6 bg-gradient-to-br from-cyan-100 to-blue-100">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black text-center mb-16 text-cyan-900">
            VISITOR INFORMATION
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Hours', info: 'Daily 5 AM - 10 PM (Winter Hours Vary)', icon: '🕐' },
              { title: 'Admission', info: '$9 Adults / $5 Youth & Seniors / Free Under 1', icon: '💵' },
              { title: 'Temperature', info: '68-70°F Year-Round - Perfect for Swimming', icon: '🌡️' },
              { title: 'Amenities', info: 'Changing Rooms, Showers, Lawn for Picnicking', icon: '🏖️' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border-4 border-cyan-600 rounded-2xl p-8 hover:shadow-2xl transition-shadow">
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-3xl font-black text-cyan-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 text-lg">{item.info}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conservation */}
      <section className="py-24 px-6 bg-gradient-to-br from-cyan-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-5xl font-black mb-12">
            PROTECTING A TREASURE
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="space-y-6 text-xl leading-relaxed">
            <p>
              Barton Springs is home to the endangered Barton Springs Salamander,
              found nowhere else on Earth.
            </p>
            <p className="text-2xl text-cyan-300 font-bold">
              Every visit supports conservation efforts.
            </p>
            <p>
              The pool is maintained with minimal chemicals to protect the delicate
              ecosystem while ensuring safe swimming for all.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-3 gap-8">
            {[
              { value: '3 Acres', label: 'Pool Size' },
              { value: '35M gal', label: 'Daily Flow' },
              { value: '68-70°F', label: 'Temperature' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border-2 border-cyan-400 rounded-xl p-6">
                <p className="text-5xl font-black text-cyan-300 mb-2">{stat.value}</p>
                <p className="text-sm uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
