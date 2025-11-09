'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function FashionBoutiquePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">

      {/* Hero - Luxe Minimal Fashion */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Subtle Luxury Background */}
        <motion.div
          style={{ y }}
          className="absolute inset-0"
        >
          {/* Soft Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-rose-50"></div>

          {/* Elegant Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="fashion-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="0.5"/>
                  <circle cx="50" cy="50" r="30" fill="none" stroke="black" strokeWidth="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#fashion-pattern)" />
            </svg>
          </div>

          {/* Floating Fashion Elements */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <div className="w-32 h-32 border border-gray-200 rounded-full"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        >
          {/* Boutique Logo - Elegant */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            {/* Minimal Geometric Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mb-8"
            >
              <div className="relative w-32 h-32">
                {/* Diamond Shape */}
                <div className="absolute inset-0 border-2 border-black transform rotate-45"></div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border border-rose-400 transform rotate-45"
                />
              </div>
            </motion.div>

            <h1 className="text-7xl md:text-9xl font-thin text-black mb-4 tracking-widest uppercase"
                style={{ fontFamily: 'Didot, Georgia, serif', letterSpacing: '0.2em' }}>
              ÉLÉGANCE
            </h1>
            <div className="h-px w-48 bg-gradient-to-r from-transparent via-black to-transparent mx-auto mb-6"></div>
            <p className="text-sm uppercase tracking-[0.5em] text-gray-600 font-light">
              Curated Fashion
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="text-2xl md:text-3xl text-gray-700 mb-20 font-light italic max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            "Where timeless elegance meets contemporary design"
          </motion.p>

          {/* Collection Highlight */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mb-20"
          >
            <div className="inline-block border-2 border-black px-16 py-12">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-4 font-light">New Arrival</p>
              <h2 className="text-5xl font-thin text-black mb-3 tracking-wider">Spring Collection 2025</h2>
              <p className="text-gray-600 text-sm mb-6 font-light">Limited pieces, exclusively curated</p>
              <button
                aria-label="Explore spring collection"
                className="border border-black text-black px-10 py-3 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500 font-light"
              >
                Explore Collection
              </button>
            </div>
          </motion.div>

          {/* Brand Values */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="grid md:grid-cols-3 gap-16 max-w-4xl mx-auto mb-20"
          >
            {[
              { title: 'Sustainable', desc: 'Eco-conscious materials' },
              { title: 'Handcrafted', desc: 'Artisanal quality' },
              { title: 'Timeless', desc: 'Beyond trends' }
            ].map((value, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 border border-gray-300 mx-auto mb-4 transform rotate-45"></div>
                <h3 className="text-xl font-light text-black mb-2 uppercase tracking-widest">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm font-light">{value.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <button
              aria-label="Shop the collection"
              className="bg-black text-white px-14 py-5 text-sm uppercase tracking-widest hover:bg-gray-900 transition-all duration-300 font-light"
            >
              Shop Now
            </button>
            <button
              aria-label="Book private styling"
              className="border border-black text-black px-14 py-5 text-sm uppercase tracking-widest hover:bg-gray-50 transition-all duration-300 font-light"
            >
              Book Styling
            </button>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="text-gray-600 text-sm font-light"
          >
            <p className="uppercase tracking-[0.3em] text-xs mb-2">Visit Us</p>
            <p>508 West Avenue, Austin, TX 78701</p>
            <p className="mt-2">Mon–Sat: 10AM–7PM • Sun: 12PM–5PM</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Pieces - Gallery Grid */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-thin text-black mb-6 tracking-wider uppercase">
              Signature Pieces
            </h2>
            <div className="h-px w-32 bg-black mx-auto"></div>
          </motion.div>

          {/* Asymmetric Grid */}
          <div className="grid grid-cols-12 gap-6">
            {[
              {
                col: 'col-span-12 md:col-span-7',
                height: 'h-[600px]',
                title: 'Silk Evening Gown',
                price: '$1,850',
                gradient: 'from-rose-900 to-rose-800'
              },
              {
                col: 'col-span-12 md:col-span-5',
                height: 'h-[600px]',
                title: 'Cashmere Coat',
                price: '$2,200',
                gradient: 'from-gray-800 to-gray-900'
              },
              {
                col: 'col-span-12 md:col-span-5',
                height: 'h-96',
                title: 'Italian Leather Bag',
                price: '$980',
                gradient: 'from-amber-900 to-amber-800'
              },
              {
                col: 'col-span-12 md:col-span-4',
                height: 'h-96',
                title: 'Silk Blouse',
                price: '$420',
                gradient: 'from-gray-100 to-gray-200'
              },
              {
                col: 'col-span-12 md:col-span-3',
                height: 'h-96',
                title: 'Gold Earrings',
                price: '$1,250',
                gradient: 'from-yellow-700 to-yellow-600'
              },
            ].map((piece, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className={`${piece.col} group cursor-pointer relative overflow-hidden`}
              >
                <div className={`${piece.height} bg-gradient-to-br ${piece.gradient} relative`}>
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-700 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-700 text-center text-white p-6">
                      <motion.div
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        className="transform group-hover:translate-y-0"
                      >
                        <h3 className="text-4xl font-thin mb-4 tracking-wider">{piece.title}</h3>
                        <div className="h-px w-16 bg-white mx-auto mb-4"></div>
                        <p className="text-2xl font-light mb-6">{piece.price}</p>
                        <button className="border border-white text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                          View Details
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-thin text-black mb-8 tracking-wider">Our Philosophy</h2>
            <div className="h-px w-24 bg-black mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8 text-center"
          >
            <p className="text-2xl text-gray-700 font-light leading-relaxed italic"
               style={{ fontFamily: 'Georgia, serif' }}>
              "Fashion is not something that exists in dresses only. Fashion is in the sky, in the street,
              fashion has to do with ideas, the way we live, what is happening."
            </p>
            <div className="flex items-center justify-center gap-4 pt-6">
              <div className="h-px w-16 bg-gray-400"></div>
              <p className="text-sm uppercase tracking-widest text-gray-600">Coco Chanel</p>
              <div className="h-px w-16 bg-gray-400"></div>
            </div>

            <div className="pt-12 grid md:grid-cols-3 gap-12">
              {[
                {
                  title: 'Curated Selection',
                  desc: 'Each piece is personally selected by our founder, ensuring exceptional quality and design.'
                },
                {
                  title: 'Sustainable Luxury',
                  desc: 'We partner with ethical brands committed to environmental and social responsibility.'
                },
                {
                  title: 'Personal Service',
                  desc: 'Private styling consultations, alterations, and personalized shopping experiences.'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="text-center"
                >
                  <div className="w-1 h-16 bg-black mx-auto mb-6"></div>
                  <h3 className="text-xl font-light text-black mb-4 uppercase tracking-widest">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-thin mb-8 tracking-widest uppercase"
          >
            Experience Élégance
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-12 text-gray-300 font-light"
          >
            Visit our boutique for a personalized styling experience
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            aria-label="Schedule private appointment"
            className="border-2 border-white text-white px-16 py-6 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 font-light"
          >
            Schedule Appointment
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-gray-400 text-sm font-light"
          >
            <p className="uppercase tracking-[0.3em] text-xs mb-4">Connect</p>
            <p>info@eleganceboutique.com • (512) 555-LUXE</p>
            <p className="mt-6">@EleganceATX on Instagram</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
