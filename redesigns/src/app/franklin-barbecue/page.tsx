'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function FranklinBarbecuePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-amber-50">

      {/* Hero - Legendary BBQ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Smoky Background */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-900 to-amber-900"
        >
          {/* Smoke Effect */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10 blur-3xl"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                left: `${10 + i * 20}%`,
                top: `${20 + i * 15}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
              }}
            />
          ))}

          {/* Wood Grain Texture Overlay */}
          <div className="absolute inset-0 opacity-20"
               style={{
                 backgroundImage: 'repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 12px)',
               }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        >
          {/* Legendary Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-8 inline-block"
          >
            <div className="relative w-40 h-40 mx-auto">
              {/* Star Badge */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="45" fill="#DC2626" stroke="#7C2D12" strokeWidth="2"/>
                  <text x="50" y="58" textAnchor="middle" fill="#FEF3C7" fontSize="48" fontWeight="bold" fontFamily="Impact">★</text>
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Franklin Logo */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-7xl md:text-9xl font-black text-amber-100 mb-4 tracking-tight"
            style={{
              fontFamily: 'Georgia, serif',
              textShadow: '4px 4px 0px rgba(124, 45, 18, 0.8), 8px 8px 0px rgba(0,0,0,0.3)',
            }}
          >
            FRANKLIN
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-2 w-64 bg-red-600 mx-auto mb-4"
          />

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-amber-200 mb-8 tracking-widest"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            BARBECUE
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-2xl text-amber-100 mb-12 italic font-serif"
          >
            "The best BBQ in Texas. Worth the wait."
          </motion.p>

          {/* Famous Line Info */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="bg-black/30 backdrop-blur-sm border-4 border-amber-600 rounded-lg p-8 mb-12 max-w-2xl mx-auto"
          >
            <div className="text-red-500 text-sm uppercase tracking-widest mb-3 font-black">
              World Famous
            </div>
            <h3 className="text-5xl font-black text-amber-100 mb-4">THE LINE</h3>
            <p className="text-amber-200 text-xl mb-6">
              People line up as early as <span className="text-red-400 font-bold">6:00 AM</span> for our
              <span className="text-amber-400 font-bold"> legendary brisket</span>
            </p>
            <div className="grid grid-cols-2 gap-6 text-left">
              <div>
                <p className="text-amber-400 text-xs uppercase mb-1">Opens</p>
                <p className="text-white text-2xl font-bold">11:00 AM</p>
              </div>
              <div>
                <p className="text-amber-400 text-xs uppercase mb-1">Sold Out By</p>
                <p className="text-white text-2xl font-bold">~2:00 PM</p>
              </div>
            </div>
          </motion.div>

          {/* Awards */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {[
              { title: 'Best BBQ', subtitle: 'Texas Monthly' },
              { title: 'Bon Appétit', subtitle: 'Top 10 USA' },
              { title: 'James Beard', subtitle: 'Nominated' },
            ].map((award, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-gradient-to-br from-amber-600 to-orange-700 border-4 border-amber-900 rounded-full w-32 h-32 flex items-center justify-center shadow-xl"
              >
                <div className="text-center">
                  <p className="text-white font-black text-sm leading-tight">{award.title}</p>
                  <p className="text-amber-100 text-xs mt-1">{award.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="text-amber-100 text-lg"
          >
            <p className="mb-2">📍 <span className="font-bold">900 E 11th St, Austin, TX 78702</span></p>
            <p>☎️ <span className="font-bold">(512) 653-1187</span></p>
            <p className="mt-4 text-sm text-amber-300">
              Tues-Sun • 11:00 AM until sold out • Cash Only
            </p>
          </motion.div>
        </motion.div>

        {/* Smoke Animation at Bottom */}
        <motion.div
          animate={{
            scaleX: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"
        />
      </section>

      {/* Menu Section - BBQ Classics */}
      <section className="py-24 px-6 bg-amber-100">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-black text-center mb-16 text-amber-900"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            THE MENU
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Brisket',
                desc: 'Our legendary, slow-smoked 14-hour brisket',
                price: '$20/lb',
                highlight: true
              },
              {
                name: 'Pork Ribs',
                desc: 'Tender, fall-off-the-bone perfection',
                price: '$28/lb',
              },
              {
                name: 'Turkey',
                desc: 'Moist, flavorful smoked turkey breast',
                price: '$16/lb',
              },
              {
                name: 'Sausage',
                desc: 'House-made, all-beef jalapeño sausage',
                price: '$14/lb',
              },
              {
                name: 'Pulled Pork',
                desc: 'Smoky, tender shoulder',
                price: '$16/lb',
              },
              {
                name: 'Sides',
                desc: 'Beans, coleslaw, potato salad, mac & cheese',
                price: '$4 each',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className={`${
                  item.highlight
                    ? 'bg-gradient-to-br from-red-700 to-red-800 border-4 border-amber-600'
                    : 'bg-white border-2 border-amber-800'
                } p-6 rounded-lg shadow-xl relative overflow-hidden`}
              >
                {item.highlight && (
                  <div className="absolute top-4 right-4 bg-amber-400 text-red-900 text-xs font-black px-3 py-1 rounded-full rotate-12">
                    FAMOUS!
                  </div>
                )}
                <h3 className={`text-3xl font-black mb-2 ${item.highlight ? 'text-amber-100' : 'text-amber-900'}`}>
                  {item.name}
                </h3>
                <p className={`${item.highlight ? 'text-amber-200' : 'text-gray-700'} mb-4`}>
                  {item.desc}
                </p>
                <div className="flex justify-between items-center">
                  <span className={`text-2xl font-black ${item.highlight ? 'text-amber-300' : 'text-red-700'}`}>
                    {item.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="py-24 px-6 bg-gradient-to-br from-amber-900 to-red-900 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-black mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              THE AARON FRANKLIN STORY
            </h2>
            <div className="h-1 w-24 bg-amber-400 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6 text-xl leading-relaxed font-serif"
          >
            <p>
              What started as a backyard hobby in 2009 became a Texas legend. Aaron Franklin
              began smoking brisket from a small trailer on I-35, and word spread fast.
            </p>
            <p>
              Today, Franklin Barbecue is <span className="text-amber-400 font-bold">consistently rated
              the best BBQ in America</span>, with people flying in from around the world to experience
              the legendary brisket.
            </p>
            <p>
              Every brisket is <span className="text-red-400 font-bold">hand-selected</span>,
              <span className="text-amber-400 font-bold"> slow-smoked for 14+ hours</span> over Texas
              post oak, and sliced fresh to order.
            </p>
            <p className="italic text-amber-200 text-center text-2xl mt-8">
              "We do one thing, and we do it right."
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA - Visit Us */}
      <section className="py-24 px-6 bg-black text-white relative overflow-hidden">
        {/* Background Flame Effect */}
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-black mb-8"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            JOIN THE LINE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl mb-12 text-amber-300"
          >
            Experience the BBQ that changed Texas forever
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <p className="text-xl">
              <span className="text-amber-400 font-bold">📍 900 E 11th St, Austin, TX 78702</span>
            </p>
            <p className="text-lg text-gray-400">
              Tues-Sun • 11:00 AM until sold out
            </p>
            <p className="text-lg text-gray-400">
              Cash Only • No Reservations • First Come, First Served
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-amber-300"
          >
            <p className="text-sm uppercase tracking-widest mb-2">Pro Tip</p>
            <p className="text-lg">
              Arrive before 9:00 AM on weekends to guarantee getting brisket!
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
