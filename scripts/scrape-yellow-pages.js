#!/usr/bin/env node

/**
 * Yellow Pages Scraper for Austin-area businesses
 * Scrapes YP.com for businesses in 50-mile radius zip codes
 */

import fs from 'fs/promises';
import axios from 'axios';
import * as cheerio from 'cheerio';

class YellowPagesScraper {
  constructor() {
    this.businesses = [];
    this.duplicateMap = new Map();
    this.successCount = 0;
    this.failureCount = 0;

    // Priority zip codes (Austin 50-mile radius)
    this.zipCodes = [
      // Austin central
      '78701', '78702', '78703', '78704', '78705',
      // Cedar Park / Round Rock
      '78613', '78630', '78664', '78681',
      // Pflugerville / Georgetown
      '78660', '78626', '78628',
      // Leander / Liberty Hill
      '78641', '78646', '78642',
      // Lakeway / West Austin
      '78734', '78746',
    ];

    // Business categories to search
    this.categories = [
      'restaurants',
      'dentists',
      'plumbers',
      'electricians',
      'hair-salons',
      'auto-repair',
      'real-estate-agents',
      'accountants',
      'lawyers',
      'medical-doctors',
      'contractors',
      'landscaping',
      'cleaning-services',
      'insurance',
      'retail-stores',
    ];
  }

  async run(limit = null) {
    console.log('📕 Yellow Pages Scraper Starting...\n');

    const searchTargets = limit
      ? this.zipCodes.slice(0, 3).flatMap(zip =>
          this.categories.slice(0, 2).map(cat => ({ zip, category: cat }))
        )
      : this.zipCodes.flatMap(zip =>
          this.categories.map(cat => ({ zip, category: cat }))
        );

    console.log(`🎯 Target: ${searchTargets.length} searches (${this.zipCodes.length} zips × ${this.categories.length} categories)\n`);

    for (let i = 0; i < searchTargets.length; i++) {
      const { zip, category } = searchTargets[i];

      console.log(`[${i + 1}/${searchTargets.length}] Searching: ${category} in ${zip}`);

      try {
        await this.searchYellowPages(category, zip);
        this.successCount++;
        await this.sleep(2000); // Rate limiting
      } catch (error) {
        console.error(`  ❌ Failed: ${error.message}`);
        this.failureCount++;
      }
    }

    await this.saveResults();
    this.printSummary();
  }

  async searchYellowPages(category, zip) {
    // YP.com URL format
    const url = `https://www.yellowpages.com/search?search_terms=${category}&geo_location_terms=${zip}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        timeout: 15000,
      });

      const $ = cheerio.load(response.data);
      const listings = this.parseYPListings($, category, zip);

      console.log(`  ✓ Found ${listings.length} businesses`);

      listings.forEach(business => this.addBusiness(business));

    } catch (error) {
      if (error.response?.status === 403) {
        throw new Error('403 Forbidden - YP blocking requests');
      }
      throw error;
    }
  }

  parseYPListings($, category, zip) {
    const businesses = [];

    // Try multiple YP selectors (they change frequently)
    const selectors = [
      '.result',
      '.search-result',
      '.listing',
      '[class*="result"]',
      '.srp-listing',
    ];

    let foundSelector = null;
    for (const selector of selectors) {
      if ($(selector).length > 0) {
        foundSelector = selector;
        break;
      }
    }

    if (!foundSelector) {
      console.log('  ⚠️  Could not find listing selector');
      return businesses;
    }

    $(foundSelector).each((i, elem) => {
      const $elem = $(elem);

      const business = {
        name: this.extractText($elem, ['.business-name', 'h2', 'h3', '.name', 'a.business-name']),
        address: this.extractText($elem, ['.street-address', '.adr', '[itemprop="streetAddress"]']),
        city: this.extractText($elem, ['.locality', '[itemprop="addressLocality"]']) || 'Austin',
        zip: zip,
        phone: this.extractPhone($elem),
        website: this.extractWebsite($elem),
        category: category,
        source: 'Yellow Pages',
        discovered_at: new Date().toISOString(),
      };

      if (business.name) {
        business.slug = this.slugify(business.name);
        businesses.push(business);
      }
    });

    return businesses;
  }

  extractText($elem, selectors) {
    for (const sel of selectors) {
      const text = $elem.find(sel).first().text().trim();
      if (text) return text;
    }
    return '';
  }

  extractPhone($elem) {
    const selectors = [
      '.phone',
      '[class*="phone"]',
      'a[href^="tel:"]',
      '[itemprop="telephone"]',
    ];

    for (const sel of selectors) {
      let phone = $elem.find(sel).first().text().trim();
      if (!phone && sel.includes('tel:')) {
        phone = $elem.find(sel).attr('href')?.replace('tel:', '').replace(/\D/g, '');
      }
      if (phone) {
        return this.formatPhone(phone);
      }
    }
    return '';
  }

  extractWebsite($elem) {
    const link = $elem.find('a[href*="http"]').attr('href');
    if (link && !link.includes('yellowpages.com')) {
      return link;
    }
    return '';
  }

  formatPhone(phone) {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    return phone;
  }

  addBusiness(business) {
    const key = `${business.name.toLowerCase()}-${business.phone}`;

    if (this.duplicateMap.has(key)) {
      return; // Skip duplicate
    }

    this.businesses.push(business);
    this.duplicateMap.set(key, true);
  }

  async saveResults() {
    const jsonPath = '/home/user/LocalBusinessBuildout/data/yellowpages-businesses.json';
    await fs.writeFile(jsonPath, JSON.stringify(this.businesses, null, 2));

    const csvPath = '/home/user/LocalBusinessBuildout/data/yellowpages-businesses.csv';
    await fs.writeFile(csvPath, this.toCSV());

    console.log(`\n💾 Saved ${this.businesses.length} businesses`);
  }

  toCSV() {
    const headers = ['Name', 'Address', 'City', 'Zip', 'Phone', 'Website', 'Category'];
    const rows = this.businesses.map(b => [
      b.name, b.address, b.city, b.zip, b.phone, b.website, b.category
    ].map(f => `"${f}"`).join(','));

    return [headers.join(','), ...rows].join('\n');
  }

  printSummary() {
    console.log('\n📊 Summary:');
    console.log(`   Successful searches: ${this.successCount}`);
    console.log(`   Failed searches: ${this.failureCount}`);
    console.log(`   Total businesses: ${this.businesses.length}`);
  }

  slugify(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run
if (import.meta.url === `file://${process.argv[1]}`) {
  const limit = process.argv.includes('--test');
  const scraper = new YellowPagesScraper();
  scraper.run(limit).catch(console.error);
}

export default YellowPagesScraper;
