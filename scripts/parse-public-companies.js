#!/usr/bin/env node

/**
 * Parse Austin public companies from GitHub dataset
 */

import fs from 'fs/promises';

async function parsePublicCompanies() {
  console.log('📥 Parsing Austin Public Companies (2017 data)...\n');

  const businesses = [];

  try {
    const csvData = await fs.readFile('/home/user/LocalBusinessBuildout/data/austin-public-companies-2017.csv', 'utf-8');
    const lines = csvData.split('\n');

    // Skip header
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;

      const parts = parseCSVLine(lines[i]);
      if (parts.length < 10) continue;

      const business = {
        name: parts[1], // Company Name
        address: `${parts[2]} ${parts[3]}`.trim(), // Address 1 + Address 2
        city: parts[4] || 'Austin', // City
        state: parts[5] || 'TX',
        zip: parts[6], // Zipcode
        phone: parts[7], // Phone Number
        website: parts[8] || '', // Website
        category: 'Public Company',
        industry: extractIndustry(parts[18]), // General Business Description
        description: parts[18] || '', // Full description
        employees: parseInt(parts[21]) || 0, // 2017 Austin staff
        revenue: parts[9] || '', // 2016 revenue
        stock_ticker: parts[10] || '',
        founded_year: parts[13] || '',
        ceo: parts[19] || '',
        source: 'GitHub Public Companies 2017',
        discovered_at: new Date().toISOString(),
      };

      if (business.name && business.name.length > 2) {
        business.slug = slugify(business.name);
        businesses.push(business);
      }
    }

    console.log(`✓ Parsed ${businesses.length} public companies\n`);

  } catch (error) {
    console.log(`⚠️  Error: ${error.message}\n`);
  }

  // Save
  console.log('💾 Saving...');
  await fs.writeFile(
    '/home/user/LocalBusinessBuildout/data/austin-public-companies-parsed.json',
    JSON.stringify(businesses, null, 2)
  );

  const csv = toCSV(businesses);
  await fs.writeFile(
    '/home/user/LocalBusinessBuildout/data/austin-public-companies-parsed.csv',
    csv
  );

  console.log(`✅ Saved ${businesses.length} Austin public companies!`);
  console.log('\n📊 Summary:');
  console.log(`   Companies: ${businesses.length}`);
  console.log(`   With phone: ${businesses.filter(b => b.phone).length}`);
  console.log(`   With website: ${businesses.filter(b => b.website).length}`);
  console.log(`   With employees count: ${businesses.filter(b => b.employees > 0).length}`);

  console.log('\n🏢 Top Companies by Employees:');
  businesses
    .filter(b => b.employees > 0)
    .sort((a, b) => b.employees - a.employees)
    .slice(0, 10)
    .forEach((b, i) => {
      console.log(`   ${i + 1}. ${b.name} - ${b.employees.toLocaleString()} employees`);
    });

  console.log('\n💡 Next: Run consolidation to merge');
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

function extractIndustry(description) {
  if (!description) return 'Technology';

  const desc = description.toLowerCase();

  if (desc.includes('software') || desc.includes('technology')) return 'Technology';
  if (desc.includes('food') || desc.includes('restaurant')) return 'Food & Beverage';
  if (desc.includes('retail') || desc.includes('grocery')) return 'Retail';
  if (desc.includes('insurance') || desc.includes('financial')) return 'Financial Services';
  if (desc.includes('real estate')) return 'Real Estate';
  if (desc.includes('energy') || desc.includes('oil') || desc.includes('gas')) return 'Energy';
  if (desc.includes('healthcare') || desc.includes('medical')) return 'Healthcare';
  if (desc.includes('semiconductor')) return 'Semiconductor';

  return 'Other';
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function toCSV(businesses) {
  const headers = [
    'Name', 'Address', 'City', 'Zip', 'Phone', 'Website',
    'Category', 'Industry', 'Employees', 'Founded Year',
    'Stock Ticker', 'CEO', 'Description'
  ];

  const rows = businesses.map(b => [
    b.name, b.address, b.city, b.zip, b.phone, b.website,
    b.category, b.industry, b.employees, b.founded_year,
    b.stock_ticker, b.ceo, b.description
  ].map(f => `"${f}"`).join(','));

  return [headers.join(','), ...rows].join('\n');
}

parsePublicCompanies().catch(console.error);
