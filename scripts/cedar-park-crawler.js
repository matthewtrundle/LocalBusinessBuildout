#!/usr/bin/env node

/**
 * Cedar Park Business Crawler
 * Crawls Cedar Park businesses using FireCrawl and downloads all assets
 */

import fs from 'fs/promises';
import path from 'path';
import FirecrawlApp from '@mendable/firecrawl-js';
import dotenv from 'dotenv';
import { config } from '../config/config.js';
import ImageDownloader from './utils/image-downloader.js';
import WebsiteScorer from './utils/website-scorer.js';

// Load environment variables
dotenv.config();

class CedarParkCrawler {
  constructor() {
    this.businesses = [];
    this.successCount = 0;
    this.failureCount = 0;
    this.errors = [];

    // Initialize FireCrawl
    const apiKey = process.env.FIRECRAWL_API_KEY;
    if (!apiKey) {
      throw new Error('FIRECRAWL_API_KEY not found in environment variables');
    }

    this.firecrawl = new FirecrawlApp({ apiKey });
    this.imageDownloader = new ImageDownloader();

    console.log('🔥 FireCrawl initialized');
  }

  /**
   * Main execution
   */
  async run(options = {}) {
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('  🌲 CEDAR PARK BUSINESS CRAWLER');
    console.log('═══════════════════════════════════════════════════════════\n');

    try {
      // Load Cedar Park businesses
      await this.loadBusinesses();

      // Filter businesses if limit specified
      let businessesToCrawl = this.businesses;
      if (options.limit) {
        console.log(`📊 Limiting to ${options.limit} businesses\n`);
        businessesToCrawl = this.businesses.slice(0, options.limit);
      }

      console.log(`📋 Crawling ${businessesToCrawl.length} Cedar Park businesses\n`);

      // Crawl each business
      for (let i = 0; i < businessesToCrawl.length; i++) {
        const business = businessesToCrawl[i];
        console.log(`\n[${i + 1}/${businessesToCrawl.length}] ${business.name}`);
        console.log(`${'─'.repeat(60)}`);

        try {
          await this.crawlBusiness(business);
          this.successCount++;
        } catch (error) {
          this.failureCount++;
          console.log(`  ✗ Failed: ${error.message}`);
          this.errors.push({
            business_name: business.name,
            url: business.url,
            error: error.message,
            timestamp: new Date().toISOString(),
          });
        }

        // Rate limiting
        if (i < businessesToCrawl.length - 1) {
          console.log('\n⏳ Waiting 3 seconds before next crawl...');
          await this.sleep(3000);
        }
      }

      // Download images for all crawled businesses
      if (options.downloadImages !== false) {
        console.log('\n\n═══════════════════════════════════════════════════════════');
        console.log('  🖼️  DOWNLOADING IMAGES');
        console.log('═══════════════════════════════════════════════════════════');

        await this.imageDownloader.downloadAllBusinessImages(businessesToCrawl);
      }

      // Save errors if any
      if (this.errors.length > 0) {
        await this.saveErrors();
      }

      // Print summary
      this.printSummary();

      console.log('\n✅ Cedar Park Crawler completed!\n');
    } catch (error) {
      console.error('\n❌ Cedar Park Crawler failed:', error.message);
      throw error;
    }
  }

  /**
   * Load Cedar Park businesses
   */
  async loadBusinesses() {
    const cedarParkPath = path.join(config.paths.data, 'cedar-park-businesses.json');
    const data = await fs.readFile(cedarParkPath, 'utf-8');
    this.businesses = JSON.parse(data);
    console.log(`📂 Loaded ${this.businesses.length} Cedar Park businesses`);
  }

  /**
   * Crawl a single business
   */
  async crawlBusiness(business) {
    console.log(`🔥 Scraping: ${business.url}`);

    // Scrape with FireCrawl
    const scrapeResult = await this.firecrawl.v1.scrapeUrl(business.url, {
      formats: ['markdown', 'html'],
      onlyMainContent: false,
    });

    if (!scrapeResult.success) {
      throw new Error('FireCrawl scrape failed');
    }

    const html = scrapeResult.html || '';
    const markdown = scrapeResult.markdown || '';
    const metadata = scrapeResult.metadata || {};

    console.log(`  📄 Retrieved ${html.length.toLocaleString()} bytes of HTML`);
    console.log(`  📝 Retrieved ${markdown.length.toLocaleString()} chars of markdown`);

    // Score the website
    const scorer = new WebsiteScorer();
    const websiteScore = scorer.scoreWebsite({ html, markdown, metadata });

    // Color-coded score output
    const scoreColor = websiteScore.total >= 8 ? '\x1b[32m' : // Green
                       websiteScore.total >= 6 ? '\x1b[33m' : // Yellow
                       websiteScore.total >= 4 ? '\x1b[36m' : // Cyan
                       '\x1b[31m'; // Red
    const resetColor = '\x1b[0m';

    console.log(`  ${scoreColor}⭐ Website Score: ${websiteScore.total}/10${resetColor} - ${websiteScore.verdict}`);
    console.log(`     Design: ${websiteScore.breakdown.design}/10 | Technical: ${websiteScore.breakdown.technical}/10`);
    console.log(`     Content: ${websiteScore.breakdown.content}/10 | Modern: ${websiteScore.breakdown.modern}/10`);

    if (websiteScore.targetForRedesign) {
      console.log(`  🎯 ${scoreColor}TARGET FOR REDESIGN${resetColor}`);
    }

    // Extract contact information
    const contactInfo = this.extractContactInfo(markdown, html);
    if (contactInfo.email) {
      console.log(`  📧 Email: ${contactInfo.email}`);
    }
    if (contactInfo.phone) {
      console.log(`  📞 Phone: ${contactInfo.phone}`);
    }

    // Save raw HTML
    const rawHtmlPath = path.join(config.paths.rawSites, `${business.slug}.html`);
    await fs.writeFile(rawHtmlPath, html, 'utf-8');
    console.log(`  💾 Saved raw HTML`);

    // Extract and structure data
    const parsedData = {
      business_name: business.name,
      url: business.url,
      slug: business.slug,
      city: business.city || 'Cedar Park',
      industry: business.industry,
      address: business.address,
      description: business.description,
      parsed_at: new Date().toISOString(),
      scrape_method: 'firecrawl',

      // Metadata
      metadata: {
        title: metadata.title || scrapeResult.title || business.name,
        meta_description: metadata.description || business.description || '',
        favicon: metadata.favicon || '',
        viewport: 'width=device-width, initial-scale=1',
        og_title: metadata.ogTitle || '',
        og_description: metadata.ogDescription || '',
        og_image: metadata.ogImage || '',
      },

      // Content extraction
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

      // Design
      design: {
        color_palette: [],
        background_color: '#ffffff',
        font_families: [],
      },

      // Assets
      assets: {
        logo_url: metadata.ogImage || '',
        hero_image: metadata.ogImage || '',
        images: this.extractImageUrlsFromMarkdown(markdown),
      },

      // Technical
      technical: {
        has_mobile_viewport: true,
        has_structured_data: false,
        scraped_with_firecrawl: true,
      },

      // Website Quality Score
      quality_score: {
        total: websiteScore.total,
        breakdown: websiteScore.breakdown,
        verdict: websiteScore.verdict,
        target_for_redesign: websiteScore.targetForRedesign,
      },

      // Contact Information
      contact: {
        email: contactInfo.email || '',
        phone: contactInfo.phone || '',
        social_media: contactInfo.social || [],
      },

      // Full content
      markdown_content: markdown,
      html_content_length: html.length,
    };

    // Save parsed data
    const parsedJsonPath = path.join(config.paths.parsed, `${business.slug}.json`);
    await fs.writeFile(parsedJsonPath, JSON.stringify(parsedData, null, 2), 'utf-8');
    console.log(`  💾 Saved parsed data`);

    console.log(`  ✓ Successfully crawled ${business.name}`);

    return parsedData;
  }

  /**
   * Extract headline from content
   */
  extractHeadline(markdown, html) {
    const h1Match = markdown.match(/^#\s+(.+)$/m);
    if (h1Match) return h1Match[1].trim();

    const lines = markdown.split('\n').filter(l => l.trim().length > 0);
    for (const line of lines.slice(0, 10)) {
      if (line.length > 10 && line.length < 100 && !line.startsWith('[')) {
        return line.trim();
      }
    }

    return 'Welcome';
  }

  /**
   * Extract subtext
   */
  extractSubtext(markdown) {
    const lines = markdown.split('\n').filter(l => l.trim().length > 0);

    for (let i = 1; i < Math.min(15, lines.length); i++) {
      const line = lines[i].trim();
      if (line.length > 20 && line.length < 200 && !line.startsWith('#') && !line.startsWith('[')) {
        return line;
      }
    }

    return '';
  }

  /**
   * Extract CTA
   */
  extractCTA(markdown, html) {
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

    let longestPara = '';
    for (const line of lines) {
      if (line.length > longestPara.length && line.length > 50 && !line.startsWith('#') && !line.startsWith('[')) {
        longestPara = line;
      }
    }

    return longestPara.substring(0, 500);
  }

  /**
   * Extract navigation items
   */
  extractNavItems(markdown, html) {
    const navItems = [];
    const linkMatches = markdown.matchAll(/\[([^\]]+)\]\(([^\)]+)\)/g);

    for (const match of linkMatches) {
      if (navItems.length >= 8) break;
      navItems.push({
        text: match[1],
        href: match[2],
      });
    }

    return navItems;
  }

  /**
   * Extract image URLs from markdown
   */
  extractImageUrlsFromMarkdown(markdown) {
    const images = [];
    const imageRegex = /!\[.*?\]\((https?:\/\/[^\)]+)\)/g;
    let match;

    while ((match = imageRegex.exec(markdown)) !== null) {
      images.push(match[1]);
    }

    return images;
  }

  /**
   * Extract contact information (email, phone, social media)
   */
  extractContactInfo(markdown, html) {
    const contactInfo = {
      email: null,
      phone: null,
      social: [],
    };

    // Extract email
    const emailMatch = markdown.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) {
      contactInfo.email = emailMatch[0];
    }

    // Extract phone number (various formats)
    const phonePatterns = [
      /\(\d{3}\)\s*\d{3}-\d{4}/,  // (512) 555-1234
      /\d{3}-\d{3}-\d{4}/,         // 512-555-1234
      /\d{3}\.\d{3}\.\d{4}/,       // 512.555.1234
      /\+1\s*\d{3}\s*\d{3}\s*\d{4}/, // +1 512 555 1234
    ];

    for (const pattern of phonePatterns) {
      const phoneMatch = markdown.match(pattern);
      if (phoneMatch) {
        contactInfo.phone = phoneMatch[0];
        break;
      }
    }

    // Extract social media links
    const socialPatterns = {
      instagram: /instagram\.com\/([a-zA-Z0-9._]+)/,
      facebook: /facebook\.com\/([a-zA-Z0-9._]+)/,
      twitter: /twitter\.com\/([a-zA-Z0-9._]+)/,
      tiktok: /tiktok\.com\/@?([a-zA-Z0-9._]+)/,
    };

    for (const [platform, pattern] of Object.entries(socialPatterns)) {
      const match = markdown.match(pattern);
      if (match) {
        contactInfo.social.push({
          platform,
          username: match[1],
          url: match[0],
        });
      }
    }

    return contactInfo;
  }

  /**
   * Save errors
   */
  async saveErrors() {
    const errorsPath = path.join(config.paths.data, 'cedar-park-errors.json');
    await fs.writeFile(errorsPath, JSON.stringify(this.errors, null, 2), 'utf-8');
  }

  /**
   * Print summary
   */
  printSummary() {
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('  📊 CRAWL SUMMARY');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`  Successful: ${this.successCount}`);
    console.log(`  Failed: ${this.failureCount}`);

    if (this.successCount + this.failureCount > 0) {
      const successRate = Math.round((this.successCount / (this.successCount + this.failureCount)) * 100);
      console.log(`  Success rate: ${successRate}%`);
    }

    if (this.failureCount > 0) {
      console.log(`\n  ⚠️  ${this.failureCount} errors logged to cedar-park-errors.json`);
    }
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
  const options = {
    limit: null,
    downloadImages: true,
  };

  // Parse command line arguments
  if (process.argv.includes('--limit')) {
    const limitIndex = process.argv.indexOf('--limit');
    options.limit = parseInt(process.argv[limitIndex + 1]);
  }

  if (process.argv.includes('--no-images')) {
    options.downloadImages = false;
  }

  const crawler = new CedarParkCrawler();
  crawler.run(options).catch(error => {
    console.error(error);
    process.exit(1);
  });
}

export default CedarParkCrawler;
