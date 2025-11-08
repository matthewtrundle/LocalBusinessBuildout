#!/usr/bin/env node

/**
 * Parse FREE downloaded data sources into our database
 * - OpenTable Austin restaurants (GitHub)
 * - Any other free sources we found
 */

import fs from 'fs/promises';

async function parseFreeData() {
  console.log('📥 Parsing FREE downloaded business data...\n');

  const businesses = [];

  // Parse OpenTable data
  console.log('1️⃣  Parsing OpenTable Austin Restaurants...');
  try {
    const opentableData = await fs.readFile('/home/user/LocalBusinessBuildout/data/opentable-austin-restaurants.csv', 'utf-8');
    const lines = opentableData.split('\n');

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;

      const parts = parseCSVLine(lines[i]);
      if (parts.length < 6) continue;

      const business = {
        name: parts[0],
        city: 'Austin',
        zip: '', // Not in this dataset
        phone: parts[6] || '',
        website: parts[5] || '',
        email: parts[7] || '',
        address: '', // Not in this dataset
        category: 'Restaurant',
        industry: 'Food & Beverage',
        rating: parseFloat(parts[4]) || 0,
        review_count: parseInt(parts[2]) || 0,
        source: 'OpenTable (GitHub)',
        discovered_at: new Date().toISOString(),
      };

      if (business.name && business.name.length > 2) {
        business.slug = slugify(business.name);
        businesses.push(business);
      }
    }

    console.log(`   ✓ Parsed ${businesses.length} restaurants\n`);

  } catch (error) {
    console.log(`   ⚠️  Could not parse OpenTable data: ${error.message}\n`);
  }

  // Save results
  console.log('💾 Saving parsed data...');
  await fs.writeFile(
    '/home/user/LocalBusinessBuildout/data/free-sources-businesses.json',
    JSON.stringify(businesses, null, 2)
  );

  // Convert to CSV
  const csv = toCSV(businesses);
  await fs.writeFile(
    '/home/user/LocalBusinessBuildout/data/free-sources-businesses.csv',
    csv
  );

  console.log(`✅ Saved ${businesses.length} businesses from FREE sources!`);
  console.log(`   JSON: data/free-sources-businesses.json`);
  console.log(`   CSV: data/free-sources-businesses.csv`);

  console.log('\n📊 Summary:');
  console.log(`   Total businesses: ${businesses.length}`);
  console.log(`   With phone: ${businesses.filter(b => b.phone).length}`);
  console.log(`   With email: ${businesses.filter(b => b.email).length}`);
  console.log(`   With rating: ${businesses.filter(b => b.rating > 0).length}`);

  console.log('\n💡 Next step: Run consolidation to merge with existing data');
  console.log('   npm run consolidate');
}

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.trim());

  return values;
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function toCSV(businesses) {
  const headers = [
    'Name', 'Address', 'City', 'Zip', 'Phone', 'Email',
    'Website', 'Category', 'Industry', 'Rating', 'Reviews', 'Source'
  ];

  const rows = businesses.map(b => [
    b.name, b.address, b.city, b.zip, b.phone, b.email,
    b.website, b.category, b.industry, b.rating, b.review_count, b.source
  ].map(f => `"${f}"`).join(','));

  return [headers.join(','), ...rows].join('\n');
}

parseFreeData().catch(console.error);
