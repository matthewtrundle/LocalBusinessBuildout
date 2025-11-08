#!/usr/bin/env node

/**
 * Business Database Consolidator
 * Merges all business sources into one master database
 */

import fs from 'fs/promises';
import path from 'path';
import { austinBusinessDatabase } from '../config/austin-businesses-database.js';
import { realAustinCedarParkBusinesses } from '../config/real-businesses.js';

class BusinessConsolidator {
  constructor() {
    this.allBusinesses = [];
    this.duplicateMap = new Map();
    this.sources = {
      manual_database: 0,
      real_businesses: 0,
      chamber_scrapes: 0,
      yellowpages: 0,
      csv_imports: 0,
    };
  }

  async run() {
    console.log('🔄 Consolidating All Business Sources...\n');

    // Load all sources
    await this.loadManualDatabase();
    await this.loadRealBusinesses();
    await this.loadChamberData();
    await this.loadYellowPagesData();
    await this.loadCSVImports();

    // Deduplicate
    this.deduplicate();

    // Save consolidated
    await this.saveConsolidated();

    // Generate reports
    this.generateReport();

    console.log('\n✅ Consolidation Complete!');
  }

  async loadManualDatabase() {
    console.log('📚 Loading manual curated database...');
    austinBusinessDatabase.forEach(b => {
      b.source = 'manual_database';
      this.addBusiness(b);
    });
    console.log(`   ✓ Loaded ${austinBusinessDatabase.length} businesses\n`);
    this.sources.manual_database = austinBusinessDatabase.length;
  }

  async loadRealBusinesses() {
    console.log('📚 Loading real businesses list...');
    realAustinCedarParkBusinesses.forEach(b => {
      b.source = 'real_businesses';
      this.addBusiness(b);
    });
    console.log(`   ✓ Loaded ${realAustinCedarParkBusinesses.length} businesses\n`);
    this.sources.real_businesses = realAustinCedarParkBusinesses.length;
  }

  async loadChamberData() {
    try {
      const chamberPath = '/home/user/LocalBusinessBuildout/data/chamber-businesses.json';
      const data = await fs.readFile(chamberPath, 'utf-8');
      const businesses = JSON.parse(data);
      console.log('📚 Loading chamber scrape data...');
      businesses.forEach(b => {
        b.source = 'chamber_scrapes';
        this.addBusiness(b);
      });
      console.log(`   ✓ Loaded ${businesses.length} businesses\n`);
      this.sources.chamber_scrapes = businesses.length;
    } catch (error) {
      console.log('   ℹ️  No chamber data found\n');
    }
  }

  async loadYellowPagesData() {
    try {
      const ypPath = '/home/user/LocalBusinessBuildout/data/yellowpages-businesses.json';
      const data = await fs.readFile(ypPath, 'utf-8');
      const businesses = JSON.parse(data);
      console.log('📚 Loading Yellow Pages data...');
      businesses.forEach(b => {
        b.source = 'yellowpages';
        this.addBusiness(b);
      });
      console.log(`   ✓ Loaded ${businesses.length} businesses\n`);
      this.sources.yellowpages = businesses.length;
    } catch (error) {
      console.log('   ℹ️  No Yellow Pages data found\n');
    }
  }

  async loadCSVImports() {
    try {
      const csvDir = '/home/user/LocalBusinessBuildout/data/csv_imports';
      const files = await fs.readdir(csvDir);

      let total = 0;
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(csvDir, file);
          const data = await fs.readFile(filePath, 'utf-8');
          const businesses = JSON.parse(data);

          businesses.forEach(b => {
            b.source = 'csv_imports';
            this.addBusiness(b);
            total++;
          });
        }
      }

      if (total > 0) {
        console.log('📚 Loading CSV imports...');
        console.log(`   ✓ Loaded ${total} businesses\n`);
        this.sources.csv_imports = total;
      }
    } catch (error) {
      console.log('   ℹ️  No CSV imports found\n');
    }
  }

  addBusiness(business) {
    if (!business.name) return;

    // Create dedup key
    const key = this.createDedupKey(business);

    if (this.duplicateMap.has(key)) {
      // Merge data from multiple sources
      const existing = this.duplicateMap.get(key);
      this.mergeBusinessData(existing, business);
    } else {
      // Add new business
      business.slug = this.slugify(business.name);
      business.discovered_at = business.discovered_at || new Date().toISOString();
      this.allBusinesses.push(business);
      this.duplicateMap.set(key, business);
    }
  }

  createDedupKey(business) {
    // Use name + phone or name + address for deduplication
    const name = (business.name || '').toLowerCase().trim();
    const phone = (business.phone || '').replace(/\D/g, '');
    const address = (business.address || '').toLowerCase().trim().substring(0, 30);

    if (phone) {
      return `${name}-${phone}`;
    } else if (address) {
      return `${name}-${address}`;
    } else {
      return name;
    }
  }

  mergeBusinessData(existing, newData) {
    // Fill in missing fields
    if (!existing.phone && newData.phone) existing.phone = newData.phone;
    if (!existing.website && newData.website) existing.website = newData.website;
    if (!existing.address && newData.address) existing.address = newData.address;
    if (!existing.zip && newData.zip) existing.zip = newData.zip;
    if (!existing.category && newData.category) existing.category = newData.category;
    if (!existing.city && newData.city) existing.city = newData.city;

    // Track multiple sources
    if (!existing.sources) {
      existing.sources = [existing.source];
    }
    if (!existing.sources.includes(newData.source)) {
      existing.sources.push(newData.source);
    }
  }

  deduplicate() {
    console.log('🔍 Deduplicating businesses...');
    const before = this.allBusinesses.length;
    // Already deduplicated via Map
    console.log(`   ✓ ${before} unique businesses after deduplication\n`);
  }

  async saveConsolidated() {
    // Save JSON
    const jsonPath = '/home/user/LocalBusinessBuildout/data/austin-businesses-master.json';
    await fs.writeFile(jsonPath, JSON.stringify(this.allBusinesses, null, 2));
    console.log(`💾 Saved master JSON: ${jsonPath}`);

    // Save CSV
    const csvPath = '/home/user/LocalBusinessBuildout/data/austin-businesses-master.csv';
    await fs.writeFile(csvPath, this.toCSV());
    console.log(`💾 Saved master CSV: ${csvPath}`);
  }

  toCSV() {
    const headers = [
      'Business Name', 'Address', 'City', 'Zip', 'Phone',
      'Website', 'Category', 'Industry', 'Source', 'Slug'
    ];

    const rows = this.allBusinesses.map(b => [
      this.escapeCSV(b.name),
      this.escapeCSV(b.address),
      this.escapeCSV(b.city),
      this.escapeCSV(b.zip),
      this.escapeCSV(b.phone),
      this.escapeCSV(b.website),
      this.escapeCSV(b.category),
      this.escapeCSV(b.industry),
      this.escapeCSV(Array.isArray(b.sources) ? b.sources.join('; ') : b.source),
      this.escapeCSV(b.slug),
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  escapeCSV(field) {
    if (!field) return '';
    const str = String(field);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 CONSOLIDATION REPORT');
    console.log('='.repeat(60));
    console.log(`\n📈 Total Unique Businesses: ${this.allBusinesses.length}\n`);

    console.log('📚 By Source:');
    Object.entries(this.sources).forEach(([source, count]) => {
      if (count > 0) {
        console.log(`   ${source.replace(/_/g, ' ')}: ${count}`);
      }
    });

    console.log('\n🏙️  By City:');
    const byCity = {};
    this.allBusinesses.forEach(b => {
      byCity[b.city] = (byCity[b.city] || 0) + 1;
    });
    Object.entries(byCity)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .forEach(([city, count]) => {
        console.log(`   ${city}: ${count}`);
      });

    console.log('\n🏢 By Category:');
    const byCategory = {};
    this.allBusinesses.forEach(b => {
      const cat = b.category || b.industry || 'Uncategorized';
      byCategory[cat] = (byCategory[cat] || 0) + 1;
    });
    Object.entries(byCategory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .forEach(([category, count]) => {
        console.log(`   ${category}: ${count}`);
      });

    console.log('\n📊 Data Quality:');
    const withPhone = this.allBusinesses.filter(b => b.phone).length;
    const withWebsite = this.allBusinesses.filter(b => b.website).length;
    const withAddress = this.allBusinesses.filter(b => b.address).length;
    const withZip = this.allBusinesses.filter(b => b.zip).length;

    console.log(`   With Phone: ${withPhone} (${Math.round((withPhone / this.allBusinesses.length) * 100)}%)`);
    console.log(`   With Website: ${withWebsite} (${Math.round((withWebsite / this.allBusinesses.length) * 100)}%)`);
    console.log(`   With Address: ${withAddress} (${Math.round((withAddress / this.allBusinesses.length) * 100)}%)`);
    console.log(`   With Zip: ${withZip} (${Math.round((withZip / this.allBusinesses.length) * 100)}%)`);
    console.log('='.repeat(60));
  }

  slugify(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
}

// Run
if (import.meta.url === `file://${process.argv[1]}`) {
  const consolidator = new BusinessConsolidator();
  consolidator.run().catch(console.error);
}

export default BusinessConsolidator;
