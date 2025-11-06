#!/usr/bin/env node

/**
 * Demo Data Generator
 * Creates mock business data for testing the pipeline
 */

import fs from 'fs/promises';
import path from 'path';
import { config } from '../config/config.js';

const demoBusinesses = [
  {
    name: "Austin Coffee House",
    url: "https://example.com/austin-coffee",
    industry: "cafe",
    address: "123 Main St, Austin, TX 78701",
    slug: "austin-coffee-house",
    size_estimate: "10-20",
    discovered_at: new Date().toISOString(),
    url_valid: true,
    contact_email: "hello@austincoffeehouse.com",
    phone: "(512) 555-0101"
  },
  {
    name: "Texas BBQ Shack",
    url: "https://example.com/texas-bbq",
    industry: "restaurant",
    address: "456 Congress Ave, Austin, TX 78704",
    slug: "texas-bbq-shack",
    size_estimate: "20-30",
    discovered_at: new Date().toISOString(),
    url_valid: true,
    contact_email: "info@texasbbqshack.com",
    phone: "(512) 555-0102"
  },
  {
    name: "Riverside Yoga Studio",
    url: "https://example.com/riverside-yoga",
    industry: "fitness",
    address: "789 Riverside Dr, Austin, TX 78702",
    slug: "riverside-yoga-studio",
    size_estimate: "5-15",
    discovered_at: new Date().toISOString(),
    url_valid: true,
    contact_email: "namaste@riversideyoga.com",
    phone: "(512) 555-0103"
  },
  {
    name: "Hill Country Boutique",
    url: "https://example.com/hill-country",
    industry: "retail",
    address: "321 South Lamar, Austin, TX 78704",
    slug: "hill-country-boutique",
    size_estimate: "8-12",
    discovered_at: new Date().toISOString(),
    url_valid: true,
    contact_email: "shop@hillcountryboutique.com",
    phone: "(512) 555-0104"
  },
  {
    name: "Austin Auto Repair",
    url: "https://example.com/austin-auto",
    industry: "auto_repair",
    address: "555 North Loop, Austin, TX 78756",
    slug: "austin-auto-repair",
    size_estimate: "15-25",
    discovered_at: new Date().toISOString(),
    url_valid: true,
    contact_email: "service@austinautorepair.com",
    phone: "(512) 555-0105"
  }
];

const mockHtmlTemplates = {
  cafe: `<!DOCTYPE html>
<html>
<head>
  <title>Austin Coffee House - Best Coffee in Austin</title>
  <meta name="description" content="Locally roasted coffee and fresh pastries in the heart of Austin">
</head>
<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/menu">Menu</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>
  <main>
    <h1>Welcome to Austin Coffee House</h1>
    <p>Your neighborhood coffee shop serving locally roasted beans since 2015</p>
    <button>Order Now</button>
    <section class="about">
      <p>We're a family-owned coffee shop dedicated to bringing you the finest locally roasted coffee beans and fresh pastries every morning.</p>
    </section>
  </main>
  <footer>
    <p>123 Main St, Austin, TX 78701 | (512) 555-0101</p>
  </footer>
</body>
</html>`,

  restaurant: `<!DOCTYPE html>
<html>
<head>
  <title>Texas BBQ Shack - Authentic Austin BBQ</title>
  <meta name="description" content="Award-winning Texas BBQ in Austin">
</head>
<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/menu">Menu</a>
      <a href="/catering">Catering</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>
  <main>
    <h1>Authentic Texas BBQ</h1>
    <p>Slow-smoked brisket, ribs, and more. Made fresh daily.</p>
    <button>See Menu</button>
    <section>
      <p>Texas BBQ Shack has been serving authentic, slow-smoked BBQ to Austin locals and visitors since 2010. Our brisket is legendary!</p>
    </section>
  </main>
  <footer>
    <p>456 Congress Ave, Austin, TX 78704 | (512) 555-0102</p>
  </footer>
</body>
</html>`,

  fitness: `<!DOCTYPE html>
<html>
<head>
  <title>Riverside Yoga Studio - Find Your Balance</title>
  <meta name="description" content="Yoga classes for all levels in Austin, TX">
</head>
<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/classes">Classes</a>
      <a href="/schedule">Schedule</a>
      <a href="/pricing">Pricing</a>
    </nav>
  </header>
  <main>
    <h1>Find Your Balance</h1>
    <p>Yoga classes for beginners to advanced practitioners</p>
    <button>Book a Class</button>
    <section>
      <p>Riverside Yoga Studio offers a welcoming space for all levels. Join us for vinyasa, hatha, restorative yoga and more.</p>
    </section>
  </main>
  <footer>
    <p>789 Riverside Dr, Austin, TX 78702 | (512) 555-0103</p>
  </footer>
</body>
</html>`,

  retail: `<!DOCTYPE html>
<html>
<head>
  <title>Hill Country Boutique - Unique Austin Style</title>
  <meta name="description" content="Curated fashion and gifts from local Austin designers">
</head>
<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/shop">Shop</a>
      <a href="/new">New Arrivals</a>
      <a href="/about">About</a>
    </nav>
  </header>
  <main>
    <h1>Discover Unique Austin Style</h1>
    <p>Curated clothing, jewelry, and gifts from local designers</p>
    <button>Shop Now</button>
    <section>
      <p>Hill Country Boutique showcases the best of Austin's fashion scene, featuring handpicked items from local designers and artisans.</p>
    </section>
  </main>
  <footer>
    <p>321 South Lamar, Austin, TX 78704 | (512) 555-0104</p>
  </footer>
</body>
</html>`,

  auto_repair: `<!DOCTYPE html>
<html>
<head>
  <title>Austin Auto Repair - Honest Service, Fair Prices</title>
  <meta name="description" content="Full-service auto repair in Austin, Texas">
</head>
<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/services">Services</a>
      <a href="/appointments">Book Now</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>
  <main>
    <h1>Honest Auto Repair in Austin</h1>
    <p>Full-service auto repair with certified technicians</p>
    <button>Schedule Service</button>
    <section>
      <p>Austin Auto Repair has been providing honest, reliable auto service to Austin families for over 20 years. We treat your car like our own.</p>
    </section>
  </main>
  <footer>
    <p>555 North Loop, Austin, TX 78756 | (512) 555-0105</p>
  </footer>
</body>
</html>`
};

async function generateDemoData() {
  console.log('🎭 Generating demo data...\n');

  // Create directories
  await fs.mkdir(config.paths.rawSites, { recursive: true });
  await fs.mkdir(config.paths.parsed, { recursive: true });

  // Save businesses
  await fs.writeFile(
    config.files.businesses,
    JSON.stringify(demoBusinesses, null, 2)
  );
  console.log(`✓ Created ${demoBusinesses.length} demo businesses`);

  // Generate mock HTML and parsed data for each business
  for (const business of demoBusinesses) {
    // Save raw HTML
    const htmlTemplate = mockHtmlTemplates[business.industry] || mockHtmlTemplates.cafe;
    const rawHtmlPath = path.join(config.paths.rawSites, `${business.slug}.html`);
    await fs.writeFile(rawHtmlPath, htmlTemplate);

    // Create parsed data
    const parsedData = {
      business_name: business.name,
      url: business.url,
      slug: business.slug,
      parsed_at: new Date().toISOString(),
      metadata: {
        title: `${business.name}`,
        meta_description: `${business.name} in Austin, Texas`,
        favicon: '',
        viewport: 'width=device-width, initial-scale=1',
      },
      content: {
        hero_headline: `Welcome to ${business.name}`,
        hero_subtext: `Your trusted ${business.industry} in Austin`,
        cta_primary: { text: 'Get Started', href: '/contact' },
        about_text: `${business.name} is a local ${business.industry} serving the Austin community.`,
      },
      navigation: {
        nav_items: [
          { text: 'Home', href: '/' },
          { text: 'About', href: '/about' },
          { text: 'Services', href: '/services' },
          { text: 'Contact', href: '/contact' },
        ],
        footer_links: [
          { text: 'Privacy', href: '/privacy' },
          { text: 'Terms', href: '/terms' },
        ],
      },
      design: {
        color_palette: ['#2563eb', '#7c3aed', '#1f2937'],
        background_color: '#ffffff',
        font_families: ['Arial', 'Helvetica'],
      },
      assets: {
        logo_url: '',
        hero_image: '',
        images: [],
      },
      technical: {
        has_mobile_viewport: true,
        has_structured_data: false,
        external_scripts: 0,
        external_styles: 1,
      },
    };

    const parsedJsonPath = path.join(config.paths.parsed, `${business.slug}.json`);
    await fs.writeFile(parsedJsonPath, JSON.stringify(parsedData, null, 2));

    // Mark as parsed
    business.parsed = true;
    business.parsed_at = parsedData.parsed_at;

    console.log(`✓ Generated demo data for ${business.name}`);
  }

  // Update businesses with parsed status
  await fs.writeFile(
    config.files.businesses,
    JSON.stringify(demoBusinesses, null, 2)
  );

  console.log('\n✅ Demo data generation complete!');
  console.log('   Run: npm start -- --phase redesign --limit 5');
}

generateDemoData().catch(console.error);
