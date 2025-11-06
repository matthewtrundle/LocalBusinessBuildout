#!/usr/bin/env node

/**
 * Firecrawl Parser Agent
 * Uses Firecrawl API to scrape real business websites and extract actual content
 */

import fs from 'fs/promises';
import path from 'path';
import FirecrawlApp from '@mendable/firecrawl-js';
import dotenv from 'dotenv';
import { config } from '../../config/config.js';

// Load environment variables
dotenv.config();

class FirecrawlParserAgent {
  constructor() {
    this.businesses = [];
    this.successCount = 0;
    this.failureCount = 0;
    this.parseErrors = [];

    // Initialize Firecrawl
    const apiKey = process.env.FIRECRAWL_API_KEY;
    if (!apiKey) {
      throw new Error('FIRECRAWL_API_KEY not found in environment variables');
    }

    this.firecrawl = new FirecrawlApp({ apiKey });
    console.log('🔥 Firecrawl initialized with API key');
  }

  /**
   * Main execution method
   */
  async run(limit = null) {
    console.log('🔥 Firecrawl Parser Agent starting...\n');

    try {
      // Load businesses
      await this.loadBusinesses();

      // Filter to businesses that need parsing
      let businessesToParse = this.businesses.filter(b => b.url_valid !== false);

      if (limit) {
        console.log(`📊 Limiting to ${limit} businesses for testing`);
        businessesToParse = businessesToParse.slice(0, limit);
      }

      console.log(`📋 Parsing ${businessesToParse.length} businesses with Firecrawl\n`);

      // Parse each business
      for (let i = 0; i < businessesToParse.length; i++) {
        const business = businessesToParse[i];
        console.log(`[${i + 1}/${businessesToParse.length}] Scraping ${business.name}...`);

        try {
          await this.parseBusiness(business);
          this.successCount++;
          console.log(`  ✓ Successfully scraped and parsed`);
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

        // Rate limiting - be nice to Firecrawl API
        await this.sleep(2000);
      }

      // Save updated businesses
      await this.saveBusinesses();

      // Save errors if any
      if (this.parseErrors.length > 0) {
        await this.saveErrors();
      }

      // Print summary
      this.printSummary();

      console.log('\n✅ Firecrawl Parser Agent completed!');
    } catch (error) {
      console.error('❌ Firecrawl Parser Agent failed:', error.message);
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
   * Parse a single business homepage using Firecrawl
   */
  async parseBusiness(business) {
    const slug = business.slug;

    console.log(`  🔥 Scraping with Firecrawl: ${business.url}`);

    // Scrape with Firecrawl v1 API
    const scrapeResult = await this.firecrawl.v1.scrapeUrl(business.url, {
      formats: ['markdown', 'html'],
      onlyMainContent: false,
    });

    if (!scrapeResult.success) {
      throw new Error('Firecrawl scrape failed');
    }

    const html = scrapeResult.html || '';
    const markdown = scrapeResult.markdown || '';
    const metadata = scrapeResult.metadata || {};

    console.log(`  📄 Retrieved ${html.length} bytes of HTML`);

    // Save raw HTML
    const rawHtmlPath = path.join(config.paths.rawSites, `${slug}.html`);
    await fs.writeFile(rawHtmlPath, html, 'utf-8');

    // Extract structured data from the scraped content
    const parsedData = {
      business_name: business.name,
      url: business.url,
      slug: slug,
      parsed_at: new Date().toISOString(),
      scrape_method: 'firecrawl',

      // Metadata from Firecrawl
      metadata: {
        title: metadata.title || scrapeResult.title || '',
        meta_description: metadata.description || '',
        favicon: metadata.favicon || '',
        viewport: 'width=device-width, initial-scale=1',
        og_title: metadata.ogTitle || '',
        og_description: metadata.ogDescription || '',
        og_image: metadata.ogImage || '',
      },

      // Extract content from markdown and HTML
      content: {
        hero_headline: this.extractHeadline(markdown, html),
        hero_subtext: this.extractSubtext(markdown),
        cta_primary: this.extractCTA(markdown, html),
        about_text: this.extractAbout(markdown),
      },

      // Navigation
      navigation: {
        nav_items: this.extractNavItems(markdown, html),
        footer_links: [],
      },

      // Design (basic extraction from metadata)
      design: {
        color_palette: [],
        background_color: '#ffffff',
        font_families: [],
      },

      // Assets
      assets: {
        logo_url: metadata.ogImage || '',
        hero_image: metadata.ogImage || '',
        images: [],
      },

      // Technical
      technical: {
        has_mobile_viewport: true,
        has_structured_data: false,
        scraped_with_firecrawl: true,
      },

      // Store the markdown for reference
      markdown_content: markdown.substring(0, 5000), // First 5000 chars
    };

    // Save parsed data
    const parsedJsonPath = path.join(config.paths.parsed, `${slug}.json`);
    await fs.writeFile(parsedJsonPath, JSON.stringify(parsedData, null, 2), 'utf-8');

    // Update business record
    business.parsed = true;
    business.parsed_at = parsedData.parsed_at;
    business.scraped_with_firecrawl = true;
  }

  /**
   * Extract headline from content
   */
  extractHeadline(markdown, html) {
    // Look for first H1 in markdown
    const h1Match = markdown.match(/^#\s+(.+)$/m);
    if (h1Match) return h1Match[1].trim();

    // Look for large text near the top
    const lines = markdown.split('\n').filter(l => l.trim().length > 0);
    for (const line of lines.slice(0, 10)) {
      if (line.length > 10 && line.length < 100 && !line.startsWith('[')) {
        return line.trim();
      }
    }

    return 'Welcome';
  }

  /**
   * Extract subtext/tagline
   */
  extractSubtext(markdown) {
    const lines = markdown.split('\n').filter(l => l.trim().length > 0);

    // Look for text after headline
    for (let i = 1; i < Math.min(15, lines.length); i++) {
      const line = lines[i].trim();
      if (line.length > 20 && line.length < 200 && !line.startsWith('#') && !line.startsWith('[')) {
        return line;
      }
    }

    return '';
  }

  /**
   * Extract primary CTA
   */
  extractCTA(markdown, html) {
    // Look for buttons or links in markdown
    const linkMatch = markdown.match(/\[([^\]]+)\]\(([^\)]+)\)/);
    if (linkMatch) {
      return {
        text: linkMatch[1],
        href: linkMatch[2],
      };
    }

    return { text: 'Learn More', href: '#' };
  }

  /**
   * Extract about text
   */
  extractAbout(markdown) {
    const lines = markdown.split('\n').filter(l => l.trim().length > 0);

    // Find longest paragraph
    let longestPara = '';
    for (const line of lines) {
      if (line.length > longestPara.length && line.length > 50 && !line.startsWith('#') && !line.startsWith('[')) {
        longestPara = line;
      }
    }

    return longestPara.substring(0, 300);
  }

  /**
   * Extract navigation items
   */
  extractNavItems(markdown, html) {
    const navItems = [];
    const linkMatches = markdown.matchAll(/\[([^\]]+)\]\(([^\)]+)\)/g);

    for (const match of linkMatches) {
      if (navItems.length >= 6) break;
      navItems.push({
        text: match[1],
        href: match[2],
      });
    }

    return navItems;
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
    console.log('\n📊 Firecrawl Parsing Summary:');
    console.log(`  Successful: ${this.successCount}`);
    console.log(`  Failed: ${this.failureCount}`);
    if (this.successCount + this.failureCount > 0) {
      console.log(`  Success rate: ${Math.round((this.successCount / (this.successCount + this.failureCount)) * 100)}%`);
    }

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

  const agent = new FirecrawlParserAgent();
  agent.run(limit).catch(error => {
    console.error(error);
    process.exit(1);
  });
}

export default FirecrawlParserAgent;
