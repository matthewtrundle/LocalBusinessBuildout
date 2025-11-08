import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PlatformIdentifier {
  constructor() {
    this.parsedDir = path.join(__dirname, '..', 'data', 'parsed');
    this.rawDir = path.join(__dirname, '..', 'data', 'raw_sites');
  }

  /**
   * Identify platform from HTML content
   */
  identifyPlatform(html) {
    const htmlLower = html.toLowerCase();

    // Shopify identifiers
    if (htmlLower.includes('shopify') ||
        htmlLower.includes('myshopify.com') ||
        htmlLower.includes('cdn.shopify.com') ||
        htmlLower.includes('shopify-analytics')) {
      return 'Shopify';
    }

    // Square identifiers (payment/website platform - different from Squarespace!)
    if (htmlLower.includes('square.site') ||
        htmlLower.includes('squareup.com') ||
        htmlLower.includes('square online') ||
        htmlLower.includes('square-commerce') ||
        htmlLower.includes('cdn.sq-') ||
        htmlLower.includes('square-appointments')) {
      return 'Square';
    }

    // Squarespace identifiers
    if (htmlLower.includes('squarespace') ||
        htmlLower.includes('sqsp.com') ||
        htmlLower.includes('squarespace.com') ||
        htmlLower.includes('static1.squarespace.com')) {
      return 'Squarespace';
    }

    // Wix identifiers
    if (htmlLower.includes('wix.com') ||
        htmlLower.includes('wixsite.com') ||
        htmlLower.includes('_wix')) {
      return 'Wix';
    }

    // WordPress identifiers
    if (htmlLower.includes('wp-content') ||
        htmlLower.includes('wp-includes') ||
        htmlLower.includes('wordpress')) {
      return 'WordPress';
    }

    // Weebly
    if (htmlLower.includes('weebly')) {
      return 'Weebly';
    }

    // GoDaddy Website Builder
    if (htmlLower.includes('godaddy') || htmlLower.includes('secureserver.net')) {
      return 'GoDaddy';
    }

    return 'Custom/Unknown';
  }

  /**
   * Analyze all businesses
   */
  async analyze() {
    const files = await fs.readdir(this.parsedDir);
    const jsonFiles = files.filter(f => f.endsWith('.json'));

    const results = {
      shopify: [],
      square: [],
      squarespace: [],
      wix: [],
      wordpress: [],
      weebly: [],
      godaddy: [],
      custom: [],
      all: []
    };

    for (const file of jsonFiles) {
      try {
        const parsedPath = path.join(this.parsedDir, file);
        const parsed = JSON.parse(await fs.readFile(parsedPath, 'utf-8'));

        // Skip if no quality score
        if (!parsed.quality_score) continue;

        // Try to read raw HTML
        const slug = file.replace('.json', '');
        const htmlPath = path.join(this.rawDir, `${slug}.html`);

        let platform = 'Custom/Unknown';
        try {
          const html = await fs.readFile(htmlPath, 'utf-8');
          platform = this.identifyPlatform(html);
        } catch (e) {
          // HTML file might not exist
        }

        const business = {
          name: parsed.business_name,
          slug: parsed.slug,
          url: parsed.url,
          city: parsed.city,
          industry: parsed.industry,
          score: parsed.quality_score.total,
          platform: platform,
          phone: parsed.contact?.phone || '',
          email: parsed.contact?.email || ''
        };

        results.all.push(business);

        // Categorize by platform
        const key = platform.toLowerCase();
        if (results[key]) {
          results[key].push(business);
        } else {
          results.custom.push(business);
        }

      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    }

    return results;
  }

  /**
   * Generate report
   */
  async generateReport() {
    console.log('🔍 Analyzing platform usage across all crawled businesses...\n');

    const results = await this.analyze();

    // Sort all by score
    results.all.sort((a, b) => a.score - b.score);

    console.log('═══════════════════════════════════════════════════════════');
    console.log('  📊 PLATFORM ANALYSIS SUMMARY');
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log(`Total Businesses Analyzed: ${results.all.length}\n`);

    console.log('By Platform:');
    console.log(`  🛍️  Shopify: ${results.shopify.length}`);
    console.log(`  💳 Square: ${results.square.length}`);
    console.log(`  📐 Squarespace: ${results.squarespace.length}`);
    console.log(`  🎨 Wix: ${results.wix.length}`);
    console.log(`  📝 WordPress: ${results.wordpress.length}`);
    console.log(`  🌐 Weebly: ${results.weebly.length}`);
    console.log(`  🏢 GoDaddy: ${results.godaddy.length}`);
    console.log(`  ⚙️  Custom/Unknown: ${results.custom.length}\n`);

    console.log('═══════════════════════════════════════════════════════════\n');

    // Shopify sites (priority)
    if (results.shopify.length > 0) {
      console.log('🛍️  SHOPIFY SITES (Custom Frontend Compatible)');
      console.log('───────────────────────────────────────────────────────────');
      results.shopify.forEach(b => {
        const scoreColor = b.score <= 5 ? '\x1b[31m' : b.score <= 7 ? '\x1b[33m' : '\x1b[32m';
        console.log(`${scoreColor}[${b.score}/10]\x1b[0m ${b.name} - ${b.industry} (${b.city})`);
        console.log(`      ${b.url}`);
        if (b.phone) console.log(`      📞 ${b.phone}`);
        if (b.email) console.log(`      📧 ${b.email}`);
        console.log('');
      });
    }

    // Square sites (priority - payment/website platform)
    if (results.square.length > 0) {
      console.log('💳 SQUARE SITES (Custom Frontend Compatible)');
      console.log('───────────────────────────────────────────────────────────');
      results.square.forEach(b => {
        const scoreColor = b.score <= 5 ? '\x1b[31m' : b.score <= 7 ? '\x1b[33m' : '\x1b[32m';
        console.log(`${scoreColor}[${b.score}/10]\x1b[0m ${b.name} - ${b.industry} (${b.city})`);
        console.log(`      ${b.url}`);
        if (b.phone) console.log(`      📞 ${b.phone}`);
        if (b.email) console.log(`      📧 ${b.email}`);
        console.log('');
      });
    }

    // Squarespace sites (priority)
    if (results.squarespace.length > 0) {
      console.log('📐 SQUARESPACE SITES (Custom Frontend Compatible)');
      console.log('───────────────────────────────────────────────────────────');
      results.squarespace.forEach(b => {
        const scoreColor = b.score <= 5 ? '\x1b[31m' : b.score <= 7 ? '\x1b[33m' : '\x1b[32m';
        console.log(`${scoreColor}[${b.score}/10]\x1b[0m ${b.name} - ${b.industry} (${b.city})`);
        console.log(`      ${b.url}`);
        if (b.phone) console.log(`      📞 ${b.phone}`);
        if (b.email) console.log(`      📧 ${b.email}`);
        console.log('');
      });
    }

    // Low-scoring businesses on any platform (1-7/10)
    console.log('\n🎯 ALL POTENTIAL TARGETS (Score ≤ 7/10)');
    console.log('───────────────────────────────────────────────────────────');
    const potentials = results.all.filter(b => b.score <= 7);
    potentials.forEach(b => {
      const scoreColor = b.score <= 5 ? '\x1b[31m' : '\x1b[33m';
      console.log(`${scoreColor}[${b.score}/10]\x1b[0m ${b.name} - ${b.platform}`);
      console.log(`      ${b.industry} | ${b.city}`);
      console.log(`      ${b.url}`);
      if (b.phone) console.log(`      📞 ${b.phone}`);
      if (b.email) console.log(`      📧 ${b.email}`);
      console.log('');
    });

    // Save to JSON
    const outputPath = path.join(__dirname, '..', 'data', 'platform-analysis.json');
    await fs.writeFile(outputPath, JSON.stringify(results, null, 2));
    console.log(`\n💾 Full analysis saved to: data/platform-analysis.json`);
  }
}

// Run
const identifier = new PlatformIdentifier();
identifier.generateReport();
