'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function FitnessStudioPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black">

      {/* Hero - High Energy Fitness */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Energy Background */}
        <motion.div
          style={{ y }}
          className="absolute inset-0"
        >
          {/* Bold Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500"></div>

          {/* Energy Pulse Overlays */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-br from-red-500 to-transparent"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute inset-0 bg-gradient-to-tl from-yellow-500 to-transparent"
          />

          {/* Diagonal Stripes - Energy Lines */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="energy-stripes" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect x="0" y="0" width="40" height="80" fill="black"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#energy-stripes)" />
            </svg>
          </div>

          {/* Floating Intensity Bars */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-black"
              style={{
                width: `${4 + Math.random() * 4}px`,
                height: `${100 + Math.random() * 200}px`,
                left: `${10 + i * 12}%`,
                top: `${20 + Math.random() * 40}%`,
              }}
              animate={{
                scaleY: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        >
          {/* Studio Logo - Power Symbol */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-8 inline-block"
          >
            <div className="relative w-40 h-40">
              {/* Hexagon Power Symbol */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon
                    points="50 1 95 25 95 75 50 99 5 75 5 25"
                    fill="none"
                    stroke="black"
                    strokeWidth="4"
                  />
                </svg>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-7xl"
                >
                  💪
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Studio Name - Bold Impact */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-8xl md:text-9xl font-black text-black mb-6 tracking-tighter uppercase"
            style={{
              fontFamily: 'Impact, sans-serif',
              textShadow: '6px 6px 0px rgba(0,0,0,0.3)',
            }}
          >
            IRON FORGE
          </motion.h1>

          {/* Tagline - Motivational */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-16"
          >
            <div className="inline-block bg-black px-8 py-4 transform -skew-x-6">
              <p className="text-3xl text-yellow-400 font-black uppercase tracking-wider transform skew-x-6">
                Forge Your Strength
              </p>
            </div>
            <p className="text-xl text-black font-bold uppercase mt-4 tracking-wide">
              No Excuses • No Limits • No Regrets
            </p>
          </motion.div>

          {/* Class Highlight */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mb-16"
          >
            <div className="bg-black border-4 border-yellow-500 px-12 py-10 inline-block transform rotate-1 shadow-2xl">
              <p className="text-yellow-500 text-sm uppercase tracking-widest mb-3 font-black">
                Today's Featured
              </p>
              <h2 className="text-5xl font-black text-white mb-4 uppercase">
                HIIT INFERNO
              </h2>
              <p className="text-red-500 text-lg font-bold mb-6">
                45 MIN • HIGH INTENSITY • BURN 800+ CAL
              </p>
              <div className="grid grid-cols-3 gap-6 text-white">
                <div>
                  <p className="text-3xl font-black text-yellow-500">6AM</p>
                  <p className="text-xs uppercase">Morning Burn</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-orange-500">12PM</p>
                  <p className="text-xs uppercase">Lunch Crush</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-red-500">6PM</p>
                  <p className="text-xs uppercase">Evening Sweat</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features - Bold Cards */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto"
          >
            {[
              { icon: '🏋️', label: 'Strength', color: 'bg-red-600' },
              { icon: '🔥', label: 'Cardio', color: 'bg-orange-600' },
              { icon: '🥊', label: 'Boxing', color: 'bg-yellow-600' },
              { icon: '🧘', label: 'Yoga', color: 'bg-green-600' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: -3 }}
                className="group cursor-pointer"
              >
                <div className={`${feature.color} p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300`}>
                  <div className="text-6xl mb-3 group-hover:scale-125 transition-transform">
                    {feature.icon}
                  </div>
                  <p className="text-black font-black text-lg uppercase tracking-wide">
                    {feature.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - Bold Action */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <button
              aria-label="Start free trial"
              className="group relative bg-black text-yellow-400 border-4 border-black font-black text-xl px-14 py-6 uppercase tracking-wide overflow-hidden shadow-[8px_8px_0px_0px_rgba(234,179,8,1)] hover:shadow-[12px_12px_0px_0px_rgba(234,179,8,1)] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                FREE TRIAL
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </button>
            <button
              aria-label="View class schedule"
              className="bg-yellow-500 text-black border-4 border-black font-black text-xl px-14 py-6 uppercase tracking-wide hover:bg-yellow-400 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              CLASS SCHEDULE
            </button>
          </motion.div>

          {/* Location Info - Bold Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="inline-block"
          >
            <div className="bg-black border-4 border-black px-12 py-8 shadow-[8px_8px_0px_0px_rgba(234,88,12,1)]">
              <div className="grid md:grid-cols-3 gap-8 text-left font-black">
                <div>
                  <div className="text-red-500 text-xs uppercase mb-2 tracking-widest">Location</div>
                  <div className="text-white text-lg">5420 N Lamar Blvd</div>
                  <div className="text-gray-400 text-sm">Austin, TX 78751</div>
                </div>
                <div>
                  <div className="text-orange-500 text-xs uppercase mb-2 tracking-widest">Hours</div>
                  <div className="text-white text-lg">24/7 ACCESS</div>
                  <div className="text-gray-400 text-sm">Open Every Day</div>
                </div>
                <div>
                  <div className="text-yellow-500 text-xs uppercase mb-2 tracking-widest">Contact</div>
                  <div className="text-white text-lg">(512) 555-IRON</div>
                  <div className="text-gray-400 text-sm">Get Fired Up!</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Intensity Meter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-0 left-0 right-0 h-4 bg-black"
        >
          <motion.div
            animate={{
              width: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-full bg-gradient-to-r from-red-600 via-yellow-500 to-green-500"
          />
        </motion.div>
      </section>

      {/* Programs Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-7xl font-black text-white mb-6 uppercase tracking-tight">
              CHOOSE YOUR PATH
            </h2>
            <div className="h-2 w-32 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'BEAST MODE',
                desc: 'Heavy lifting, max strength, pure power',
                price: '$89/mo',
                features: ['Unlimited Access', 'Personal Locker', 'Nutrition Guide', 'Progress Tracking'],
                color: 'from-red-600 to-red-700',
                borderColor: 'border-red-500'
              },
              {
                name: 'WARRIOR',
                desc: 'All classes, all access, all results',
                price: '$129/mo',
                features: ['Everything in Beast', '2 PT Sessions/mo', 'Meal Planning', 'Recovery Room'],
                color: 'from-orange-600 to-orange-700',
                borderColor: 'border-orange-500',
                popular: true
              },
              {
                name: 'LEGEND',
                desc: 'Elite training, premium experience',
                price: '$199/mo',
                features: ['Everything in Warrior', 'Unlimited PT', 'Supplements', 'VIP Events'],
                color: 'from-yellow-600 to-yellow-700',
                borderColor: 'border-yellow-500'
              }
            ].map((program, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className={`relative ${program.popular ? 'md:-mt-4' : ''}`}
              >
                {program.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-black text-xs font-black px-6 py-2 uppercase tracking-wider">
                    MOST POPULAR
                  </div>
                )}
                <div className={`h-full bg-gradient-to-br ${program.color} border-4 ${program.borderColor} p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]`}>
                  <h3 className="text-4xl font-black text-black mb-3 uppercase tracking-tight">
                    {program.name}
                  </h3>
                  <p className="text-black/80 font-bold mb-6 text-sm">{program.desc}</p>
                  <div className="mb-8">
                    <span className="text-6xl font-black text-black">{program.price}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {program.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-black font-bold">
                        <span className="text-2xl">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-black text-white py-5 font-black text-lg uppercase tracking-wide hover:bg-gray-900 transition-all duration-300 border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
                    JOIN NOW
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="border-8 border-yellow-500 p-16 bg-gradient-to-br from-red-600 to-orange-600">
              <motion.p
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl md:text-7xl text-black font-black leading-tight uppercase mb-8"
                style={{ fontFamily: 'Impact, sans-serif' }}
              >
                "THE ONLY BAD WORKOUT IS THE ONE YOU DIDN'T DO"
              </motion.p>
              <div className="h-2 w-24 bg-black mx-auto mb-6"></div>
              <p className="text-2xl text-black font-black uppercase tracking-widest">
                — IRON FORGE MINDSET
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 px-6 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500 relative overflow-hidden">
        {/* Energy Pulse Background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-black/20"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-8xl font-black text-black mb-8 uppercase"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            START TODAY
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl text-black font-black mb-12 uppercase"
          >
            Your Transformation Begins Now
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            aria-label="Claim free trial"
            className="bg-black text-yellow-400 border-8 border-black font-black text-2xl px-20 py-8 uppercase tracking-wide shadow-[16px_16px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,0.5)] transition-all duration-300"
          >
            CLAIM FREE TRIAL
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-black font-bold text-lg"
          >
            NO CONTRACT • NO COMMITMENT • JUST RESULTS
          </motion.p>
        </div>
      </section>

    </div>
  );
}
