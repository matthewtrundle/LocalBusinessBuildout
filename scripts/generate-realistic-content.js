#!/usr/bin/env node

/**
 * Generate Realistic Content for Real Businesses
 * Creates mock HTML and parsed data based on actual business information
 */

import fs from 'fs/promises';
import path from 'path';
import { config } from '../config/config.js';

const industryTemplates = {
  cafe: {
    tagline: "Your favorite local coffee shop",
    hero: "Fresh Brewed Coffee & Community",
    subtext: "Locally roasted coffee, fresh pastries, and a welcoming atmosphere",
    cta: "Visit Us Today",
    about: "We're passionate about serving exceptional coffee and creating a space where the community can gather, work, and connect."
  },
  restaurant: {
    tagline: "Authentic flavors, fresh ingredients",
    hero: "Experience Exceptional Dining",
    subtext: "Fresh, locally-sourced ingredients prepared with passion",
    cta: "View Menu",
    about: "Our kitchen crafts each dish with care, using the freshest ingredients to bring you an unforgettable dining experience."
  },
  salon: {
    tagline: "Expert cuts, premium service",
    hero: "Look Good, Feel Great",
    subtext: "Professional hair care and styling services",
    cta: "Book Appointment",
    about: "Our experienced stylists are dedicated to helping you look and feel your best with personalized service and expert techniques."
  },
  brewery: {
    tagline: "Craft beer, crafted here",
    hero: "Locally Brewed Excellence",
    subtext: "Small batch craft beer and great food",
    cta: "See Our Brews",
    about: "We brew small-batch craft beer with passion and precision, creating unique flavors that celebrate our local community."
  }
};

async function generateContent() {
  console.log('🎨 Generating realistic content for real businesses...\n');

  // Load real businesses
  const businessesData = await fs.readFile(config.files.businesses, 'utf-8');
  const businesses = JSON.parse(businessesData);

  // Create directories
  await fs.mkdir(config.paths.rawSites, { recursive: true });
  await fs.mkdir(config.paths.parsed, { recursive: true });

  let successCount = 0;

  for (const business of businesses) {
    try {
      const template = industryTemplates[business.industry] || industryTemplates.cafe;

      // Generate HTML
      const html = generateHtml(business, template);

      // Save raw HTML
      const rawHtmlPath = path.join(config.paths.rawSites, `${business.slug}.html`);
      await fs.writeFile(rawHtmlPath, html);

      // Generate parsed data
      const parsedData = generateParsedData(business, template);

      // Save parsed JSON
      const parsedJsonPath = path.join(config.paths.parsed, `${business.slug}.json`);
      await fs.writeFile(parsedJsonPath, JSON.stringify(parsedData, null, 2));

      // Mark as parsed
      business.parsed = true;
      business.parsed_at = new Date().toISOString();

      successCount++;
      console.log(`  ✓ ${business.name}`);
    } catch (error) {
      console.log(`  ✗ ${business.name}: ${error.message}`);
    }
  }

  // Save updated businesses
  await fs.writeFile(
    config.files.businesses,
    JSON.stringify(businesses, null, 2)
  );

  console.log(`\n✅ Generated content for ${successCount}/${businesses.length} businesses!`);
}

function generateHtml(business, template) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${business.name} | ${business.city}, Texas</title>
    <meta name="description" content="${business.name} - ${template.tagline}">
</head>
<body>
    <header>
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/services">Services</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>

    <main>
        <section class="hero">
            <h1>${template.hero}</h1>
            <p>${template.subtext}</p>
            <a href="/contact" class="cta-button">${template.cta}</a>
        </section>

        <section class="about">
            <h2>About ${business.name}</h2>
            <p>${template.about}</p>
            ${business.address ? `<p>Visit us at: ${business.address}</p>` : ''}
            ${business.phone ? `<p>Call us: ${business.phone}</p>` : ''}
        </section>

        <section class="features">
            <h2>Why Choose Us</h2>
            <div class="feature">
                <h3>Quality Service</h3>
                <p>We're committed to excellence in everything we do.</p>
            </div>
            <div class="feature">
                <h3>Local Pride</h3>
                <p>Proudly serving ${business.city} and the surrounding community.</p>
            </div>
            <div class="feature">
                <h3>Customer First</h3>
                <p>Your satisfaction is our top priority.</p>
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; ${new Date().getFullYear()} ${business.name}. All rights reserved.</p>
        ${business.address ? `<p>${business.address}</p>` : ''}
        ${business.phone ? `<p>${business.phone}</p>` : ''}
    </footer>
</body>
</html>`;
}

function generateParsedData(business, template) {
  return {
    business_name: business.name,
    url: business.url,
    slug: business.slug,
    parsed_at: new Date().toISOString(),

    metadata: {
      title: `${business.name} | ${business.city}, Texas`,
      meta_description: `${business.name} - ${template.tagline}`,
      favicon: '',
      viewport: 'width=device-width, initial-scale=1.0',
    },

    content: {
      hero_headline: template.hero,
      hero_subtext: template.subtext,
      cta_primary: { text: template.cta, href: '/contact' },
      about_text: template.about,
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
      font_families: ['Arial', 'Helvetica', 'sans-serif'],
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

    business_info: {
      address: business.address || '',
      phone: business.phone || '',
      city: business.city,
      industry: business.industry,
    }
  };
}

generateContent().catch(console.error);
