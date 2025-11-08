#!/usr/bin/env node

/**
 * Chamber of Commerce Directory Scraper
 * Scrapes all 12+ Austin-area Chamber directories for business listings
 * Uses Axios + Cheerio (fast, free) with intelligent parsing
 */

import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';

class ChamberScraper {
  constructor() {
    this.businesses = [];
    this.successCount = 0;
    this.failureCount = 0;
    this.errors = [];
    this.duplicateMap = new Map(); // Track duplicates by name+address

    // Chamber configurations
    this.chambers = [
      {
        name: 'Austin Chamber',
        city: 'Austin',
        url: 'https://www.austinchamber.com/business-directory',
        type: 'complex', // May need special handling
      },
      {
        name: 'Cedar Park Chamber',
        city: 'Cedar Park',
        url: 'https://business.cedarparkchamber.org/list',
        type: 'alphabetical',
      },
      {
        name: 'Round Rock Chamber',
        city: 'Round Rock',
        url: 'https://business.roundrockchamber.com/directory',
        type: 'directory',
      },
      {
        name: 'Georgetown Chamber',
        city: 'Georgetown',
        url: 'https://www.georgetownchamber.com/business-directory',
        type: 'directory',
      },
      {
        name: 'Leander Chamber',
        city: 'Leander',
        url: 'https://www.leanderchamberofcommerce.com',
        type: 'directory',
      },
      {
        name: 'Pflugerville Chamber',
        city: 'Pflugerville',
        url: 'https://www.pflugerville.org/business-directory',
        type: 'directory',
      },
      {
        name: 'Williamson County Chamber',
        city: 'Williamson County',
        url: 'https://www.williamsoncountychamber.com/directory',
        type: 'directory',
      },
      {
        name: 'Burnet Chamber',
        city: 'Burnet',
        url: 'https://www.burnetchamber.org/business-directory',
        type: 'directory',
      },
      {
        name: 'Marble Falls Chamber',
        city: 'Marble Falls',
        url: 'https://www.marblefallschamber.org/business-directory',
        type: 'directory',
      },
      {
        name: 'Taylor Chamber',
        city: 'Taylor',
        url: 'https://www.taylortexaschamber.com',
        type: 'directory',
      },
      {
        name: 'Hutto Chamber',
        city: 'Hutto',
        url: 'https://www.huttochamber.com/directory',
        type: 'directory',
      },
      {
        name: 'Bastrop Chamber',
        city: 'Bastrop',
        url: 'https://www.bastropchamber.com/business-directory',
        type: 'directory',
      },
    ];
  }

  /**
   * Main execution
   */
  async run(testMode = false) {
    console.log('🏛️  Chamber Directory Scraper Starting...\n');
    console.log(`📋 Target: ${this.chambers.length} chamber directories\n`);

    const chambersToScrape = testMode ? this.chambers.slice(0, 3) : this.chambers;

    if (testMode) {
      console.log('🧪 TEST MODE: Scraping first 3 chambers only\n');
    }

    for (const chamber of chambersToScrape) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`🏛️  ${chamber.name.toUpperCase()}`);
      console.log(`🌐 ${chamber.url}`);
      console.log(`${'='.repeat(60)}\n`);

      try {
        await this.scrapeChamber(chamber);
        this.successCount++;
      } catch (error) {
        this.failureCount++;
        console.error(`❌ Failed to scrape ${chamber.name}: ${error.message}`);
        this.errors.push({
          chamber: chamber.name,
          url: chamber.url,
          error: error.message,
          timestamp: new Date().toISOString(),
        });
      }

      // Rate limiting - be respectful
      await this.sleep(3000);
    }

    // Save results
    await this.saveResults();
    this.printSummary();

    console.log('\n✅ Chamber scraping completed!');
  }

  /**
   * Scrape a single chamber directory
   */
  async scrapeChamber(chamber) {
    console.log(`📡 Fetching directory page...`);

    const response = await axios.get(chamber.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      timeout: 15000,
    });

    console.log(`✓ Received ${response.data.length} bytes of HTML`);

    // Save raw HTML for debugging
    const rawPath = path.join('/home/user/LocalBusinessBuildout/data/chamber_raw',
                               `${this.slugify(chamber.name)}.html`);
    await fs.writeFile(rawPath, response.data, 'utf-8');
    console.log(`💾 Raw HTML saved to chamber_raw/`);

    // Parse HTML
    const $ = cheerio.load(response.data);
    console.log(`🔍 Parsing HTML structure...`);

    // Try multiple parsing strategies
    const businesses = this.parseBusinessListings($, chamber);

    console.log(`\n📊 Found ${businesses.length} business listings`);

    if (businesses.length > 0) {
      // Show first 3 as sample
      console.log(`\n📋 Sample listings:`);
      businesses.slice(0, 3).forEach((b, i) => {
        console.log(`   ${i + 1}. ${b.name}`);
        if (b.address) console.log(`      📍 ${b.address}`);
        if (b.phone) console.log(`      ☎️  ${b.phone}`);
        if (b.website) console.log(`      🌐 ${b.website}`);
      });
      if (businesses.length > 3) {
        console.log(`   ... and ${businesses.length - 3} more`);
      }
    }

    // Add to master list with deduplication
    businesses.forEach(business => {
      this.addBusiness(business, chamber.name);
    });

    console.log(`✓ Added to master database (${this.businesses.length} total unique businesses)`);
  }

  /**
   * Parse business listings from HTML - tries multiple strategies
   */
  parseBusinessListings($, chamber) {
    const businesses = [];

    // Strategy 1: Look for common class patterns
    const selectors = [
      '.business-listing',
      '.member-listing',
      '.directory-listing',
      '.company-listing',
      '.gz-directory-card',
      '.gz-card',
      'article[itemtype*="Organization"]',
      '.mn-listing',
      '.listing-item',
      '.business-item',
      '[class*="directory"] [class*="item"]',
      '[class*="member"] [class*="card"]',
    ];

    for (const selector of selectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        console.log(`   ✓ Found ${elements.length} items with selector: ${selector}`);

        elements.each((i, elem) => {
          const business = this.extractBusinessData($, $(elem), chamber);
          if (business && business.name) {
            businesses.push(business);
          }
        });

        if (businesses.length > 0) {
          console.log(`   ✓ Successfully extracted ${businesses.length} businesses`);
          return businesses;
        }
      }
    }

    // Strategy 2: Look for table rows
    $('table tr').each((i, row) => {
      if (i === 0) return; // Skip header
      const cells = $(row).find('td');
      if (cells.length >= 2) {
        const name = $(cells[0]).text().trim();
        if (name && name.length > 2) {
          businesses.push({
            name: name,
            address: cells.length > 1 ? $(cells[1]).text().trim() : '',
            phone: cells.length > 2 ? $(cells[2]).text().trim() : '',
            website: $(cells[0]).find('a').attr('href') || '',
            city: chamber.city,
            source: chamber.name,
          });
        }
      }
    });

    if (businesses.length > 0) {
      console.log(`   ✓ Extracted ${businesses.length} from table structure`);
      return businesses;
    }

    // Strategy 3: Look for any links with business-like patterns
    console.log(`   ⚠️  Trying generic link extraction (fallback)...`);
    $('a').each((i, elem) => {
      const text = $(elem).text().trim();
      const href = $(elem).attr('href');

      // Filter for business-like links (not navigation)
      if (text.length > 3 && text.length < 100 &&
          !text.match(/^(Home|About|Contact|Login|Search|Next|Previous|More)/i) &&
          href && !href.match(/^#|javascript:|mailto:/)) {

        // Try to find associated contact info
        const parent = $(elem).parent();
        const context = parent.text();

        businesses.push({
          name: text,
          address: this.extractAddress(context),
          phone: this.extractPhone(context),
          website: this.normalizeUrl(href, chamber.url),
          city: chamber.city,
          source: chamber.name,
        });
      }
    });

    console.log(`   ℹ️  Fallback extraction found ${businesses.length} potential businesses`);
    return businesses.slice(0, 500); // Limit fallback to prevent noise
  }

  /**
   * Extract business data from an element
   */
  extractBusinessData($, elem, chamber) {
    const business = {
      name: '',
      address: '',
      city: chamber.city,
      zip: '',
      phone: '',
      website: '',
      category: '',
      source: chamber.name,
      discovered_at: new Date().toISOString(),
    };

    // Extract name (try multiple selectors)
    const nameSelectors = [
      '.name', '.business-name', '.company-name',
      'h2', 'h3', '.title', 'a[href*="detail"]',
      '[itemprop="name"]'
    ];
    for (const sel of nameSelectors) {
      const name = elem.find(sel).first().text().trim();
      if (name) {
        business.name = name;
        break;
      }
    }

    // Fallback: use first link text
    if (!business.name) {
      business.name = elem.find('a').first().text().trim();
    }

    // Extract address
    const addressSelectors = [
      '.address', '.location', '.street',
      '[itemprop="address"]', '[itemprop="streetAddress"]'
    ];
    for (const sel of addressSelectors) {
      const addr = elem.find(sel).first().text().trim();
      if (addr) {
        business.address = addr;
        break;
      }
    }

    // Extract phone
    const phoneSelectors = [
      '.phone', '.tel', 'a[href^="tel:"]',
      '[itemprop="telephone"]'
    ];
    for (const sel of phoneSelectors) {
      let phone = elem.find(sel).first().text().trim();
      if (!phone && sel.includes('tel:')) {
        phone = elem.find(sel).attr('href')?.replace('tel:', '');
      }
      if (phone) {
        business.phone = this.cleanPhone(phone);
        break;
      }
    }

    // Extract website
    const websiteSelectors = [
      'a[href^="http"]',
      '.website a',
      '[itemprop="url"]'
    ];
    for (const sel of websiteSelectors) {
      const url = elem.find(sel).attr('href');
      if (url && !url.includes('cedarparkchamber.org') &&
          !url.includes('austinchamber.com') &&
          !url.includes('facebook.com/sharer')) {
        business.website = url;
        break;
      }
    }

    // Extract category if available
    const categorySelectors = ['.category', '.industry', '.type'];
    for (const sel of categorySelectors) {
      const cat = elem.find(sel).first().text().trim();
      if (cat) {
        business.category = cat;
        break;
      }
    }

    // Try to extract zip from address
    const zipMatch = business.address.match(/\b(\d{5})\b/);
    if (zipMatch) {
      business.zip = zipMatch[1];
    }

    return business;
  }

  /**
   * Extract address from text
   */
  extractAddress(text) {
    const match = text.match(/\d+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:\s+(?:St|Ave|Blvd|Rd|Dr|Ln|Way|Ct))?[.,]?\s*[A-Z]{2}\s*\d{5}/);
    return match ? match[0] : '';
  }

  /**
   * Extract phone from text
   */
  extractPhone(text) {
    const match = text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    return match ? this.cleanPhone(match[0]) : '';
  }

  /**
   * Clean phone number
   */
  cleanPhone(phone) {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    return phone;
  }

  /**
   * Normalize URL
   */
  normalizeUrl(url, baseUrl) {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    try {
      return new URL(url, baseUrl).href;
    } catch {
      return url;
    }
  }

  /**
   * Add business with deduplication
   */
  addBusiness(business, source) {
    if (!business.name || business.name.length < 2) return;

    // Create dedup key
    const dedupKey = `${business.name.toLowerCase().trim()}-${business.address.toLowerCase().trim()}`;

    if (this.duplicateMap.has(dedupKey)) {
      // Merge data from multiple sources
      const existing = this.duplicateMap.get(dedupKey);
      existing.sources = existing.sources || [existing.source];
      if (!existing.sources.includes(source)) {
        existing.sources.push(source);
      }

      // Fill in missing fields
      if (!existing.phone && business.phone) existing.phone = business.phone;
      if (!existing.website && business.website) existing.website = business.website;
      if (!existing.address && business.address) existing.address = business.address;
      if (!existing.zip && business.zip) existing.zip = business.zip;
      if (!existing.category && business.category) existing.category = business.category;

      return; // Skip duplicate
    }

    // Add new business
    business.slug = this.slugify(business.name);
    business.sources = [source];
    this.businesses.push(business);
    this.duplicateMap.set(dedupKey, business);
  }

  /**
   * Save results
   */
  async saveResults() {
    // Save JSON
    const jsonPath = '/home/user/LocalBusinessBuildout/data/chamber-businesses.json';
    await fs.writeFile(jsonPath, JSON.stringify(this.businesses, null, 2), 'utf-8');
    console.log(`\n💾 Saved ${this.businesses.length} businesses to chamber-businesses.json`);

    // Save CSV
    const csvPath = '/home/user/LocalBusinessBuildout/data/chamber-businesses.csv';
    const csv = this.convertToCSV(this.businesses);
    await fs.writeFile(csvPath, csv, 'utf-8');
    console.log(`💾 Saved CSV to chamber-businesses.csv`);

    // Save errors
    if (this.errors.length > 0) {
      const errorsPath = '/home/user/LocalBusinessBuildout/data/chamber-scrape-errors.json';
      await fs.writeFile(errorsPath, JSON.stringify(this.errors, null, 2), 'utf-8');
      console.log(`⚠️  Saved ${this.errors.length} errors to chamber-scrape-errors.json`);
    }

    // Save report
    const report = {
      timestamp: new Date().toISOString(),
      chambers_scraped: this.successCount,
      chambers_failed: this.failureCount,
      total_businesses: this.businesses.length,
      by_city: this.groupByCity(),
      by_source: this.groupBySource(),
      data_quality: this.calculateDataQuality(),
    };

    const reportPath = '/home/user/LocalBusinessBuildout/data/chamber-scrape-report.json';
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(`📊 Saved report to chamber-scrape-report.json`);
  }

  /**
   * Convert to CSV
   */
  convertToCSV(businesses) {
    const headers = [
      'Business Name', 'Address', 'City', 'Zip', 'Phone',
      'Website', 'Category', 'Sources', 'Slug'
    ];

    const rows = businesses.map(b => [
      this.escapeCSV(b.name),
      this.escapeCSV(b.address),
      this.escapeCSV(b.city),
      this.escapeCSV(b.zip),
      this.escapeCSV(b.phone),
      this.escapeCSV(b.website),
      this.escapeCSV(b.category),
      this.escapeCSV(Array.isArray(b.sources) ? b.sources.join('; ') : b.source),
      this.escapeCSV(b.slug),
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  /**
   * Escape CSV field
   */
  escapeCSV(field) {
    if (!field) return '';
    const str = String(field);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  /**
   * Group by city
   */
  groupByCity() {
    const grouped = {};
    this.businesses.forEach(b => {
      grouped[b.city] = (grouped[b.city] || 0) + 1;
    });
    return grouped;
  }

  /**
   * Group by source
   */
  groupBySource() {
    const grouped = {};
    this.businesses.forEach(b => {
      const sources = Array.isArray(b.sources) ? b.sources : [b.source];
      sources.forEach(source => {
        grouped[source] = (grouped[source] || 0) + 1;
      });
    });
    return grouped;
  }

  /**
   * Calculate data quality metrics
   */
  calculateDataQuality() {
    const total = this.businesses.length;
    const withPhone = this.businesses.filter(b => b.phone).length;
    const withWebsite = this.businesses.filter(b => b.website).length;
    const withAddress = this.businesses.filter(b => b.address).length;
    const withZip = this.businesses.filter(b => b.zip).length;

    return {
      total_businesses: total,
      with_phone: withPhone,
      with_website: withWebsite,
      with_address: withAddress,
      with_zip: withZip,
      phone_pct: Math.round((withPhone / total) * 100),
      website_pct: Math.round((withWebsite / total) * 100),
      address_pct: Math.round((withAddress / total) * 100),
      zip_pct: Math.round((withZip / total) * 100),
    };
  }

  /**
   * Print summary
   */
  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 CHAMBER SCRAPING SUMMARY');
    console.log('='.repeat(60));
    console.log(`\n✅ Chambers scraped successfully: ${this.successCount}`);
    console.log(`❌ Chambers failed: ${this.failureCount}`);
    console.log(`\n📈 Total unique businesses: ${this.businesses.length}`);

    console.log('\n🏙️  By City:');
    Object.entries(this.groupByCity())
      .sort((a, b) => b[1] - a[1])
      .forEach(([city, count]) => {
        console.log(`   ${city}: ${count}`);
      });

    console.log('\n🏛️  By Source:');
    Object.entries(this.groupBySource())
      .sort((a, b) => b[1] - a[1])
      .forEach(([source, count]) => {
        console.log(`   ${source}: ${count}`);
      });

    const quality = this.calculateDataQuality();
    console.log('\n📊 Data Quality:');
    console.log(`   With Phone: ${quality.with_phone} (${quality.phone_pct}%)`);
    console.log(`   With Website: ${quality.with_website} (${quality.website_pct}%)`);
    console.log(`   With Address: ${quality.with_address} (${quality.address_pct}%)`);
    console.log(`   With Zip: ${quality.with_zip} (${quality.zip_pct}%)`);
  }

  /**
   * Create slug from name
   */
  slugify(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Sleep utility
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const testMode = process.argv.includes('--test');

  const scraper = new ChamberScraper();
  scraper.run(testMode).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export default ChamberScraper;
