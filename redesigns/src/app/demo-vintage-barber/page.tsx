'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function VintageBarberPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-amber-100 via-red-100 to-blue-100">

      {/* Hero - Retro 1950s */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Vintage Background */}
        <motion.div style={{ y }} className="absolute inset-0">
          {/* Retro Stripes Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-800 via-white to-blue-800">
            {/* Diagonal Stripes */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)',
            }}></div>
          </div>

          {/* Vintage Dots Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="3" fill="black"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)"/>
            </svg>
          </div>

          {/* Vintage Stars */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-300 text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              ★
            </motion.div>
          ))}
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Vintage Badge Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.6 }}
            className="mb-12"
          >
            <div className="inline-block relative">
              {/* Barber Pole */}
              <div className="w-48 h-48 mx-auto mb-8 relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full overflow-hidden border-8 border-white shadow-2xl"
                >
                  <div className="absolute inset-0" style={{
                    background: 'repeating-linear-gradient(45deg, #EF4444 0px, #EF4444 20px, white 20px, white 40px, #3B82F6 40px, #3B82F6 60px)',
                  }}></div>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center shadow-lg">
                    <span className="text-5xl">✂️</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vintage Typography */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-8xl md:text-9xl font-black text-white mb-2"
                style={{
                  fontFamily: 'Impact, sans-serif',
                  textShadow: '6px 6px 0 #EF4444, 12px 12px 0 #3B82F6',
                  letterSpacing: '0.1em'
                }}>
              CLASSIC
            </h1>
            <div className="inline-block bg-white px-12 py-4 border-8 border-red-600 shadow-2xl transform -rotate-2">
              <h2 className="text-5xl font-black text-red-600"
                  style={{ fontFamily: 'Impact, sans-serif' }}>
                CUTS
              </h2>
            </div>
          </motion.div>

          {/* Vintage Ribbon */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="my-8"
          >
            <div className="inline-block bg-blue-600 px-16 py-3 border-4 border-white shadow-lg">
              <p className="text-2xl text-white font-bold uppercase tracking-widest">
                Est. 1955
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-2xl text-white font-bold mb-16 uppercase tracking-wide"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
          >
            Traditional Barbering • Modern Gentleman
          </motion.p>

          {/* Services - Retro Cards */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
          >
            {[
              { icon: '💈', service: 'Haircut', price: '$30' },
              { icon: '🪒', service: 'Shave', price: '$35' },
              { icon: '✂️', service: 'Trim', price: '$25' }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
                className="bg-white border-8 border-red-600 p-8 shadow-2xl transform hover:shadow-yellow-400/50 transition-all duration-300"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-black text-red-600 mb-2 uppercase">{item.service}</h3>
                <div className="text-4xl font-black text-blue-600">{item.price}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA - Vintage Button */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 border-8 border-red-600 text-red-600 font-black text-2xl px-16 py-6 shadow-2xl hover:shadow-blue-600/50 transition-all duration-300 uppercase"
            >
              Book Your Cut
            </motion.button>
          </motion.div>

          {/* Vintage Banner */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-16"
          >
            <div className="inline-block bg-gradient-to-r from-red-600 via-white to-blue-600 p-1">
              <div className="bg-white px-12 py-6">
                <p className="text-red-600 font-bold text-sm uppercase tracking-widest mb-1">Walk-Ins Welcome</p>
                <p className="text-blue-600 font-black text-xl">Mon-Sat: 8AM - 6PM</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vintage Corner Ornaments */}
        {[
          { corner: 'top-4 left-4', rotate: 0 },
          { corner: 'top-4 right-4', rotate: 90 },
          { corner: 'bottom-4 left-4', rotate: -90 },
          { corner: 'bottom-4 right-4', rotate: 180 }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6 + i * 0.1, duration: 0.3 }}
            className={`absolute ${item.corner} text-6xl text-yellow-400`}
            style={{ rotate: `${item.rotate}deg` }}
          >
            ★
          </motion.div>
        ))}
      </section>

      {/* Services Section - Retro Style */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        {/* Vintage Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, #EF4444 50px, #EF4444 52px), repeating-linear-gradient(90deg, transparent, transparent 50px, #3B82F6 50px, #3B82F6 52px)',
          }} className="absolute inset-0"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-red-600 px-12 py-4 border-8 border-blue-600 shadow-xl mb-4">
              <h2 className="text-6xl font-black text-white uppercase" style={{ fontFamily: 'Impact, sans-serif' }}>
                Our Services
              </h2>
            </div>
            <p className="text-xl text-gray-700 mt-6 font-bold">
              Traditional techniques meet modern style
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                service: "Gentleman's Haircut",
                price: "$30",
                desc: "Classic scissor cut with hot towel treatment and styling"
              },
              {
                service: "Traditional Shave",
                price: "$35",
                desc: "Straight razor shave with hot lather and aftershave"
              },
              {
                service: "Beard Sculpting",
                price: "$25",
                desc: "Professional beard trim and shape with hot towel"
              },
              {
                service: "Deluxe Package",
                price: "$55",
                desc: "Haircut and shave combo - the full experience"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-red-50 to-blue-50 border-8 border-red-600 p-8 group-hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl font-black text-red-600 group-hover:text-blue-600 transition-colors uppercase">
                      {item.service}
                    </h3>
                    <span className="text-4xl font-black text-blue-600 group-hover:text-red-600 transition-colors">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-gray-700 font-semibold">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Quote - Retro */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0.5, 0.7], ['0%', '30%']) }}
          className="absolute inset-0 bg-gradient-to-r from-red-600 via-yellow-400 to-blue-600"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 text-center px-6"
        >
          <div className="bg-white border-8 border-black p-12 inline-block shadow-2xl">
            <p className="text-5xl font-black text-red-600 mb-4 uppercase" style={{ fontFamily: 'Impact, sans-serif' }}>
              Looking Sharp<br/>Since 1955
            </p>
            <div className="h-2 w-32 mx-auto bg-blue-600"></div>
          </div>
        </motion.div>
      </section>

      {/* CTA Footer - Retro */}
      <section className="py-24 px-6 bg-gradient-to-br from-red-600 via-yellow-400 to-blue-600 relative overflow-hidden">
        {/* Vintage Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div style={{
            backgroundImage: 'repeating-radial-gradient(circle at 0 0, transparent 0, black 10px, transparent 20px)',
          }} className="absolute inset-0"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-8 border-black p-16 shadow-2xl"
          >
            <h2 className="text-7xl font-black text-red-600 mb-6 uppercase" style={{ fontFamily: 'Impact, sans-serif' }}>
              Visit Us Today!
            </h2>

            <p className="text-2xl text-blue-600 font-black mb-8 uppercase">
              No Appointment Needed
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 border-8 border-red-600 text-red-600 font-black text-2xl px-16 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 uppercase"
            >
              Get Directions
            </motion.button>

            <div className="mt-8 text-gray-700">
              <p className="font-black text-lg uppercase">Cedar Park, TX</p>
              <p className="font-bold">(512) 555-1955</p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
