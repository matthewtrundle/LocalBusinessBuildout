#!/usr/bin/env node

/**
 * Find Real Austin Businesses
 * Searches for actual business websites using web search
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Seed businesses from blog post
const seedBusinesses = [
  // Auto Repair
  { name: "Riethmeyer's Auto Repair", city: "Austin", industry: "auto-repair" },
  { name: "Capital City Automotive", city: "Austin", industry: "auto-repair" },
  { name: "Sun Auto Service", city: "Austin", industry: "auto-repair" },
  { name: "Cornerstone Mobile Auto Repair", city: "Austin", industry: "auto-repair" },
  { name: "Auto Tek Austin", city: "Austin", industry: "auto-repair" },
  { name: "Terry Sayther Automotive", city: "Austin", industry: "auto-repair" },
  { name: "Newman's Automotive Austin", city: "Austin", industry: "auto-repair" },
  { name: "Juke Auto", city: "Austin", industry: "auto-repair" },
  { name: "Austin DIY Shop", city: "Austin", industry: "auto-repair" },
  { name: "Tech One Automotive", city: "Cedar Park", industry: "auto-repair" },
];

// Additional known Austin businesses to search for
const additionalBusinesses = [
  // HVAC (from web search results)
  { name: "Fox Service Company Austin", city: "Austin", industry: "hvac" },
  { name: "McCullough Heating & Air Conditioning", city: "Austin", industry: "hvac" },
  { name: "Stan's Heating Air Plumbing", city: "Austin", industry: "hvac" },
  { name: "Totally Cool AC", city: "Austin", industry: "hvac" },

  // Additional auto repair
  { name: "Dave's Ultimate Automotive", city: "Austin", industry: "auto-repair" },
  { name: "Christian Brothers Automotive Austin", city: "Austin", industry: "auto-repair" },
  { name: "Yost Automotive Austin", city: "Austin", industry: "auto-repair" },

  // Salons & Barbershops
  { name: "Milk + Honey Spa Austin", city: "Austin", industry: "salon" },
  { name: "Vain Austin", city: "Austin", industry: "salon" },
  { name: "Bird's Barbershop Austin", city: "Austin", industry: "barber" },
  { name: "Finley's Barber Shop Austin", city: "Austin", industry: "barber" },

  // Restaurants (small/local only)
  { name: "Veracruz All Natural", city: "Austin", industry: "restaurant" },
  { name: "Torchy's Tacos", city: "Austin", industry: "restaurant" },
  { name: "Matt's El Rancho", city: "Austin", industry: "restaurant" },

  // Contractors
  { name: "ABC Home & Commercial Services Austin", city: "Austin", industry: "contractor" },
  { name: "Radiant Plumbing Austin", city: "Austin", industry: "plumbing" },
  { name: "Reliable Air Austin", city: "Austin", industry: "hvac" },

  // Pet Services
  { name: "Karma Dog Training Austin", city: "Austin", industry: "pet-services" },
  { name: "Zoom Room Austin", city: "Austin", industry: "pet-services" },

  // Dental
  { name: "Great Hills Family Dentistry", city: "Austin", industry: "dental" },
  { name: "Austin Dental Works", city: "Austin", industry: "dental" },
];

const allBusinesses = [...seedBusinesses, ...additionalBusinesses];

console.log(`\n📋 Business List for Manual URL Finding\n`);
console.log(`Total businesses: ${allBusinesses.length}\n`);
console.log('Instructions: Search for each business on Google to find their website URL\n');
console.log('Format: "Business Name" + "Austin TX" in Google\n');
console.log('═══════════════════════════════════════════════════════════\n');

allBusinesses.forEach((business, index) => {
  const slug = business.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  console.log(`${index + 1}. ${business.name}`);
  console.log(`   Industry: ${business.industry}`);
  console.log(`   City: ${business.city}`);
  console.log(`   Slug: ${slug}`);
  console.log(`   Search: "${business.name} ${business.city} TX"`);
  console.log('');
});

// Save template JSON for manual filling
const template = allBusinesses.map(business => ({
  name: business.name,
  url: "https://www.FILL-IN-WEBSITE.com", // TO BE FILLED MANUALLY
  slug: business.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, ''),
  city: business.city,
  industry: business.industry,
  address: `${business.city}, TX`,
  description: `${business.industry.replace(/-/g, ' ')} services in ${business.city}`
}));

const outputPath = path.join(__dirname, '..', 'data', 'real-businesses-template.json');
await fs.writeFile(outputPath, JSON.stringify(template, null, 2), 'utf-8');

console.log('═══════════════════════════════════════════════════════════');
console.log(`\n✅ Template saved to: ${outputPath}`);
console.log('\n📝 Next steps:');
console.log('   1. Search for each business on Google');
console.log('   2. Find their official website');
console.log('   3. Update the "url" field in real-businesses-template.json');
console.log('   4. Save as real-businesses.json when complete\n');
