'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function MusicVenuePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-black">

      {/* Hero - Concert Energy */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Stage Lights Effect */}
        <div className="absolute inset-0">
          {/* Spotlight Beams */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scaleY: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="absolute top-0 w-32 h-full origin-top"
              style={{
                left: `${15 + i * 15}%`,
                background: `linear-gradient(to bottom, ${
                  i % 3 === 0 ? 'rgba(236, 72, 153, 0.3)' :
                  i % 3 === 1 ? 'rgba(59, 130, 246, 0.3)' :
                  'rgba(168, 85, 247, 0.3)'
                }, transparent)`,
                transform: 'rotate(-5deg)',
              }}
            />
          ))}

          {/* Colored Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-20 left-20 w-96 h-96 bg-pink-600 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600 rounded-full blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Venue Name - Bold Concert Style */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Neon Sign Effect */}
            <motion.h1
              animate={{
                textShadow: [
                  '0 0 20px #ec4899, 0 0 40px #ec4899, 0 0 60px #ec4899',
                  '0 0 30px #3b82f6, 0 0 50px #3b82f6, 0 0 70px #3b82f6',
                  '0 0 20px #a855f7, 0 0 40px #a855f7, 0 0 60px #a855f7',
                  '0 0 20px #ec4899, 0 0 40px #ec4899, 0 0 60px #ec4899',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-8xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase"
              style={{ fontFamily: 'Impact, sans-serif' }}
            >
              THE ECHO
            </motion.h1>

            <div className="flex items-center justify-center gap-6 mb-8">
              <motion.div
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1 w-32 bg-gradient-to-r from-pink-500 to-transparent"
              />
              <p className="text-3xl text-pink-400 font-black uppercase tracking-widest">
                Live Music Venue
              </p>
              <motion.div
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="h-1 w-32 bg-gradient-to-l from-blue-500 to-transparent"
              />
            </div>

            <p className="text-xl text-purple-300 mb-4 uppercase tracking-wider font-bold">
              Austin's Premier Live Music Destination
            </p>
          </motion.div>

          {/* Featured Shows */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 p-1 rounded-3xl inline-block">
              <div className="bg-black px-12 py-8 rounded-3xl">
                <p className="text-pink-400 text-sm uppercase tracking-widest mb-3 font-bold">This Weekend</p>
                <h2 className="text-4xl font-black text-white mb-2">THE NEON REBELS</h2>
                <p className="text-blue-300 text-lg mb-4">+ Special Guests</p>
                <div className="flex items-center justify-center gap-8 text-purple-300">
                  <div>
                    <p className="text-xs uppercase tracking-wider">Date</p>
                    <p className="text-lg font-bold">Sat, Feb 15</p>
                  </div>
                  <div className="h-12 w-px bg-purple-600"></div>
                  <div>
                    <p className="text-xs uppercase tracking-wider">Doors</p>
                    <p className="text-lg font-bold">8:00 PM</p>
                  </div>
                  <div className="h-12 w-px bg-purple-600"></div>
                  <div>
                    <p className="text-xs uppercase tracking-wider">Tickets</p>
                    <p className="text-lg font-bold">$25</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Venue Features */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto"
          >
            {[
              { icon: '🎸', label: 'Live Shows', color: 'from-pink-500 to-rose-500' },
              { icon: '🍺', label: 'Full Bar', color: 'from-blue-500 to-cyan-500' },
              { icon: '🎤', label: 'Open Mic', color: 'from-purple-500 to-violet-500' },
              { icon: '🔊', label: 'Pro Sound', color: 'from-orange-500 to-amber-500' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="group"
              >
                <div className={`bg-gradient-to-br ${feature.color} p-6 rounded-2xl border-2 border-white/20 hover:border-white/50 transition-all duration-300`}>
                  <div className="text-5xl mb-2 group-hover:scale-125 transition-transform">
                    {feature.icon}
                  </div>
                  <p className="text-white font-black text-sm uppercase tracking-wide">
                    {feature.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <button
              aria-label="Buy tickets now"
              className="group relative bg-gradient-to-r from-pink-600 to-rose-600 text-white font-black text-xl px-14 py-5 rounded-full overflow-hidden shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                🎟️ BUY TICKETS
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </button>
            <button
              aria-label="View full schedule"
              className="border-4 border-white text-white font-black text-xl px-14 py-5 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              VIEW SCHEDULE
            </button>
          </motion.div>

          {/* Venue Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-purple-300 text-sm"
          >
            <p className="mb-2 font-bold">📍 210 W 6th Street, Austin, TX 78701</p>
            <p>21+ with valid ID • Shows 7 nights a week</p>
          </motion.div>
        </div>

        {/* Pulsing Stage Effect */}
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
        />
      </section>

      {/* Upcoming Shows */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-black text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
          >
            UPCOMING SHOWS
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { band: 'Electric Storm', genre: 'Rock', date: 'Feb 20', price: '$20', color: 'from-red-600 to-orange-600' },
              { band: 'Velvet Dreams', genre: 'Indie Pop', date: 'Feb 22', price: '$18', color: 'from-purple-600 to-pink-600' },
              { band: 'Bass Warriors', genre: 'Electronic', date: 'Feb 24', price: '$30', color: 'from-blue-600 to-cyan-600' },
              { band: 'Soul Revival', genre: 'R&B/Soul', date: 'Feb 27', price: '$22', color: 'from-pink-600 to-rose-600' }
            ].map((show, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${show.color} opacity-20 group-hover:opacity-40 rounded-3xl blur-xl transition-opacity duration-300`}></div>
                <div className="relative bg-gray-900 border-2 border-gray-800 group-hover:border-gray-700 rounded-3xl p-8 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-3xl font-black text-white mb-2">{show.band}</h3>
                      <span className={`inline-block bg-gradient-to-r ${show.color} text-white text-xs px-3 py-1 rounded-full font-bold uppercase`}>
                        {show.genre}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm uppercase">Date</p>
                      <p className="text-white text-xl font-bold">{show.date}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t-2 border-gray-800">
                    <span className={`text-3xl font-black bg-gradient-to-r ${show.color} bg-clip-text text-transparent`}>
                      {show.price}
                    </span>
                    <button className={`bg-gradient-to-r ${show.color} text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300`}>
                      Get Tickets
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 relative overflow-hidden">
        {/* Animated Waves */}
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-20"
        >
          <svg className="w-[200%] h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="white" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-7xl font-black mb-6 uppercase"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            Join The Show
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl mb-10"
          >
            Sign up for exclusive presale access and show alerts
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-8 py-5 rounded-full text-gray-900 text-lg font-bold placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50"
            />
            <button
              aria-label="Subscribe to newsletter"
              className="bg-white text-purple-600 font-black text-lg px-12 py-5 rounded-full hover:bg-gray-100 transition-all duration-300 whitespace-nowrap"
            >
              SIGN UP
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm"
          >
            Follow us: @TheEchoATX on Instagram • Facebook • Twitter
          </motion.p>
        </div>
      </section>

    </div>
  );
}
