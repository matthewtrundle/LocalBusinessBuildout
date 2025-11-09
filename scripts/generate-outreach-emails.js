#!/usr/bin/env node

/**
 * Email Outreach Template Generator
 * Creates personalized, tailored emails for each business with their redesign
 */

import { austinBusinessDatabase } from '../config/austin-businesses-database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All 68 actual businesses we've built redesigns for (excluding 10 showcase demos)
const builtBusinesses = [
  // Original businesses (already have emails for some)
  '1431-cafe',
  'bex-co-salon',
  'black-sugar-caffe',
  'cedar-park-barbershop',
  'derrick-s-barbershop',
  'gambuzza-s-barbershop',
  'jester-king-brewery',
  'la-dosis-coffee-cocktails',
  'oddwood-brewing',
  'pinthouse',
  'red-horn-coffee-house',
  'the-austin-beer-garden-brewing-company',
  'tony-c-s-beer-garden',

  // Batch 1: Tier-1 Iconic Austin Businesses
  'franklin-barbecue',
  'torchys-tacos',
  'uchi',
  'jos-coffee',
  'mozarts-coffee',
  'home-slice-pizza',
  'terry-blacks-barbecue',
  'kerbey-lane-cafe',
  'houndstooth-coffee',
  'salt-lick-bbq',

  // Batch 2: Premium Tier-2
  'odd-duck',
  'loro',
  'uchiko',
  'matts-el-rancho',
  'live-oak-brewing',
  'hops-and-grain',
  'craft-pride',
  'waterloo-records',
  'barton-springs-pool',
  'mount-bonnell',

  // Batch 3: Tier-2/3 Mix
  'kerbey-lane-north',
  'epoch-coffee',
  'summermoon-coffee',
  'alamo-drafthouse',
  'ramen-tatsuya',
  'veracruz-all-natural',
  'chuy-s',
  'juan-in-a-million',
  'gueros-taco-bar',
  'kontiki-beach-club',

  // Batches 4-5: Final Businesses
  'trudy-s-texas-star',
  'el-arroyo',
  'la-barbecue',
  'micklethwait-craft-meats',
  'texas-chili-parlor',
  'hopdoddy-burger-bar',
  'the-tavern',
  'easy-tiger',
  'p-terrys',
  'thunder-cloud-subs',
  'pool-burger',
  'the-beer-plant',
  'star-bar',
  'high-brew-coffee',
  'whip-in',
  'via-313',
  'sno-beach',
  'halcyon-coffee',
  'house-wine',
];

// Helper: Convert business name to slug
function nameToSlug(name) {
  return name.toLowerCase()
    .replace(/'/g, '')
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

// Helper: Get personalized opening based on business type
function getOpening(category) {
  const openings = {
    'Barbershop': "I was impressed by the quality of service and craftsmanship at your barbershop",
    'Hair Salon': "Your salon's reputation for excellence in Cedar Park caught my attention",
    'Salon & Spa': "I've heard wonderful things about the spa experience you provide",
    'Coffee Shop': "As a coffee enthusiast, I've been following your cafe",
    'Brewery': "I'm a fan of your craft brewing operation",
    'Brewery & Pizza': "Your unique combination of craft beer and pizza has made you a local favorite",
    'American': "Your restaurant has become a staple in the Cedar Park dining scene",
    'BBQ': "Your BBQ has built quite a reputation",
    'Beer Garden': "Your beer garden has created such a great community space",
  };
  return openings[category] || `I recently discovered your business`;
}

// Helper: Get pain points based on industry
function getPainPoints(industry, category) {
  const painPoints = {
    salon: [
      "attracting new clients who are actively searching online",
      "showcasing your services and pricing in a modern, professional way",
      "competing with larger chains that have bigger marketing budgets"
    ],
    cafe: [
      "standing out in Austin's competitive coffee scene",
      "converting website visitors into in-person customers",
      "showcasing your unique atmosphere and specialty drinks online"
    ],
    brewery: [
      "competing for visibility in the booming Austin craft beer market",
      "engaging beer enthusiasts and bringing them to your taproom",
      "showcasing your unique brews and atmosphere online"
    ],
    restaurant: [
      "attracting diners in an increasingly competitive market",
      "showcasing your menu and atmosphere in a way that drives reservations",
      "building an online presence that matches your in-person experience"
    ]
  };
  return painPoints[industry] || painPoints.restaurant;
}

// Helper: Get value props based on industry
function getValueProps(industry) {
  const props = {
    salon: [
      "Online booking integration to reduce phone calls and fill appointment gaps",
      "Before/after gallery to showcase your stylists' work",
      "Mobile-first design since 80% of salon searches happen on phones",
      "Service menu with clear pricing to pre-qualify clients"
    ],
    cafe: [
      "Instagram-worthy design that encourages social sharing",
      "Menu showcase with beautiful photography",
      "Location map and hours prominently featured",
      "Mobile ordering integration potential"
    ],
    brewery: [
      "Taproom menu and event calendar front and center",
      "Beer finder/availability tracker",
      "Storytelling about your brewing process and philosophy",
      "Email signup for new release notifications"
    ],
    restaurant: [
      "Menu showcase that makes mouths water",
      "Easy reservation system integration",
      "Event hosting and private dining information",
      "Mobile-optimized for on-the-go diners"
    ]
  };
  return props[industry] || props.restaurant;
}

// Generate email template for a business
function generateEmail(business, redesignUrl) {
  const opening = getOpening(business.category);
  const painPoints = getPainPoints(business.industry, business.category);
  const valueProps = getValueProps(business.industry);

  return `
Subject: Quick Question About ${business.name}'s Online Presence

Hi ${business.name.split(' ')[0]} team,

${opening}, and I wanted to reach out with something I think you'll find interesting.

I'm a web designer based in Austin, and I specialize in helping local ${business.category.toLowerCase()} businesses like yours compete more effectively online.

**I actually took the liberty of creating a modern redesign concept for ${business.name}** to show you what's possible. You can view it here:

🔗 **${redesignUrl}**

*(No obligation - I just wanted to show rather than tell)*

**Why I reached out:**

Many ${business.category.toLowerCase()} businesses I talk to struggle with:
• ${painPoints[0]}
• ${painPoints[1]}
• ${painPoints[2]}

The redesign concept I created for you focuses on solving these exact challenges with:

✓ ${valueProps[0]}
✓ ${valueProps[1]}
✓ ${valueProps[2]}
✓ ${valueProps[3]}

**Here's what makes this different:**

Unlike template-based sites, this is 100% custom code built specifically for ${business.name}. I used:
• Next.js 14 (cutting-edge React framework)
• Advanced animations and effects
• Mobile-first responsive design
• Performance optimization for fast load times

**No pressure, but...**

If you like what you see, I'd love to chat about:
1. Your current website challenges
2. What features would make the biggest impact for your business
3. How we could refine this concept to perfectly match your vision

I'm offering **special pricing for Cedar Park/Austin businesses** this month - typically $5,000+ projects starting at $2,500 for local businesses I believe in.

Would you have 15 minutes this week for a quick call? I promise to respect your time.

Best regards,

---

**P.S.** - Even if you're not interested in a new website right now, I'd love your feedback on the redesign. What do you like? What would you change? Your insights help me create better work for local businesses.

**P.P.S.** - I'm also happy to share some quick wins you could implement on your current site to improve conversions - completely free, no strings attached.

---

📱 **Quick Stats:**
• 75% of users judge a company's credibility based on website design
• Mobile searches for "${business.category.toLowerCase()} near me" have grown 200% in 3 years
• Businesses with modern websites see 40% higher customer engagement

**View Your Redesign:** ${redesignUrl}
`.trim();
}

// Generate all emails
function generateAllEmails() {
  const emails = {};
  const baseUrl = 'https://your-deployment-url.vercel.app'; // Update this

  builtBusinesses.forEach(slug => {
    // Find business in database
    const business = austinBusinessDatabase.find(b => nameToSlug(b.name) === slug);

    if (business) {
      const redesignUrl = `${baseUrl}/${slug}`;
      emails[slug] = {
        business: business,
        subject: `Quick Question About ${business.name}'s Online Presence`,
        email: generateEmail(business, redesignUrl),
        to: business.email || 'NEED_EMAIL',
        phone: business.phone,
      };
    }
  });

  return emails;
}

// Main execution
function main() {
  console.log('🎯 Generating personalized outreach emails...\n');

  const emails = generateAllEmails();
  const outputDir = path.join(__dirname, '..', 'outreach-emails');

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save each email to a file
  Object.keys(emails).forEach(slug => {
    const data = emails[slug];
    const filename = path.join(outputDir, `${slug}.txt`);

    const content = `
================================================================================
TO: ${data.business.name}
PHONE: ${data.phone}
EMAIL: ${data.to}
CATEGORY: ${data.business.category}
CITY: ${data.business.city}
================================================================================

${data.email}

================================================================================
FOLLOW-UP SEQUENCE (if no response after 1 week):
================================================================================

**Follow-up #1 (3 days later):**

Subject: Re: ${data.business.name} Redesign Concept

Hi again,

Just wanted to make sure my previous email didn't get lost in your inbox!

I created a custom redesign concept for ${data.business.name} and I'm genuinely curious what you think:
${data.business.url ? data.business.url.replace('https://', 'https://your-deployment.vercel.app/') : 'URL_HERE'}

Even if you're not interested in updating your website right now, I'd love 30 seconds of feedback.

What do you like? What would you change?

Thanks!

---

**Follow-up #2 (1 week later):**

Subject: Last call - ${data.business.name} redesign

Hi,

I know you're busy running ${data.business.name}, so I'll keep this super brief.

I spent time creating a modern redesign concept for you because:
1. I genuinely admire what you've built
2. I think a website refresh could drive real business results
3. I wanted to show (not tell) what's possible

This is my last email - I don't want to be a pest!

But if you're even 1% curious, take 60 seconds to check it out:
[REDESIGN URL]

Either way, best of luck with the business. You're doing great work in ${data.business.city}.

Cheers!
    `.trim();

    fs.writeFileSync(filename, content);
    console.log(`✓ Generated: ${slug}.txt`);
  });

  // Generate master summary
  const summaryPath = path.join(outputDir, '_SUMMARY.md');
  const summary = `
# Outreach Email Campaign Summary

## Overview
- **Total Businesses**: ${Object.keys(emails).length}
- **Campaign Focus**: Cedar Park & Austin local businesses
- **Approach**: Custom redesign as proof of value

## Business Breakdown

${Object.keys(emails).map(slug => {
  const data = emails[slug];
  return `### ${data.business.name}
- **Category**: ${data.business.category}
- **City**: ${data.business.city}
- **Phone**: ${data.phone}
- **Email**: ${data.to}
- **File**: \`${slug}.txt\`
`;
}).join('\n')}

## Outreach Strategy

### Phase 1: Initial Contact (Week 1)
- Send personalized email with redesign link
- Emphasize "show don't tell" approach
- No pressure, just value demonstration

### Phase 2: Follow-up (Week 2)
- If no response after 3 days, send brief follow-up
- Ask for feedback on redesign
- Keep it super short

### Phase 3: Final Touch (Week 3)
- If still no response, send final email
- Express genuine admiration
- Make it clear this is the last contact
- Leave door open

### Key Messaging Points

1. **Lead with Value**: Show the redesign first, sell second
2. **Local Focus**: Emphasize Cedar Park/Austin connection
3. **No Pressure**: Make it clear there's no obligation
4. **Social Proof**: Mention specific challenges we solve
5. **Limited Offer**: Special local business pricing

### Success Metrics

- **Response Rate Target**: 20-30%
- **Meeting Booking Target**: 10-15%
- **Project Close Rate Target**: 5-10%

### Email Best Practices

✓ Send Tuesday-Thursday between 10am-2pm
✓ Use business owner's name if available
✓ Keep subject lines under 50 characters
✓ Mobile-optimize (60% will read on phone)
✓ Include clear call-to-action
✓ Follow up 2-3 times max

### Next Steps

1. Review each email template
2. Customize any business-specific details
3. Update deployment URL once site is live
4. Add any missing email addresses
5. Set up email tracking (optional)
6. Begin outreach campaign
7. Log responses in CRM

## Notes

- All emails emphasize the FREE redesign concept we've already created
- Each template is customized based on business category
- Follow-up sequence included for non-responders
- Pricing mentioned: $2,500 (vs typical $5,000+) for locals
  `.trim();

  fs.writeFileSync(summaryPath, summary);
  console.log(`\n✓ Generated summary: _SUMMARY.md`);
  console.log(`\n✅ All emails generated in: ${outputDir}\n`);
}

// Run it
main();
