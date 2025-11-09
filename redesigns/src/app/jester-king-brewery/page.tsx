'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function JesterKingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-green-50">

      {/* Hero - Rustic Farmhouse Aesthetic */}
      <section className="relative h-screen overflow-hidden">
        {/* Textured Background */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-amber-900 via-yellow-800 to-green-900"
        >
          {/* Wheat Field Pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ rotate: 0, y: 0 }}
                animate={{ rotate: [-2, 2, -2], y: [0, -10, 0] }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-2 h-24 bg-yellow-200 rounded-full"
                style={{
                  bottom: '0',
                  left: `${Math.random() * 100}%`,
                  transformOrigin: 'bottom'
                }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
        >
          {/* Crown/Jester Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="mb-8"
          >
            <div className="glass-strong rounded-full p-12 inline-block">
              <div className="text-8xl">👑</div>
            </div>
          </motion.div>

          {/* Title with Vintage Typography */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-7xl md:text-9xl font-bold text-white mb-4 font-serif tracking-tight"
          >
            JESTER KING
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-64 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-6"
          />

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-3xl text-yellow-100 mb-4 uppercase tracking-widest font-light"
          >
            Brewery
          </motion.p>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-12 italic max-w-2xl font-serif"
          >
            Farmhouse Ales & Wild Fermentation in the Texas Hill Country
          </motion.p>

          {/* Key Features */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl"
          >
            {[
              { icon: "🌾", text: "100% Oak-Aged" },
              { icon: "🦠", text: "Wild Fermented" },
              { icon: "🏞️", text: "Hill Country Brewed" }
            ].map((item, i) => (
              <div key={i} className="glass p-6 rounded-2xl">
                <div className="text-4xl mb-2">{item.icon}</div>
                <p className="text-white font-semibold">{item.text}</p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold text-lg px-12 py-4 rounded-full magnetic-btn shadow-2xl">
              Visit the Farm
            </button>
            <button className="glass-strong hover:bg-white/20 text-white font-bold text-lg px-12 py-4 rounded-full magnetic-btn border-2 border-white/30">
              View Beers
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center text-yellow-200"
        >
          <p className="text-sm mb-2 tracking-wide">SCROLL TO EXPLORE</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 relative bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-bold mb-6 gradient-text from-amber-900 to-green-800 font-serif">
              The Jester King Way
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We brew farmhouse ales inspired by the brewing traditions of Belgium and France.
              Our beers are fermented with wild yeast, aged in oak barrels, and brewed with a respect for the land.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Wild Fermentation",
                icon: "🦠",
                desc: "We embrace the unpredictable nature of wild yeast, creating complex, ever-evolving flavors"
              },
              {
                title: "Oak-Aged",
                icon: "🛢️",
                desc: "All our beers are aged in oak barrels, developing depth and character over time"
              },
              {
                title: "Farm-Focused",
                icon: "🌻",
                desc: "Brewed on our 165-acre farm in the Texas Hill Country with local ingredients"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.7 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-white to-amber-50 p-8 rounded-3xl hover-lift border border-amber-200 shadow-lg">
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beer List - Vintage Card Style */}
      <section className="py-24 px-6 bg-gradient-to-br from-amber-100 to-yellow-100">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-bold text-center mb-6 gradient-text from-amber-900 to-green-800 font-serif"
          >
            Our Ales
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-xl text-gray-700 mb-16"
          >
            Each beer is a unique expression of time, place, and tradition
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Le Petit Prince",
                style: "Farmhouse Table Beer",
                abv: "2.9%",
                desc: "Light, refreshing, infinitely drinkable. Perfect for long afternoons on the farm.",
                color: "from-yellow-200 to-yellow-300"
              },
              {
                name: "Commercial Suicide",
                style: "Dry-Hopped Farmhouse Ale",
                abv: "6.5%",
                desc: "Hoppy, funky, complex. Our flagship farmhouse ale with bold American hops.",
                color: "from-amber-200 to-orange-300"
              },
              {
                name: "SPON",
                style: "Spontaneously Fermented Ale",
                abv: "5.5%",
                desc: "Aged in oak with wild yeast. Tart, fruity, and endlessly fascinating.",
                color: "from-amber-300 to-yellow-400"
              },
              {
                name: "Black Metal Imperial Stout",
                style: "Oak-Aged Imperial Stout",
                abv: "11.5%",
                desc: "Dark, intense, bourbon barrel-aged. A meditation in liquid form.",
                color: "from-stone-700 to-stone-900"
              }
            ].map((beer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${beer.color} rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                <div className="relative glass-strong p-8 rounded-3xl hover-lift">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{beer.name}</h3>
                      <p className="text-gray-600 italic">{beer.style}</p>
                    </div>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${beer.color} bg-clip-text text-transparent`}>
                      {beer.abv}
                    </div>
                  </div>
                  <p className="text-gray-700">{beer.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Quote */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0.5, 0.7], ['0%', '30%']),
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-amber-900 to-yellow-800"></div>
          {/* Animated Sparkles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl mx-auto text-center px-6"
        >
          <div className="glass-strong p-16 rounded-3xl">
            <div className="text-8xl mb-8">🍺</div>
            <p className="text-4xl md:text-6xl font-serif italic text-white leading-relaxed mb-6">
              "Time, patience, and wild yeast create something extraordinary."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <p className="text-yellow-200 text-xl">Since 2010</p>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-yellow-400"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Visit Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-amber-900 via-yellow-800 to-green-900 relative overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-bold text-white mb-6 font-serif"
          >
            Visit the Brewery
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-yellow-100 mb-4"
          >
            165 Acres in the Texas Hill Country
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-yellow-200 mb-12"
          >
            Tours, Tastings, Events | Dog & Family Friendly
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-strong p-8 rounded-3xl mb-12 inline-block"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <p className="text-yellow-300 uppercase text-sm mb-2 tracking-wide">Hours</p>
                <p className="text-white font-semibold">Sat-Sun: 12-6 PM</p>
              </div>
              <div>
                <p className="text-yellow-300 uppercase text-sm mb-2 tracking-wide">Location</p>
                <p className="text-white font-semibold">Austin, TX</p>
              </div>
              <div>
                <p className="text-yellow-300 uppercase text-sm mb-2 tracking-wide">Reservations</p>
                <p className="text-white font-semibold">Walk-ins Welcome</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="bg-white text-amber-900 font-bold text-lg px-12 py-4 rounded-full hover:bg-yellow-50 transition-all duration-300 magnetic-btn shadow-2xl">
              Plan Your Visit
            </button>
            <button className="border-2 border-white text-white font-bold text-lg px-12 py-4 rounded-full hover:bg-white/10 transition-all duration-300 magnetic-btn backdrop-blur-lg">
              See Events
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
