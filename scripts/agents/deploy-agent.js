#!/usr/bin/env node

/**
 * Deploy Agent
 * Deploys redesigned pages to Vercel showcase platform
 */

import fs from 'fs/promises';
import path from 'path';
import { config } from '../../config/config.js';

class DeployAgent {
  constructor() {
    this.businesses = [];
    this.deployedCount = 0;
    this.deploymentLog = [];
  }

  /**
   * Main execution method
   */
  async run() {
    console.log('🚀 DeployAgent starting...\n');

    try {
      // Load businesses
      await this.loadBusinesses();

      // Filter to redesigned businesses
      const businessesToDeploy = this.businesses.filter(b => b.redesigned === true);

      console.log(`📋 Deploying ${businessesToDeploy.length} businesses\n`);

      // Copy redesigns to deployment directory
      for (const business of businessesToDeploy) {
        await this.deployBusiness(business);
      }

      // Generate index page
      await this.generateIndexPage();

      // Generate vercel.json
      await this.generateVercelConfig();

      // Save deployment log
      await this.saveDeploymentLog();

      // Print summary
      this.printSummary();

      console.log('\n✅ DeployAgent completed successfully!');
      console.log('\n📝 Next steps:');
      console.log('  1. Review the files in vercel_deploy/');
      console.log('  2. Deploy to Vercel: cd vercel_deploy && vercel --prod');
      console.log('  3. Or commit and push to trigger auto-deployment');
    } catch (error) {
      console.error('❌ DeployAgent failed:', error.message);
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
   * Deploy a single business
   */
  async deployBusiness(business) {
    const slug = business.slug;
    console.log(`  Deploying ${business.name}...`);

    // Create business directory in deployment folder
    const deployDir = path.join(config.paths.businesses, slug);
    await fs.mkdir(deployDir, { recursive: true });

    // Copy HTML file
    const sourceHtml = path.join(config.paths.redesigns, slug, 'index.html');
    const destHtml = path.join(deployDir, 'index.html');

    try {
      await fs.copyFile(sourceHtml, destHtml);

      // Add to deployment log
      const deployUrl = `${config.deploy.baseUrl}/businesses/${slug}`;
      this.deploymentLog.push({
        business_name: business.name,
        slug: slug,
        deploy_url: deployUrl,
        deployed_at: new Date().toISOString(),
      });

      // Update business record
      business.deploy_url = deployUrl;
      business.deployed = true;

      this.deployedCount++;
      console.log(`    ✓ Deployed to /businesses/${slug}/`);
    } catch (error) {
      console.log(`    ✗ Failed to deploy: ${error.message}`);
    }
  }

  /**
   * Generate index showcase page
   */
  async generateIndexPage() {
    console.log('\n🏠 Generating index showcase page...');

    const deployedBusinesses = this.businesses.filter(b => b.deployed === true);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.deploy.indexPageTitle}</title>
    <meta name="description" content="Showcasing modern, AI-generated homepage redesigns for local Austin businesses">

    <!-- TailwindCSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">

    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
    </style>
</head>
<body class="bg-gray-50">

    <!-- Header -->
    <header class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div class="container mx-auto px-4 py-16 text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">
                ATX Revival
            </h1>
            <p class="text-xl md:text-2xl mb-8 opacity-90">
                Modern Web Designs for Austin's Small Businesses
            </p>
            <a href="#showcase" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
                Explore Redesigns
            </a>
        </div>
    </header>

    <!-- About Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto text-center">
                <h2 class="text-3xl md:text-4xl font-bold mb-6">The Project</h2>
                <p class="text-lg text-gray-700 leading-relaxed mb-4">
                    We're reimagining homepages for 300 Austin small businesses using modern web design principles,
                    AI-powered content generation, and mobile-first development.
                </p>
                <p class="text-gray-600">
                    These are <strong>concept redesigns</strong> created for demonstration purposes.
                    They showcase what's possible with contemporary web standards and design frameworks.
                </p>
            </div>
        </div>
    </section>

    <!-- Showcase Grid -->
    <section id="showcase" class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">
                Redesigned Businesses (${deployedBusinesses.length})
            </h2>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${deployedBusinesses.map(business => `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                    <div class="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <div class="text-center">
                            <div class="text-4xl font-bold text-gray-800">${business.name.charAt(0)}</div>
                            <div class="text-sm text-gray-600 mt-2">${business.industry || 'Business'}</div>
                        </div>
                    </div>

                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2">${business.name}</h3>
                        <p class="text-gray-600 text-sm mb-4">
                            ${business.address || 'Austin, TX'}
                        </p>

                        <div class="flex gap-2">
                            <a href="/businesses/${business.slug}/" class="flex-1 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition text-sm font-semibold">
                                View Redesign
                            </a>
                            ${business.url ? `
                            <a href="${business.url}" target="_blank" rel="noopener" class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition text-sm">
                                Original ↗
                            </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
                `).join('\n                ')}
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">
                Want a Redesign for Your Business?
            </h2>
            <p class="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Get a free concept redesign of your website to see what's possible
                with modern web design.
            </p>

            <div class="max-w-md mx-auto bg-white rounded-lg p-8">
                <form class="space-y-4 text-left">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Business Name</label>
                        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" placeholder="Your business name">
                    </div>

                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Website URL</label>
                        <input type="url" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" placeholder="https://yourbusiness.com">
                    </div>

                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-gray-900" placeholder="your@email.com">
                    </div>

                    <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Request Free Mockup
                    </button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4 text-center">
            <div class="mb-4">
                <h3 class="text-2xl font-bold mb-2">Domain Labs</h3>
                <p class="text-gray-400">Modern Web Design for Austin Businesses</p>
            </div>

            <div class="text-sm text-gray-400">
                <p>&copy; ${new Date().getFullYear()} Domain Labs. All rights reserved.</p>
                <p class="mt-2">
                    All redesigns are concepts created for demonstration purposes only.
                    We are not affiliated with the businesses shown.
                </p>
            </div>
        </div>
    </footer>

</body>
</html>`;

    const indexPath = path.join(config.paths.vercelDeploy, 'index.html');
    await fs.writeFile(indexPath, html, 'utf-8');

    console.log('  ✓ Generated index.html');
  }

  /**
   * Generate vercel.json configuration
   */
  async generateVercelConfig() {
    console.log('\n⚙️  Generating Vercel configuration...');

    const vercelConfig = {
      version: 2,
      builds: [
        {
          src: "**/*.html",
          use: "@vercel/static"
        }
      ],
      routes: [
        {
          src: "/(.*)",
          dest: "/$1"
        }
      ],
      headers: [
        {
          source: "/(.*)",
          headers: [
            {
              key: "X-Content-Type-Options",
              value: "nosniff"
            },
            {
              key: "X-Frame-Options",
              value: "DENY"
            },
            {
              key: "X-XSS-Protection",
              value: "1; mode=block"
            }
          ]
        }
      ]
    };

    const configPath = path.join(config.paths.vercelDeploy, 'vercel.json');
    await fs.writeFile(configPath, JSON.stringify(vercelConfig, null, 2), 'utf-8');

    console.log('  ✓ Generated vercel.json');
  }

  /**
   * Save deployment log
   */
  async saveDeploymentLog() {
    await fs.writeFile(
      config.files.deploymentLog,
      JSON.stringify(this.deploymentLog, null, 2),
      'utf-8'
    );

    // Also update businesses.json
    await fs.writeFile(
      config.files.businesses,
      JSON.stringify(this.businesses, null, 2),
      'utf-8'
    );
  }

  /**
   * Print summary
   */
  printSummary() {
    console.log('\n📊 Deployment Summary:');
    console.log(`  Businesses deployed: ${this.deployedCount}`);
    console.log(`  Deployment log saved to: ${config.files.deploymentLog}`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const agent = new DeployAgent();
  agent.run().catch(error => {
    console.error(error);
    process.exit(1);
  });
}

export default DeployAgent;
