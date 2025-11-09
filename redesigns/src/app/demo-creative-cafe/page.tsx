'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

export default function CreativeCafePage() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('coffee');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-black">

      {/* Hero - Minimal Brutalist Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Rotating Grid Background */}
        <motion.div
          style={{ rotate }}
          className="absolute inset-0 opacity-10"
        >
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-4 p-8">
            {[...Array(144)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: Math.random() > 0.7 ? 0.5 : 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.01 }}
                className="border border-white"
              />
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Brutalist Typography */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            <h1 className="text-9xl md:text-[12rem] font-black text-white mb-0 leading-none tracking-tighter uppercase"
                style={{
                  textShadow: '8px 8px 0px #FF6B6B, 16px 16px 0px #4ECDC4'
                }}>
              NOIR
            </h1>
            <div className="flex items-center justify-center gap-8 mt-4">
              <motion.div
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-32 bg-gradient-to-r from-red-500 to-transparent"
              />
              <p className="text-3xl text-white font-mono uppercase tracking-[0.5em]">
                CAFÉ
              </p>
              <motion.div
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="h-2 w-32 bg-gradient-to-l from-cyan-500 to-transparent"
              />
            </div>
          </motion.div>

          {/* Glitch Effect Tagline */}
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-gray-400 mt-12 mb-16 font-mono uppercase tracking-wider"
          >
            <span className="inline-block" style={{ animation: 'glitch 1s infinite' }}>
              Coffee. Code. Create.
            </span>
          </motion.p>

          {/* Interactive Menu Pills */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {['coffee', 'food', 'vibes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 font-mono uppercase tracking-wider transition-all duration-300 border-2 ${
                  activeTab === tab
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white border-white hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Animated Content Based on Tab */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {activeTab === 'coffee' && (
                <>
                  {['Espresso', 'Pour Over', 'Cold Brew'].map((item, i) => (
                    <div key={i} className="group relative border-2 border-white p-8 hover:bg-white hover:text-black transition-all duration-300">
                      <div className="absolute top-2 right-2 text-6xl font-black text-gray-800 opacity-10 group-hover:opacity-20">
                        {i + 1}
                      </div>
                      <h3 className="text-2xl font-black mb-2 font-mono">{item}</h3>
                      <p className="text-sm opacity-70">Perfect extraction</p>
                      <div className="mt-4 text-3xl font-black">$4</div>
                    </div>
                  ))}
                </>
              )}
              {activeTab === 'food' && (
                <>
                  {['Croissant', 'Avocado Toast', 'Açai Bowl'].map((item, i) => (
                    <div key={i} className="group relative border-2 border-red-500 p-8 hover:bg-red-500 hover:text-white transition-all duration-300">
                      <div className="absolute top-2 right-2 text-6xl font-black text-gray-800 opacity-10 group-hover:opacity-20">
                        {i + 1}
                      </div>
                      <h3 className="text-2xl font-black mb-2 font-mono">{item}</h3>
                      <p className="text-sm opacity-70">Fresh daily</p>
                      <div className="mt-4 text-3xl font-black">${8 + i * 2}</div>
                    </div>
                  ))}
                </>
              )}
              {activeTab === 'vibes' && (
                <>
                  {['WiFi', 'Music', 'Art'].map((item, i) => (
                    <div key={i} className="group relative border-2 border-cyan-500 p-8 hover:bg-cyan-500 hover:text-black transition-all duration-300">
                      <div className="absolute top-2 right-2 text-6xl font-black text-gray-800 opacity-10 group-hover:opacity-20">
                        {i + 1}
                      </div>
                      <h3 className="text-2xl font-black mb-2 font-mono">{item}</h3>
                      <p className="text-sm opacity-70">Always on point</p>
                      <div className="mt-4 text-3xl font-black">FREE</div>
                    </div>
                  ))}
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Location Info - Brutalist Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20 border-4 border-white p-12 inline-block bg-black"
          >
            <div className="grid md:grid-cols-3 gap-12 text-left font-mono">
              <div>
                <div className="text-red-500 text-xs uppercase mb-2 tracking-widest">LOCATION</div>
                <div className="text-white font-bold">Downtown ATX</div>
                <div className="text-gray-400 text-sm">6th Street District</div>
              </div>
              <div>
                <div className="text-cyan-500 text-xs uppercase mb-2 tracking-widest">HOURS</div>
                <div className="text-white font-bold">06:00 - 22:00</div>
                <div className="text-gray-400 text-sm">Every Single Day</div>
              </div>
              <div>
                <div className="text-yellow-500 text-xs uppercase mb-2 tracking-widest">CONNECT</div>
                <div className="text-white font-bold">@noircafe</div>
                <div className="text-gray-400 text-sm">Follow the vibes</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute w-4 h-4 border-2 border-white"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
            }}
          />
        ))}
      </section>

      {/* Philosophy Section - Split Screen */}
      <section className="min-h-screen grid md:grid-cols-2">
        <div className="bg-white p-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-md"
          >
            <h2 className="text-7xl font-black mb-8 text-black leading-none">
              WHY<br/>NOIR?
            </h2>
            <div className="space-y-6 text-gray-800 font-mono">
              <p className="text-lg">
                <span className="text-3xl font-black text-red-500">01.</span><br/>
                We source beans from conflict-free zones only.
              </p>
              <p className="text-lg">
                <span className="text-3xl font-black text-cyan-500">02.</span><br/>
                Every barista trains for 200+ hours minimum.
              </p>
              <p className="text-lg">
                <span className="text-3xl font-black text-yellow-500">03.</span><br/>
                Our space is designed for creators, by creators.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="bg-black p-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-md"
          >
            <div className="border-4 border-white p-12">
              <div className="text-8xl font-black text-white mb-8">☕</div>
              <h3 className="text-4xl font-black text-white mb-6 font-mono">
                PERFECT EXTRACTION
              </h3>
              <p className="text-gray-400 font-mono">
                18g in. 36g out. 25 seconds.<br/>
                Every. Single. Time.<br/>
                <span className="text-white">This is the way.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA - Full Width Impact */}
      <section className="py-32 bg-gradient-to-r from-red-600 via-black to-cyan-600 relative overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 transform -translate-y-1/2 whitespace-nowrap"
        >
          <span className="text-9xl font-black text-white/10 uppercase">
            VISIT NOIR • VISIT NOIR • VISIT NOIR • VISIT NOIR •
          </span>
        </motion.div>

        <div className="relative z-10 text-center">
          <h2 className="text-7xl md:text-9xl font-black text-white mb-12 font-mono">
            SEE YOU<br/>SOON
          </h2>
          <button className="bg-white text-black px-16 py-6 text-2xl font-black uppercase hover:bg-black hover:text-white border-4 border-white transition-all duration-300">
            Find Us
          </button>
        </div>
      </section>

      {/* Add Glitch Animation */}
      <style jsx>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>

    </div>
  );
}
