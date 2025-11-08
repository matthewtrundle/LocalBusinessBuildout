'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function LuxurySpaPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">

      {/* Skip Link - Accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-emerald-900 focus:text-white focus:rounded-lg">
        Skip to content
      </a>

      {/* Hero - Zen Minimal Luxury */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Zen Wave Background */}
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
          {/* Ripple Effect */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="ripple">
                <stop offset="0%" stopColor="white" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </radialGradient>
            </defs>
            {[...Array(5)].map((_, i) => (
              <motion.circle
                key={i}
                cx="50%"
                cy="50%"
                r="0"
                fill="url(#ripple)"
                animate={{
                  r: ['0', '800'],
                  opacity: [0.5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeOut"
                }}
              />
            ))}
          </svg>

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
          id="main"
        >
          {/* Zen Circle Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="mb-12 inline-block"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 rounded-full border-4 border-white/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border-4 border-emerald-300/50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass-strong rounded-full p-8">
                  <span className="text-6xl">🌿</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Title - Minimalist */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-7xl md:text-9xl font-light text-white mb-6 tracking-widest"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            SERENITY
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-emerald-300 to-transparent mb-8"
          />

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-3xl text-emerald-100 mb-16 font-light tracking-wide italic"
          >
            A Sanctuary for Mind, Body & Soul
          </motion.p>

          {/* Services - Zen Cards */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16"
          >
            {[
              { icon: '💆', name: 'Massage', desc: 'Deep Tissue & Swedish' },
              { icon: '🧘', name: 'Yoga', desc: 'Daily Classes' },
              { icon: '🛁', name: 'Spa', desc: 'Luxury Treatments' },
              { icon: '🌸', name: 'Wellness', desc: 'Holistic Care' }
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="glass backdrop-blur-xl p-8 rounded-3xl border border-white/20 hover:border-emerald-300/50 transition-all duration-500"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl text-white font-semibold mb-2">{service.name}</h3>
                <p className="text-emerald-200 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA - Minimalist Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button
              aria-label="Book your spa experience"
              className="bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white font-light text-lg px-12 py-4 rounded-full hover:bg-white hover:text-emerald-900 transition-all duration-500 focus:ring-4 focus:ring-white/50"
            >
              Book Experience
            </button>
            <button
              aria-label="View spa menu"
              className="border-2 border-white/50 text-white font-light text-lg px-12 py-4 rounded-full hover:bg-white/10 transition-all duration-500 focus:ring-4 focus:ring-white/50"
            >
              View Menu
            </button>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-20 glass-strong backdrop-blur-xl p-8 rounded-3xl inline-block border border-white/20"
          >
            <div className="text-emerald-200 text-sm uppercase tracking-widest mb-2">Open Daily</div>
            <div className="text-white text-xl">9:00 AM - 8:00 PM</div>
            <div className="text-emerald-300 text-sm mt-2">601 East Whitestone Boulevard #214, Cedar Park, TX</div>
          </motion.div>
        </motion.div>

        {/* Breath Animation Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-emerald-200">
            <p className="text-xs mb-4 uppercase tracking-widest">Breathe</p>
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 rounded-full border-2 border-emerald-300/50"
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section - Zen Minimal */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-light text-emerald-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Our Treatments
            </h2>
            <div className="h-px w-32 mx-auto bg-emerald-300 mb-8"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each treatment is designed to restore balance and harmony
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                name: "Signature Massage",
                duration: "90 min",
                price: "$180",
                desc: "Customized full-body massage combining Swedish, deep tissue, and aromatherapy techniques"
              },
              {
                name: "Hot Stone Therapy",
                duration: "75 min",
                price: "$165",
                desc: "Heated basalt stones placed on key energy points to melt away tension and stress"
              },
              {
                name: "Facial Renewal",
                duration: "60 min",
                price: "$145",
                desc: "Deep cleansing facial with organic products, including extraction and hydrating mask"
              },
              {
                name: "Body Scrub & Wrap",
                duration: "90 min",
                price: "$195",
                desc: "Exfoliating scrub followed by nourishing body wrap with essential oils"
              }
            ].map((treatment, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-10 border-2 border-emerald-100 rounded-3xl hover:border-emerald-300 transition-all duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-3xl font-light text-emerald-900 mb-2">{treatment.name}</h3>
                      <span className="text-sm text-emerald-600 uppercase tracking-wider">{treatment.duration}</span>
                    </div>
                    <span className="text-3xl font-light text-emerald-700">{treatment.price}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{treatment.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Quote */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0.5, 0.7], ['0%', '30%']),
          }}
          className="absolute inset-0 bg-gradient-to-br from-teal-900 via-emerald-900 to-cyan-900"
        >
          {/* Zen Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="zen-circles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="1"/>
                  <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="1"/>
                  <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#zen-circles)"/>
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <div className="glass-strong backdrop-blur-xl p-16 rounded-3xl border border-white/20">
            <p className="text-5xl md:text-6xl text-white font-light leading-relaxed mb-8 italic" style={{ fontFamily: 'Georgia, serif' }}>
              "The quieter you become, the more you can hear."
            </p>
            <div className="h-px w-24 mx-auto bg-emerald-300 mb-4"></div>
            <p className="text-emerald-200 text-xl">— Ancient Wisdom</p>
          </div>
        </motion.div>
      </section>

      {/* CTA Footer - Zen Minimal */}
      <section className="py-32 px-6 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-light text-white mb-8"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Begin Your Journey
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-emerald-200 mb-12"
          >
            Reserve your sanctuary time today
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            aria-label="Book your appointment"
            className="bg-white text-emerald-900 font-light text-lg px-16 py-5 rounded-full hover:bg-emerald-50 transition-all duration-500 shadow-2xl focus:ring-4 focus:ring-white/50"
          >
            Book Appointment
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-emerald-300"
          >
            <p className="text-sm uppercase tracking-widest mb-2">Contact</p>
            <p className="text-white text-lg">(512) 555-CALM</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
