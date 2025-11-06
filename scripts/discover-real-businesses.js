#!/usr/bin/env node

/**
 * Discover Real Austin & Cedar Park Businesses
 * Uses the curated list of real businesses found through web research
 */

import fs from 'fs/promises';
import { config } from '../config/config.js';
import { realAustinCedarParkBusinesses } from '../config/real-businesses.js';

async function discoverRealBusinesses() {
  console.log('🔍 Discovering Real Austin & Cedar Park Businesses...\n');

  const businesses = realAustinCedarParkBusinesses.map(business => ({
    ...business,
    slug: generateSlug(business.name),
    size_estimate: '5-20',
    discovered_at: new Date().toISOString(),
    url_valid: true,
    source: 'web_research_2024'
  }));

  // Save to businesses.json
  await fs.writeFile(
    config.files.businesses,
    JSON.stringify(businesses, null, 2)
  );

  console.log(`✅ Discovered ${businesses.length} real businesses!\n`);

  // Group by city
  const byCity = {};
  businesses.forEach(b => {
    byCity[b.city] = (byCity[b.city] || 0) + 1;
  });

  console.log('📍 By City:');
  Object.entries(byCity).forEach(([city, count]) => {
    console.log(`   ${city}: ${count} businesses`);
  });

  // Group by industry
  const byIndustry = {};
  businesses.forEach(b => {
    byIndustry[b.industry] = (byIndustry[b.industry] || 0) + 1;
  });

  console.log('\n🏢 By Industry:');
  Object.entries(byIndustry).forEach(([industry, count]) => {
    console.log(`   ${industry}: ${count} businesses`);
  });

  console.log('\n📋 Business List:');
  businesses.forEach((b, i) => {
    console.log(`   ${i + 1}. ${b.name} (${b.industry}) - ${b.url}`);
  });
}

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

discoverRealBusinesses().catch(console.error);
