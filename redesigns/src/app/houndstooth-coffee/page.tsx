'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HoundstoothCoffeePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-stone-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-stone-800 to-amber-900">
        {/* Geometric Coffee Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(12)].map((_, i) => (
            <motion.div key={i}
              className="absolute"
              style={{
                left: `${(i * 20) % 100}%`,
                top: `${(i * 15) % 100}%`,
                width: '100px',
                height: '100px'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30 + i * 5, repeat: Infinity, ease: 'linear' }}>
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <pattern id={`houndstooth-${i}`} width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill="white"/>
                  <rect x="10" y="10" width="10" height="10" fill="white"/>
                </pattern>
                <rect width="100" height="100" fill={`url(#houndstooth-${i})`}/>
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Coffee Steam Animation */}
        {[...Array(4)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white/5 blur-2xl"
            style={{ width: '200px', height: '300px', left: `${20 + i * 20}%`, bottom: '10%' }}
            animate={{ y: [-100, -300], opacity: [0.2, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }} />
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 1, type: 'spring', bounce: 0.4 }} className="mb-10">
            <div className="w-36 h-36 mx-auto bg-amber-600 rounded-lg flex items-center justify-center border-4 border-white shadow-2xl rotate-45">
              <span className="text-7xl -rotate-45">☕</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }} className="text-7xl md:text-8xl font-thin text-amber-100 mb-4 tracking-widest"
            style={{ fontFamily: 'Didot, serif', letterSpacing: '0.15em' }}>
            HOUNDSTOOTH
          </motion.h1>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }} className="h-1 w-64 bg-amber-600 mx-auto mb-6" />

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }} className="text-3xl font-light text-stone-300 mb-16 tracking-widest"
            style={{ fontFamily: 'Georgia, serif' }}>
            COFFEE
          </motion.h2>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }} className="bg-black/40 backdrop-blur-md border border-amber-700/50 rounded-sm p-10 mb-12 max-w-2xl mx-auto">
            <p className="text-amber-200 text-2xl font-light italic mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              "Precision in Every Pour"
            </p>
            <div className="h-px w-32 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-stone-300 text-lg">
              Third-Wave Coffee Excellence in the Heart of Austin
            </p>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }} className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '☕', label: 'Pour Over' },
              { icon: '🌍', label: 'Single Origin' },
              { icon: '🔥', label: 'Light Roast' },
              { icon: '🎯', label: 'Precision Craft' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }}
                className="bg-gradient-to-b from-stone-800 to-neutral-900 border border-amber-700/30 p-6 rounded-sm">
                <div className="text-5xl mb-3">{item.icon}</div>
                <p className="text-amber-100 font-light text-sm uppercase tracking-wider">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-amber-700 text-white font-light text-lg px-12 py-4 rounded-sm hover:bg-amber-600 transition-all uppercase tracking-widest border border-amber-600">
            Explore Menu
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }} className="mt-12 text-stone-400 text-sm uppercase tracking-widest">
            📍 Multiple Austin Locations • Daily 6:30 AM - 7:00 PM
          </motion.p>
        </div>

        {/* Bottom Shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
      </section>

      {/* Coffee Experience */}
      <section className="py-24 px-6 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-5xl font-light text-center mb-4 text-stone-800 tracking-wide"
            style={{ fontFamily: 'Didot, serif' }}>
            THE HOUNDSTOOTH EXPERIENCE
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="h-px w-24 bg-amber-700 mx-auto mb-16"></motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              {
                title: 'Sourcing',
                desc: 'We partner directly with farmers to source the finest single-origin beans from around the world.',
                icon: '🌍'
              },
              {
                title: 'Roasting',
                desc: 'Light roasts carefully developed to highlight each origin\'s unique flavor profile and terroir.',
                icon: '🔥'
              },
              {
                title: 'Brewing',
                desc: 'Our baristas are trained in precision brewing methods - from pour-over to espresso extraction.',
                icon: '☕'
              },
              {
                title: 'Experience',
                desc: 'Every cup is crafted with intention, served in a space designed for coffee appreciation.',
                icon: '🎯'
              }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.15 }} className="text-center">
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-light mb-3 text-amber-900 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                  {item.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-5xl font-light text-center mb-16 text-stone-800 tracking-wide"
            style={{ fontFamily: 'Didot, serif' }}>
            FEATURED OFFERINGS
          </motion.h2>

          <div className="space-y-8">
            {[
              { name: 'Single Origin Pour Over', price: '$5.50', desc: 'Rotating selection from our current harvest' },
              { name: 'Espresso', price: '$3.50', desc: 'Carefully extracted for balanced sweetness' },
              { name: 'Cappuccino', price: '$4.75', desc: 'Microfoam artistry with house espresso' },
              { name: 'Cold Brew', price: '$4.50', desc: '18-hour steep for smooth, sweet flavor' },
              { name: 'Cortado', price: '$4.25', desc: 'Equal parts espresso and steamed milk' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex justify-between items-center border-b border-stone-200 pb-6">
                <div>
                  <h3 className="text-2xl font-light text-stone-800 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                    {item.name}
                  </h3>
                  <p className="text-stone-500 text-sm">{item.desc}</p>
                </div>
                <p className="text-2xl font-light text-amber-800">{item.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6 bg-gradient-to-br from-stone-900 to-neutral-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-4xl font-light mb-8 tracking-wide"
            style={{ fontFamily: 'Didot, serif' }}>
            OUR PHILOSOPHY
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="space-y-6 text-lg font-light leading-relaxed text-stone-300">
            <p>
              At Houndstooth Coffee, we believe that exceptional coffee is a craft
              that deserves precision, care, and respect at every stage.
            </p>
            <p className="text-xl text-amber-200 italic" style={{ fontFamily: 'Georgia, serif' }}>
              From seed to cup, we pursue perfection.
            </p>
            <p>
              Our baristas are trained to understand the science and art of extraction,
              bringing out the unique characteristics of each origin we feature.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
