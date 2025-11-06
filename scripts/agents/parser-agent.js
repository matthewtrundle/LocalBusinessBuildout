#!/usr/bin/env node

/**
 * Parser Agent
 * Fetches and extracts structured content from business homepages
 */

import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { config } from '../../config/config.js';

class ParserAgent {
  constructor() {
    this.businesses = [];
    this.parseErrors = [];
    this.successCount = 0;
    this.failureCount = 0;
  }

  /**
   * Main execution method
   */
  async run(limit = null) {
    console.log('🔬 ParserAgent starting...\n');

    try {
      // Load businesses
      await this.loadBusinesses();

      // Filter to businesses that need parsing
      let businessesToParse = this.businesses.filter(b => b.url_valid !== false);

      if (limit) {
        console.log(`📊 Limiting to ${limit} businesses for testing`);
        businessesToParse = businessesToParse.slice(0, limit);
      }

      console.log(`📋 Parsing ${businessesToParse.length} businesses\n`);

      // Parse each business
      for (let i = 0; i < businessesToParse.length; i++) {
        const business = businessesToParse[i];
        console.log(`[${i + 1}/${businessesToParse.length}] Parsing ${business.name}...`);

        try {
          await this.parseBusiness(business);
          this.successCount++;
          console.log(`  ✓ Successfully parsed`);
        } catch (error) {
          this.failureCount++;
          console.log(`  ✗ Failed: ${error.message}`);

          this.parseErrors.push({
            business_name: business.name,
            url: business.url,
            error: error.message,
            timestamp: new Date().toISOString(),
          });
        }

        // Rate limiting
        await this.sleep(config.parser.rateLimit.delayBetweenRequests);
      }

      // Save errors
      if (this.parseErrors.length > 0) {
        await this.saveErrors();
      }

      // Print summary
      this.printSummary();

      console.log('\n✅ ParserAgent completed successfully!');
    } catch (error) {
      console.error('❌ ParserAgent failed:', error.message);
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
   * Parse a single business homepage
   */
  async parseBusiness(business) {
    const slug = business.slug;

    // Fetch HTML
    const html = await this.fetchHtml(business.url);

    // Save raw HTML
    const rawHtmlPath = path.join(config.paths.rawSites, `${slug}.html`);
    await fs.writeFile(rawHtmlPath, html, 'utf-8');

    // Parse HTML
    const $ = cheerio.load(html);

    // Extract data
    const parsedData = {
      business_name: business.name,
      url: business.url,
      slug: slug,
      parsed_at: new Date().toISOString(),

      // Metadata
      metadata: {
        title: $('title').text().trim() || '',
        meta_description: $('meta[name="description"]').attr('content') || '',
        favicon: this.extractFavicon($),
        viewport: $('meta[name="viewport"]').attr('content') || '',
      },

      // Content
      content: {
        hero_headline: this.extractHeroHeadline($),
        hero_subtext: this.extractHeroSubtext($),
        cta_primary: this.extractPrimaryCTA($),
        about_text: this.extractAboutText($),
      },

      // Navigation
      navigation: {
        nav_items: this.extractNavItems($),
        footer_links: this.extractFooterLinks($),
      },

      // Design
      design: {
        color_palette: this.extractColorPalette($, html),
        background_color: this.extractBackgroundColor($),
        font_families: this.extractFonts($, html),
      },

      // Assets
      assets: {
        logo_url: this.extractLogo($),
        hero_image: this.extractHeroImage($),
        images: this.extractImages($),
      },

      // Technical
      technical: {
        has_mobile_viewport: !!$('meta[name="viewport"]').length,
        has_structured_data: !!$('script[type="application/ld+json"]').length,
        external_scripts: $('script[src]').length,
        external_styles: $('link[rel="stylesheet"]').length,
      },
    };

    // Save parsed data
    const parsedJsonPath = path.join(config.paths.parsed, `${slug}.json`);
    await fs.writeFile(parsedJsonPath, JSON.stringify(parsedData, null, 2), 'utf-8');

    // Update business record
    business.parsed = true;
    business.parsed_at = parsedData.parsed_at;
  }

  /**
   * Fetch HTML from URL
   */
  async fetchHtml(url) {
    const response = await axios.get(url, {
      timeout: config.parser.timeout,
      headers: {
        'User-Agent': config.parser.userAgent,
      },
      maxRedirects: 3,
    });

    return response.data;
  }

  /**
   * Extract hero headline (H1 or prominent headline)
   */
  extractHeroHeadline($) {
    // Try H1 first
    const h1 = $('h1').first().text().trim();
    if (h1) return h1;

    // Try hero section
    const hero = $('.hero h2, .hero-title, [class*="hero"] h2').first().text().trim();
    if (hero) return hero;

    // Fallback to first heading
    return $('h2').first().text().trim() || '';
  }

  /**
   * Extract hero subtext
   */
  extractHeroSubtext($) {
    const selectors = [
      '.hero p',
      '.hero-subtitle',
      '[class*="hero"] p',
      'h1 + p',
      'h2 + p',
    ];

    for (const selector of selectors) {
      const text = $(selector).first().text().trim();
      if (text && text.length > 10) {
        return text.substring(0, 200);
      }
    }

    return '';
  }

  /**
   * Extract primary CTA
   */
  extractPrimaryCTA($) {
    const selectors = [
      'a.cta, a.btn-primary, a[class*="cta"]',
      '.hero a.button, .hero button',
      'a.btn, button.btn',
    ];

    for (const selector of selectors) {
      const btn = $(selector).first();
      if (btn.length) {
        return {
          text: btn.text().trim(),
          href: btn.attr('href') || '',
        };
      }
    }

    // Fallback: first button or prominent link
    const firstBtn = $('button, a.button, a.btn').first();
    return {
      text: firstBtn.text().trim() || '',
      href: firstBtn.attr('href') || '',
    };
  }

  /**
   * Extract about text
   */
  extractAboutText($) {
    const aboutSection = $('[class*="about"], #about, .about-section').first();
    if (aboutSection.length) {
      return aboutSection.text().trim().substring(0, 200);
    }

    // Fallback to first paragraph
    return $('p').first().text().trim().substring(0, 200);
  }

  /**
   * Extract navigation items
   */
  extractNavItems($) {
    const navItems = [];
    $('nav a, header nav a, [role="navigation"] a').each((i, elem) => {
      const text = $(elem).text().trim();
      const href = $(elem).attr('href');
      if (text && text.length < 50) {
        navItems.push({ text, href });
      }
    });
    return navItems.slice(0, 10);
  }

  /**
   * Extract footer links
   */
  extractFooterLinks($) {
    const footerLinks = [];
    $('footer a').each((i, elem) => {
      const text = $(elem).text().trim();
      const href = $(elem).attr('href');
      if (text && text.length < 50) {
        footerLinks.push({ text, href });
      }
    });
    return footerLinks.slice(0, 10);
  }

  /**
   * Extract color palette from CSS
   */
  extractColorPalette($, html) {
    const colors = new Set();

    // Extract from inline styles
    $('[style]').each((i, elem) => {
      const style = $(elem).attr('style') || '';
      const colorMatches = style.match(/#[0-9a-f]{3,6}/gi);
      if (colorMatches) {
        colorMatches.forEach(c => colors.add(c.toLowerCase()));
      }
    });

    // Extract from style tags
    $('style').each((i, elem) => {
      const css = $(elem).html() || '';
      const colorMatches = css.match(/#[0-9a-f]{3,6}/gi);
      if (colorMatches) {
        colorMatches.forEach(c => colors.add(c.toLowerCase()));
      }
    });

    return Array.from(colors).slice(0, 5);
  }

  /**
   * Extract background color
   */
  extractBackgroundColor($) {
    const bodyStyle = $('body').attr('style') || '';
    const bgMatch = bodyStyle.match(/background-color:\s*([^;]+)/i);
    if (bgMatch) return bgMatch[1].trim();

    return '#ffffff'; // Default
  }

  /**
   * Extract font families
   */
  extractFonts($, html) {
    const fonts = new Set();

    // Extract from inline styles
    $('[style]').each((i, elem) => {
      const style = $(elem).attr('style') || '';
      const fontMatch = style.match(/font-family:\s*([^;]+)/i);
      if (fontMatch) {
        fonts.add(fontMatch[1].trim().replace(/['"]/g, ''));
      }
    });

    return Array.from(fonts).slice(0, 3);
  }

  /**
   * Extract logo
   */
  extractLogo($) {
    // Try common logo selectors
    const logoSelectors = [
      '.logo img, #logo img',
      'header img[alt*="logo" i]',
      'header img:first',
    ];

    for (const selector of logoSelectors) {
      const logo = $(selector).first();
      if (logo.length) {
        return logo.attr('src') || '';
      }
    }

    return '';
  }

  /**
   * Extract hero image
   */
  extractHeroImage($) {
    const heroSelectors = [
      '.hero img, [class*="hero"] img',
      'header img',
    ];

    for (const selector of heroSelectors) {
      const img = $(selector).first();
      if (img.length) {
        return img.attr('src') || '';
      }
    }

    return '';
  }

  /**
   * Extract all images
   */
  extractImages($) {
    const images = [];
    $('img').each((i, elem) => {
      const src = $(elem).attr('src');
      const alt = $(elem).attr('alt') || '';
      if (src) {
        images.push({ src, alt });
      }
    });
    return images.slice(0, 20);
  }

  /**
   * Extract favicon
   */
  extractFavicon($) {
    const favicon = $('link[rel*="icon"]').first();
    return favicon.attr('href') || '';
  }

  /**
   * Save parse errors
   */
  async saveErrors() {
    await fs.writeFile(
      config.files.parseErrors,
      JSON.stringify(this.parseErrors, null, 2),
      'utf-8'
    );
  }

  /**
   * Print summary
   */
  printSummary() {
    console.log('\n📊 Parsing Summary:');
    console.log(`  Successful: ${this.successCount}`);
    console.log(`  Failed: ${this.failureCount}`);
    console.log(`  Success rate: ${Math.round((this.successCount / (this.successCount + this.failureCount)) * 100)}%`);

    if (this.failureCount > 0) {
      console.log(`\n  ⚠️  ${this.failureCount} errors saved to ${config.files.parseErrors}`);
    }
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
  const limit = process.argv.includes('--limit')
    ? parseInt(process.argv[process.argv.indexOf('--limit') + 1])
    : null;

  const agent = new ParserAgent();
  agent.run(limit).catch(error => {
    console.error(error);
    process.exit(1);
  });
}

export default ParserAgent;
