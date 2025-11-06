#!/usr/bin/env node

/**
 * Discovery Agent
 * Discovers and collects data on small businesses in Austin, Texas
 */

import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { config } from '../../config/config.js';

class DiscoveryAgent {
  constructor() {
    this.businesses = [];
    this.duplicateUrls = new Set();
    this.duplicateNames = new Set();
  }

  /**
   * Main execution method
   */
  async run() {
    console.log('🔍 DiscoveryAgent starting...\n');

    try {
      // Try to load existing businesses
      await this.loadExistingBusinesses();

      // Discover businesses from multiple sources
      await this.discoverFromCuratedList();

      if (config.api.yelpKey) {
        await this.discoverFromYelp();
      } else {
        console.log('⚠️  Yelp API key not configured, skipping Yelp discovery');
      }

      if (config.api.googleMapsKey) {
        await this.discoverFromGoogleMaps();
      } else {
        console.log('⚠️  Google Maps API key not configured, skipping Google Maps discovery');
      }

      // Validate URLs
      await this.validateUrls();

      // Save results
      await this.saveBusinesses();

      // Print summary
      this.printSummary();

      console.log('\n✅ DiscoveryAgent completed successfully!');
    } catch (error) {
      console.error('❌ DiscoveryAgent failed:', error.message);
      throw error;
    }
  }

  /**
   * Load existing businesses to avoid duplicates
   */
  async loadExistingBusinesses() {
    try {
      const data = await fs.readFile(config.files.businesses, 'utf-8');
      const existing = JSON.parse(data);

      console.log(`📂 Loaded ${existing.length} existing businesses`);

      existing.forEach(biz => {
        if (biz.url) this.duplicateUrls.add(this.normalizeUrl(biz.url));
        if (biz.name) this.duplicateNames.add(biz.name.toLowerCase());
      });

      this.businesses = existing;
    } catch (error) {
      console.log('📂 No existing businesses found, starting fresh');
    }
  }

  /**
   * Discover businesses from curated Austin business list
   */
  async discoverFromCuratedList() {
    console.log('\n🎯 Discovering from curated Austin business list...');

    // Curated list of popular Austin businesses
    const curatedBusinesses = [
      { name: "Jo's Coffee", url: "https://joscoffee.com", industry: "cafe", address: "1300 S Congress Ave, Austin, TX 78704" },
      { name: "Franklin Barbecue", url: "https://franklinbbq.com", industry: "restaurant", address: "900 E 11th St, Austin, TX 78702" },
      { name: "Torchy's Tacos", url: "https://torchystacos.com", industry: "restaurant", address: "1822 S Congress Ave, Austin, TX 78704" },
      { name: "Amy's Ice Creams", url: "https://amysicecreams.com", industry: "dessert", address: "1012 W 6th St, Austin, TX 78703" },
      { name: "Kerbey Lane Cafe", url: "https://kerbeylanecafe.com", industry: "restaurant", address: "3704 Kerbey Ln, Austin, TX 78731" },
      { name: "Magnolia Cafe", url: "https://themagnoliacafe.com", industry: "restaurant", address: "1920 S Congress Ave, Austin, TX 78704" },
      { name: "Alamo Drafthouse", url: "https://drafthouse.com", industry: "entertainment", address: "1120 S Lamar Blvd, Austin, TX 78704" },
      { name: "Book People", url: "https://bookpeople.com", industry: "retail", address: "603 N Lamar Blvd, Austin, TX 78703" },
      { name: "Waterloo Records", url: "https://waterloorecords.com", industry: "retail", address: "600 N Lamar Blvd, Austin, TX 78703" },
      { name: "Barton Springs Pool", url: "https://www.austintexas.gov/department/barton-springs-pool", industry: "recreation", address: "2131 William Barton Dr, Austin, TX 78704" },
      { name: "La Barbecue", url: "https://labarbecue.com", industry: "restaurant", address: "2027 E Cesar Chavez St, Austin, TX 78702" },
      { name: "Home Slice Pizza", url: "https://homeslicepizza.com", industry: "restaurant", address: "1415 S Congress Ave, Austin, TX 78704" },
      { name: "Matt's El Rancho", url: "https://mattselrancho.com", industry: "restaurant", address: "2613 S Lamar Blvd, Austin, TX 78704" },
      { name: "Chuy's", url: "https://chuys.com", industry: "restaurant", address: "1728 Barton Springs Rd, Austin, TX 78704" },
      { name: "Stubb's Bar-B-Q", url: "https://stubbsaustin.com", industry: "restaurant", address: "801 Red River St, Austin, TX 78701" },
      { name: "The Broken Spoke", url: "https://brokenspokeaustintx.net", industry: "entertainment", address: "3201 S Lamar Blvd, Austin, TX 78704" },
      { name: "Banger's Sausage House", url: "https://bangersaustin.com", industry: "restaurant", address: "79 Rainey St, Austin, TX 78701" },
      { name: "Zilker Brewing Company", url: "https://zilkerbeer.com", industry: "brewery", address: "1701 W 6th St, Austin, TX 78703" },
      { name: "Austin Beerworks", url: "https://austinbeerworks.com", industry: "brewery", address: "3001 Industrial Terrace, Austin, TX 78758" },
      { name: "Houndstooth Coffee", url: "https://houndstoothcoffee.com", industry: "cafe", address: "4200 N Lamar Blvd, Austin, TX 78756" },
      { name: "Bird's Barbershop", url: "https://birdsbarbershop.com", industry: "salon", address: "2110 S Lamar Blvd, Austin, TX 78704" },
      { name: "Stretch Lab Austin", url: "https://stretchlab.com", industry: "fitness", address: "Multiple Locations, Austin, TX" },
      { name: "Pure Austin Fitness", url: "https://pureaustinfitness.com", industry: "fitness", address: "5000 Burnet Rd, Austin, TX 78756" },
      { name: "Pinballz Arcade", url: "https://pinballzarcade.com", industry: "entertainment", address: "8940 Research Blvd, Austin, TX 78758" },
      { name: "Peter Pan Mini Golf", url: "https://peterpanminigolf.com", industry: "entertainment", address: "1207 Barton Springs Rd, Austin, TX 78704" },
    ];

    let addedCount = 0;

    for (const business of curatedBusinesses) {
      if (this.addBusiness(business)) {
        addedCount++;
      }
    }

    console.log(`  ✓ Added ${addedCount} businesses from curated list`);
  }

  /**
   * Discover businesses from Yelp API
   */
  async discoverFromYelp() {
    console.log('\n🔍 Discovering from Yelp API...');

    if (!config.api.yelpKey) {
      console.log('  ⚠️  Yelp API key not configured');
      return;
    }

    // Note: Yelp API implementation would go here
    // For now, we'll skip this to avoid API key requirements
    console.log('  ⚠️  Yelp API integration not yet implemented');
  }

  /**
   * Discover businesses from Google Maps API
   */
  async discoverFromGoogleMaps() {
    console.log('\n🗺️  Discovering from Google Maps API...');

    if (!config.api.googleMapsKey) {
      console.log('  ⚠️  Google Maps API key not configured');
      return;
    }

    // Note: Google Maps API implementation would go here
    // For now, we'll skip this to avoid API key requirements
    console.log('  ⚠️  Google Maps API integration not yet implemented');
  }

  /**
   * Validate URLs for each business
   */
  async validateUrls() {
    console.log('\n🔗 Validating business URLs...');

    let validCount = 0;
    let invalidCount = 0;

    for (const business of this.businesses) {
      if (!business.url) {
        business.url_valid = false;
        invalidCount++;
        continue;
      }

      // Simple URL format validation (avoid HEAD requests that get blocked)
      if (business.url.startsWith('http://') || business.url.startsWith('https://')) {
        business.url_valid = true;
        validCount++;
      } else {
        business.url_valid = false;
        business.url_error = 'Invalid URL format';
        invalidCount++;
      }
    }

    console.log(`  ✓ Valid URLs: ${validCount}`);
    console.log(`  ✗ Invalid URLs: ${invalidCount}`);
  }

  /**
   * Add a business to the collection (with duplicate checking)
   */
  addBusiness(business) {
    // Normalize and check for duplicates
    const normalizedUrl = this.normalizeUrl(business.url);
    const normalizedName = business.name.toLowerCase();

    if (this.duplicateUrls.has(normalizedUrl)) {
      return false;
    }

    if (this.duplicateNames.has(normalizedName)) {
      return false;
    }

    // Generate slug
    business.slug = this.generateSlug(business.name);

    // Add size estimate if not present
    if (!business.size_estimate) {
      business.size_estimate = '1-50';
    }

    // Mark as discovered
    business.discovered_at = new Date().toISOString();

    this.businesses.push(business);
    this.duplicateUrls.add(normalizedUrl);
    this.duplicateNames.add(normalizedName);

    return true;
  }

  /**
   * Save businesses to JSON file
   */
  async saveBusinesses() {
    console.log('\n💾 Saving businesses...');

    await fs.writeFile(
      config.files.businesses,
      JSON.stringify(this.businesses, null, 2),
      'utf-8'
    );

    console.log(`  ✓ Saved ${this.businesses.length} businesses to ${config.files.businesses}`);
  }

  /**
   * Print summary statistics
   */
  printSummary() {
    console.log('\n📊 Discovery Summary:');
    console.log(`  Total businesses: ${this.businesses.length}`);
    console.log(`  Target: ${config.discovery.maxBusinesses}`);
    console.log(`  Progress: ${Math.round((this.businesses.length / config.discovery.maxBusinesses) * 100)}%`);

    const validUrls = this.businesses.filter(b => b.url_valid).length;
    const validPercentage = Math.round((validUrls / this.businesses.length) * 100);
    console.log(`  Valid URLs: ${validUrls} (${validPercentage}%)`);

    // Group by industry
    const byIndustry = {};
    this.businesses.forEach(b => {
      byIndustry[b.industry] = (byIndustry[b.industry] || 0) + 1;
    });

    console.log('\n  By Industry:');
    Object.entries(byIndustry)
      .sort((a, b) => b[1] - a[1])
      .forEach(([industry, count]) => {
        console.log(`    ${industry}: ${count}`);
      });
  }

  /**
   * Helper: Normalize URL
   */
  normalizeUrl(url) {
    if (!url) return '';
    return url.toLowerCase().replace(/\/$/, '').replace(/^https?:\/\//, '');
  }

  /**
   * Helper: Generate slug from business name
   */
  generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Helper: Sleep utility
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const agent = new DiscoveryAgent();
  agent.run().catch(error => {
    console.error(error);
    process.exit(1);
  });
}

export default DiscoveryAgent;
