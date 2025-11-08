#!/usr/bin/env node

/**
 * Test website fetching to see what works
 */

import axios from 'axios';

async function testFetching() {
  const testUrls = [
    'https://franklinbbq.com',
    'https://torchystacos.com',
    'https://uchiaustin.com',
    'https://jesterkingbrewery.com',
    'https://wholefoodsmarket.com'
  ];

  console.log('🧪 Testing website fetching...\n');

  for (const url of testUrls) {
    console.log(`Testing: ${url}`);

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
        timeout: 10000,
        maxRedirects: 5,
      });

      console.log(`  ✅ SUCCESS - ${response.data.length} bytes`);
      console.log(`  Title: ${response.data.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || 'N/A'}\n`);

    } catch (error) {
      if (error.response) {
        console.log(`  ❌ HTTP ${error.response.status} - ${error.response.statusText}`);
      } else if (error.code === 'ECONNREFUSED') {
        console.log(`  ❌ Connection refused`);
      } else if (error.code === 'ETIMEDOUT') {
        console.log(`  ❌ Timeout`);
      } else {
        console.log(`  ❌ Error: ${error.message}`);
      }
      console.log('');
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n💡 Summary: If most sites work, we can scan all 218!');
  console.log('   If blocked, we will use alternative methods.');
}

testFetching().catch(console.error);
