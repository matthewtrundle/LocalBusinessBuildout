'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function OrganicFarmPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <div ref={containerRef} className="min-h-screen bg-amber-50">

      {/* Hero - Rustic Organic Farm */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Earthy Background with Texture */}
        <motion.div
          style={{ y, scale }}
          className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-green-100"
        >
          {/* Organic Pattern Overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="organic-dots" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="2" fill="#7C2D12"/>
                  <circle cx="15" cy="45" r="1.5" fill="#854D0E"/>
                  <circle cx="45" cy="15" r="1" fill="#065F46"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#organic-dots)" />
            </svg>
          </div>

          {/* Floating Leaves */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 20, 0],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            >
              {i % 3 === 0 ? '🍂' : i % 3 === 1 ? '🌿' : '🍃'}
            </motion.div>
          ))}
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Farm Logo - Hand-drawn Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-12"
          >
            {/* Sun Icon */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-32 h-32 mx-auto mb-8 relative"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500"></div>
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-8 bg-amber-400 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0.5px 0px',
                    transform: `rotate(${i * 30}deg) translateY(-70px)`,
                  }}
                />
              ))}
            </motion.div>

            <h1 className="text-7xl md:text-9xl font-black text-amber-900 mb-4"
                style={{ fontFamily: 'Georgia, serif', textShadow: '3px 3px 0px rgba(251, 191, 36, 0.3)' }}>
              Harvest Haven
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-700 to-transparent"></div>
              <p className="text-2xl text-amber-800 uppercase tracking-wider font-bold">
                Organic Farm
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-700 to-transparent"></div>
            </div>
            <p className="text-lg text-amber-700 italic">Est. 2010 • Family Owned & Operated</p>
          </motion.div>

          {/* Rustic Tagline */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-3xl text-amber-900 mb-16 italic font-serif max-w-3xl mx-auto leading-relaxed"
          >
            From our soil to your table—100% organic, locally grown produce
            <br />
            <span className="text-xl text-green-700">🌱 No pesticides • No GMOs • Pure goodness</span>
          </motion.p>

          {/* Farm Features - Wooden Signs */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="grid md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto"
          >
            {[
              { icon: '🌾', label: 'Fresh Daily', desc: 'Harvested Each Morning' },
              { icon: '🥕', label: 'Organic', desc: 'USDA Certified' },
              { icon: '🚜', label: 'Local', desc: 'Austin Grown' },
              { icon: '🌻', label: 'Seasonal', desc: 'Peak Ripeness' }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, rotate: i % 2 === 0 ? 2 : -2 }}
                className="bg-gradient-to-br from-amber-600 to-orange-700 p-8 rounded-lg shadow-xl border-4 border-amber-900"
                style={{
                  backgroundImage: 'linear-gradient(45deg, #92400e 25%, transparent 25%, transparent 75%, #92400e 75%, #92400e), linear-gradient(45deg, #92400e 25%, transparent 25%, transparent 75%, #92400e 75%, #92400e)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 10px 10px',
                }}
              >
                <div className="bg-amber-50 rounded-lg p-6 border-2 border-amber-900">
                  <div className="text-5xl mb-3">{item.icon}</div>
                  <h3 className="text-xl text-amber-900 font-black mb-1">{item.label}</h3>
                  <p className="text-sm text-amber-800 font-semibold">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs - Rustic Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <button
              aria-label="Shop fresh produce"
              className="bg-gradient-to-r from-green-700 to-green-800 text-white font-bold text-lg px-12 py-5 rounded-full border-4 border-green-900 shadow-xl hover:scale-105 transition-transform duration-300"
            >
              🛒 Shop Produce
            </button>
            <button
              aria-label="Visit the farm"
              className="bg-amber-100 text-amber-900 font-bold text-lg px-12 py-5 rounded-full border-4 border-amber-900 shadow-xl hover:bg-amber-200 transition-all duration-300"
            >
              🚜 Visit Farm
            </button>
          </motion.div>

          {/* Farm Market Info - Wooden Board */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="inline-block"
          >
            <div className="bg-gradient-to-br from-amber-800 to-amber-900 p-2 rounded-2xl border-4 border-amber-950 shadow-2xl">
              <div className="bg-amber-100 p-10 rounded-xl border-2 border-amber-900">
                <div className="grid md:grid-cols-3 gap-8 text-left font-bold">
                  <div>
                    <div className="text-green-700 text-xs uppercase mb-2 tracking-wider">📍 Location</div>
                    <div className="text-amber-900 text-lg">15420 FM 1431</div>
                    <div className="text-amber-700 text-sm">Marble Falls, TX</div>
                  </div>
                  <div>
                    <div className="text-orange-700 text-xs uppercase mb-2 tracking-wider">⏰ Market Hours</div>
                    <div className="text-amber-900 text-lg">Sat-Sun: 7AM-2PM</div>
                    <div className="text-amber-700 text-sm">Weekdays by appointment</div>
                  </div>
                  <div>
                    <div className="text-red-700 text-xs uppercase mb-2 tracking-wider">☎️ Contact</div>
                    <div className="text-amber-900 text-lg">(512) 555-FARM</div>
                    <div className="text-amber-700 text-sm">hello@harvesthaven.farm</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Growing - Seasonal Produce */}
      <section className="py-24 px-6 bg-gradient-to-b from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-black text-green-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              What's Growing Now
            </h2>
            <div className="h-2 w-32 bg-green-700 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-green-800 italic">Fresh picked this week</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Heirloom Tomatoes",
                season: "Peak Season",
                desc: "Sweet, juicy varieties in red, yellow, and purple",
                emoji: "🍅",
                price: "$4/lb"
              },
              {
                name: "Baby Greens Mix",
                season: "Available Now",
                desc: "Lettuce, arugula, spinach, and kale blend",
                emoji: "🥬",
                price: "$6/bag"
              },
              {
                name: "Sweet Corn",
                season: "Limited Time",
                desc: "Picked at sunrise for maximum sweetness",
                emoji: "🌽",
                price: "$5/dozen"
              },
              {
                name: "Rainbow Carrots",
                season: "Available Now",
                desc: "Orange, purple, yellow, and white varieties",
                emoji: "🥕",
                price: "$3/bunch"
              },
              {
                name: "Summer Squash",
                season: "Peak Season",
                desc: "Zucchini, yellow squash, and pattypan",
                emoji: "🥒",
                price: "$3/lb"
              },
              {
                name: "Fresh Herbs",
                season: "Year-Round",
                desc: "Basil, cilantro, parsley, and more",
                emoji: "🌿",
                price: "$2/bunch"
              }
            ].map((produce, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="group"
              >
                <div className="bg-white rounded-2xl border-4 border-green-800 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {produce.emoji}
                  </div>
                  <span className="inline-block bg-green-600 text-white text-xs px-3 py-1 rounded-full mb-3 font-bold">
                    {produce.season}
                  </span>
                  <h3 className="text-2xl font-black text-green-900 mb-2">{produce.name}</h3>
                  <p className="text-green-700 text-sm mb-4 leading-relaxed">{produce.desc}</p>
                  <div className="flex justify-between items-center pt-4 border-t-2 border-green-200">
                    <span className="text-2xl font-black text-green-800">{produce.price}</span>
                    <button className="bg-green-700 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-green-800 transition-colors">
                      Add to Basket
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Farm Story */}
      <section className="py-24 px-6 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-black text-amber-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Our Story
            </h2>
            <div className="h-2 w-24 bg-amber-700 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border-4 border-amber-900 p-12 shadow-2xl"
          >
            <p className="text-xl text-amber-900 leading-relaxed mb-6 font-serif italic">
              Three generations of farmers have tended this land, passed down from my grandparents who
              believed in growing food the right way—naturally, sustainably, and with love.
            </p>
            <p className="text-lg text-amber-800 leading-relaxed mb-6">
              Today, we continue that tradition on our 40-acre certified organic farm. Every seed we plant,
              every crop we nurture, and every harvest we gather reflects our commitment to your health
              and our planet's future.
            </p>
            <div className="flex items-center gap-4 pt-6 border-t-2 border-amber-200">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-3xl">
                👨‍🌾
              </div>
              <div>
                <p className="font-black text-amber-900 text-lg">The Johnson Family</p>
                <p className="text-sm text-amber-700">Farmers since 1952</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-800 via-emerald-800 to-green-900 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl">🌻</div>
          <div className="absolute bottom-10 right-10 text-9xl">🌾</div>
          <div className="absolute top-1/2 left-1/4 text-7xl">🍃</div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-black mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Visit Us This Weekend!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl mb-10 text-green-100"
          >
            Farm tours, fresh produce, and family fun await
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            aria-label="Get directions to farm"
            className="bg-amber-500 text-amber-950 font-black text-xl px-16 py-6 rounded-full border-4 border-amber-700 shadow-2xl hover:bg-amber-400 transition-all duration-300 hover:scale-105"
          >
            🗺️ Get Directions
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-green-200 text-sm"
          >
            Free tractor rides for kids every Saturday! • Bring your own basket or buy one here
          </motion.p>
        </div>
      </section>

    </div>
  );
}
