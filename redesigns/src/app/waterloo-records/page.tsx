'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function WaterlooRecordsPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-purple-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Vinyl Record Background */}
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700">
          {/* Floating Music Notes */}
          {[...Array(20)].map((_, i) => (
            <motion.div key={i} className="absolute text-6xl"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{
                y: [0, -40, 0],
                rotate: [0, 360],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ duration: 10 + i, repeat: Infinity, delay: i * 0.4 }}>
              {['🎵', '🎶', '🎸', '🎤'][i % 4]}
            </motion.div>
          ))}

          {/* Vinyl Grooves Pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(8)].map((_, i) => (
              <motion.div key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
                style={{ width: `${200 + i * 100}px`, height: `${200 + i * 100}px` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60 + i * 10, repeat: Infinity, ease: 'linear' }} />
            ))}
          </div>
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, type: 'spring' }} className="mb-10">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
              <div className="w-16 h-16 bg-white rounded-full"></div>
            </motion.div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-8xl md:text-9xl font-black text-white mb-6 tracking-tight"
            style={{ fontFamily: 'Impact, sans-serif', textShadow: '6px 6px 0px rgba(100,30,80,0.8)' }}>
            WATERLOO
          </motion.h1>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }} className="h-3 w-96 mx-auto mb-6"
            style={{ background: 'repeating-linear-gradient(90deg, #EC4899 0px, #EC4899 30px, #FFF 30px, #FFF 60px)' }} />

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }} className="text-5xl font-black text-pink-300 mb-16 tracking-widest"
            style={{ fontFamily: 'Impact, sans-serif' }}>
            RECORDS & VIDEO
          </motion.h2>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }} className="bg-black/40 backdrop-blur-md border-4 border-pink-500 rounded-2xl p-10 mb-12 max-w-3xl mx-auto">
            <h3 className="text-5xl font-black text-pink-300 mb-4">AUSTIN MUSIC ICON</h3>
            <p className="text-purple-200 text-2xl mb-6">
              Vinyl, CDs, Merch & Live Performances Since 1982
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-purple-800/50 border-2 border-pink-400 rounded-lg p-4">
                <p className="text-6xl mb-2">💿</p>
                <p className="text-white font-bold text-sm">New & Used</p>
              </div>
              <div className="bg-purple-800/50 border-2 border-pink-400 rounded-lg p-4">
                <p className="text-6xl mb-2">🎸</p>
                <p className="text-white font-bold text-sm">Live Shows</p>
              </div>
              <div className="bg-purple-800/50 border-2 border-pink-400 rounded-lg p-4">
                <p className="text-6xl mb-2">🎵</p>
                <p className="text-white font-bold text-sm">Local Artists</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }} className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '💿', label: 'Vinyl', color: 'from-purple-500 to-pink-500' },
              { icon: '📀', label: 'CDs', color: 'from-pink-500 to-red-500' },
              { icon: '🎸', label: 'Merch', color: 'from-orange-500 to-amber-500' },
              { icon: '🎤', label: 'In-Stores', color: 'from-purple-600 to-pink-600' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.1, rotate: 5 }}
                className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl border-4 border-white shadow-xl`}>
                <div className="text-6xl mb-2">{item.icon}</div>
                <p className="text-white font-black text-sm uppercase">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-gradient-to-r from-purple-700 to-pink-600 text-white font-black text-2xl px-16 py-6 rounded-full hover:from-purple-600 hover:to-pink-500 transition-all shadow-2xl border-4 border-white uppercase">
            Browse Collection
          </motion.button>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }} className="mt-12 text-white">
            <p className="text-xl font-bold mb-2">📍 600 N Lamar Blvd</p>
            <p className="text-lg">Mon-Sat 10 AM - 11 PM • Sun 11 AM - 10 PM</p>
            <p className="text-sm mt-3 text-pink-200">Keep Austin Weird • Support Local Music</p>
          </motion.div>
        </div>

        {/* Bottom Glow */}
        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-purple-900/60 to-transparent" />
      </section>

      {/* Austin Music Legacy */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black mb-8 text-purple-900">
            LIVE MUSIC CAPITAL
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="space-y-6 text-xl leading-relaxed text-gray-700">
            <p>
              Since 1982, Waterloo Records has been Austin's premier destination for music
              lovers, hosting in-store performances from legendary and up-and-coming artists.
            </p>
            <p className="text-2xl text-purple-700 font-bold italic">
              "Where Austin discovers music."
            </p>
            <p>
              From vinyl to CDs to exclusive merch, Waterloo is more than a store -
              it's a cornerstone of Austin's music scene and cultural identity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-24 px-6 bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-6xl font-black text-center mb-16 text-purple-900">
            WHAT WE OFFER
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'New & Used Vinyl', desc: 'Extensive collection from all genres', icon: '💿' },
              { title: 'CDs & Cassettes', desc: 'New releases and rare finds', icon: '📀' },
              { title: 'Artist Merch', desc: 'T-shirts, posters, and exclusives', icon: '👕' },
              { title: 'In-Store Performances', desc: 'Free live shows with top artists', icon: '🎤' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border-4 border-purple-600 rounded-2xl p-8 hover:shadow-2xl transition-shadow">
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-3xl font-black text-purple-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Austin Icon */}
      <section className="py-24 px-6 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-5xl font-black mb-12">
            AN AUSTIN INSTITUTION
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="space-y-6 text-xl leading-relaxed">
            <p>
              For over 40 years, Waterloo Records has been the heartbeat of Austin's
              music community, supporting local artists and keeping physical media alive.
            </p>
            <p className="text-2xl text-pink-300 font-bold italic">
              "More than a record store - it's a cultural landmark."
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-3 gap-8">
            {[
              { value: '1982', label: 'Founded' },
              { value: '1000s', label: 'In-Store Shows' },
              { value: '100%', label: 'Austin Owned' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border-2 border-pink-400 rounded-xl p-6">
                <p className="text-5xl font-black text-pink-300 mb-2">{stat.value}</p>
                <p className="text-sm uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
