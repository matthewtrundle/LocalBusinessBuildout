'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function TorchysTacosPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-orange-50">

      {/* Hero - Damn Good Tacos */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400">
        {/* Floating Taco Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {i % 3 === 0 ? '🌮' : i % 3 === 1 ? '🌶️' : '🔥'}
          </motion.div>
        ))}

        {/* Diagonal Stripes */}
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 20px, transparent 20px, transparent 40px)',
             }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-8"
          >
            <div className="inline-block bg-black p-4 rounded-full border-8 border-white shadow-2xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-6xl"
              >
                🔥
              </motion.div>
            </div>
          </motion.div>

          {/* Torchy's Branding */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-8xl md:text-9xl font-black text-white mb-4 tracking-tighter"
            style={{
              fontFamily: 'Impact, sans-serif',
              textShadow: '6px 6px 0px rgba(0,0,0,0.3), 12px 12px 0px rgba(0,0,0,0.1)',
            }}
          >
            TORCHY'S
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-3 w-96 mx-auto mb-6"
            style={{
              background: 'repeating-linear-gradient(90deg, #DC2626 0px, #DC2626 30px, #FFF 30px, #FFF 60px)',
            }}
          />

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-5xl md:text-6xl font-black text-yellow-300 mb-12 tracking-wide"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            DAMN GOOD TACOS
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-3xl text-white font-bold mb-16"
          >
            Started in Austin. Now Everywhere.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          >
            {[
              { icon: '🌮', label: 'Tacos', color: 'from-orange-500 to-red-500' },
              { icon: '🥤', label: 'Margaritas', color: 'from-green-500 to-lime-500' },
              { icon: '🌯', label: 'Burritos', color: 'from-yellow-500 to-orange-500' },
              { icon: '🌶️', label: 'Queso', color: 'from-red-500 to-pink-500' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl border-4 border-white shadow-xl cursor-pointer`}
              >
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-white font-black text-lg uppercase">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="bg-black text-yellow-300 font-black text-xl px-12 py-5 rounded-full border-4 border-white shadow-2xl hover:scale-105 transition-transform duration-300 uppercase">
              🌮 Order Now
            </button>
            <button className="bg-white text-red-600 font-black text-xl px-12 py-5 rounded-full border-4 border-black shadow-2xl hover:scale-105 transition-transform duration-300 uppercase">
              📍 Find Location
            </button>
          </motion.div>
        </div>
      </section>

      {/* Menu - Signature Tacos */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-black text-center mb-16 text-red-600"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            TACO OF THE MONTH
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'The Trailer Park',
                desc: 'Fried chicken, green chiles, lettuce, pico, cheese',
                price: '$5.25',
                badge: 'CLASSIC',
                color: 'from-orange-600 to-red-600'
              },
              {
                name: 'Brushfire',
                desc: 'Jamaican jerk chicken, grilled jalapeños, mango',
                price: '$5.50',
                badge: 'SPICY 🔥',
                color: 'from-red-600 to-pink-600'
              },
              {
                name: 'Democrat',
                desc: 'BBQ brisket, jalapeño sausage, pickled red onions',
                price: '$5.95',
                badge: 'POPULAR',
                color: 'from-blue-600 to-purple-600'
              },
              {
                name: 'Mr. Orange',
                desc: 'Fried chicken, house queso, jalapeños',
                price: '$5.25',
                badge: 'FAN FAVORITE',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                name: 'Crossroads',
                desc: 'Smoked brisket, fried poblano, salsa verde',
                price: '$5.95',
                badge: 'SMOKY',
                color: 'from-gray-700 to-gray-900'
              },
              {
                name: 'Independent',
                desc: 'Blackened chicken, avocado, lime',
                price: '$5.50',
                badge: 'HEALTHY',
                color: 'from-green-600 to-emerald-600'
              },
            ].map((taco, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="group relative"
              >
                {/* Badge */}
                <div className="absolute -top-4 right-4 bg-yellow-400 text-black text-xs font-black px-4 py-2 rounded-full z-10 rotate-12 border-2 border-black">
                  {taco.badge}
                </div>

                <div className={`bg-gradient-to-br ${taco.color} p-1 rounded-3xl h-full`}>
                  <div className="bg-white rounded-3xl p-6 h-full">
                    <h3 className="text-3xl font-black text-gray-900 mb-3">{taco.name}</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">{taco.desc}</p>
                    <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
                      <span className="text-3xl font-black text-red-600">{taco.price}</span>
                      <button className="bg-black text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors">
                        Add to Order
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Queso Call-out */}
      <section className="py-24 px-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-black p-12 rounded-3xl border-8 border-white shadow-2xl"
          >
            <div className="text-8xl mb-6">🧀</div>
            <h2 className="text-6xl font-black text-yellow-400 mb-4" style={{ fontFamily: 'Impact, sans-serif' }}>
              LEGENDARY QUESO
            </h2>
            <p className="text-2xl text-white mb-8">
              Our famous green chile queso is what dreams are made of
            </p>
            <div className="flex justify-center gap-6">
              <div className="text-center">
                <p className="text-5xl font-black text-yellow-300">$6.95</p>
                <p className="text-white text-sm">Small</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-black text-yellow-300">$9.95</p>
                <p className="text-white text-sm">Large</p>
              </div>
            </div>
            <button className="mt-8 bg-yellow-400 text-black font-black text-xl px-12 py-4 rounded-full hover:bg-yellow-300 transition-colors uppercase border-4 border-black">
              Order Queso Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-center mb-12 text-yellow-400"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            THE TORCHY'S STORY
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6 text-xl leading-relaxed"
          >
            <p>
              Started in 2006 from a <span className="text-yellow-400 font-bold">mobile trailer</span> with a
              simple philosophy: make <span className="text-orange-400 font-bold">damn good tacos</span> using
              fresh, quality ingredients.
            </p>
            <p>
              What began on South 1st Street in Austin has grown to over <span className="text-yellow-400 font-bold">100+ locations</span> across
              the country, but we've never forgotten our roots.
            </p>
            <p>
              Every taco is still made <span className="text-orange-400 font-bold">fresh to order</span>, every
              ingredient is hand-selected, and every location keeps that Austin energy alive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Locations CTA */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-black mb-8 text-yellow-400"
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            FIND YOUR TORCHY'S
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl mb-12"
          >
            100+ locations and counting
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-black text-2xl px-16 py-6 rounded-full hover:scale-105 transition-transform duration-300 border-4 border-yellow-400 uppercase"
          >
            📍 Locations Near You
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-gray-400"
          >
            <p className="text-sm uppercase tracking-widest mb-4">Follow the Heat</p>
            <p className="text-lg">@torchystacos on Instagram • Facebook • Twitter</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
