'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function UchiPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black">

      {/* Hero - Elegant Minimal */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Subtle Japanese Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="japanese-waves" width="100" height="50" patternUnits="userSpaceOnUse">
                <path d="M0 25 Q 25 15, 50 25 T 100 25" fill="none" stroke="white" strokeWidth="1"/>
                <path d="M0 35 Q 25 25, 50 35 T 100 35" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#japanese-waves)" />
          </svg>
        </div>

        {/* Floating Accent Lines */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"
            style={{
              width: `${300 + i * 100}px`,
              top: `${30 + i * 20}%`,
              left: `${20 - i * 10}%`,
            }}
            animate={{
              x: [0, 50, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i,
            }}
          />
        ))}

        <motion.div
          style={{ opacity }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        >
          {/* Japanese Circle Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 inline-block"
          >
            <div className="relative w-32 h-32">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-red-600 rounded-full"
              />
              <div className="absolute inset-4 border border-red-600/50 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-red-600 text-2xl font-bold">宇</span>
              </div>
            </div>
          </motion.div>

          {/* Uchi Logo */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="text-8xl md:text-9xl font-thin text-white mb-8 tracking-widest"
            style={{ fontFamily: 'Didot, Georgia, serif', letterSpacing: '0.3em' }}
          >
            UCHI
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-px w-64 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-6"
          />

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-xl text-gray-400 mb-16 tracking-[0.5em] uppercase font-light"
          >
            Contemporary Japanese
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="text-2xl text-gray-300 mb-20 font-light italic max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            "Where traditional Japanese craftsmanship meets innovative modern cuisine"
          </motion.p>

          {/* Experience Highlights */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="grid md:grid-cols-3 gap-12 mb-20"
          >
            {[
              { title: 'Omakase', subtitle: 'Chef\'s Selection' },
              { title: 'Sake Bar', subtitle: '100+ Premium Varieties' },
              { title: 'Private Dining', subtitle: 'Intimate Experiences' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 border border-red-600 mx-auto mb-4 transform rotate-45"></div>
                <h3 className="text-xl text-white font-light uppercase tracking-widest mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm font-light">{item.subtitle}</p>
              </div>
            ))}
          </motion.div>

          {/* Reservation CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            <button className="border-2 border-red-600 text-white px-16 py-5 text-sm uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-500 font-light">
              Reserve Your Table
            </button>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-16 text-gray-500 text-sm font-light"
          >
            <p className="uppercase tracking-[0.3em] text-xs mb-2">Austin</p>
            <p>801 S Lamar Blvd • (512) 916-4808</p>
            <p className="mt-4">Mon–Thu 5–10 PM • Fri–Sat 5–11 PM • Sun 5–9 PM</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Menu Preview */}
      <section className="py-32 px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-thin text-white mb-6 tracking-wider">
              Signature Dishes
            </h2>
            <div className="h-px w-32 bg-red-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            {[
              {
                name: 'Hama Chili',
                desc: 'Yellowtail, ponzu, thai chili, orange supreme',
                category: 'Cold Tastings',
                price: '$18'
              },
              {
                name: 'Maguro Sashimi',
                desc: 'Tuna, ginger, soy, wasabi',
                category: 'Sashimi',
                price: '$22'
              },
              {
                name: 'Wagyu Hot Rock',
                desc: 'A5 wagyu, hot stone, sea salt, wasabi',
                category: 'Hot Tastings',
                price: '$48'
              },
              {
                name: 'Sake Toro',
                desc: 'Salmon belly, yuzu, ikura, micro shiso',
                category: 'Nigiri',
                price: '$16'
              },
              {
                name: 'Jar Jar Duck',
                desc: 'Smoked duck, watermelon, cashews',
                category: 'Makimono',
                price: '$14'
              },
              {
                name: 'Chocolate Cake',
                desc: 'Belgian chocolate, bourbon, sea salt',
                category: 'Desserts',
                price: '$12'
              },
            ].map((dish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="border-b border-zinc-800 pb-8"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl text-white font-light">{dish.name}</h3>
                  <span className="text-xl text-red-600 font-light">{dish.price}</span>
                </div>
                <p className="text-gray-400 text-sm mb-2 leading-relaxed font-light">
                  {dish.desc}
                </p>
                <span className="text-xs text-gray-600 uppercase tracking-widest">
                  {dish.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sake Bar */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="border-2 border-red-600 p-16 rounded-none">
              <div className="text-6xl mb-8">🍶</div>
              <h2 className="text-5xl font-thin text-white mb-6 tracking-wider">
                Premium Sake Selection
              </h2>
              <div className="h-px w-24 bg-red-600 mx-auto mb-8"></div>
              <p className="text-xl text-gray-400 mb-8 font-light max-w-2xl mx-auto leading-relaxed">
                Curated collection of over 100 premium sakes from renowned Japanese breweries
              </p>
              <div className="grid grid-cols-3 gap-8 text-center mb-8">
                <div>
                  <p className="text-4xl font-light text-red-600 mb-2">100+</p>
                  <p className="text-sm text-gray-500 uppercase tracking-widest">Varieties</p>
                </div>
                <div>
                  <p className="text-4xl font-light text-red-600 mb-2">15</p>
                  <p className="text-sm text-gray-500 uppercase tracking-widest">Regions</p>
                </div>
                <div>
                  <p className="text-4xl font-light text-red-600 mb-2">Daily</p>
                  <p className="text-sm text-gray-500 uppercase tracking-widest">Tastings</p>
                </div>
              </div>
              <button className="border border-red-600 text-red-600 px-12 py-4 text-sm uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-500 font-light">
                View Sake Menu
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chef Philosophy */}
      <section className="py-32 px-6 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-thin text-white mb-8 tracking-wider">
              Philosophy
            </h2>
            <div className="h-px w-24 bg-red-600 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8 text-center"
          >
            <p className="text-3xl text-gray-300 font-light leading-relaxed italic"
               style={{ fontFamily: 'Georgia, serif' }}>
              "We honor traditional Japanese techniques while embracing innovation,
              creating dishes that surprise and delight."
            </p>
            <div className="flex items-center justify-center gap-4 pt-6">
              <div className="h-px w-16 bg-gray-600"></div>
              <p className="text-sm uppercase tracking-widest text-gray-600">Tyson Cole, Chef</p>
              <div className="h-px w-16 bg-gray-600"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-thin text-white mb-8 tracking-wider">
              Recognition
            </h2>
            <div className="h-px w-24 bg-red-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                award: 'James Beard Award',
                detail: 'Best Chef Southwest',
                year: '2011'
              },
              {
                award: 'Esquire Magazine',
                detail: 'Best New Restaurant',
                year: '2005'
              },
              {
                award: 'Zagat',
                detail: 'Top Food in Austin',
                year: 'Multiple Years'
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center border border-zinc-800 p-8"
              >
                <div className="text-red-600 text-sm uppercase tracking-widest mb-4">
                  {item.year}
                </div>
                <h3 className="text-xl text-white font-light mb-2">
                  {item.award}
                </h3>
                <p className="text-gray-500 text-sm font-light">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-32 px-6 bg-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-thin text-white mb-8 tracking-wider"
          >
            Experience Uchi
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-red-100 mb-12 font-light"
          >
            Reservations recommended
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white text-red-600 font-light text-lg px-16 py-6 uppercase tracking-widest hover:bg-red-50 transition-all duration-500"
          >
            Reserve Now
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-red-100 text-sm font-light"
          >
            <p className="uppercase tracking-[0.3em] text-xs mb-4">Location</p>
            <p className="text-lg">801 S Lamar Blvd, Austin, TX 78704</p>
            <p className="mt-6">(512) 916-4808 • reservations@uchiaustin.com</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
