'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function CedarParkBarbershopPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">

      {/* Hero - Modern & Sleek */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Grid Background */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-800 to-zinc-900"
        >
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}></div>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Barber Pole Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="mb-12"
          >
            <div className="inline-block glass-strong rounded-full p-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 via-white to-blue-500 flex items-center justify-center text-4xl"
              >
                ✂️
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-9xl font-bold text-white mb-4 tracking-tight">
              CEDAR PARK
            </h1>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <p className="text-4xl text-blue-400 uppercase tracking-[0.3em] font-light">Barbershop</p>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light"
          >
            Classic Cuts. Modern Style. Unmatched Precision.
          </motion.p>

          {/* Services Grid */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
          >
            {[
              { icon: "✂️", service: "Haircuts" },
              { icon: "🪒", service: "Shaves" },
              { icon: "💈", service: "Beard Trim" },
              { icon: "✨", service: "Styling" }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="glass p-6 rounded-2xl hover-lift group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                <p className="text-white font-semibold">{item.service}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg px-12 py-4 rounded-full overflow-hidden">
              <span className="relative z-10">Book Appointment</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button className="glass-strong hover:bg-white/20 text-white font-bold text-lg px-12 py-4 rounded-full border-2 border-white/30 magnetic-btn">
              View Services
            </button>
          </motion.div>

          {/* Info Bar */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-16 glass-strong p-6 rounded-2xl inline-block"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <p className="text-blue-400 uppercase text-xs mb-1 tracking-wider">Location</p>
                <p className="text-white font-semibold">401 Cypress Creek Rd</p>
              </div>
              <div>
                <p className="text-blue-400 uppercase text-xs mb-1 tracking-wider">Hours</p>
                <p className="text-white font-semibold">Mon-Sat: 9 AM - 7 PM</p>
              </div>
              <div>
                <p className="text-blue-400 uppercase text-xs mb-1 tracking-wider">Walk-ins</p>
                <p className="text-white font-semibold">Always Welcome</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Icons */}
        {['✂️', '🪒', '💈'].map((icon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 1.5
            }}
            className="absolute text-6xl hidden lg:block"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 20}%`,
            }}
          >
            {icon}
          </motion.div>
        ))}
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-zinc-900 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-bold text-center mb-6 gradient-text from-blue-400 to-purple-400"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-xl text-gray-400 mb-16 max-w-2xl mx-auto"
          >
            Professional grooming services tailored to your style
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                service: "Classic Haircut",
                price: "$35",
                desc: "Precision cut, styled to perfection. Includes consultation, wash, cut, and style.",
                time: "45 min"
              },
              {
                service: "Hot Towel Shave",
                price: "$45",
                desc: "Traditional straight razor shave with hot towel treatment and aftershave.",
                time: "30 min"
              },
              {
                service: "Beard Sculpting",
                price: "$30",
                desc: "Expert beard trimming and shaping to complement your facial structure.",
                time: "25 min"
              },
              {
                service: "Haircut & Beard",
                price: "$60",
                desc: "Complete grooming package. Haircut and beard trim in one session.",
                time: "60 min"
              },
              {
                service: "Kids Cut",
                price: "$25",
                desc: "Gentle and patient service for children 12 and under.",
                time: "30 min"
              },
              {
                service: "Senior Cut",
                price: "$30",
                desc: "Special pricing for seniors 65+. Same great service.",
                time: "40 min"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                <div className="relative glass-strong p-8 rounded-3xl hover-lift border border-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white">{item.service}</h3>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{item.desc}</p>
                  <div className="flex items-center text-sm text-blue-400">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-12 py-4 rounded-full transition-all duration-300 magnetic-btn shadow-2xl">
              Book Your Cut
            </button>
          </motion.div>
        </div>
      </section>

      {/* Parallax Statement */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0.4, 0.6], ['0%', '20%']),
          }}
          className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <div className="glass-strong p-12 rounded-3xl">
            <div className="text-7xl mb-6">💈</div>
            <p className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              More Than a Haircut.
              <br />
              It's an Experience.
            </p>
            <p className="text-xl text-blue-200">
              Expert barbers. Premium products. Unbeatable atmosphere.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-900 to-zinc-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-bold text-center mb-16 gradient-text from-blue-400 to-purple-400"
          >
            Why Cedar Park Barbershop?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Master Barbers",
                icon: "👨‍🔧",
                points: ["15+ years experience", "Licensed professionals", "Continuous training"]
              },
              {
                title: "Premium Products",
                icon: "✨",
                points: ["Top-tier brands", "Quality guarantee", "Latest techniques"]
              },
              {
                title: "Great Atmosphere",
                icon: "🎵",
                points: ["Relaxing environment", "Complimentary drinks", "Sports on TV"]
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.7 }}
                className="text-center"
              >
                <div className="text-7xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <ul className="space-y-2">
                  {feature.points.map((point, j) => (
                    <li key={j} className="text-gray-400 flex items-center justify-center gap-2">
                      <span className="text-blue-400">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Ready for a Fresh Cut?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 mb-4"
          >
            Walk-ins welcome or book online for guaranteed time
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-blue-200 mb-10"
          >
            401 Cypress Creek Road, Suite 300, Cedar Park, TX
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="bg-white text-blue-900 font-bold text-lg px-12 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 magnetic-btn shadow-2xl">
              Book Now
            </button>
            <button className="border-2 border-white text-white font-bold text-lg px-12 py-4 rounded-full hover:bg-white/10 transition-all duration-300 magnetic-btn backdrop-blur-lg">
              Call (512) 555-CUTS
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
