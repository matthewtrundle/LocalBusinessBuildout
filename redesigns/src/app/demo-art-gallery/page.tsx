'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ArtGalleryPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">

      {/* Hero - Ultra Minimal Gallery Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Subtle Grid Lines */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="minimal-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="black" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#minimal-grid)" />
          </svg>
        </div>

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        >
          {/* Gallery Logo - Minimal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-20"
          >
            <div className="inline-block">
              {/* Minimal Square Frame */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-40 h-40 border-4 border-black mb-8 mx-auto relative"
              >
                <motion.div
                  animate={{
                    rotate: [0, 90, 180, 270, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-4 border-2 border-black"
                />
              </motion.div>

              <h1 className="text-8xl md:text-9xl font-light text-black tracking-tighter mb-4"
                  style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                PRISM
              </h1>
              <div className="h-px w-32 bg-black mx-auto mb-4"></div>
              <p className="text-sm uppercase tracking-[0.5em] text-gray-800 font-light">
                Contemporary Art Gallery
              </p>
            </div>
          </motion.div>

          {/* Minimal Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-2xl text-gray-700 mb-20 font-light leading-relaxed max-w-2xl mx-auto"
          >
            A curated space for emerging and established artists
            <br />
            to showcase contemporary visual expression
          </motion.p>

          {/* Featured Exhibition Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="border-t border-b border-black py-12 max-w-3xl mx-auto mb-20"
          >
            <div className="grid md:grid-cols-3 gap-12 text-left">
              <div>
                <p className="text-xs uppercase tracking-widest mb-2 text-gray-600">Current</p>
                <p className="text-xl font-light">Abstraction & Form</p>
                <p className="text-sm text-gray-600 mt-1">Through March 2025</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-2 text-gray-600">Artists</p>
                <p className="text-xl font-light">12 Contemporary</p>
                <p className="text-sm text-gray-600 mt-1">Local & International</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-2 text-gray-600">Location</p>
                <p className="text-xl font-light">Downtown Austin</p>
                <p className="text-sm text-gray-600 mt-1">2nd Street District</p>
              </div>
            </div>
          </motion.div>

          {/* Minimal CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <button
              aria-label="Visit the gallery"
              className="border-2 border-black text-black px-16 py-5 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500 font-light"
            >
              Visit Gallery
            </button>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-20 text-sm text-gray-600 font-light"
          >
            <p className="uppercase tracking-widest text-xs mb-2">Gallery Hours</p>
            <p>Wednesday – Sunday, 11:00 AM – 6:00 PM</p>
            <p className="text-xs mt-2">By appointment on Monday & Tuesday</p>
          </motion.div>
        </motion.div>

        {/* Floating Minimal Elements */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 1.5
            }}
            className="absolute border border-black"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              top: `${20 + i * 25}%`,
              right: `${10 + i * 10}%`,
            }}
          />
        ))}
      </section>

      {/* Featured Works - Gallery Grid */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-light text-black mb-6">Featured Works</h2>
            <div className="h-px w-24 bg-black mx-auto"></div>
          </motion.div>

          {/* Asymmetric Gallery Grid */}
          <div className="grid grid-cols-12 gap-6">
            {[
              { col: 'col-span-12 md:col-span-5', height: 'h-96', title: 'Untitled No. 7', artist: 'Sarah Chen', price: '$8,500' },
              { col: 'col-span-12 md:col-span-7', height: 'h-96', title: 'Urban Fragments', artist: 'Marcus Webb', price: '$12,000' },
              { col: 'col-span-12 md:col-span-4', height: 'h-80', title: 'Void Series II', artist: 'Elena Torres', price: '$6,200' },
              { col: 'col-span-12 md:col-span-4', height: 'h-80', title: 'Color Study 03', artist: 'David Kim', price: '$4,800' },
              { col: 'col-span-12 md:col-span-4', height: 'h-80', title: 'Memory Trace', artist: 'Ana Silva', price: '$7,500' },
            ].map((work, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className={`${work.col} group cursor-pointer`}
              >
                <div className={`${work.height} bg-gradient-to-br ${
                  i === 0 ? 'from-gray-800 to-gray-600' :
                  i === 1 ? 'from-gray-200 to-gray-400' :
                  i === 2 ? 'from-black to-gray-900' :
                  i === 3 ? 'from-gray-300 to-gray-100' :
                  'from-gray-700 to-black'
                } relative overflow-hidden`}>
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 text-center text-white p-6">
                      <h3 className="text-3xl font-light mb-2">{work.title}</h3>
                      <p className="text-sm uppercase tracking-widest mb-4">{work.artist}</p>
                      <div className="h-px w-16 bg-white mx-auto mb-4"></div>
                      <p className="text-xl font-light">{work.price}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Statement Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-l-4 border-black pl-12"
          >
            <p className="text-4xl font-light text-black leading-relaxed mb-8 italic">
              "Art is not what you see, but what you make others see."
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-black"></div>
              <p className="text-sm uppercase tracking-widest text-gray-600">Edgar Degas</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visit Section */}
      <section className="py-32 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-light mb-12"
          >
            Plan Your Visit
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-16 mb-16 text-left"
          >
            <div>
              <h3 className="text-xl uppercase tracking-widest mb-6 font-light">Location</h3>
              <p className="text-2xl font-light mb-2">204 West 2nd Street</p>
              <p className="text-gray-400">Austin, TX 78701</p>
              <p className="mt-6 text-sm text-gray-400">Free parking available</p>
            </div>
            <div>
              <h3 className="text-xl uppercase tracking-widest mb-6 font-light">Contact</h3>
              <p className="text-2xl font-light mb-2">(512) 555-ARTS</p>
              <p className="text-gray-400">info@prismgallery.com</p>
              <p className="mt-6 text-sm text-gray-400">Private viewings by appointment</p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            aria-label="Schedule a visit"
            className="border-2 border-white text-white px-16 py-5 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 font-light"
          >
            Schedule Visit
          </motion.button>
        </div>
      </section>

    </div>
  );
}
