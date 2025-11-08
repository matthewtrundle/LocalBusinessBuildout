#!/usr/bin/env node

/**
 * Image Downloader Utility
 * Downloads and saves images from parsed business data
 */

import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { config } from '../../config/config.js';

class ImageDownloader {
  constructor() {
    this.downloadCount = 0;
    this.errorCount = 0;
    this.errors = [];
  }

  /**
   * Download images for a specific business
   */
  async downloadBusinessImages(businessSlug, parsedData) {
    console.log(`\n📸 Downloading images for ${parsedData.business_name}...`);

    // Create images directory for this business
    const imagesDir = path.join(config.paths.data, 'images', businessSlug);
    await fs.mkdir(imagesDir, { recursive: true });

    const imageUrls = this.extractImageUrls(parsedData);
    console.log(`  Found ${imageUrls.length} image URLs`);

    const downloadedImages = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      try {
        const filename = await this.downloadImage(imageUrl, imagesDir, i);
        if (filename) {
          downloadedImages.push({
            original_url: imageUrl,
            local_path: path.join(imagesDir, filename),
            filename: filename,
          });
          this.downloadCount++;
          console.log(`  ✓ Downloaded: ${filename}`);
        }
      } catch (error) {
        this.errorCount++;
        this.errors.push({
          business: parsedData.business_name,
          url: imageUrl,
          error: error.message,
        });
        console.log(`  ✗ Failed: ${imageUrl.substring(0, 50)}... - ${error.message}`);
      }

      // Rate limiting - be nice to servers
      await this.sleep(500);
    }

    // Save image manifest for this business
    const manifest = {
      business_name: parsedData.business_name,
      slug: businessSlug,
      downloaded_at: new Date().toISOString(),
      total_images: downloadedImages.length,
      images: downloadedImages,
    };

    await fs.writeFile(
      path.join(imagesDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2),
      'utf-8'
    );

    console.log(`  💾 Saved ${downloadedImages.length} images to ${imagesDir}`);

    return downloadedImages;
  }

  /**
   * Extract all image URLs from parsed data
   */
  extractImageUrls(parsedData) {
    const urls = new Set();

    // From metadata
    if (parsedData.metadata?.favicon) urls.add(parsedData.metadata.favicon);
    if (parsedData.metadata?.og_image) urls.add(parsedData.metadata.og_image);

    // From assets
    if (parsedData.assets?.logo_url) urls.add(parsedData.assets.logo_url);
    if (parsedData.assets?.hero_image) urls.add(parsedData.assets.hero_image);
    if (parsedData.assets?.images && Array.isArray(parsedData.assets.images)) {
      parsedData.assets.images.forEach(img => {
        if (typeof img === 'string') urls.add(img);
        else if (img.url) urls.add(img.url);
      });
    }

    // Extract from markdown content using regex
    if (parsedData.markdown_content) {
      const markdownImageRegex = /!\[.*?\]\((https?:\/\/[^\)]+)\)/g;
      let match;
      while ((match = markdownImageRegex.exec(parsedData.markdown_content)) !== null) {
        urls.add(match[1]);
      }

      // Also look for bare image URLs in markdown
      const urlRegex = /(https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|webp|svg))/gi;
      let urlMatch;
      while ((urlMatch = urlRegex.exec(parsedData.markdown_content)) !== null) {
        urls.add(urlMatch[1]);
      }
    }

    // Filter out invalid URLs and duplicates
    return Array.from(urls).filter(url => {
      return url &&
             typeof url === 'string' &&
             url.startsWith('http') &&
             !url.includes('data:image'); // Skip data URLs
    });
  }

  /**
   * Download a single image
   */
  async downloadImage(imageUrl, targetDir, index) {
    // Clean URL (remove query params for filename)
    const urlWithoutParams = imageUrl.split('?')[0];
    const ext = path.extname(urlWithoutParams) || '.jpg';

    // Generate filename
    const filename = `image-${String(index).padStart(3, '0')}${ext}`;
    const filepath = path.join(targetDir, filename);

    // Download image
    const response = await axios({
      method: 'GET',
      url: imageUrl,
      responseType: 'arraybuffer',
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });

    // Save to file
    await fs.writeFile(filepath, response.data);

    return filename;
  }

  /**
   * Download images for all parsed businesses
   */
  async downloadAllBusinessImages(businessesData) {
    console.log(`\n🖼️  Image Downloader starting...\n`);

    for (const business of businessesData) {
      if (!business.slug) {
        console.log(`⚠️  Skipping business without slug: ${business.name}`);
        continue;
      }

      // Check if parsed data exists
      const parsedPath = path.join(config.paths.parsed, `${business.slug}.json`);

      try {
        const parsedData = JSON.parse(await fs.readFile(parsedPath, 'utf-8'));
        await this.downloadBusinessImages(business.slug, parsedData);
      } catch (error) {
        console.log(`⚠️  No parsed data for ${business.name}: ${error.message}`);
      }
    }

    this.printSummary();
  }

  /**
   * Print summary
   */
  printSummary() {
    console.log('\n📊 Image Download Summary:');
    console.log(`  Downloaded: ${this.downloadCount}`);
    console.log(`  Failed: ${this.errorCount}`);

    if (this.errorCount > 0) {
      console.log(`\n  ⚠️  ${this.errorCount} errors occurred during download`);
    }
  }

  /**
   * Sleep utility
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default ImageDownloader;

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const downloader = new ImageDownloader();

  // Load businesses from Cedar Park list
  const cedarParkPath = path.join(config.paths.data, 'cedar-park-businesses.json');
  const businesses = JSON.parse(await fs.readFile(cedarParkPath, 'utf-8'));

  await downloader.downloadAllBusinessImages(businesses);
}
