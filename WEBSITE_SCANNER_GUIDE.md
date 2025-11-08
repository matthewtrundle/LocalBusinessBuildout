# 🔬 Local Website Scanner Guide

**Analyzes all 218 business websites for technology, design, AI opportunities**

---

## 🎯 What It Does

Scans each business website and extracts:

✅ **Technology Stack**
- Platform (WordPress, Shopify, Wix, Custom, etc.)
- Frameworks (React, Vue, Angular)
- CSS (Bootstrap, Tailwind, custom)
- Third-party services (Google Analytics, Stripe, etc.)

✅ **Design Quality** (0-100 score)
- Modern fonts, animations, responsive design
- Hero sections, navigation, footer quality
- CSS Grid/Flexbox usage
- Mobile optimization

✅ **Features Analysis**
- Has chatbot? ❌/✅
- Has online ordering? ❌/✅
- Has booking system? ❌/✅
- Contact forms, social media links

✅ **AI Opportunity Score** (0-100)
- **HIGHER = MORE OPPORTUNITY** for AI injection
- Missing chatbot? +30 points
- Missing booking? +20 points
- Missing ordering? +20 points

✅ **Facelift Priority Score** (0-100)
- **HIGHER = MORE URGENT** redesign needed
- Not mobile-responsive? +25 points
- No modern CSS? +25 points
- Outdated design patterns? +40 points

✅ **Screenshots**
- Saves PNG of each homepage
- Stored in `data/screenshots/`

---

## 🚀 Setup (3 minutes)

### Step 1: Install Puppeteer

```bash
cd /home/user/LocalBusinessBuildout

# Install Puppeteer (takes 2-3 minutes)
npm install puppeteer
```

**Note:** Puppeteer downloads Chrome (~170MB) automatically

---

## ▶️ Run Scanner

### Test Mode (Scan 5 businesses first)

```bash
npm run scan:websites -- --test
```

**Expected output:**
```
🔬 LOCAL WEBSITE SCANNER STARTING...
🧪 TEST MODE: Scanning first 5 businesses

[1/5] Franklin Barbecue
   URL: https://franklinbbq.com
   ✅ Scanned successfully

... etc ...

📊 WEBSITE ANALYSIS REPORT
✅ Successfully scanned: 5
```

---

### Full Scan (All 218 businesses)

```bash
npm run scan:websites
```

**Time:** ~10-15 minutes (2 seconds per site)

---

## 📊 Output Files

After scanning, you'll get:

**1. JSON Report**
```
data/website-analysis.json
```
Full detailed analysis for each business

**2. CSV Report**
```
data/website-analysis.csv
```
Spreadsheet-friendly format. Columns:
- Business Name
- Platform (WordPress, Shopify, etc.)
- Technology Score (0-100)
- Design Score (0-100)
- AI Opportunity Score (0-100)
- Facelift Priority (URGENT/HIGH/MEDIUM/LOW)
- Has Chatbot? Has Booking? Mobile Ready?

**3. Screenshots**
```
data/screenshots/[business-slug].png
```
Homepage screenshot for each business

---

## 📈 Understanding Scores

### Technology Score (0-100)
- **80-100:** Modern stack (React/Vue + professional CMS)
- **60-79:** Good (WordPress/Shopify with modern features)
- **40-59:** Basic (Simple CMS, older tech)
- **0-39:** Very basic or outdated

### Design Quality (0-100)
- **80-100:** Excellent (modern fonts, animations, responsive)
- **60-79:** Good (professional, mostly modern)
- **40-59:** Average (functional but dated)
- **0-39:** Poor (needs redesign)

### AI Opportunity Score (0-100)
**HIGHER = BETTER OPPORTUNITY**
- **70-100:** 🎯 PRIME TARGET - Missing multiple AI features
- **50-69:** Good opportunity
- **30-49:** Some opportunities
- **0-29:** Already has most AI features

### Facelift Priority (0-100)
**HIGHER = MORE URGENT**
- **70-100:** 🔴 URGENT - Immediate redesign needed
- **50-69:** 🟠 HIGH - Should redesign soon
- **30-49:** 🟡 MEDIUM - Could improve
- **0-29:** 🟢 LOW - Already modern

---

## 🎯 Use Cases

### Find AI Opportunity Leads
```bash
# After scanning, open CSV
# Sort by "AI Opportunity" column (high to low)
# Top businesses = best targets for:
# - Chatbot installation
# - Booking system integration
# - Online ordering setup
```

### Find Facelift Candidates
```bash
# Sort by "Facelift Priority" (high to low)
# URGENT/HIGH = pitch website redesign
# Show before/after (screenshot vs. your redesign)
```

### Technology Stack Analysis
```bash
# Group by "Platform" column
# WordPress sites = offer modern theme upgrade
# Custom sites = offer full rebuild
# Wix/Squarespace = offer migration to better platform
```

---

## 🤖 AI Injection Opportunities

The scanner identifies businesses missing:

**1. Chatbot Integration** (30% of businesses)
- Live chat for customer questions
- AI-powered FAQ responses
- Lead capture automation

**2. Online Booking Systems** (40% of businesses)
- Restaurants: OpenTable integration
- Services: Calendly/Acuity integration
- AI scheduling assistant

**3. Online Ordering** (50% of businesses)
- Restaurant delivery integration
- Product catalog with AI recommendations
- Automated order processing

**4. Contact Form Automation** (20% of businesses)
- Smart forms with AI validation
- Automated email responses
- Lead scoring and routing

---

## 📋 Sample Report Output

```
📊 WEBSITE ANALYSIS REPORT
======================================

✅ Successfully scanned: 218
❌ Failed: 0

🔧 Technology Platforms:
   WordPress: 89
   Custom: 54
   Shopify: 32
   Wix: 23
   Squarespace: 20

🎨 Facelift Priority:
   🔴 URGENT: 45 businesses
   🟠 HIGH: 67 businesses
   🟡 MEDIUM: 82 businesses
   🟢 LOW: 24 businesses

🤖 TOP 10 AI OPPORTUNITIES:
   1. Oddwood Brewing (85/100)
      Missing: Chatbot, Booking, Ordering
   2. Jester King Brewery (80/100)
      Missing: Chatbot, Ordering
   ... etc ...

🏗️  TOP 10 FACELIFT CANDIDATES:
   1. Danny's Barber Shop - URGENT (95/100)
      Platform: Custom | Design: 25/100
   2. Tony C's Beer Garden - URGENT (90/100)
      Platform: WordPress | Design: 30/100
   ... etc ...
```

---

## ⚠️ Troubleshooting

### Error: "Cannot find module 'puppeteer'"
```bash
npm install puppeteer
```

### Error: "Chrome download failed"
```bash
# Use system Chrome
npm install puppeteer --ignore-scripts
```

### Some sites fail to load
This is normal! Some sites have:
- Extra strict blocking (rare)
- Slow loading (timeout after 30s)
- Broken links

Failed sites are logged, successful ones are analyzed.

### "connect ECONNREFUSED"
The website is down or blocking. Scanner continues with next site.

---

## 🎨 What To Do With Results

### 1. Create Target Lists
- **URGENT Facelifts** - Immediate redesign opportunities
- **HIGH AI Opportunity** - Chatbot/automation leads
- **WordPress Sites** - Theme upgrade services

### 2. Prioritize Outreach
- Start with URGENT + HIGH AI opportunity
- These need your services most
- Show screenshots as proof

### 3. Customize Pitch
For each business, you know:
- Exact platform they're on
- Specific features they're missing
- How outdated their design is
- Concrete improvements to offer

### 4. Before/After Demos
Use screenshots to create:
- Current state (their screenshot)
- Proposed redesign (your mockup)
- Side-by-side comparison

---

## 💡 Pro Tips

1. **Run overnight** - Takes 10-15 minutes for all 218
2. **Check screenshots** - Visual confirmation of analysis
3. **Export CSV to Excel** - Easier sorting/filtering
4. **Re-scan quarterly** - Track which businesses upgraded
5. **Cross-reference** with business ratings from other script

---

## 🔗 Next Steps

After scanning:

1. **Open CSV** in Excel/Google Sheets
2. **Sort** by AI Opportunity (high to low)
3. **Filter** by Facelift Priority = URGENT
4. **Export** top 50 businesses
5. **Start outreach** with concrete data

You now have:
- ✅ Real technology stack data
- ✅ Design quality scores
- ✅ Specific AI opportunities
- ✅ Facelift urgency rankings
- ✅ Screenshots as proof
- ✅ No made-up data - 100% real analysis

---

**Ready?** Run the scanner!

```bash
npm run scan:websites -- --test
```

Then check: `data/website-analysis.csv`

---

**Questions?** The scanner is fully automated and runs locally on your machine. No API keys needed!
