#!/usr/bin/env node

/**
 * Redesign Agent
 * AI-powered homepage redesign generator using modern UX/UI principles
 */

import fs from 'fs/promises';
import path from 'path';
import { config } from '../../config/config.js';

class RedesignAgent {
  constructor() {
    this.businesses = [];
    this.successCount = 0;
    this.failureCount = 0;
  }

  /**
   * Main execution method
   */
  async run(limit = null) {
    console.log('🎨 RedesignAgent starting...\n');

    try {
      // Load businesses
      await this.loadBusinesses();

      // Filter to parsed businesses
      let businessesToRedesign = this.businesses.filter(b => b.parsed === true);

      if (limit) {
        console.log(`📊 Limiting to ${limit} businesses for testing`);
        businessesToRedesign = businessesToRedesign.slice(0, limit);
      }

      console.log(`📋 Redesigning ${businessesToRedesign.length} businesses\n`);

      // Redesign each business
      for (let i = 0; i < businessesToRedesign.length; i++) {
        const business = businessesToRedesign[i];
        console.log(`[${i + 1}/${businessesToRedesign.length}] Redesigning ${business.name}...`);

        try {
          await this.redesignBusiness(business);
          this.successCount++;
          console.log(`  ✓ Successfully redesigned`);
        } catch (error) {
          this.failureCount++;
          console.log(`  ✗ Failed: ${error.message}`);
        }
      }

      // Save updated businesses
      await this.saveBusinesses();

      // Print summary
      this.printSummary();

      console.log('\n✅ RedesignAgent completed successfully!');
    } catch (error) {
      console.error('❌ RedesignAgent failed:', error.message);
      throw error;
    }
  }

  /**
   * Load businesses from JSON
   */
  async loadBusinesses() {
    const data = await fs.readFile(config.files.businesses, 'utf-8');
    this.businesses = JSON.parse(data);
    console.log(`📂 Loaded ${this.businesses.length} businesses`);
  }

  /**
   * Save businesses to JSON
   */
  async saveBusinesses() {
    await fs.writeFile(
      config.files.businesses,
      JSON.stringify(this.businesses, null, 2),
      'utf-8'
    );
  }

  /**
   * Redesign a single business homepage
   */
  async redesignBusiness(business) {
    const slug = business.slug;

    // Load parsed data
    const parsedDataPath = path.join(config.paths.parsed, `${slug}.json`);
    const parsedData = JSON.parse(await fs.readFile(parsedDataPath, 'utf-8'));

    // Create redesign directory
    const redesignDir = path.join(config.paths.redesigns, slug);
    await fs.mkdir(redesignDir, { recursive: true });

    // Generate redesign HTML
    const html = this.generateRedesignHtml(business, parsedData);

    // Save HTML
    const htmlPath = path.join(redesignDir, 'index.html');
    await fs.writeFile(htmlPath, html, 'utf-8');

    // Generate metadata
    const metadata = {
      business_name: business.name,
      slug: slug,
      redesigned_at: new Date().toISOString(),
      design_framework: config.redesign.framework,
      color_palette: config.redesign.defaultColors,
      fonts_used: ['Inter', 'System Font Stack'],
    };

    const metadataPath = path.join(redesignDir, 'metadata.json');
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');

    // Update business record
    business.redesigned = true;
    business.redesigned_at = metadata.redesigned_at;
    business.redesign_path = redesignDir;
  }

  /**
   * Generate redesign HTML using template
   */
  generateRedesignHtml(business, parsedData) {
    const name = business.name;
    const industry = business.industry || 'business';
    const address = business.address || 'Austin, TX';
    const phone = business.phone || '';
    const email = business.contact_email || '';

    // Extract content from parsed data
    const headline = parsedData.content.hero_headline || `Welcome to ${name}`;
    const subtext = parsedData.content.hero_subtext || `Your trusted ${industry} in Austin`;
    const ctaText = parsedData.content.cta_primary?.text || 'Get Started';
    const aboutText = parsedData.content.about_text || `${name} is a local ${industry} serving the Austin community.`;

    // Generate navigation items
    const navItems = parsedData.navigation.nav_items.slice(0, 5);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} | ${industry.charAt(0).toUpperCase() + industry.slice(1)} in Austin, TX</title>
    <meta name="description" content="${name} - ${subtext}">

    <!-- Open Graph -->
    <meta property="og:title" content="${name}">
    <meta property="og:description" content="${subtext}">
    <meta property="og:type" content="website">

    <!-- TailwindCSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
    </style>

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "${name}",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Austin",
        "addressRegion": "TX",
        "streetAddress": "${address}"
      },
      "telephone": "${phone}"
    }
    </script>
</head>
<body class="bg-white text-gray-900">

    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
        <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
            <div class="text-2xl font-bold text-blue-600">
                ${name}
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex space-x-8">
                ${navItems.map(item => `<a href="${item.href || '#'}" class="text-gray-700 hover:text-blue-600 transition">${item.text}</a>`).join('\n                ')}
            </div>

            <a href="#contact" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                ${ctaText}
            </a>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 to-purple-50 py-20 md:py-32">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                    ${headline}
                </h1>
                <p class="text-xl md:text-2xl text-gray-600 mb-8">
                    ${subtext}
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#contact" class="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg">
                        ${ctaText}
                    </a>
                    <a href="#about" class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition border-2 border-blue-600">
                        Learn More
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
                Why Choose ${name}?
            </h2>

            <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center p-8 rounded-lg hover:shadow-lg transition">
                    <div class="text-5xl mb-4">⭐</div>
                    <h3 class="text-xl font-semibold mb-3">Quality Service</h3>
                    <p class="text-gray-600">We're committed to providing the best ${industry} experience in Austin.</p>
                </div>

                <div class="text-center p-8 rounded-lg hover:shadow-lg transition">
                    <div class="text-5xl mb-4">🏆</div>
                    <h3 class="text-xl font-semibold mb-3">Local Expertise</h3>
                    <p class="text-gray-600">Proudly serving the Austin community with dedication and care.</p>
                </div>

                <div class="text-center p-8 rounded-lg hover:shadow-lg transition">
                    <div class="text-5xl mb-4">💯</div>
                    <h3 class="text-xl font-semibold mb-3">Customer First</h3>
                    <p class="text-gray-600">Your satisfaction is our top priority, every single time.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto text-center">
                <h2 class="text-3xl md:text-4xl font-bold mb-6">About ${name}</h2>
                <p class="text-lg text-gray-700 leading-relaxed mb-8">
                    ${aboutText}
                </p>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section id="contact" class="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">
                Ready to Get Started?
            </h2>
            <p class="text-xl mb-8 max-w-2xl mx-auto">
                Contact us today and discover why Austin locals trust ${name}.
            </p>

            <div class="max-w-md mx-auto bg-white rounded-lg p-8 text-left">
                <form class="space-y-4">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Name</label>
                        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900" placeholder="Your name">
                    </div>

                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900" placeholder="your@email.com">
                    </div>

                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Message</label>
                        <textarea class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900" rows="4" placeholder="How can we help you?"></textarea>
                    </div>

                    <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4">${name}</h3>
                    <p class="text-gray-400">
                        ${subtext}
                    </p>
                </div>

                <div>
                    <h4 class="font-semibold mb-4">Contact</h4>
                    <div class="space-y-2 text-gray-400">
                        ${address ? `<p>📍 ${address}</p>` : ''}
                        ${phone ? `<p>📞 ${phone}</p>` : ''}
                        ${email ? `<p>✉️ ${email}</p>` : ''}
                    </div>
                </div>

                <div>
                    <h4 class="font-semibold mb-4">Quick Links</h4>
                    <div class="space-y-2">
                        ${navItems.slice(0, 4).map(item => `<a href="${item.href || '#'}" class="block text-gray-400 hover:text-white transition">${item.text}</a>`).join('\n                        ')}
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                <p>&copy; ${new Date().getFullYear()} ${name}. All rights reserved.</p>
                <p class="mt-2">
                    <em>Concept redesign by <a href="https://domainlabs.ai" class="text-blue-400 hover:text-blue-300">Domain Labs</a> • Not affiliated with ${name}</em>
                </p>
            </div>
        </div>
    </footer>

</body>
</html>`;
  }

  /**
   * Print summary
   */
  printSummary() {
    console.log('\n📊 Redesign Summary:');
    console.log(`  Successful: ${this.successCount}`);
    console.log(`  Failed: ${this.failureCount}`);
    console.log(`  Success rate: ${Math.round((this.successCount / (this.successCount + this.failureCount || 1)) * 100)}%`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const limit = process.argv.includes('--limit')
    ? parseInt(process.argv[process.argv.indexOf('--limit') + 1])
    : null;

  const agent = new RedesignAgent();
  agent.run(limit).catch(error => {
    console.error(error);
    process.exit(1);
  });
}

export default RedesignAgent;
