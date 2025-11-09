'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function MountBonnellPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-orange-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Sunset Sky Background */}
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-b from-orange-500 via-pink-500 to-purple-700">
          {/* Floating Clouds */}
          {[...Array(6)].map((_, i) => (
            <motion.div key={i}
              className="absolute text-8xl opacity-40"
              style={{ left: `${-10 + i * 20}%`, top: `${10 + i * 12}%` }}
              animate={{ x: [0, 400], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 40 + i * 10, repeat: Infinity, delay: i * 2 }}>
              ☁️
            </motion.div>
          ))}

          {/* Mountain Silhouette */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 300" className="w-full h-auto">
              <path d="M0,300 L0,200 Q150,150 300,180 T600,150 T900,200 T1200,180 L1200,300 Z"
                fill="rgba(0,0,0,0.3)" />
              <path d="M0,300 L0,240 Q200,200 400,220 T800,200 T1200,240 L1200,300 Z"
                fill="rgba(0,0,0,0.2)" />
            </svg>
          </div>
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 1.5, type: 'spring' }} className="mb-10">
            <div className="w-52 h-52 mx-auto bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <span className="text-9xl">⛰️</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-7xl md:text-9xl font-black text-white mb-6 tracking-tight"
            style={{ fontFamily: 'Georgia, serif', textShadow: '6px 6px 0px rgba(120,40,60,0.8)' }}>
            MOUNT BONNELL
          </motion.h1>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }} className="h-3 w-96 bg-pink-500 mx-auto mb-8" />

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }} className="text-4xl font-bold text-orange-200 mb-16 tracking-wide"
            style={{ fontFamily: 'Georgia, serif' }}>
            Austin's Highest Scenic Viewpoint
          </motion.h2>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }} className="bg-black/30 backdrop-blur-md border-4 border-orange-400 rounded-2xl p-10 mb-12 max-w-3xl mx-auto">
            <h3 className="text-5xl font-black text-orange-200 mb-4">BREATHTAKING VIEWS</h3>
            <p className="text-pink-200 text-2xl mb-6">
              785 Feet Above Sea Level • Panoramic Hill Country Vistas
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-orange-700/50 border-2 border-orange-300 rounded-lg p-4">
                <p className="text-orange-200 text-sm uppercase mb-1">Elevation</p>
                <p className="text-white text-3xl font-black">785 ft</p>
              </div>
              <div className="bg-orange-700/50 border-2 border-orange-300 rounded-lg p-4">
                <p className="text-orange-200 text-sm uppercase mb-1">Steps</p>
                <p className="text-white text-3xl font-black">102</p>
              </div>
              <div className="bg-orange-700/50 border-2 border-orange-300 rounded-lg p-4">
                <p className="text-orange-200 text-sm uppercase mb-1">Access</p>
                <p className="text-white text-3xl font-black">FREE</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }} className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '🌄', label: 'Sunrise Views', color: 'from-orange-400 to-pink-500' },
              { icon: '🌅', label: 'Sunset Views', color: 'from-pink-500 to-purple-600' },
              { icon: '📸', label: 'Perfect Photos', color: 'from-purple-500 to-pink-600' },
              { icon: '🥾', label: 'Easy Hike', color: 'from-orange-500 to-red-600' }
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
            className="bg-gradient-to-r from-orange-600 to-pink-600 text-white font-black text-2xl px-16 py-6 rounded-full hover:from-orange-500 hover:to-pink-500 transition-all shadow-2xl border-4 border-white uppercase">
            Get Directions
          </motion.button>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }} className="mt-12 text-white">
            <p className="text-xl font-bold mb-2">📍 3800 Mount Bonnell Rd</p>
            <p className="text-lg">Open Daily 5 AM - 10 PM • FREE Admission</p>
            <p className="text-sm mt-3 text-orange-200">Best at Sunrise or Sunset</p>
          </motion.div>
        </div>

        {/* Bottom Glow */}
        <motion.div animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-purple-900/60 to-transparent" />
      </section>

      {/* The Experience */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black mb-8 text-orange-800">
            THE CLIMB
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="space-y-6 text-xl leading-relaxed text-gray-700">
            <p>
              A scenic climb of 102 stone steps leads you to one of Austin's most
              spectacular viewpoints overlooking Lake Austin and the Hill Country.
            </p>
            <p className="text-2xl text-orange-700 font-bold italic">
              "Worth every step"
            </p>
            <p>
              Named after George W. Bonnell in the 1840s, this beloved landmark has been
              attracting visitors for over 150 years with its panoramic vistas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visitor Tips */}
      <section className="py-24 px-6 bg-gradient-to-br from-orange-100 to-pink-100">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black text-center mb-16 text-orange-900">
            VISITOR TIPS
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Best Times', tip: 'Sunrise or sunset for stunning colors and fewer crowds', icon: '🌄' },
              { title: 'What to Bring', tip: 'Water, camera, comfortable shoes - the climb is worth it!', icon: '🎒' },
              { title: 'Parking', tip: 'Limited street parking - arrive early on weekends', icon: '🚗' },
              { title: 'Photo Ops', tip: 'Multiple viewing platforms - explore both levels', icon: '📸' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border-4 border-orange-600 rounded-2xl p-8 hover:shadow-2xl transition-shadow">
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-3xl font-black text-orange-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 text-lg">{item.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-24 px-6 bg-gradient-to-br from-orange-900 to-pink-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-5xl font-black mb-12">
            A HISTORIC LANDMARK
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="space-y-6 text-xl leading-relaxed">
            <p>
              Mount Bonnell has been Austin's premier scenic overlook since the 1800s,
              named after George W. Bonnell, a commissioner and writer of the Republic of Texas.
            </p>
            <p className="text-2xl text-orange-300 font-bold italic">
              "The jewel of Austin's natural beauty"
            </p>
            <p>
              At 785 feet above sea level, it offers unparalleled views of Lake Austin,
              the Colorado River, and the Texas Hill Country beyond.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-3 gap-8">
            {[
              { value: '150+', label: 'Years Historic' },
              { value: '785 ft', label: 'Elevation' },
              { value: 'FREE', label: 'Always Free' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border-2 border-orange-400 rounded-xl p-6">
                <p className="text-5xl font-black text-orange-300 mb-2">{stat.value}</p>
                <p className="text-sm uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
