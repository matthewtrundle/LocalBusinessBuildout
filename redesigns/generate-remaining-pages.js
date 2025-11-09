// Script to generate the remaining 12 business pages
const fs = require('fs');
const path = require('path');

const businesses = [
  {
    slug: 'black-sugar-caffe',
    name: 'Black Sugar Caffe',
    type: 'cafe',
    location: 'Cedar Park, TX',
    tagline: 'Artisan Coffee & Sweet Treats',
    colors: { from: 'purple-900', to: 'pink-900', accent: 'pink' },
    icon: '☕'
  },
  {
    slug: 'la-dosis-coffee-cocktails',
    name: 'La Dosis Coffee + Cocktails',
    type: 'cafe',
    location: 'Cedar Park, TX',
    tagline: 'Coffee by Day, Cocktails by Night',
    colors: { from: 'orange-900', to: 'red-900', accent: 'orange' },
    icon: '🍹'
  },
  {
    slug: '1431-cafe',
    name: '1431 Cafe',
    type: 'cafe',
    location: '601 E Whitestone Blvd, Suite 300, Cedar Park, TX',
    tagline: 'Your Neighborhood Coffee Haven',
    colors: { from: 'teal-900', to: 'cyan-900', accent: 'cyan' },
    icon: '☕'
  },
  {
    slug: 'danny-s-barber-shop',
    name: "Danny's Barber Shop",
    type: 'barbershop',
    location: '2301 S. Lakeline Blvd., Ste. 400, Cedar Park, TX',
    tagline: 'Traditional Barbering Excellence',
    colors: { from: 'red-900', to: 'gray-900', accent: 'red' },
    icon: '💈'
  },
  {
    slug: 'derrick-s-barbershop',
    name: "Derrick's Barbershop",
    type: 'barbershop',
    location: 'Cedar Park, TX',
    tagline: 'Where Style Meets Tradition',
    colors: { from: 'indigo-900', to: 'purple-900', accent: 'indigo' },
    icon: '✂️'
  },
  {
    slug: 'gambuzza-s-barbershop',
    name: "Gambuzza's Barbershop",
    type: 'barbershop',
    location: 'Cedar Park, TX',
    tagline: 'Classic Cuts, Modern Vibes',
    colors: { from: 'green-900', to: 'emerald-900', accent: 'emerald' },
    icon: '🪒'
  },
  {
    slug: 'bex-co-salon',
    name: 'bex + Co. Salon',
    type: 'salon',
    location: 'Cedar Park, TX',
    tagline: 'Where Beauty Meets Artistry',
    colors: { from: 'rose-900', to: 'pink-900', accent: 'rose' },
    icon: '💇'
  },
  {
    slug: 'bang-salon-day-spa',
    name: 'Bang Salon & Day Spa',
    type: 'salon',
    location: '601 East Whitestone Boulevard #214, Cedar Park, TX',
    tagline: 'Relax. Refresh. Revitalize.',
    colors: { from: 'purple-900', to: 'fuchsia-900', accent: 'fuchsia' },
    icon: '💆'
  },
  {
    slug: 'the-austin-beer-garden-brewing-company',
    name: 'The Austin Beer Garden Brewing Company',
    type: 'brewery',
    location: 'Austin, TX',
    tagline: 'Craft Beer & Good Times',
    colors: { from: 'amber-900', to: 'orange-900', accent: 'amber' },
    icon: '🍺'
  },
  {
    slug: 'pinthouse',
    name: 'Pinthouse',
    type: 'brewery',
    location: 'Austin, TX',
    tagline: 'Pizza & Pints Done Right',
    colors: { from: 'yellow-900', to: 'amber-900', accent: 'yellow' },
    icon: '🍕'
  },
  {
    slug: 'oddwood-brewing',
    name: 'Oddwood Brewing',
    type: 'brewery',
    location: 'Airport and Manor Rd, East Austin, TX',
    tagline: 'Uncommonly Good Beer',
    colors: { from: 'green-900', to: 'lime-900', accent: 'lime' },
    icon: '🌲'
  },
  {
    slug: 'tony-c-s-beer-garden',
    name: "Tony C's Beer Garden",
    type: 'brewery',
    location: 'Austin, TX',
    tagline: "Austin's Favorite Beer Garden",
    colors: { from: 'orange-900', to: 'red-900', accent: 'orange' },
    icon: '🍻'
  }
];

const template = (business) => `'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ${business.slug.replace(/-/g, '')}Page() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-${business.colors.from} via-${business.colors.to} to-black">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-${business.colors.from} to-${business.colors.to}"
        >
          <div className="absolute top-20 left-20 w-72 h-72 bg-${business.colors.accent}-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-${business.colors.accent}-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="glass-strong rounded-full p-12 inline-block mb-8">
              <div className="text-8xl animate-float">${business.icon}</div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-7xl md:text-9xl font-bold text-white mb-6 font-serif"
          >
            ${business.name}
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl md:text-3xl text-${business.colors.accent}-200 mb-12 italic"
          >
            ${business.tagline}
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="bg-gradient-to-r from-${business.colors.accent}-500 to-${business.colors.accent}-600 hover:from-${business.colors.accent}-600 hover:to-${business.colors.accent}-700 text-white font-bold text-lg px-12 py-4 rounded-full magnetic-btn shadow-2xl">
              ${business.type === 'barbershop' || business.type === 'salon' ? 'Book Now' : 'Visit Us'}
            </button>
            <button className="glass-strong hover:bg-white/20 text-white font-bold text-lg px-12 py-4 rounded-full border-2 border-white/30 magnetic-btn">
              ${business.type === 'cafe' ? 'View Menu' : 'Learn More'}
            </button>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-16 glass-strong p-6 rounded-2xl inline-block"
          >
            <p className="text-${business.colors.accent}-200 uppercase text-xs mb-1 tracking-wider">Location</p>
            <p className="text-white font-semibold">${business.location}</p>
          </motion.div>
        </div>
      </section>

      {/* Services/Offerings Section */}
      <section className="py-24 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-bold text-center mb-16 gradient-text from-${business.colors.accent}-400 to-white font-serif"
          >
            ${business.type === 'cafe' ? 'What We Serve' : business.type === 'brewery' ? 'On Tap' : 'Our Services'}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            ${[1, 2, 3].map(i => `
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ${i * 0.2}, duration: 0.7 }}
              className="glass-strong p-8 rounded-3xl hover-lift"
            >
              <div className="text-6xl mb-4">${business.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">Service ${i}</h3>
              <p className="text-${business.colors.accent}-200">Premium quality and exceptional service in every detail.</p>
            </motion.div>`).join('')}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-${business.colors.from} via-${business.colors.to} to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: \`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")\`,
          }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif"
          >
            Visit Us Today
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-${business.colors.accent}-200 mb-10"
          >
            ${business.location}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="bg-white text-${business.colors.from} font-bold text-lg px-12 py-4 rounded-full hover:bg-${business.colors.accent}-50 transition-all duration-300 magnetic-btn shadow-2xl">
              Get Directions
            </button>
            <button className="border-2 border-white text-white font-bold text-lg px-12 py-4 rounded-full hover:bg-white/10 transition-all duration-300 magnetic-btn backdrop-blur-lg">
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
`;

// Generate all pages
businesses.forEach(business => {
  const dir = path.join(__dirname, 'src', 'app', business.slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const filePath = path.join(dir, 'page.tsx');
  fs.writeFileSync(filePath, template(business));
  console.log(`✅ Created: ${business.slug}/page.tsx`);
});

console.log('\n🎉 All 12 remaining pages generated successfully!');
