'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

export default function ElectricBreweryPage() {
  const containerRef = useRef(null);
  const [hoverBeer, setHoverBeer] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const rotateSpring = useSpring(rotate, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="min-h-screen bg-black overflow-hidden">

      {/* Hero - High Energy Electric */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Electric Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600">
          {/* Lightning Effect */}
          <motion.div
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
            }}
            className="absolute inset-0 bg-white mix-blend-overlay"
          />

          {/* Rotating Hex Grid */}
          <motion.div
            style={{ rotate: rotateSpring }}
            className="absolute inset-0 opacity-20"
          >
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hex" width="100" height="86.6" patternUnits="userSpaceOnUse">
                  <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="none" stroke="white" strokeWidth="2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hex)"/>
            </svg>
          </motion.div>

          {/* Energy Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Logo - Electric */}
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          >
            <div className="inline-block relative mb-8">
              {/* Glow Effect */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255, 215, 0, 0.5)',
                    '0 0 60px rgba(255, 215, 0, 0.8)',
                    '0 0 20px rgba(255, 215, 0, 0.5)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center border-4 border-yellow-200"
              >
                <span className="text-6xl">⚡</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Title - High Impact */}
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="text-8xl md:text-[10rem] font-black text-white mb-4 leading-none tracking-tighter"
            style={{
              textShadow: '0 0 30px rgba(255, 215, 0, 0.5), 4px 4px 0 rgba(0,0,0,0.3)'
            }}
          >
            VOLTAGE
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="h-2 w-64 mx-auto bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-6"
          />

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-4xl text-yellow-200 mb-4 font-black uppercase tracking-[0.3em]"
          >
            BREWING CO.
          </motion.p>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-2xl text-white mb-16 font-bold"
          >
            HIGH ENERGY • BOLD FLAVORS • ELECTRIC ATMOSPHERE
          </motion.p>

          {/* Stats - Energy Style */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-16"
          >
            {[
              { num: '50+', label: 'BEERS ON TAP' },
              { num: '24/7', label: 'ALWAYS BREWING' },
              { num: '100%', label: 'HIGH VOLTAGE' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="border-4 border-yellow-400 bg-black/50 backdrop-blur-lg p-6 relative overflow-hidden"
              >
                <motion.div
                  animate={{
                    y: ['100%', '-100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/20 to-transparent"
                />
                <div className="relative">
                  <div className="text-5xl font-black text-yellow-400 mb-2">{stat.num}</div>
                  <div className="text-xs text-white uppercase tracking-widest font-bold">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs - High Energy */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-xl px-16 py-5 rounded-none overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">SEE OUR BEERS</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-4 border-yellow-400 text-yellow-400 font-black text-xl px-16 py-5 rounded-none hover:bg-yellow-400 hover:text-black transition-all duration-300"
            >
              VISIT US
            </motion.button>
          </motion.div>
        </div>

        {/* Corner Accents */}
        {[
          'top-0 left-0 border-t-4 border-l-4',
          'top-0 right-0 border-t-4 border-r-4',
          'bottom-0 left-0 border-b-4 border-l-4',
          'bottom-0 right-0 border-b-4 border-r-4',
        ].map((classes, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + i * 0.1, duration: 0.3 }}
            className={`absolute w-16 h-16 border-yellow-400 ${classes}`}
          />
        ))}
      </section>

      {/* Beer Menu - Grid Style */}
      <section className="py-24 px-6 bg-black relative">
        {/* Scanlines Effect */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)',
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-7xl font-black text-white mb-4 uppercase"
          >
            ON TAP NOW
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="h-1 w-32 bg-yellow-400 mb-16"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'THUNDER IPA', abv: '7.2%', desc: 'Explosive hops. Citrus bomb. No mercy.', color: 'yellow' },
              { name: 'BLACKOUT STOUT', abv: '9.5%', desc: 'Dark as midnight. Smooth as sin. Pure power.', color: 'orange' },
              { name: 'SURGE LAGER', abv: '5.0%', desc: 'Crisp. Clean. Crushable. Electric refresh.', color: 'yellow' },
              { name: 'NEON HAZE', abv: '6.8%', desc: 'Hazy. Juicy. Tropical. Glow in the dark vibes.', color: 'orange' },
              { name: 'VOLTAGE SOUR', abv: '4.5%', desc: 'Tart. Tangy. Shocking. Summer lightning.', color: 'yellow' },
              { name: 'AMP PALE ALE', abv: '5.5%', desc: 'Balanced. Hoppy. Classic. Turn it up.', color: 'orange' },
            ].map((beer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoverBeer(i)}
                onMouseLeave={() => setHoverBeer(null)}
                className="relative group cursor-pointer"
              >
                <motion.div
                  animate={{
                    opacity: hoverBeer === i ? 1 : 0,
                  }}
                  className={`absolute inset-0 bg-gradient-to-br from-${beer.color}-400 to-${beer.color}-600 blur-xl`}
                />
                <div className={`relative border-4 border-${beer.color}-400 bg-black p-8 hover:bg-${beer.color}-400/10 transition-all duration-300`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-white">{beer.name}</h3>
                    <span className={`text-3xl font-black text-${beer.color}-400`}>{beer.abv}</span>
                  </div>
                  <p className="text-gray-400 font-bold uppercase text-sm tracking-wide">{beer.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Energy Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0.5, 0.7], ['0%', '50%']),
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-yellow-600 to-red-600"></div>

          {/* Electric Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {[...Array(10)].map((_, i) => (
              <motion.line
                key={i}
                x1="0"
                y1={`${i * 10}%`}
                x2="100%"
                y2={`${i * 10}%`}
                stroke="white"
                strokeWidth="2"
                opacity="0.2"
                animate={{
                  strokeDashoffset: [0, 100],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                strokeDasharray="10 10"
              />
            ))}
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
        >
          <div className="border-8 border-white p-16 bg-black/50 backdrop-blur-xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-9xl mb-8"
            >
              ⚡
            </motion.div>
            <h3 className="text-6xl font-black text-white mb-6 uppercase">
              FEEL THE<br/>ENERGY
            </h3>
            <p className="text-2xl text-yellow-400 font-bold">
              LIVE MUSIC • CRAFT BEER • HIGH VOLTAGE VIBES
            </p>
          </div>
        </motion.div>
      </section>

      {/* CTA Footer - Max Energy */}
      <section className="py-32 px-6 bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
            backgroundSize: '200% 200%',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-8xl font-black text-black mb-8 uppercase"
            style={{
              textShadow: '4px 4px 0 rgba(255,255,255,0.5)'
            }}
          >
            PLUG IN
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-white font-black mb-12 uppercase tracking-wide"
          >
            Visit Austin's Most Electric Brewery
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-yellow-400 font-black text-2xl px-20 py-6 rounded-none border-4 border-black hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-2xl"
          >
            GET DIRECTIONS
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-black"
          >
            <p className="text-sm font-black uppercase tracking-widest mb-2">LOCATION</p>
            <p className="text-xl font-bold">EAST AUSTIN • OPEN DAILY</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
