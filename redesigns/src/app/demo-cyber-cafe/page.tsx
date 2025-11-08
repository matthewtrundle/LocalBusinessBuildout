'use client';

import { motion, useScroll, useTransform, useTime } from 'framer-motion';
import { useRef } from 'react';

export default function CyberCafePage() {
  const containerRef = useRef(null);
  const time = useTime();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const rotateX = useTransform(time, [0, 4000], [0, 360], { clamp: false });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-black">

      {/* Hero - Cyberpunk Futuristic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Cyber Grid Background */}
        <div className="absolute inset-0">
          {/* Neon Grid */}
          <motion.div
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0"
          >
            <motion.div
              style={{
                rotateX,
              }}
              className="absolute inset-0 opacity-30"
            >
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#gradient)" strokeWidth="0.5"/>
                  </pattern>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F5FF"/>
                    <stop offset="100%" stopColor="#FF00FF"/>
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)"/>
              </svg>
            </motion.div>
          </motion.div>

          {/* Neon Glow Orbs */}
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(0,245,255,0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(255,0,255,0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(0,245,255,0.3) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0"
          />

          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, cyan 2px, cyan 4px)',
            }} className="absolute inset-0"></div>
          </div>

          {/* Glitch Effect */}
          <motion.div
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.1, repeat: Infinity, repeatDelay: Math.random() * 5 }}
            className="absolute inset-0 bg-cyan-500 mix-blend-screen"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Cyber Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="mb-12"
          >
            <div className="inline-block relative">
              {/* Neon Hexagon */}
              <motion.svg
                width="200"
                height="200"
                viewBox="0 0 100 100"
                className="mb-8"
              >
                <motion.path
                  d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z"
                  fill="none"
                  stroke="url(#neon-gradient)"
                  strokeWidth="2"
                  animate={{
                    strokeDashoffset: [0, -200],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  strokeDasharray="10 5"
                  style={{
                    filter: 'drop-shadow(0 0 10px #00F5FF) drop-shadow(0 0 20px #FF00FF)',
                  }}
                />
                <defs>
                  <linearGradient id="neon-gradient">
                    <stop offset="0%" stopColor="#00F5FF"/>
                    <stop offset="50%" stopColor="#FF00FF"/>
                    <stop offset="100%" stopColor="#00F5FF"/>
                  </linearGradient>
                </defs>
                <text
                  x="50"
                  y="55"
                  textAnchor="middle"
                  fontSize="40"
                  fill="#00F5FF"
                  style={{
                    fontFamily: 'monospace',
                    filter: 'drop-shadow(0 0 10px #00F5FF)',
                  }}
                >
                  C◊
                </text>
              </motion.svg>
            </div>
          </motion.div>

          {/* Title - Cyber Font */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-8xl md:text-9xl font-black mb-4"
            style={{
              fontFamily: 'monospace',
              background: 'linear-gradient(90deg, #00F5FF, #FF00FF, #00F5FF)',
              backgroundSize: '200% 100%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 30px rgba(0,245,255,0.5)',
              animation: 'gradient 3s linear infinite',
            }}
          >
            CYBER.BREW
          </motion.h1>

          {/* Glitch Tagline */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl md:text-3xl text-cyan-400 mb-16 font-mono uppercase tracking-[0.5em]"
            style={{
              textShadow: '0 0 10px rgba(0,245,255,0.8), 2px 2px 0 rgba(255,0,255,0.5)',
            }}
          >
            <motion.span
              animate={{
                x: [0, -2, 2, 0],
                textShadow: [
                  '0 0 10px rgba(0,245,255,0.8)',
                  '2px 0 10px rgba(255,0,255,0.8)',
                  '0 0 10px rgba(0,245,255,0.8)',
                ],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              COFFEE • CODE • CYBER
            </motion.span>
          </motion.p>

          {/* Cyber Stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
          >
            {[
              { label: 'BANDWIDTH', value: '1000 Mbps' },
              { label: 'UPTIME', value: '99.9%' },
              { label: 'STATIONS', value: '24/7' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                <div className="relative border-2 border-cyan-500 bg-black/80 backdrop-blur-lg p-6 font-mono hover:border-pink-500 transition-all duration-300">
                  <div className="text-xs text-cyan-400 uppercase tracking-widest mb-2">{stat.label}</div>
                  <div className="text-3xl font-black text-pink-500">{stat.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA - Cyber Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button
              className="relative group overflow-hidden border-2 border-cyan-500 bg-cyan-500/10 text-cyan-400 font-mono font-bold text-lg px-12 py-4 uppercase tracking-wider hover:border-pink-500 hover:text-pink-400 transition-all duration-300"
            >
              <span className="relative z-10">JACK IN</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            <button
              className="border-2 border-pink-500 bg-pink-500/10 text-pink-400 font-mono font-bold text-lg px-12 py-4 uppercase tracking-wider hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300"
            >
              VIEW MENU
            </button>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-16 inline-block"
          >
            <div className="border-2 border-cyan-500 bg-black/80 backdrop-blur-lg p-6 font-mono">
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div>
                  <div className="text-xs text-cyan-400 mb-1 uppercase">LOCATION</div>
                  <div className="text-white font-bold">DOWNTOWN.ATX</div>
                </div>
                <div>
                  <div className="text-xs text-pink-400 mb-1 uppercase">HOURS</div>
                  <div className="text-white font-bold">24/7/365</div>
                </div>
                <div>
                  <div className="text-xs text-cyan-400 mb-1 uppercase">STATUS</div>
                  <div className="text-green-400 font-bold flex items-center gap-2">
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-green-400 rounded-full"
                    />
                    ONLINE
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Corner HUD Elements */}
        {[
          'top-4 left-4',
          'top-4 right-4',
          'bottom-4 left-4',
          'bottom-4 right-4'
        ].map((position, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 + i * 0.1 }}
            className={`absolute ${position} w-8 h-8 border-2 border-cyan-500`}
            style={{
              borderWidth: i % 2 === 0 ? '2px 0 0 2px' : '0 2px 2px 0',
              filter: 'drop-shadow(0 0 5px #00F5FF)',
            }}
          />
        ))}
      </section>

      {/* Menu Section - Cyber Style */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900 relative">
        {/* Circuit Board Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            {[...Array(20)].map((_, i) => (
              <motion.line
                key={i}
                x1={`${Math.random() * 100}%`}
                y1="0"
                x2={`${Math.random() * 100}%`}
                y2="100%"
                stroke="cyan"
                strokeWidth="1"
                animate={{ strokeDashoffset: [0, 100] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
                strokeDasharray="5 5"
              />
            ))}
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-7xl font-black text-cyan-400 mb-4 font-mono uppercase"
            style={{ textShadow: '0 0 20px rgba(0,245,255,0.5)' }}
          >
            MENU.EXE
          </motion.h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-pink-500 mb-16"></div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'NEURAL.ESPRESSO', code: '0x001', price: '$4', desc: 'Double shot. Pure energy. Direct connection.' },
              { name: 'MATRIX.LATTE', code: '0x002', price: '$5', desc: 'Take the red pill. Creamy. Smooth. Reality bending.' },
              { name: 'QUANTUM.COLD_BREW', code: '0x003', price: '$6', desc: 'Superposition of flavors. Simultaneously hot and cold.' },
              { name: 'CYBER.MOCHA', code: '0x004', price: '$6', desc: 'Chocolate protocol. Enhanced with digital sweetness.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                <div className="relative border-2 border-cyan-500 bg-black/80 backdrop-blur-lg p-6 group-hover:border-pink-500 transition-all duration-300 font-mono">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">{item.code}</div>
                      <h3 className="text-xl font-black text-cyan-400 group-hover:text-pink-400 transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <span className="text-2xl font-black text-pink-500">{item.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer - Cyber */}
      <section className="py-32 px-6 bg-black relative overflow-hidden">
        {/* Animated Grid */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-8xl font-black mb-8 font-mono"
            style={{
              background: 'linear-gradient(90deg, #00F5FF, #FF00FF)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 30px rgba(0,245,255,0.5)',
            }}
          >
            CONNECT.NOW
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-cyan-400 mb-12 font-mono uppercase tracking-widest"
          >
            Your Portal to the Digital Realm
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="border-2 border-cyan-500 bg-cyan-500/20 text-cyan-400 font-mono font-black text-xl px-16 py-6 uppercase tracking-wider hover:border-pink-500 hover:bg-pink-500/20 hover:text-pink-400 transition-all duration-300"
            style={{
              boxShadow: '0 0 20px rgba(0,245,255,0.3)',
            }}
          >
            ENTER THE GRID
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-gray-500 font-mono text-sm"
          >
            <p>DOWNTOWN.ATX // SECTOR.78701</p>
          </motion.div>
        </div>
      </section>

      {/* Gradient Animation Keyframes */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

    </div>
  );
}
