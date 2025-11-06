#!/usr/bin/env node

/**
 * Outreach Agent
 * Generates personalized outreach messages for business owners
 */

import fs from 'fs/promises';
import { config } from '../../config/config.js';

class OutreachAgent {
  constructor() {
    this.businesses = [];
    this.outreachQueue = [];
  }

  /**
   * Main execution method
   */
  async run() {
    console.log('📧 OutreachAgent starting...\n');

    try {
      // Load businesses
      await this.loadBusinesses();

      // Filter to deployed businesses
      const businessesWithDeployment = this.businesses.filter(b => b.deployed === true && b.deploy_url);

      console.log(`📋 Generating outreach for ${businessesWithDeployment.length} businesses\n`);

      // Generate outreach for each business
      for (const business of businessesWithDeployment) {
        this.generateOutreach(business);
      }

      // Save outreach queue
      await this.saveOutreach();

      // Print summary
      this.printSummary();

      console.log('\n✅ OutreachAgent completed successfully!');
      console.log('\n📝 Next steps:');
      console.log('  1. Review outreach messages in data/outreach.json');
      console.log('  2. Configure email provider (SendGrid, AWS SES, etc.)');
      console.log('  3. Implement sending logic or manually send emails');
    } catch (error) {
      console.error('❌ OutreachAgent failed:', error.message);
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
   * Generate outreach for a single business
   */
  generateOutreach(business) {
    const firstName = this.extractFirstName(business.contact_email || business.name);
    const industry = business.industry || 'business';

    // Generate personalized opening
    const opening = this.generatePersonalizedOpening(business);

    // Select subject line
    const subject = this.generateSubjectLine(business);

    // Generate email body
    const body = this.generateEmailBody(business, firstName, opening);

    // Create outreach record
    const outreach = {
      business_id: business.slug,
      business_name: business.name,
      contact_email: business.contact_email || '',
      redesign_url: business.deploy_url,
      subject: subject,
      body: body,
      status: 'pending',
      created_at: new Date().toISOString(),
      follow_up_count: 0,
    };

    this.outreachQueue.push(outreach);

    console.log(`  ✓ Generated outreach for ${business.name}`);
  }

  /**
   * Generate personalized subject line
   */
  generateSubjectLine(business) {
    const templates = [
      `Quick question about ${business.name}'s website`,
      `${business.name} — thought you'd want to see this`,
      `Your Austin business, reimagined`,
      `Free redesign concept for ${business.name}`,
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  }

  /**
   * Generate personalized opening line
   */
  generatePersonalizedOpening(business) {
    const industry = business.industry || 'business';
    const address = business.address || '';

    if (address.includes('Congress')) {
      return "I've been exploring businesses on South Congress and your location caught my eye.";
    } else if (address.includes('6th Street')) {
      return "Your spot on 6th Street is iconic in Austin!";
    } else if (industry === 'cafe' || industry === 'restaurant') {
      return `As someone who loves Austin's ${industry} scene, I had to include your business in this project.`;
    } else {
      return `While researching local Austin businesses, ${business.name} stood out.`;
    }
  }

  /**
   * Generate email body
   */
  generateEmailBody(business, firstName, opening) {
    const showcaseUrl = config.deploy.baseUrl;

    return `Hi ${firstName},

${opening}

I'm reaching out from Domain Labs, an Austin-based web studio.

We're on a mission to help local businesses compete online with modern, mobile-friendly websites that actually convert visitors into customers.

To showcase what's possible, we created a free redesign concept of ${business.name}'s homepage using today's web standards:

👉 ${business.deploy_url}

It's fully live — you can view it on any device. No strings attached, just wanted to show you what's possible with a modern, conversion-focused design.

The redesign includes:
• Mobile-first responsive layout
• Clear call-to-action buttons
• SEO optimization
• Fast loading times
• Accessibility improvements

If you like what you see and want to make it real (custom domain, optimized for SEO, lightning-fast hosting), we'd love to chat.

Otherwise, feel free to keep the concept as inspiration!

You can see our full showcase of Austin businesses at: ${showcaseUrl}

Best,
Alex
Domain Labs
Austin, TX

P.S. — We're doing this for 300 Austin businesses to demonstrate the power of modern web design.

---
Domain Labs | Modern Web Design for Austin Businesses
hello@domainlabs.ai | Austin, TX 78701

Reply STOP to unsubscribe from future emails.
`;
  }

  /**
   * Extract first name from email or business name
   */
  extractFirstName(emailOrName) {
    if (!emailOrName) return 'there';

    // If it's an email, extract name before @
    if (emailOrName.includes('@')) {
      const namePart = emailOrName.split('@')[0];
      const cleanName = namePart.replace(/[._-]/g, ' ');
      const words = cleanName.split(' ');
      return words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    }

    // If it's a business name, use a generic greeting
    return 'there';
  }

  /**
   * Save outreach queue
   */
  async saveOutreach() {
    console.log('\n💾 Saving outreach queue...');

    await fs.writeFile(
      config.files.outreach,
      JSON.stringify(this.outreachQueue, null, 2),
      'utf-8'
    );

    console.log(`  ✓ Saved ${this.outreachQueue.length} outreach messages to ${config.files.outreach}`);
  }

  /**
   * Print summary
   */
  printSummary() {
    console.log('\n📊 Outreach Summary:');
    console.log(`  Total outreach messages: ${this.outreachQueue.length}`);
    console.log(`  Status: Ready to send`);
    console.log('\n  Sample subject lines:');

    const samples = this.outreachQueue.slice(0, 3);
    samples.forEach(s => {
      console.log(`    • ${s.subject}`);
    });
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const agent = new OutreachAgent();
  agent.run().catch(error => {
    console.error(error);
    process.exit(1);
  });
}

export default OutreachAgent;
