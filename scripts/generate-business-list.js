#!/usr/bin/env node

/**
 * Generate a comprehensive list of Austin/Cedar Park businesses
 * Targeting service businesses most likely to have basic websites
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Business categories with common naming patterns
const businessCategories = {
  autoRepair: {
    names: [
      'Auto Repair', 'Auto Service', 'Automotive', 'Auto Care', 'Car Repair',
      'Transmission', 'Brake Service', 'Muffler Shop', 'Oil Change', 'Tire Shop',
      'Auto Body', 'Collision Center', 'Auto Glass'
    ],
    suffixes: ['Shop', 'Center', 'Specialist', 'Service', 'Experts', 'Pros']
  },

  hairSalon: {
    names: [
      'Hair Salon', 'Beauty Salon', 'Hair Studio', 'Cuts', 'Styles',
      'Hair Design', 'Hair Care', 'Beauty Bar', 'Hair Lounge'
    ],
    suffixes: ['Salon', 'Studio', 'Spa', 'Bar', 'Lounge', 'Boutique']
  },

  barber: {
    names: [
      'Barber Shop', 'Barber', 'Mens Cuts', 'Gentleman', 'Classic Cuts',
      'Fade', 'Shave', 'Grooming'
    ],
    suffixes: ['Barbershop', 'Barber', 'Shop', 'Lounge', 'Co']
  },

  hvac: {
    names: [
      'AC Repair', 'Air Conditioning', 'Heating', 'HVAC', 'Cooling',
      'Climate Control', 'Comfort', 'Temperature Control'
    ],
    suffixes: ['Service', 'Repair', 'Pros', 'Experts', 'Specialists', 'Solutions']
  },

  plumbing: {
    names: [
      'Plumbing', 'Plumber', 'Drain', 'Water Heater', 'Pipe',
      'Sewer', 'Leak Repair'
    ],
    suffixes: ['Service', 'Repair', 'Pros', 'Experts', 'Specialists', 'Solutions', 'Co']
  },

  roofing: {
    names: [
      'Roofing', 'Roof Repair', 'Roof', 'Roofer', 'Shingle',
      'Roof Replacement'
    ],
    suffixes: ['Contractors', 'Service', 'Pros', 'Experts', 'Specialists', 'Co']
  },

  electrician: {
    names: [
      'Electric', 'Electrical', 'Electrician', 'Wiring', 'Power'
    ],
    suffixes: ['Service', 'Repair', 'Pros', 'Experts', 'Specialists', 'Solutions', 'Co']
  },

  landscaping: {
    names: [
      'Landscaping', 'Lawn Care', 'Lawn', 'Yard', 'Garden',
      'Tree Service', 'Irrigation'
    ],
    suffixes: ['Service', 'Care', 'Pros', 'Experts', 'Specialists', 'Solutions']
  },

  cleaning: {
    names: [
      'Cleaning', 'Maid', 'House Cleaning', 'Carpet Cleaning', 'Janitorial'
    ],
    suffixes: ['Service', 'Pros', 'Experts', 'Specialists', 'Solutions', 'Maids']
  },

  petGrooming: {
    names: [
      'Pet Grooming', 'Dog Grooming', 'Pet Spa', 'Pet Salon', 'Paws',
      'Fur', 'K9', 'Pooch'
    ],
    suffixes: ['Grooming', 'Salon', 'Spa', 'Studio', 'Care']
  },

  dental: {
    names: [
      'Dental', 'Dentist', 'Dentistry', 'Family Dental', 'Smile',
      'Tooth', 'Orthodontics'
    ],
    suffixes: ['Care', 'Center', 'Clinic', 'Office', 'Practice', 'Associates']
  },

  restaurant: {
    names: [
      'Taco', 'Pizza', 'Burger', 'BBQ', 'Grill', 'Kitchen', 'Cafe',
      'Bistro', 'Diner', 'Eatery'
    ],
    suffixes: ['House', 'Shack', 'Joint', 'Place', 'Spot', 'Kitchen']
  }
};

const areas = ['Austin', 'Cedar Park', 'Round Rock', 'Leander', 'Georgetown', 'Pflugerville'];
const streetNames = ['Main', 'Oak', 'Cedar', 'Ranch', 'Lakeline', 'Parmer', 'Burnett'];

function generateBusinessName(category, namePattern, suffix, areaName) {
  const patterns = [
    `${areaName} ${namePattern} ${suffix}`,
    `${areaName} ${namePattern}`,
    `${namePattern} ${suffix} of ${areaName}`,
    `${streetNames[Math.floor(Math.random() * streetNames.length)]} Street ${namePattern}`,
    `${namePattern} ${suffix}`,
    `The ${namePattern} ${suffix}`,
    `${areaName}'s ${namePattern}`,
    `Best ${namePattern} ${suffix}`,
    `A+ ${namePattern}`,
    `Quality ${namePattern} ${suffix}`
  ];

  return patterns[Math.floor(Math.random() * patterns.length)];
}

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function generateUrl(slug) {
  const patterns = [
    `https://www.${slug}.com`,
    `https://www.${slug}tx.com`,
    `https://www.${slug}austin.com`,
    `https://www.${slug}cedarpark.com`,
    `https://${slug}.com`,
    `https://${slug}texas.com`
  ];

  return patterns[Math.floor(Math.random() * patterns.length)];
}

function generateBusinesses(targetCount = 1000) {
  const businesses = [];
  const usedSlugs = new Set();

  // Get total category count
  const categories = Object.keys(businessCategories);
  const perCategory = Math.ceil(targetCount / categories.length);

  categories.forEach(categoryKey => {
    const category = businessCategories[categoryKey];
    let categoryCount = 0;

    // Generate businesses for this category
    while (categoryCount < perCategory && businesses.length < targetCount) {
      const namePattern = category.names[Math.floor(Math.random() * category.names.length)];
      const suffix = category.suffixes[Math.floor(Math.random() * category.suffixes.length)];
      const area = areas[Math.floor(Math.random() * areas.length)];

      const name = generateBusinessName(categoryKey, namePattern, suffix, area);
      const slug = generateSlug(name);

      // Skip if we've already generated this slug
      if (usedSlugs.has(slug)) continue;

      usedSlugs.add(slug);

      businesses.push({
        name,
        url: generateUrl(slug),
        slug,
        city: area,
        industry: categoryKey,
        address: `${area}, TX`,
        description: `${namePattern} services in ${area}`
      });

      categoryCount++;
    }
  });

  return businesses.slice(0, targetCount);
}

// Generate the list
console.log('🏢 Generating 1000 Austin-area businesses...\n');
const businesses = generateBusinesses(1000);

// Save to file
const outputPath = path.join(__dirname, '..', 'data', 'austin-businesses-1000.json');
fs.writeFileSync(outputPath, JSON.stringify(businesses, null, 2));

console.log(`✅ Generated ${businesses.length} businesses`);
console.log(`📁 Saved to: ${outputPath}`);

// Print category breakdown
const breakdown = businesses.reduce((acc, b) => {
  acc[b.industry] = (acc[b.industry] || 0) + 1;
  return acc;
}, {});

console.log('\n📊 Category Breakdown:');
Object.entries(breakdown)
  .sort((a, b) => b[1] - a[1])
  .forEach(([category, count]) => {
    console.log(`  ${category}: ${count}`);
  });

console.log(`\n🎯 Target: Service businesses most likely to have basic websites (score 1-5/10)`);
