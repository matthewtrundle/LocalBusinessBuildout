'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function SaltLickBBQPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-orange-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Wood Texture Background */}
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-800 to-red-900">
          {/* Wood Grain Pattern */}
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                rgba(139, 69, 19, 0.3) 0px,
                rgba(139, 69, 19, 0.3) 3px,
                transparent 3px,
                transparent 15px
              )`
            }} />

          {/* Smoke Effects */}
          {[...Array(6)].map((_, i) => (
            <motion.div key={i} className="absolute rounded-full bg-white/10 blur-3xl"
              style={{
                width: `${180 + i * 90}px`,
                height: `${180 + i * 90}px`,
                left: `${15 + i * 14}%`,
                top: `${25 + i * 10}%`
              }}
              animate={{
                y: [0, -60, 0],
                opacity: [0.15, 0.35, 0.15],
                scale: [1, 1.25, 1]
              }}
              transition={{ duration: 10 + i * 1.5, repeat: Infinity, delay: i * 1 }} />
          ))}
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, type: 'spring' }} className="mb-8">
            <div className="w-44 h-44 mx-auto bg-red-800 rounded-full flex items-center justify-center border-8 border-amber-600 shadow-2xl">
              <span className="text-8xl">🔥</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-8xl md:text-9xl font-black text-amber-100 mb-6 tracking-tight"
            style={{ fontFamily: 'Georgia, serif', textShadow: '6px 6px 0px rgba(100,30,10,0.8)' }}>
            THE SALT LICK
          </motion.h1>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }} className="h-3 w-80 bg-red-700 mx-auto mb-6" />

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }} className="text-5xl font-bold text-amber-200 mb-16 tracking-widest"
            style={{ fontFamily: 'Georgia, serif' }}>
            BAR-B-QUE
          </motion.h2>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }} className="bg-black/40 backdrop-blur-sm border-4 border-amber-700 rounded-xl p-10 mb-12 max-w-3xl mx-auto">
            <h3 className="text-5xl font-black text-amber-100 mb-4">DRIFTWOOD LEGEND</h3>
            <p className="text-amber-200 text-2xl mb-6">
              Family Recipe Since 1967
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-red-900/40 backdrop-blur-sm border-2 border-amber-600 rounded-lg p-4">
                <p className="text-amber-300 text-sm uppercase mb-1">Established</p>
                <p className="text-white text-3xl font-black">1967</p>
              </div>
              <div className="bg-red-900/40 backdrop-blur-sm border-2 border-amber-600 rounded-lg p-4">
                <p className="text-amber-300 text-sm uppercase mb-1">Location</p>
                <p className="text-white text-3xl font-black">Driftwood</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }} className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Open Pit', desc: 'Mesquite & Oak', icon: '🪵' },
              { title: 'Family Recipe', desc: 'Secret Sauce', icon: '🍖' },
              { title: 'Hill Country', desc: 'Scenic Views', icon: '🌄' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm border-2 border-amber-600 p-6 rounded-xl">
                <div className="text-6xl mb-3">{item.icon}</div>
                <h4 className="text-3xl font-black text-amber-100 mb-2">{item.title}</h4>
                <p className="text-amber-300 text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }} className="mb-12">
            <div className="bg-gradient-to-r from-amber-700 to-red-700 border-4 border-amber-500 rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-white text-3xl font-black mb-3">ALL-YOU-CAN-EAT</p>
              <p className="text-amber-100 text-xl">Family Style Dining Available</p>
              <p className="text-amber-200 text-lg mt-4">Brisket • Ribs • Sausage • Sides</p>
            </div>
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="bg-red-800 text-white font-black text-2xl px-16 py-6 rounded-full hover:bg-red-700 transition-all shadow-2xl border-4 border-amber-600 uppercase">
            Visit Driftwood
          </motion.button>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }} className="mt-12 text-amber-100">
            <p className="text-xl font-bold mb-2">📍 18300 FM 1826, Driftwood, TX 78619</p>
            <p className="text-lg">Open Daily 11 AM - 9 PM</p>
            <p className="text-sm mt-3 text-amber-300">20 minutes from Austin • Worth the Drive</p>
          </motion.div>
        </div>

        {/* Bottom Fire Glow */}
        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-red-900/50 to-transparent" />
      </section>

      {/* The Pit */}
      <section className="py-24 px-6 bg-gradient-to-br from-stone-800 to-neutral-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black text-center mb-16 text-amber-200"
            style={{ fontFamily: 'Georgia, serif' }}>
            THE OPEN PIT
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} className="space-y-6 text-lg text-stone-300 leading-relaxed">
              <p>
                The Salt Lick has been serving authentic Texas BBQ from our open pit
                since 1967, using the same family recipe passed down through generations.
              </p>
              <p>
                Our brisket, ribs, and sausage are slow-smoked over mesquite and oak
                in traditional open pits, creating the distinctive flavor that has made
                us a Hill Country legend.
              </p>
              <p className="text-2xl text-amber-300 font-bold italic">
                "It's the smoke, the sauce, and the scenery."
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} className="grid grid-cols-2 gap-6">
              {[
                { label: 'Mesquite Wood', icon: '🪵' },
                { label: 'Family Recipe', icon: '📜' },
                { label: 'Open Pit', icon: '🔥' },
                { label: 'Hill Country', icon: '🌳' }
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-red-900 to-orange-900 border-4 border-amber-600 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-3">{item.icon}</div>
                  <p className="text-white font-black text-lg">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-24 px-6 bg-amber-100">
        <div className="max-w-4xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black text-center mb-16 text-red-900"
            style={{ fontFamily: 'Georgia, serif' }}>
            WHAT WE SMOKE
          </motion.h2>

          <div className="space-y-6">
            {[
              { name: 'Brisket', desc: 'Slow-smoked for 14+ hours until tender and juicy', price: '$19/lb' },
              { name: 'Pork Ribs', desc: 'Fall-off-the-bone perfection with our signature sauce', price: '$27/lb' },
              { name: 'Sausage', desc: 'House-made with our special blend of spices', price: '$13/lb' },
              { name: 'Chicken', desc: 'Half chicken smoked to perfection', price: '$12' },
              { name: 'All-You-Can-Eat', desc: 'Family style with brisket, ribs, sausage, and sides', price: '$28/person' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border-4 border-red-800 rounded-xl p-6 flex justify-between items-center hover:shadow-2xl transition-shadow">
                <div>
                  <h3 className="text-3xl font-black text-red-900 mb-2">{item.name}</h3>
                  <p className="text-stone-700 text-lg">{item.desc}</p>
                </div>
                <p className="text-3xl font-black text-amber-700">{item.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Experience */}
      <section className="py-24 px-6 bg-gradient-to-br from-orange-900 to-red-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-5xl font-black mb-8"
            style={{ fontFamily: 'Georgia, serif' }}>
            MORE THAN JUST BBQ
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="space-y-6 text-xl leading-relaxed">
            <p>
              Nestled in the beautiful Texas Hill Country, The Salt Lick offers more
              than just incredible BBQ - it's an experience.
            </p>
            <p className="text-2xl text-amber-200 font-bold">
              Dine under the stars on our scenic outdoor patios.
            </p>
            <p>
              Watch as our pitmasters tend the open pits, creating the smoky flavors
              that have made us a Texas institution for over 55 years.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-3 gap-8">
            {[
              { value: '1967', label: 'Founded' },
              { value: '55+', label: 'Years Strong' },
              { value: '100%', label: 'Family Owned' }
            ].map((stat, i) => (
              <div key={i} className="bg-black/30 backdrop-blur-sm border-2 border-amber-600 rounded-xl p-6">
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
