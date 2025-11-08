#!/usr/bin/env node

/**
 * CSV Business Import Tool
 * Import businesses from CSV files and merge with existing database
 */

import fs from 'fs/promises';
import path from 'path';

class BusinessImporter {
  constructor() {
    this.businesses = [];
    this.duplicates = 0;
    this.imported = 0;
  }

  async run(csvPath) {
    console.log('📥 Business CSV Importer Starting...\n');

    if (!csvPath) {
      console.log('Usage: node import-businesses-csv.js <path-to-csv>');
      console.log('\nCSV Format:');
      console.log('Business Name,Address,City,Zip,Phone,Website,Category,Industry\n');
      console.log('Example CSV template created at: data/business-import-template.csv');
      await this.createTemplate();
      return;
    }

    // Read CSV
    const csvData = await fs.readFile(csvPath, 'utf-8');
    const businesses = this.parseCSV(csvData);

    console.log(`📋 Found ${businesses.length} businesses in CSV\n`);

    // Load existing businesses
    const existingPath = '/home/user/LocalBusinessBuildout/data/chamber-businesses.json';
    let existing = [];
    try {
      const data = await fs.readFile(existingPath, 'utf-8');
      existing = JSON.parse(data);
      console.log(`📂 Loaded ${existing.length} existing businesses\n`);
    } catch (error) {
      console.log('📂 No existing database found, creating new one\n');
    }

    // Merge
    const duplicateMap = new Map();
    existing.forEach(b => {
      const key = `${b.name}-${b.phone}`;
      duplicateMap.set(key, true);
      this.businesses.push(b);
    });

    businesses.forEach(b => {
      const key = `${b.name}-${b.phone}`;
      if (duplicateMap.has(key)) {
        this.duplicates++;
      } else {
        b.slug = this.slugify(b.name);
        b.discovered_at = new Date().toISOString();
        b.source = 'CSV Import';
        this.businesses.push(b);
        this.imported++;
      }
    });

    // Save
    await fs.writeFile(existingPath, JSON.stringify(this.businesses, null, 2));

    console.log('✅ Import Complete!\n');
    console.log(`   Total businesses: ${this.businesses.length}`);
    console.log(`   Imported new: ${this.imported}`);
    console.log(`   Skipped duplicates: ${this.duplicates}`);
  }

  parseCSV(csvData) {
    const lines = csvData.split('\n').filter(l => l.trim());
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

    const businesses = [];

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);

      if (values.length < headers.length) continue;

      const business = {};
      headers.forEach((header, index) => {
        const key = this.normalizeKey(header);
        business[key] = values[index] || '';
      });

      if (business.name) {
        businesses.push(business);
      }
    }

    return businesses;
  }

  parseCSVLine(line) {
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

  normalizeKey(header) {
    const mapping = {
      'Business Name': 'name',
      'Name': 'name',
      'Address': 'address',
      'Street Address': 'address',
      'City': 'city',
      'Zip': 'zip',
      'Zip Code': 'zip',
      'Phone': 'phone',
      'Phone Number': 'phone',
      'Website': 'website',
      'URL': 'website',
      'Category': 'category',
      'Industry': 'industry',
      'Type': 'category',
    };

    return mapping[header] || header.toLowerCase().replace(/ /g, '_');
  }

  async createTemplate() {
    const template = `Business Name,Address,City,Zip,Phone,Website,Category,Industry
"Example Business Name","123 Main St","Austin","78701","(512) 555-1234","https://example.com","Restaurant","Food & Beverage"
"Another Business","456 Oak Ave","Cedar Park","78613","(512) 555-5678","https://another.com","Dentist","Healthcare"
`;

    await fs.writeFile(
      '/home/user/LocalBusinessBuildout/data/business-import-template.csv',
      template
    );
    console.log('✅ Template created!\n');
  }

  slugify(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
}

// Run
if (import.meta.url === `file://${process.argv[1]}`) {
  const csvPath = process.argv[2];
  const importer = new BusinessImporter();
  importer.run(csvPath).catch(console.error);
}

export default BusinessImporter;
