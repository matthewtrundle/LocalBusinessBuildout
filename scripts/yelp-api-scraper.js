#!/usr/bin/env node

/**
 * Yelp Fusion API Business Scraper
 * FREE - 5,000 API calls per day
 *
 * SETUP:
 * 1. Sign up at: https://www.yelp.com/developers/v3/manage_app
 * 2. Create an app and get API key
 * 3. Add to .env: YELP_API_KEY=your_key_here
 * 4. Run: node scripts/yelp-api-scraper.js
 *
 * COST: FREE (up to 5,000 calls/day)
 */

import fs from 'fs/promises';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class YelpAPIScraper {
  constructor() {
    this.apiKey = process.env.YELP_API_KEY;
    this.businesses = [];
    this.duplicateMap = new Map();
    this.apiCalls = 0;

    if (!this.apiKey) {
      throw new Error('YELP_API_KEY not found in .env file');
    }

    // Austin area locations
    this.locations = [
      'Austin, TX 78701',
      'Austin, TX 78704',
      'Austin, TX 78702',
      'Austin, TX 78703',
      'Austin, TX 78705',
      'Cedar Park, TX 78613',
      'Round Rock, TX 78664',
      'Georgetown, TX 78626',
      'Pflugerville, TX 78660',
      'Leander, TX 78641',
      'Lakeway, TX 78734',
    ];

    // Yelp categories
    this.categories = [
      'restaurants',
      'food',
      'bars',
      'coffee',
      'health',
      'dentists',
      'physicians',
      'beautysvc', // Beauty & Spas
      'homeservices',
      'auto',
      'realestate',
      'professional',
      'shopping',
      'active', // Active Life / Fitness
      'arts',
      'education',
      'hotelstravel',
    ];
  }

  async run(testMode = false) {
    console.log('🟡 Yelp Fusion API Scraper Starting...\n');
    console.log(`🔑 API Key: ${this.apiKey.substring(0, 10)}...`);
    console.log(`📍 Locations: ${this.locations.length}`);
    console.log(`🏢 Categories: ${this.categories.length}\n`);

    const searches = testMode
      ? this.locations.slice(0, 2).flatMap(loc =>
          this.categories.slice(0, 3).map(cat => ({ location: loc, category: cat }))
        )
      : this.locations.flatMap(loc =>
          this.categories.map(cat => ({ location: loc, category: cat }))
        );

    console.log(`Starting ${searches.length} searches...\n`);

    for (let i = 0; i < searches.length; i++) {
      const { location, category } = searches[i];

      console.log(`[${i + 1}/${searches.length}] ${category} in ${location}`);

      try {
        await this.searchYelp(category, location);
        await this.sleep(1000); // Be nice to API
      } catch (error) {
        console.error(`  ❌ Error: ${error.message}`);
      }
    }

    await this.saveResults();
    this.printSummary();
  }

  async searchYelp(category, location) {
    try {
      const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
        params: {
          categories: category,
          location: location,
          limit: 50, // Max per request
          sort_by: 'best_match',
        },
      });

      this.apiCalls++;

      const businesses = response.data.businesses || [];
      console.log(`  ✓ Found ${businesses.length} results`);

      for (const business of businesses) {
        this.processBusiness(business, category);
      }

    } catch (error) {
      if (error.response?.status === 429) {
        console.log('  ⚠️  Rate limit hit (5,000/day), waiting...');
        throw new Error('Daily limit reached');
      }

      if (error.response?.status === 401) {
        throw new Error('Invalid API key');
      }

      throw error;
    }
  }

  processBusiness(yelpBusiness, category) {
    const business = {
      name: yelpBusiness.name,
      address: this.formatAddress(yelpBusiness.location),
      city: yelpBusiness.location?.city || '',
      zip: yelpBusiness.location?.zip_code || '',
      phone: yelpBusiness.display_phone || yelpBusiness.phone || '',
      website: '', // Not provided by Yelp API
      category: category,
      industry: this.categorizeIndustry(category),
      rating: yelpBusiness.rating || 0,
      review_count: yelpBusiness.review_count || 0,
      yelp_id: yelpBusiness.id,
      yelp_url: yelpBusiness.url,
      lat: yelpBusiness.coordinates?.latitude || 0,
      lng: yelpBusiness.coordinates?.longitude || 0,
      is_closed: yelpBusiness.is_closed || false,
      price: yelpBusiness.price || '',
      source: 'Yelp Fusion API',
      discovered_at: new Date().toISOString(),
    };

    // Skip closed businesses
    if (business.is_closed) {
      return;
    }

    this.addBusiness(business);
  }

  formatAddress(location) {
    if (!location) return '';

    const parts = [
      ...(location.display_address || []),
    ];

    return parts.join(', ');
  }

  addBusiness(business) {
    const key = `${business.name.toLowerCase()}-${business.yelp_id}`;

    if (this.duplicateMap.has(key)) {
      return; // Skip duplicate
    }

    business.slug = this.slugify(business.name);
    this.businesses.push(business);
    this.duplicateMap.set(key, true);
  }

  categorizeIndustry(category) {
    const mapping = {
      'restaurants': 'Food & Beverage',
      'food': 'Food & Beverage',
      'bars': 'Food & Beverage',
      'coffee': 'Food & Beverage',
      'health': 'Healthcare',
      'dentists': 'Healthcare',
      'physicians': 'Healthcare',
      'beautysvc': 'Beauty & Personal Care',
      'homeservices': 'Home Services',
      'auto': 'Automotive',
      'realestate': 'Professional Services',
      'professional': 'Professional Services',
      'shopping': 'Retail',
      'active': 'Fitness & Recreation',
      'arts': 'Arts & Entertainment',
      'education': 'Education',
      'hotelstravel': 'Hospitality',
    };

    return mapping[category] || 'Other';
  }

  async saveResults() {
    const jsonPath = '/home/user/LocalBusinessBuildout/data/yelp-businesses.json';
    await fs.writeFile(jsonPath, JSON.stringify(this.businesses, null, 2));

    const csvPath = '/home/user/LocalBusinessBuildout/data/yelp-businesses.csv';
    await fs.writeFile(csvPath, this.toCSV());

    console.log(`\n💾 Saved ${this.businesses.length} businesses`);
    console.log(`📄 JSON: ${jsonPath}`);
    console.log(`📄 CSV: ${csvPath}`);
  }

  toCSV() {
    const headers = [
      'Name', 'Address', 'City', 'Zip', 'Phone',
      'Category', 'Industry', 'Rating', 'Reviews',
      'Price', 'Yelp URL', 'Yelp ID'
    ];

    const rows = this.businesses.map(b => [
      b.name, b.address, b.city, b.zip, b.phone,
      b.category, b.industry, b.rating, b.review_count,
      b.price, b.yelp_url, b.yelp_id
    ].map(f => `"${f}"`).join(','));

    return [headers.join(','), ...rows].join('\n');
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 YELP API SUMMARY');
    console.log('='.repeat(60));
    console.log(`\n📈 Total businesses found: ${this.businesses.length}`);
    console.log(`📞 API calls made: ${this.apiCalls} / 5,000 daily limit`);
    console.log(`💰 Cost: FREE`);

    const byCity = {};
    this.businesses.forEach(b => {
      byCity[b.city] = (byCity[b.city] || 0) + 1;
    });

    console.log('\n🏙️  By City:');
    Object.entries(byCity)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([city, count]) => {
        console.log(`   ${city}: ${count}`);
      });

    const byCategory = {};
    this.businesses.forEach(b => {
      byCategory[b.industry] = (byCategory[b.industry] || 0) + 1;
    });

    console.log('\n🏢 By Industry:');
    Object.entries(byCategory)
      .sort((a, b) => b[1] - a[1])
      .forEach(([industry, count]) => {
        console.log(`   ${industry}: ${count}`);
      });

    console.log('\n💡 Next Steps:');
    console.log('   1. Review data: data/yelp-businesses.json');
    console.log('   2. Consolidate: node scripts/consolidate-all-businesses.js');
    console.log('   3. Combine with Google Places data for complete coverage');
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
  const testMode = process.argv.includes('--test');

  const scraper = new YelpAPIScraper();
  scraper.run(testMode).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export default YelpAPIScraper;
