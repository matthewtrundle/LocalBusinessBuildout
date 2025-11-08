'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import type { Metadata } from 'next';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Enhanced Restaurant Demo | Modern Fine Dining in Austin',
  description: 'Experience culinary excellence with our modern take on classic cuisine. Farm-to-table ingredients, craft cocktails, and exceptional service in the heart of Austin, TX.',
  keywords: ['restaurant', 'Austin', 'fine dining', 'farm-to-table', 'craft cocktails'],
  openGraph: {
    title: 'Enhanced Restaurant Demo',
    description: 'Modern Fine Dining Experience in Austin',
    url: 'https://atx-revival.vercel.app/demo-enhanced-restaurant',
    siteName: 'ATX Revival',
    locale: 'en_US',
    type: 'website',
  },
};

export default function EnhancedRestaurantPage() {
  const containerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Smooth spring animation
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      {/* Skip to Content - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-white focus:text-purple-900 focus:rounded-lg focus:shadow-xl"
      >
        Skip to main content
      </a>

      {/* Hero Section - Enhanced with Better Contrast */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          style={{ y: ySpring, scale }}
          className="absolute inset-0"
        >
          {/* Gradient Mesh Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900"></div>

          {/* Animated Mesh Grid */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Glowing Orbs with Better Performance */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
            style={{ willChange: 'transform, opacity' }}
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full blur-3xl"
            style={{ willChange: 'transform, opacity' }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
          id="main-content"
          role="main"
        >
          {/* Restaurant Logo/Name */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <div className="glass-strong rounded-3xl px-12 py-8 inline-block mb-8 shadow-2xl">
              <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 font-serif tracking-tighter">
                Luminère
              </h1>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-24 bg-gradient-to-r from-transparent to-purple-300"></div>
                <p className="text-2xl text-purple-100 uppercase tracking-[0.3em] font-light">
                  Modern Cuisine
                </p>
                <div className="h-px w-24 bg-gradient-to-l from-transparent to-purple-300"></div>
              </div>
            </div>
          </motion.div>

          {/* Tagline - Better Contrast */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-4xl text-purple-50 mb-12 italic font-serif max-w-3xl mx-auto"
          >
            Where Innovation Meets Tradition in Every Bite
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
          >
            {[
              { icon: '🌱', label: 'Farm-to-Table' },
              { icon: '👨‍🍳', label: 'Chef Curated' },
              { icon: '🍷', label: 'Wine Pairings' },
              { icon: '⭐', label: '5-Star Service' }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="glass p-6 rounded-2xl hover-lift cursor-pointer"
              >
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-purple-50 font-semibold text-sm">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs with Focus States - Accessibility */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button
              aria-label="Reserve your table now"
              className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg px-12 py-4 rounded-full overflow-hidden focus:ring-4 focus:ring-purple-300 focus:outline-none transition-all duration-300"
            >
              <span className="relative z-10">Reserve Table</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              aria-label="View our menu"
              className="glass-strong hover:bg-white/20 text-white font-bold text-lg px-12 py-4 rounded-full border-2 border-white/30 magnetic-btn focus:ring-4 focus:ring-white/50 focus:outline-none transition-all duration-300"
            >
              View Menu
            </button>
          </motion.div>

          {/* Business Info - Structured Data Ready */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 glass-strong p-8 rounded-3xl inline-block"
            itemScope
            itemType="https://schema.org/Restaurant"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <p className="text-purple-300 uppercase text-xs mb-2 tracking-wider">Location</p>
                <p className="text-white font-semibold" itemProp="streetAddress">123 Congress Ave</p>
                <p className="text-purple-100 text-sm">
                  <span itemProp="addressLocality">Austin</span>, <span itemProp="addressRegion">TX</span> <span itemProp="postalCode">78701</span>
                </p>
              </div>
              <div itemProp="openingHours" content="Tu-Su 17:00-22:00">
                <p className="text-purple-300 uppercase text-xs mb-2 tracking-wider">Hours</p>
                <p className="text-white font-semibold">Tue-Sun: 5-10 PM</p>
                <p className="text-purple-100 text-sm">Closed Mondays</p>
              </div>
              <div>
                <p className="text-purple-300 uppercase text-xs mb-2 tracking-wider">Contact</p>
                <p className="text-white font-semibold" itemProp="telephone">(512) 555-DINE</p>
                <p className="text-purple-100 text-sm">reservations@luminere.com</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Better Contrast */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center text-purple-200">
            <p className="text-sm mb-2 font-light uppercase tracking-wide">Explore Menu</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-purple-300 rounded-full flex justify-center pt-2"
            >
              <div className="w-1.5 h-2.5 bg-purple-300 rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Menu Preview Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-bold text-center mb-6 text-white font-serif"
          >
            Tonight's Selections
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-xl text-purple-200 mb-16 max-w-2xl mx-auto"
          >
            Each dish is a masterpiece, crafted with passion and precision
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Seared Scallops",
                desc: "Pan-seared Atlantic scallops with cauliflower purée, micro greens, and truffle oil",
                price: "$42",
                dietary: "GF"
              },
              {
                name: "Wagyu Ribeye",
                desc: "12oz Japanese A5 wagyu with roasted bone marrow, seasonal vegetables, red wine reduction",
                price: "$125",
                dietary: ""
              },
              {
                name: "Wild Mushroom Risotto",
                desc: "Arborio rice with porcini, shiitake, and oyster mushrooms, parmesan, white truffle",
                price: "$38",
                dietary: "V"
              },
              {
                name: "Grilled Branzino",
                desc: "Whole Mediterranean sea bass with lemon, herbs, roasted fingerling potatoes",
                price: "$48",
                dietary: "GF"
              }
            ].map((dish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                <div className="relative glass-strong p-8 rounded-3xl hover-lift border border-purple-400/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{dish.name}</h3>
                      {dish.dietary && (
                        <span className="text-xs bg-purple-600/50 text-purple-100 px-2 py-1 rounded-full">
                          {dish.dietary}
                        </span>
                      )}
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {dish.price}
                    </span>
                  </div>
                  <p className="text-purple-100 leading-relaxed">{dish.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-6 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-bold text-white mb-6 font-serif"
          >
            Experience Luminère
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-purple-100 mb-10"
          >
            Reserve your table for an unforgettable evening
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            aria-label="Make a reservation now"
            className="bg-white text-purple-900 font-bold text-lg px-14 py-5 rounded-full hover:bg-purple-50 transition-all duration-300 magnetic-btn shadow-2xl focus:ring-4 focus:ring-white/50 focus:outline-none"
          >
            Reserve Now
          </motion.button>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Luminère Modern Cuisine",
            "image": "https://example.com/luminere.jpg",
            "@id": "https://atx-revival.vercel.app/demo-enhanced-restaurant",
            "url": "https://atx-revival.vercel.app/demo-enhanced-restaurant",
            "telephone": "+15125553463",
            "priceRange": "$$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Congress Ave",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "postalCode": "78701",
              "addressCountry": "US"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "17:00",
              "closes": "22:00"
            },
            "servesCuisine": "Modern American",
            "acceptsReservations": "True"
          })
        }}
      />

    </div>
  );
}
