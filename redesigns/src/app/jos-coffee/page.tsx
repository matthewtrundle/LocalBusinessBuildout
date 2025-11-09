'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function JosCoffeePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-pink-50">

      {/* Hero - Instagram Famous */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-400 via-red-400 to-orange-400">
        {/* Floating Hearts */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-5xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            ❤️
          </motion.div>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Famous Wall Quote */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-12"
          >
            <div className="inline-block bg-white p-12 rounded-3xl shadow-2xl border-8 border-red-500 transform -rotate-2">
              <motion.h1
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-7xl md:text-8xl font-black mb-4"
                style={{
                  fontFamily: 'Brush Script MT, cursive',
                  background: 'linear-gradient(45deg, #EC4899, #EF4444)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                i love you
              </motion.h2>
              <motion.h2
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="text-7xl md:text-8xl font-black"
                style={{
                  fontFamily: 'Brush Script MT, cursive',
                  background: 'linear-gradient(45deg, #EC4899, #EF4444)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                so much
              </motion.h2>
            </div>
          </motion.div>

          {/* Jo's Branding */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <h2 className="text-6xl font-black text-white mb-4 tracking-tight">
              JO'S COFFEE
            </h2>
            <p className="text-2xl text-white/90 mb-12 font-bold">
              Austin's Most Instagrammable Coffee Shop
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-12"
          >
            {[
              { number: '📸', label: '#iloveyousomuch', stat: '500K+ Posts' },
              { number: '☕', label: 'Daily Brews', stat: '1000+' },
              { number: '⭐', label: 'Google Rating', stat: '4.7/5' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-4 border-white shadow-xl"
              >
                <div className="text-4xl mb-2">{item.number}</div>
                <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-xl font-black text-pink-600">{item.stat}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="bg-white text-pink-600 font-black text-xl px-12 py-5 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-pink-600">
              📍 South Congress Location
            </button>
            <button className="bg-pink-600 text-white font-black text-xl px-12 py-5 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-white">
              ☕ View Menu
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 text-white text-sm"
          >
            📷 Tag us @joscoffee to be featured!
          </motion.p>
        </div>
      </section>

      {/* Menu - Vibrant Coffee */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-black text-center mb-16 text-pink-600"
          >
            OUR MENU
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Iced Latte',
                desc: 'Smooth espresso over ice with milk',
                price: '$4.50',
                color: 'from-amber-400 to-orange-500'
              },
              {
                name: 'Cappuccino',
                desc: 'Classic Italian espresso with foam',
                price: '$4.00',
                color: 'from-pink-400 to-pink-500'
              },
              {
                name: 'Cold Brew',
                desc: 'Smooth, refreshing cold-steeped coffee',
                price: '$4.50',
                color: 'from-blue-400 to-cyan-500'
              },
              {
                name: 'Americano',
                desc: 'Espresso shots with hot water',
                price: '$3.50',
                color: 'from-gray-700 to-gray-900'
              },
              {
                name: 'Mocha',
                desc: 'Chocolate, espresso, steamed milk',
                price: '$5.00',
                color: 'from-red-600 to-pink-600'
              },
              {
                name: 'Matcha Latte',
                desc: 'Premium Japanese green tea latte',
                price: '$5.50',
                color: 'from-green-400 to-emerald-500'
              },
            ].map((drink, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="group"
              >
                <div className={`bg-gradient-to-br ${drink.color} p-1 rounded-3xl h-full`}>
                  <div className="bg-white rounded-3xl p-6 h-full hover:bg-gray-50 transition-colors">
                    <h3 className="text-3xl font-black text-gray-900 mb-3">{drink.name}</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">{drink.desc}</p>
                    <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
                      <span className="text-3xl font-black text-pink-600">{drink.price}</span>
                      <button className="bg-pink-600 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-pink-700 transition-colors">
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Famous Wall */}
      <section className="py-24 px-6 bg-gradient-to-r from-pink-500 to-red-500 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm p-12 rounded-3xl border-4 border-white"
          >
            <div className="text-7xl mb-6">📸</div>
            <h2 className="text-6xl font-black mb-6">THE FAMOUS WALL</h2>
            <p className="text-2xl mb-8 leading-relaxed">
              Our iconic "i love you so much" mural has become Austin's most
              photographed spot, with over <span className="font-black">500,000 posts</span> on Instagram!
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-5xl font-black mb-2">1300</p>
                <p className="text-sm uppercase tracking-wider">South Congress</p>
              </div>
              <div>
                <p className="text-5xl font-black mb-2">🎨</p>
                <p className="text-sm uppercase tracking-wider">Hand-Painted</p>
              </div>
              <div>
                <p className="text-5xl font-black mb-2">Daily</p>
                <p className="text-sm uppercase tracking-wider">Photo Ops</p>
              </div>
            </div>
            <p className="text-xl italic">
              "The perfect backdrop for your next Instagram post!"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 px-6 bg-pink-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-black text-center mb-16 text-pink-600"
          >
            OUR LOCATIONS
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'South Congress',
                address: '1300 S Congress Ave',
                note: 'Home of the famous wall!',
                hours: 'Daily 7AM-8PM',
                highlight: true
              },
              {
                name: 'Airport Blvd',
                address: '4001 N Interstate 35',
                note: 'North Austin location',
                hours: 'Daily 6AM-7PM',
                highlight: false
              },
            ].map((loc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.7 }}
                className={`${
                  loc.highlight
                    ? 'bg-gradient-to-br from-pink-500 to-red-500 text-white'
                    : 'bg-white'
                } p-8 rounded-3xl border-4 ${loc.highlight ? 'border-yellow-400' : 'border-pink-300'} shadow-xl relative`}
              >
                {loc.highlight && (
                  <div className="absolute -top-4 right-4 bg-yellow-400 text-pink-600 text-xs font-black px-4 py-2 rounded-full rotate-12">
                    FAMOUS WALL HERE!
                  </div>
                )}
                <h3 className={`text-4xl font-black mb-4 ${loc.highlight ? 'text-white' : 'text-pink-600'}`}>
                  {loc.name}
                </h3>
                <p className={`text-xl mb-2 ${loc.highlight ? 'text-pink-100' : 'text-gray-700'}`}>
                  {loc.address}
                </p>
                <p className={`text-lg mb-4 italic ${loc.highlight ? 'text-pink-200' : 'text-gray-600'}`}>
                  {loc.note}
                </p>
                <div className="pt-4 border-t-2 border-white/30">
                  <p className={`text-sm uppercase tracking-wider ${loc.highlight ? 'text-pink-100' : 'text-gray-600'}`}>
                    Hours
                  </p>
                  <p className={`text-lg font-bold ${loc.highlight ? 'text-white' : 'text-pink-600'}`}>
                    {loc.hours}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-center mb-12 text-pink-600"
          >
            THE JO'S STORY
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6 text-xl leading-relaxed text-gray-700"
          >
            <p>
              Since 1999, Jo's Coffee has been a <span className="text-pink-600 font-bold">South Congress staple</span>,
              serving Austin's best coffee with a side of charm.
            </p>
            <p>
              When local artist Amy Cook painted the famous <span className="text-pink-600 font-bold">"i love you so much"</span> mural
              on our wall, we became more than a coffee shop – we became an Austin icon.
            </p>
            <p>
              Today, people from all over the world visit Jo's not just for the coffee, but for
              that <span className="text-pink-600 font-bold">perfect Instagram moment</span> in front of our famous wall.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-pink-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-black mb-8"
          >
            VISIT US TODAY
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl mb-12"
          >
            Great coffee. Iconic wall. Unforgettable experience.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white text-pink-600 font-black text-2xl px-16 py-6 rounded-full hover:scale-105 transition-transform duration-300 shadow-2xl"
          >
            📍 GET DIRECTIONS
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <p className="text-sm uppercase tracking-widest mb-4">FOLLOW THE LOVE</p>
            <p className="text-lg">
              @joscoffee on Instagram • Facebook • TikTok
            </p>
            <p className="mt-4 text-pink-200">
              #iloveyousomuch #joscoffee #austintx
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
