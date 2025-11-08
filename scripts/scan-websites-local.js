#!/usr/bin/env node

/**
 * LOCAL WEBSITE SCANNER - Runs on your machine using Puppeteer
 *
 * Analyzes all 218 business websites for:
 * - Technology stack (WordPress, React, Shopify, etc.)
 * - Design quality & modernization needs
 * - AI opportunities (chatbot, automation)
 * - Mobile responsiveness
 * - Contact forms, booking systems
 * - "Business facelift" priority scoring
 *
 * INSTALL: npm install puppeteer
 * RUN: node scripts/scan-websites-local.js
 */

import fs from 'fs/promises';
import puppeteer from 'puppeteer';

class WebsiteScanner {
  constructor() {
    this.businesses = [];
    this.results = [];
    this.successCount = 0;
    this.failureCount = 0;
    this.browser = null;
  }

  async run(limit = null) {
    console.log('🔬 LOCAL WEBSITE SCANNER STARTING...\n');
    console.log('📌 This runs on YOUR machine to bypass 403 blocks\n');

    // Load businesses
    const data = await fs.readFile('/home/user/LocalBusinessBuildout/data/austin-businesses-master.json', 'utf-8');
    this.businesses = JSON.parse(data);

    // Filter businesses with websites
    let toScan = this.businesses.filter(b => b.website || b.url);

    if (limit) {
      console.log(`🧪 TEST MODE: Scanning first ${limit} businesses\n`);
      toScan = toScan.slice(0, limit);
    }

    console.log(`🎯 Scanning ${toScan.length} business websites...\n`);

    // Launch browser
    console.log('🚀 Launching Chrome browser...');
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log('✅ Browser ready\n');

    // Scan each website
    for (let i = 0; i < toScan.length; i++) {
      const business = toScan[i];
      const url = business.website || business.url;

      console.log(`[${i + 1}/${toScan.length}] ${business.name}`);
      console.log(`   URL: ${url}`);

      try {
        const analysis = await this.scanWebsite(url, business);
        this.results.push({
          business_name: business.name,
          city: business.city,
          category: business.category || business.industry,
          url: url,
          ...analysis,
          scanned_at: new Date().toISOString(),
        });
        this.successCount++;
        console.log(`   ✅ Scanned successfully\n`);
      } catch (error) {
        this.failureCount++;
        console.log(`   ❌ Failed: ${error.message}\n`);
        this.results.push({
          business_name: business.name,
          url: url,
          error: error.message,
          scan_failed: true,
        });
      }

      // Rate limit
      await this.sleep(2000);
    }

    // Close browser
    await this.browser.close();
    console.log('🔒 Browser closed\n');

    // Save results
    await this.saveResults();

    // Generate report
    this.printReport();

    console.log('\n✅ Website scanning complete!');
  }

  /**
   * Scan a single website
   */
  async scanWebsite(url, business) {
    const page = await this.browser.newPage();

    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });

    // Navigate with timeout
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Extract all data
    const analysis = await page.evaluate(() => {
      const result = {};

      // 1. TECHNOLOGY STACK DETECTION
      result.tech_stack = {
        wordpress: !!document.querySelector('meta[name="generator"][content*="WordPress"]') ||
                   !!document.body.className.match(/wp-/),
        shopify: !!window.Shopify || !!document.querySelector('[data-shopify]'),
        wix: !!window.wixBiSession || document.body.className.includes('wix'),
        squarespace: !!window.Static?.SQUARESPACE_CONTEXT,
        react: !!document.querySelector('[data-reactroot]') ||
               !!document.querySelector('#root') ||
               !!window.React,
        vue: !!window.Vue || !!document.querySelector('[data-v-]'),
        angular: !!window.angular || !!document.querySelector('[ng-app]'),
        jquery: !!window.jQuery || !!window.$,
        bootstrap: !!document.querySelector('link[href*="bootstrap"]') ||
                   document.body.className.includes('bootstrap'),
        tailwind: !!document.querySelector('script[src*="tailwind"]') ||
                  document.documentElement.className.includes('tailwind'),
      };

      // Detect CMS/platform
      result.platform = 'Custom';
      if (result.tech_stack.wordpress) result.platform = 'WordPress';
      else if (result.tech_stack.shopify) result.platform = 'Shopify';
      else if (result.tech_stack.wix) result.platform = 'Wix';
      else if (result.tech_stack.squarespace) result.platform = 'Squarespace';

      // 2. DESIGN QUALITY INDICATORS
      result.design = {
        has_hero_section: !!document.querySelector('header') ||
                          !!document.querySelector('.hero') ||
                          !!document.querySelector('[class*="hero"]'),
        has_navigation: !!document.querySelector('nav') ||
                        !!document.querySelector('[role="navigation"]'),
        has_footer: !!document.querySelector('footer'),
        uses_modern_fonts: !!document.querySelector('link[href*="fonts.googleapis.com"]') ||
                           !!document.querySelector('link[href*="typekit"]'),
        has_animations: !!document.querySelector('[class*="animate"]') ||
                        !!document.querySelector('[data-aos]'),
        responsive_meta: !!document.querySelector('meta[name="viewport"]'),
        uses_css_grid: Array.from(document.querySelectorAll('*')).some(el =>
          window.getComputedStyle(el).display === 'grid'
        ),
        uses_flexbox: Array.from(document.querySelectorAll('*')).some(el =>
          window.getComputedStyle(el).display === 'flex'
        ),
      };

      // 3. FEATURES & FUNCTIONALITY
      result.features = {
        has_contact_form: !!document.querySelector('form[action*="contact"]') ||
                          !!document.querySelector('input[type="email"]'),
        has_phone_link: !!document.querySelector('a[href^="tel:"]'),
        has_email_link: !!document.querySelector('a[href^="mailto:"]'),
        has_chatbot: !!document.querySelector('[class*="chat"]') ||
                     !!window.Intercom ||
                     !!window.Drift ||
                     !!document.querySelector('[id*="chat"]'),
        has_online_ordering: !!document.querySelector('a[href*="order"]') ||
                             !!document.querySelector('[class*="order"]') ||
                             !!document.querySelector('a[href*="doordash"]') ||
                             !!document.querySelector('a[href*="ubereats"]'),
        has_booking_system: !!document.querySelector('a[href*="book"]') ||
                            !!document.querySelector('[class*="reservation"]') ||
                            !!document.querySelector('a[href*="opentable"]'),
        has_menu_online: !!document.querySelector('a[href*="menu"]') ||
                         !!document.querySelector('[class*="menu"]'),
        has_social_media: !!document.querySelector('a[href*="facebook.com"]') ||
                          !!document.querySelector('a[href*="instagram.com"]') ||
                          !!document.querySelector('a[href*="twitter.com"]'),
      };

      // 4. THIRD-PARTY SERVICES
      result.services = {
        google_analytics: !!window.ga || !!window.gtag ||
                          !!document.querySelector('script[src*="google-analytics"]'),
        facebook_pixel: !!window.fbq ||
                        !!document.querySelector('script[src*="facebook"]'),
        google_maps: !!document.querySelector('iframe[src*="google.com/maps"]'),
        stripe: !!window.Stripe,
        mailchimp: !!document.querySelector('[action*="mailchimp"]'),
      };

      // 5. MODERNIZATION INDICATORS
      result.modernization = {
        uses_https: window.location.protocol === 'https:',
        has_ssl_badge: !!document.querySelector('[alt*="SSL"]') ||
                       !!document.querySelector('[class*="secure"]'),
        mobile_optimized: !!document.querySelector('meta[name="viewport"]'),
        fast_loading: performance.timing ?
                      (performance.timing.loadEventEnd - performance.timing.navigationStart) < 3000 :
                      null,
        accessible_contrast: true, // Simplified
        semantic_html: !!document.querySelector('article') ||
                       !!document.querySelector('section') ||
                       !!document.querySelector('main'),
      };

      // 6. PAGE CONTENT ANALYSIS
      result.content = {
        has_images: document.querySelectorAll('img').length,
        has_videos: document.querySelectorAll('video').length +
                    document.querySelectorAll('iframe[src*="youtube"]').length +
                    document.querySelectorAll('iframe[src*="vimeo"]').length,
        has_blog: !!document.querySelector('a[href*="blog"]') ||
                  !!document.querySelector('[class*="blog"]'),
        page_title: document.title,
        meta_description: document.querySelector('meta[name="description"]')?.content || '',
      };

      return result;
    });

    // Take screenshot
    const screenshotPath = `/home/user/LocalBusinessBuildout/data/screenshots/${business.slug}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: false });

    // Calculate scores
    const scores = this.calculateScores(analysis);

    await page.close();

    return {
      ...analysis,
      ...scores,
    };
  }

  /**
   * Calculate all scores
   */
  calculateScores(analysis) {
    const scores = {};

    // 1. Technology Sophistication Score (0-100)
    let techScore = 0;
    if (analysis.tech_stack.react || analysis.tech_stack.vue || analysis.tech_stack.angular) {
      techScore += 40; // Modern framework
    }
    if (analysis.platform === 'Shopify' || analysis.platform === 'WordPress') {
      techScore += 30; // Professional CMS
    } else if (analysis.platform === 'Custom') {
      techScore += 50; // Custom build
    }
    if (analysis.tech_stack.tailwind || analysis.tech_stack.bootstrap) {
      techScore += 10; // Modern CSS
    }
    if (analysis.services.google_analytics) techScore += 10;
    if (analysis.services.stripe) techScore += 10;

    scores.technology_score = Math.min(techScore, 100);

    // 2. Design Quality Score (0-100)
    let designScore = 0;
    if (analysis.design.has_hero_section) designScore += 15;
    if (analysis.design.has_navigation) designScore += 15;
    if (analysis.design.has_footer) designScore += 10;
    if (analysis.design.uses_modern_fonts) designScore += 15;
    if (analysis.design.has_animations) designScore += 10;
    if (analysis.design.responsive_meta) designScore += 15;
    if (analysis.design.uses_css_grid || analysis.design.uses_flexbox) designScore += 20;

    scores.design_quality_score = designScore;

    // 3. Features Completeness Score (0-100)
    let featuresScore = 0;
    Object.values(analysis.features).forEach(hasFeature => {
      if (hasFeature) featuresScore += 12.5; // 8 features = 100
    });

    scores.features_score = Math.min(featuresScore, 100);

    // 4. AI Opportunity Score (0-100) - HIGHER = MORE OPPORTUNITY
    let aiScore = 0;
    if (!analysis.features.has_chatbot) aiScore += 30; // No chatbot = opportunity
    if (!analysis.features.has_online_ordering) aiScore += 20;
    if (!analysis.features.has_booking_system) aiScore += 20;
    if (!analysis.features.has_contact_form) aiScore += 15;
    if (analysis.platform === 'WordPress' || analysis.platform === 'Custom') aiScore += 15;

    scores.ai_opportunity_score = aiScore;

    // 5. Facelift Priority Score (0-100) - HIGHER = MORE URGENT
    let faceliftScore = 0;
    if (!analysis.design.responsive_meta) faceliftScore += 25;
    if (!analysis.design.has_animations) faceliftScore += 15;
    if (!analysis.design.uses_modern_fonts) faceliftScore += 15;
    if (!analysis.modernization.uses_https) faceliftScore += 20;
    if (!(analysis.design.uses_css_grid || analysis.design.uses_flexbox)) faceliftScore += 25;

    scores.facelift_priority_score = faceliftScore;

    // 6. Overall Modernization Score (0-100)
    scores.modernization_score = Math.round(
      (scores.technology_score * 0.3 +
       scores.design_quality_score * 0.3 +
       scores.features_score * 0.4)
    );

    // Determine facelift urgency
    if (scores.facelift_priority_score >= 70) scores.facelift_urgency = 'URGENT';
    else if (scores.facelift_priority_score >= 50) scores.facelift_urgency = 'HIGH';
    else if (scores.facelift_priority_score >= 30) scores.facelift_urgency = 'MEDIUM';
    else scores.facelift_urgency = 'LOW';

    return scores;
  }

  /**
   * Save results
   */
  async saveResults() {
    // Ensure screenshots dir
    await fs.mkdir('/home/user/LocalBusinessBuildout/data/screenshots', { recursive: true });

    // Save JSON
    await fs.writeFile(
      '/home/user/LocalBusinessBuildout/data/website-analysis.json',
      JSON.stringify(this.results, null, 2)
    );

    // Save CSV
    const csv = this.toCSV();
    await fs.writeFile(
      '/home/user/LocalBusinessBuildout/data/website-analysis.csv',
      csv
    );

    console.log('💾 Saved analysis to:');
    console.log('   - data/website-analysis.json');
    console.log('   - data/website-analysis.csv');
    console.log('   - data/screenshots/*.png');
  }

  /**
   * Convert to CSV
   */
  toCSV() {
    const successful = this.results.filter(r => !r.scan_failed);

    const headers = [
      'Business', 'City', 'Category', 'Platform', 'Tech Score',
      'Design Score', 'Features Score', 'AI Opportunity', 'Facelift Priority',
      'Urgency', 'Has Chatbot', 'Has Booking', 'Mobile Ready'
    ];

    const rows = successful.map(r => [
      r.business_name,
      r.city,
      r.category,
      r.platform,
      r.technology_score,
      r.design_quality_score,
      r.features_score,
      r.ai_opportunity_score,
      r.facelift_priority_score,
      r.facelift_urgency,
      r.features?.has_chatbot ? 'Yes' : 'No',
      r.features?.has_booking_system ? 'Yes' : 'No',
      r.design?.responsive_meta ? 'Yes' : 'No',
    ].map(f => `"${f}"`).join(','));

    return [headers.join(','), ...rows].join('\n');
  }

  /**
   * Print report
   */
  printReport() {
    const successful = this.results.filter(r => !r.scan_failed);

    console.log('\n' + '='.repeat(70));
    console.log('📊 WEBSITE ANALYSIS REPORT');
    console.log('='.repeat(70));

    console.log(`\n✅ Successfully scanned: ${this.successCount}`);
    console.log(`❌ Failed: ${this.failureCount}`);

    if (successful.length === 0) {
      console.log('\n⚠️  No successful scans to analyze');
      return;
    }

    // Platform distribution
    const platforms = {};
    successful.forEach(r => {
      platforms[r.platform] = (platforms[r.platform] || 0) + 1;
    });

    console.log('\n🔧 Technology Platforms:');
    Object.entries(platforms).sort((a, b) => b[1] - a[1]).forEach(([platform, count]) => {
      console.log(`   ${platform}: ${count}`);
    });

    // Facelift urgency
    const urgency = { URGENT: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };
    successful.forEach(r => urgency[r.facelift_urgency]++);

    console.log('\n🎨 Facelift Priority:');
    console.log(`   🔴 URGENT: ${urgency.URGENT} businesses`);
    console.log(`   🟠 HIGH: ${urgency.HIGH} businesses`);
    console.log(`   🟡 MEDIUM: ${urgency.MEDIUM} businesses`);
    console.log(`   🟢 LOW: ${urgency.LOW} businesses`);

    // Top AI opportunities
    console.log('\n🤖 TOP 10 AI OPPORTUNITIES:');
    successful
      .sort((a, b) => b.ai_opportunity_score - a.ai_opportunity_score)
      .slice(0, 10)
      .forEach((r, i) => {
        console.log(`   ${i + 1}. ${r.business_name} (${r.ai_opportunity_score}/100)`);
        const missing = [];
        if (!r.features.has_chatbot) missing.push('Chatbot');
        if (!r.features.has_booking_system) missing.push('Booking');
        if (!r.features.has_online_ordering) missing.push('Ordering');
        console.log(`      Missing: ${missing.join(', ')}`);
      });

    // Top facelift candidates
    console.log('\n🏗️  TOP 10 FACELIFT CANDIDATES:');
    successful
      .sort((a, b) => b.facelift_priority_score - a.facelift_priority_score)
      .slice(0, 10)
      .forEach((r, i) => {
        console.log(`   ${i + 1}. ${r.business_name} - ${r.facelift_urgency} (${r.facelift_priority_score}/100)`);
        console.log(`      Platform: ${r.platform} | Design: ${r.design_quality_score}/100`);
      });

    // Average scores
    const avgTech = Math.round(successful.reduce((sum, r) => sum + r.technology_score, 0) / successful.length);
    const avgDesign = Math.round(successful.reduce((sum, r) => sum + r.design_quality_score, 0) / successful.length);
    const avgFeatures = Math.round(successful.reduce((sum, r) => sum + r.features_score, 0) / successful.length);

    console.log('\n📊 Average Scores:');
    console.log(`   Technology: ${avgTech}/100`);
    console.log(`   Design: ${avgDesign}/100`);
    console.log(`   Features: ${avgFeatures}/100`);

    console.log('='.repeat(70));
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run
if (import.meta.url === `file://${process.argv[1]}`) {
  const limit = process.argv.includes('--test') ? 5 : null;

  const scanner = new WebsiteScanner();
  scanner.run(limit).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export default WebsiteScanner;
