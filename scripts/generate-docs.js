#!/usr/bin/env node

/**
 * Generate Obsidian-ready markdown documentation for all crawled businesses
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const parsedDir = path.join(__dirname, '..', 'data', 'parsed');
const docsDir = path.join(__dirname, '..', 'docs');
const businessesDir = path.join(docsDir, 'businesses');

// Create docs directories
await fs.mkdir(docsDir, { recursive: true });
await fs.mkdir(businessesDir, { recursive: true });

// Read all parsed JSON files
const files = await fs.readdir(parsedDir);
const jsonFiles = files.filter(f => f.endsWith('.json'));

console.log(`\n📚 Generating documentation for ${jsonFiles.length} businesses...\n`);

const allBusinesses = [];

// Process each business
for (const file of jsonFiles) {
  const filePath = path.join(parsedDir, file);
  const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

  // Skip businesses without quality scores (old crawls)
  if (!data.quality_score || !data.quality_score.total) {
    console.log(`⏭️  Skipping ${file} (no quality score)`);
    continue;
  }

  allBusinesses.push(data);

  // Generate individual business page
  const markdown = `# ${data.business_name}

## Overview

- **Website:** [${data.url}](${data.url})
- **Industry:** ${data.industry}
- **City:** ${data.city}
- **Address:** ${data.address}
- **Crawled:** ${new Date(data.parsed_at).toLocaleDateString()}

## Quality Score

### Overall: ${data.quality_score.total}/10

**Verdict:** ${data.quality_score.verdict}

**Target for Redesign:** ${data.quality_score.target_for_redesign ? '✅ YES' : '❌ NO'}

### Score Breakdown

| Category | Score | Details |
|----------|-------|---------|
| **Design** | ${data.quality_score.breakdown.design}/10 | Visual design, layout, aesthetics |
| **Technical** | ${data.quality_score.breakdown.technical}/10 | Mobile responsiveness, semantic HTML, performance |
| **Content** | ${data.quality_score.breakdown.content}/10 | Images, contact info, navigation |
| **Modern** | ${data.quality_score.breakdown.modern}/10 | Modern frameworks vs outdated patterns |

## Contact Information

- **Email:** ${data.contact.email || 'Not found'}
- **Phone:** ${data.contact.phone || 'Not found'}
- **Social Media:** ${data.contact.social_media.length > 0 ? data.contact.social_media.map(s => `${s.platform}: ${s.url}`).join(', ') : 'None found'}

## Content Summary

### Headline
${data.content.hero_headline}

### Subtext
${data.content.hero_subtext || 'No subtext found'}

### About
${data.content.about_text || 'No about text found'}

## Navigation

${data.navigation.nav_items.length > 0 ? data.navigation.nav_items.map(item => `- [${item.text}](${item.href})`).join('\n') : 'No navigation items found'}

## Technical Details

- **Mobile Viewport:** ${data.technical.has_mobile_viewport ? '✅ Yes' : '❌ No'}
- **Structured Data:** ${data.technical.has_structured_data ? '✅ Yes' : '❌ No'}
- **HTML Content Size:** ${(data.html_content_length / 1024).toFixed(2)} KB

## Assets

- **Logo:** ${data.assets.logo_url || 'Not found'}
- **Hero Image:** ${data.assets.hero_image || 'Not found'}
- **Total Images:** ${data.assets.images.length}

## Raw Data Location

- **HTML:** \`data/raw_sites/${data.slug}.html\`
- **JSON:** \`data/parsed/${data.slug}.json\`

---

*Generated on ${new Date().toLocaleString()}*
`;

  const businessDocPath = path.join(businessesDir, `${data.slug}.md`);
  await fs.writeFile(businessDocPath, markdown, 'utf-8');
  console.log(`✅ Created: businesses/${data.slug}.md`);
}

// Sort businesses by score
allBusinesses.sort((a, b) => a.quality_score.total - b.quality_score.total);

// Generate master index
const indexMarkdown = `# Austin Business Crawler - Master Index

**Total Businesses Crawled:** ${allBusinesses.length}

**Last Updated:** ${new Date().toLocaleString()}

---

## Score Distribution

| Score Range | Count | Businesses |
|-------------|-------|------------|
| 🎯 **1-5 (Prime Targets)** | ${allBusinesses.filter(b => b.quality_score.total <= 5).length} | ${allBusinesses.filter(b => b.quality_score.total <= 5).map(b => b.business_name).join(', ') || 'None'} |
| ⚠️ **6-7 (Potentials)** | ${allBusinesses.filter(b => b.quality_score.total >= 6 && b.quality_score.total <= 7).length} | ${allBusinesses.filter(b => b.quality_score.total >= 6 && b.quality_score.total <= 7).map(b => b.business_name).join(', ') || 'None'} |
| ✅ **8-10 (Good Sites)** | ${allBusinesses.filter(b => b.quality_score.total >= 8).length} | ${allBusinesses.filter(b => b.quality_score.total >= 8).map(b => b.business_name).join(', ') || 'None'} |

---

## All Businesses (Sorted by Score)

${allBusinesses.map(business => {
  const scoreEmoji = business.quality_score.total <= 5 ? '🎯' :
                     business.quality_score.total <= 7 ? '⚠️' : '✅';
  const scoreColor = business.quality_score.total <= 5 ? '🔴' :
                     business.quality_score.total <= 7 ? '🟡' : '🟢';

  return `### ${scoreEmoji} [${business.business_name}](businesses/${business.slug}.md)

**Score:** ${scoreColor} **${business.quality_score.total}/10** - ${business.quality_score.verdict}

- **Website:** [${business.url}](${business.url})
- **Industry:** ${business.industry}
- **City:** ${business.city}
- **Phone:** ${business.contact.phone || 'N/A'}
- **Email:** ${business.contact.email || 'N/A'}

**Score Breakdown:**
- Design: ${business.quality_score.breakdown.design}/10
- Technical: ${business.quality_score.breakdown.technical}/10
- Content: ${business.quality_score.breakdown.content}/10
- Modern: ${business.quality_score.breakdown.modern}/10

---
`;
}).join('\n')}

## Statistics

### By Industry

${Object.entries(
  allBusinesses.reduce((acc, b) => {
    acc[b.industry] = (acc[b.industry] || 0) + 1;
    return acc;
  }, {})
).sort((a, b) => b[1] - a[1]).map(([industry, count]) =>
  `- **${industry}:** ${count} businesses`
).join('\n')}

### By City

${Object.entries(
  allBusinesses.reduce((acc, b) => {
    acc[b.city] = (acc[b.city] || 0) + 1;
    return acc;
  }, {})
).sort((a, b) => b[1] - a[1]).map(([city, count]) =>
  `- **${city}:** ${count} businesses`
).join('\n')}

### Average Scores

- **Overall Average:** ${(allBusinesses.reduce((sum, b) => sum + b.quality_score.total, 0) / allBusinesses.length).toFixed(2)}/10
- **Design Average:** ${(allBusinesses.reduce((sum, b) => sum + b.quality_score.breakdown.design, 0) / allBusinesses.length).toFixed(2)}/10
- **Technical Average:** ${(allBusinesses.reduce((sum, b) => sum + b.quality_score.breakdown.technical, 0) / allBusinesses.length).toFixed(2)}/10
- **Content Average:** ${(allBusinesses.reduce((sum, b) => sum + b.quality_score.breakdown.content, 0) / allBusinesses.length).toFixed(2)}/10
- **Modern Average:** ${(allBusinesses.reduce((sum, b) => sum + b.quality_score.breakdown.modern, 0) / allBusinesses.length).toFixed(2)}/10

---

*Generated on ${new Date().toLocaleString()}*
`;

await fs.writeFile(path.join(docsDir, 'index.md'), indexMarkdown, 'utf-8');
console.log(`\n✅ Created master index: docs/index.md`);

// Generate potential targets list
const potentials = allBusinesses.filter(b => b.quality_score.total >= 6 && b.quality_score.total <= 7);

if (potentials.length > 0) {
  const potentialsMarkdown = `# Potential Redesign Targets (Score 6-7/10)

**Total Potentials:** ${potentials.length}

These businesses have websites that could benefit from a redesign but aren't terrible.

---

${potentials.map(business => `## [${business.business_name}](businesses/${business.slug}.md)

**Score:** ${business.quality_score.total}/10 - ${business.quality_score.verdict}

- **Website:** [${business.url}](${business.url})
- **Industry:** ${business.industry}
- **City:** ${business.city}
- **Phone:** ${business.contact.phone || 'N/A'}
- **Email:** ${business.contact.email || 'N/A'}

**Why it's a potential target:**

${business.quality_score.breakdown.design < 6 ? `- ⚠️ **Design Score:** ${business.quality_score.breakdown.design}/10 - Could use better visual design\n` : ''}${business.quality_score.breakdown.technical < 8 ? `- ⚠️ **Technical Score:** ${business.quality_score.breakdown.technical}/10 - Technical improvements needed\n` : ''}${business.quality_score.breakdown.modern < 6 ? `- ⚠️ **Modern Score:** ${business.quality_score.breakdown.modern}/10 - Using outdated patterns\n` : ''}
---

`).join('\n')}

*Generated on ${new Date().toLocaleString()}*
`;

  await fs.writeFile(path.join(docsDir, 'potential-targets.md'), potentialsMarkdown, 'utf-8');
  console.log(`✅ Created potentials list: docs/potential-targets.md`);
}

console.log(`\n✅ Documentation generation complete!`);
console.log(`\n📂 Files created in: docs/`);
console.log(`   - index.md (master index)`);
console.log(`   - potential-targets.md (6-7/10 scores)`);
console.log(`   - businesses/ (${allBusinesses.length} individual business pages)`);
console.log(`\n💡 These files are ready to import into Obsidian!`);
