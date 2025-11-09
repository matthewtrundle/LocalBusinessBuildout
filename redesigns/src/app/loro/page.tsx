'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function LoroPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-red-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Asian Smokehouse Fusion Background */}
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-red-900 via-orange-700 to-amber-600">
          {/* Smoke & Fire Effects */}
          {[...Array(8)].map((_, i) => (
            <motion.div key={i} className="absolute rounded-full bg-white/10 blur-3xl"
              style={{
                width: `${220 + i * 70}px`,
                height: `${220 + i * 70}px`,
                left: `${12 + i * 12}%`,
                top: `${18 + i * 12}%`
              }}
              animate={{
                y: [0, -70, 0],
                opacity: [0.15, 0.4, 0.15],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 12 + i * 1.5, repeat: Infinity, delay: i * 1 }} />
          ))}

          {/* Asian Pattern Overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }} />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.3, type: 'spring' }} className="mb-10">
            <div className="w-44 h-44 mx-auto bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center border-8 border-amber-400 shadow-2xl rotate-45">
              <div className="-rotate-45">
                <span className="text-8xl">🔥</span>
              </div>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-9xl md:text-[12rem] font-black text-amber-100 mb-4 tracking-tighter"
            style={{ fontFamily: 'Impact, sans-serif', textShadow: '6px 6px 0px rgba(120,30,0,0.8)' }}>
            LORO
          </motion.h1>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }} className="h-3 w-80 bg-red-700 mx-auto mb-8" />

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }} className="text-5xl font-black text-amber-200 mb-16 tracking-widest"
            style={{ fontFamily: 'Impact, sans-serif' }}>
            ASIAN SMOKEHOUSE
          </motion.h2>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }} className="bg-black/40 backdrop-blur-md border-4 border-amber-600 rounded-2xl p-10 mb-12 max-w-3xl mx-auto">
            <h3 className="text-5xl font-black text-amber-100 mb-4">SMOKE MEETS SPICE</h3>
            <p className="text-orange-200 text-2xl mb-6">
              Texas BBQ × Japanese Yakitori × Thai Heat
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-red-800/50 border-2 border-amber-500 rounded-lg p-4">
                <p className="text-6xl mb-2">🔥</p>
                <p className="text-white font-bold text-sm">Oak-Smoked</p>
              </div>
              <div className="bg-red-800/50 border-2 border-amber-500 rounded-lg p-4">
                <p className="text-6xl mb-2">🌶️</p>
                <p className="text-white font-bold text-sm">Asian Spices</p>
              </div>
              <div className="bg-red-800/50 border-2 border-amber-500 rounded-lg p-4">
                <p className="text-6xl mb-2">🍖</p>
                <p className="text-white font-bold text-sm">Heritage Meats</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }} className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '🥩', label: 'Smoked Brisket' },
              { icon: '🍗', label: 'Thai Wings' },
              { icon: '🍜', label: 'Ramen Bowls' },
              { icon: '🍺', label: 'Craft Beer' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-white/10 backdrop-blur-sm border-2 border-amber-600 p-6 rounded-xl">
                <div className="text-6xl mb-2">{item.icon}</div>
                <p className="text-amber-100 font-black text-sm uppercase">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-gradient-to-r from-red-700 to-orange-600 text-white font-black text-2xl px-16 py-6 rounded-full hover:from-red-600 hover:to-orange-500 transition-all shadow-2xl border-4 border-amber-500 uppercase">
            Explore Menu
          </motion.button>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }} className="mt-12 text-amber-100">
            <p className="text-xl font-bold mb-2">📍 2115 S Lamar Blvd</p>
            <p className="text-lg">Daily 11 AM - 10 PM • Outdoor Patio</p>
            <p className="text-sm mt-3 text-orange-200">From the minds behind Franklin BBQ & Uchi</p>
          </motion.div>
        </div>

        {/* Fire Glow Bottom */}
        <motion.div animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-red-900/60 to-transparent" />
      </section>

      {/* The Concept */}
      <section className="py-24 px-6 bg-gradient-to-br from-stone-900 to-neutral-800 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black text-center mb-16 text-amber-300">
            THE FUSION
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} className="space-y-6 text-lg leading-relaxed">
              <p>
                Loro brings together two legendary Austin food cultures: Aaron Franklin's
                mastery of Texas BBQ and Tyson Cole's expertise in Japanese cuisine.
              </p>
              <p className="text-2xl text-amber-300 font-bold">
                The result? Something completely unique.
              </p>
              <p>
                We smoke our meats low and slow over Texas oak, then finish them with
                bold Asian flavors - Thai chilies, Japanese yuzu, Korean gochujang.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} className="grid grid-cols-2 gap-6">
              {[
                { title: 'Texas BBQ', subtitle: 'Franklin Legacy', icon: '🔥' },
                { title: 'Japanese Craft', subtitle: 'Uchi Precision', icon: '🇯🇵' },
                { title: 'Thai Heat', subtitle: 'Bold Spices', icon: '🌶️' },
                { title: 'Outdoor Vibe', subtitle: 'Austin Energy', icon: '🌳' }
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-red-800 to-orange-800 border-4 border-amber-500 rounded-xl p-6 text-center">
                  <div className="text-5xl mb-2">{item.icon}</div>
                  <p className="text-amber-100 font-black text-lg mb-1">{item.title}</p>
                  <p className="text-orange-200 text-sm">{item.subtitle}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signature Menu */}
      <section className="py-24 px-6 bg-amber-100">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black text-center mb-16 text-red-900">
            SIGNATURE DISHES
          </motion.h2>

          <div className="space-y-6">
            {[
              { name: 'Oak-Smoked Brisket', desc: 'Franklin-style brisket with Thai chili glaze', price: '$16', highlight: true },
              { name: 'Thai Wings', desc: 'Crispy smoked wings, fish sauce caramel, herbs', price: '$14' },
              { name: 'Brisket Ramen', desc: 'House ramen, smoked brisket, soft egg, scallions', price: '$15' },
              { name: 'Smoked Turkey', desc: 'Oak-smoked turkey, yuzu kosho, pickled daikon', price: '$13' },
              { name: 'Pork Belly Burnt Ends', desc: 'Miso-glazed, topped with crispy shallots', price: '$14' },
              { name: 'Grilled Corn', desc: 'Street corn with miso butter and cotija', price: '$8' }
            ].map((dish, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`${dish.highlight
                  ? 'bg-gradient-to-r from-red-700 to-orange-700 text-white border-4 border-amber-500'
                  : 'bg-white border-4 border-red-800'
                } rounded-2xl p-6 flex justify-between items-center hover:shadow-2xl transition-shadow`}>
                <div>
                  <h3 className={`text-3xl font-black mb-2 ${dish.highlight ? 'text-amber-100' : 'text-red-900'}`}>
                    {dish.name}
                  </h3>
                  <p className={`text-lg ${dish.highlight ? 'text-orange-200' : 'text-gray-700'}`}>
                    {dish.desc}
                  </p>
                </div>
                <p className={`text-3xl font-black ${dish.highlight ? 'text-amber-300' : 'text-red-700'}`}>
                  {dish.price}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Team */}
      <section className="py-24 px-6 bg-gradient-to-br from-orange-900 to-red-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-5xl font-black mb-12">
            LEGENDARY COLLABORATION
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} className="bg-black/30 backdrop-blur-sm border-2 border-amber-500 rounded-xl p-8">
              <div className="text-6xl mb-4">🥩</div>
              <h3 className="text-3xl font-black text-amber-200 mb-3">Aaron Franklin</h3>
              <p className="text-orange-200 mb-2">BBQ Master</p>
              <p className="text-white/80">Franklin Barbecue • James Beard Award Winner</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-black/30 backdrop-blur-sm border-2 border-amber-500 rounded-xl p-8">
              <div className="text-6xl mb-4">🍣</div>
              <h3 className="text-3xl font-black text-amber-200 mb-3">Tyson Cole</h3>
              <p className="text-orange-200 mb-2">Sushi Chef</p>
              <p className="text-white/80">Uchi/Uchiko • James Beard Award Winner</p>
            </motion.div>
          </div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="text-2xl text-amber-200 italic">
            "Two Austin legends. One unforgettable experience."
          </motion.p>
        </div>
      </section>
    </div>
  );
}
