#!/usr/bin/env node

/**
 * Google Places API Business Scraper
 * Searches for businesses in Austin 50-mile radius using Google Places API
 *
 * SETUP:
 * 1. Get API key from: https://console.cloud.google.com/
 * 2. Enable "Places API" in Google Cloud Console
 * 3. Add to .env: GOOGLE_PLACES_API_KEY=your_key_here
 * 4. Run: node scripts/google-places-scraper.js
 *
 * COST: ~$17-32 per 1,000 businesses
 */

import fs from 'fs/promises';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class GooglePlacesScraper {
  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY;
    this.businesses = [];
    this.duplicateMap = new Map();
    this.totalCost = 0;
    this.apiCalls = 0;

    if (!this.apiKey) {
      throw new Error('GOOGLE_PLACES_API_KEY not found in .env file');
    }

    // Austin 50-mile radius zip codes
    this.zipCodes = [
      '78701', '78702', '78703', '78704', '78705',
      '78721', '78722', '78723', '78741', '78742',
      '78745', '78746', '78748', '78751', '78752',
      '78753', '78754', '78756', '78757', '78758',
      '78759', '78613', '78630', '78664', '78681',
      '78660', '78626', '78628', '78641', '78646',
      '78734', '78642',
    ];

    // Business categories
    this.categories = [
      'restaurant', 'cafe', 'bar', 'bakery',
      'dentist', 'doctor', 'pharmacy', 'hospital',
      'hair salon', 'spa', 'beauty salon', 'barbershop',
      'plumber', 'electrician', 'hvac', 'contractor',
      'auto repair', 'car dealer', 'car wash',
      'real estate agent', 'law firm', 'accounting',
      'gym', 'yoga studio', 'fitness center',
      'grocery store', 'pharmacy', 'convenience store',
      'clothing store', 'furniture store',
      'hotel', 'insurance agency', 'bank',
    ];
  }

  async run(limit = null) {
    console.log('🗺️  Google Places API Scraper Starting...\n');
    console.log(`🔑 API Key: ${this.apiKey.substring(0, 10)}...`);
    console.log(`📍 Zip Codes: ${this.zipCodes.length}`);
    console.log(`🏢 Categories: ${this.categories.length}`);
    console.log(`🎯 Total Searches: ${this.zipCodes.length * this.categories.length}\n`);

    const searches = limit
      ? this.zipCodes.slice(0, 2).flatMap(zip =>
          this.categories.slice(0, 3).map(cat => ({ zip, category: cat }))
        )
      : this.zipCodes.flatMap(zip =>
          this.categories.map(cat => ({ zip, category: cat }))
        );

    console.log(`Starting ${searches.length} searches...\n`);

    for (let i = 0; i < searches.length; i++) {
      const { zip, category } = searches[i];

      console.log(`[${i + 1}/${searches.length}] ${category} in ${zip}`);

      try {
        await this.searchPlaces(category, zip);
        await this.sleep(1000); // Rate limiting
      } catch (error) {
        console.error(`  ❌ Error: ${error.message}`);
      }
    }

    await this.saveResults();
    this.printSummary();
  }

  async searchPlaces(category, zip) {
    const query = `${category} in ${zip} Texas`;

    try {
      // Use Text Search API
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
        params: {
          query: query,
          key: this.apiKey,
        },
      });

      this.apiCalls++;
      this.totalCost += 0.032; // $32 per 1,000 Text Search requests

      if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
        throw new Error(`API Error: ${response.data.status} - ${response.data.error_message || ''}`);
      }

      const results = response.data.results || [];
      console.log(`  ✓ Found ${results.length} results`);

      for (const place of results) {
        await this.processPlace(place, category, zip);
      }

    } catch (error) {
      if (error.response?.status === 429) {
        console.log('  ⚠️  Rate limit hit, waiting 60 seconds...');
        await this.sleep(60000);
        return await this.searchPlaces(category, zip); // Retry
      }
      throw error;
    }
  }

  async processPlace(place, category, zip) {
    const business = {
      name: place.name,
      address: place.formatted_address || '',
      city: this.extractCity(place.formatted_address),
      zip: this.extractZip(place.formatted_address) || zip,
      phone: '', // Not in basic response
      website: '', // Not in basic response
      category: category,
      industry: this.categorizeIndustry(category),
      rating: place.rating || 0,
      review_count: place.user_ratings_total || 0,
      google_place_id: place.place_id,
      lat: place.geometry?.location?.lat || 0,
      lng: place.geometry?.location?.lng || 0,
      source: 'Google Places API',
      discovered_at: new Date().toISOString(),
    };

    // Optionally get details (costs more)
    // await this.getPlaceDetails(business);

    this.addBusiness(business);
  }

  async getPlaceDetails(business) {
    // Place Details API (costs $17 per 1,000 requests)
    // Uncomment if you want phone/website (more expensive)

    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
        params: {
          place_id: business.google_place_id,
          fields: 'formatted_phone_number,website,opening_hours',
          key: this.apiKey,
        },
      });

      this.apiCalls++;
      this.totalCost += 0.017; // $17 per 1,000 Details requests

      if (response.data.result) {
        business.phone = response.data.result.formatted_phone_number || '';
        business.website = response.data.result.website || '';
      }
    } catch (error) {
      console.error(`  ⚠️  Could not fetch details: ${error.message}`);
    }
  }

  addBusiness(business) {
    const key = `${business.name.toLowerCase()}-${business.google_place_id}`;

    if (this.duplicateMap.has(key)) {
      return; // Skip duplicate
    }

    business.slug = this.slugify(business.name);
    this.businesses.push(business);
    this.duplicateMap.set(key, true);
  }

  extractCity(address) {
    if (!address) return '';

    // Try to extract city from "123 St, City, TX 78701"
    const parts = address.split(',');
    if (parts.length >= 3) {
      return parts[1].trim();
    }
    return 'Austin';
  }

  extractZip(address) {
    if (!address) return '';

    const match = address.match(/\b(\d{5})\b/);
    return match ? match[1] : '';
  }

  categorizeIndustry(category) {
    const mapping = {
      'restaurant': 'Food & Beverage',
      'cafe': 'Food & Beverage',
      'bar': 'Food & Beverage',
      'bakery': 'Food & Beverage',
      'dentist': 'Healthcare',
      'doctor': 'Healthcare',
      'pharmacy': 'Healthcare',
      'hair salon': 'Beauty & Personal Care',
      'spa': 'Beauty & Personal Care',
      'barbershop': 'Beauty & Personal Care',
      'plumber': 'Home Services',
      'electrician': 'Home Services',
      'hvac': 'Home Services',
      'auto repair': 'Automotive',
      'car dealer': 'Automotive',
      'real estate agent': 'Professional Services',
      'law firm': 'Professional Services',
      'accounting': 'Professional Services',
      'gym': 'Fitness & Recreation',
      'yoga studio': 'Fitness & Recreation',
      'grocery store': 'Retail',
      'clothing store': 'Retail',
      'hotel': 'Hospitality',
    };

    return mapping[category] || 'Other';
  }

  async saveResults() {
    const jsonPath = '/home/user/LocalBusinessBuildout/data/google-places-businesses.json';
    await fs.writeFile(jsonPath, JSON.stringify(this.businesses, null, 2));

    const csvPath = '/home/user/LocalBusinessBuildout/data/google-places-businesses.csv';
    await fs.writeFile(csvPath, this.toCSV());

    console.log(`\n💾 Saved ${this.businesses.length} businesses`);
    console.log(`📄 JSON: ${jsonPath}`);
    console.log(`📄 CSV: ${csvPath}`);
  }

  toCSV() {
    const headers = [
      'Name', 'Address', 'City', 'Zip', 'Phone', 'Website',
      'Category', 'Industry', 'Rating', 'Reviews', 'Google Place ID'
    ];

    const rows = this.businesses.map(b => [
      b.name, b.address, b.city, b.zip, b.phone, b.website,
      b.category, b.industry, b.rating, b.review_count, b.google_place_id
    ].map(f => `"${f}"`).join(','));

    return [headers.join(','), ...rows].join('\n');
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 GOOGLE PLACES API SUMMARY');
    console.log('='.repeat(60));
    console.log(`\n📈 Total businesses found: ${this.businesses.length}`);
    console.log(`📞 API calls made: ${this.apiCalls}`);
    console.log(`💰 Estimated cost: $${this.totalCost.toFixed(2)}`);

    const byCity = {};
    this.businesses.forEach(b => {
      byCity[b.city] = (byCity[b.city] || 0) + 1;
    });

    console.log('\n🏙️  Top Cities:');
    Object.entries(byCity)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([city, count]) => {
        console.log(`   ${city}: ${count}`);
      });

    console.log('\n💡 Next Steps:');
    console.log('   1. Review data: data/google-places-businesses.json');
    console.log('   2. Consolidate: node scripts/consolidate-all-businesses.js');
    console.log('   3. If needed, run getPlaceDetails() for phone/website');
    console.log('='.repeat(60));
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

  const scraper = new GooglePlacesScraper();
  scraper.run(limit).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export default GooglePlacesScraper;
