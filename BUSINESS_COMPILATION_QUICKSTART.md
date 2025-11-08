# Business Compilation Quick Start

**Goal:** Compile 5,000-10,000 businesses in Austin 50-mile radius

**Current Status:** 81 businesses in database

---

## ⚡ Fastest Path to 5,000+ Businesses

### Step 1: Get API Keys (15 minutes)

**Google Places API** (RECOMMENDED):
1. Go to https://console.cloud.google.com/
2. Create project → Enable "Places API"
3. Create credentials → API Key
4. Add to `.env`: `GOOGLE_PLACES_API_KEY=your_key`

**Yelp Fusion API** (FREE):
1. Go to https://www.yelp.com/developers/v3/manage_app
2. Create app → Get API key
3. Add to `.env`: `YELP_API_KEY=your_key`

### Step 2: Run Data Collection (1-2 hours)

```bash
# Google Places (gets 3,000-5,000 businesses)
node scripts/google-places-scraper.js

# Yelp API (gets 2,000-3,000 MORE businesses)
node scripts/yelp-api-scraper.js

# Consolidate all sources
node scripts/consolidate-all-businesses.js
```

### Step 3: Export Final Database

Your master database will be at:
- `data/austin-businesses-master.json`
- `data/austin-businesses-master.csv`

**Done!** 5,000-10,000 businesses ready to use.

---

## 💰 Cost Breakdown

| Method | Businesses | Cost | Time |
|--------|-----------|------|------|
| Google Places API | 3,000-5,000 | ~$100 | 2 hours |
| Yelp API | 2,000-3,000 | FREE | 1 hour |
| Manual CSV Import | 500-1,000 | FREE | Variable |
| **TOTAL** | **5,500-9,000** | **~$100** | **3-4 hours** |

---

## 🛠️ Alternative Methods

### If You Don't Want to Pay:

**Option A: Yelp API Only (FREE)**
```bash
node scripts/yelp-api-scraper.js
# Gets 2,000-3,000 businesses for FREE
```

**Option B: Manual CSV Import (FREE)**
1. Download business lists from:
   - City business license databases
   - Published directories
   - Chamber member lists (if available as PDF/CSV)

2. Format as CSV:
```csv
Business Name,Address,City,Zip,Phone,Website,Category,Industry
```

3. Import:
```bash
node scripts/import-businesses-csv.js your-data.csv
node scripts/consolidate-all-businesses.js
```

### If You Have Firecrawl API:

```bash
# Add to .env
FIRECRAWL_API_KEY=your_key

# Run chamber scraper (already built)
node scripts/scrape-chambers.js
```

---

## 📊 Scripts Available

| Script | Purpose | Cost | Status |
|--------|---------|------|--------|
| `google-places-scraper.js` | Google API scraping | ~$100 | ✅ Ready |
| `yelp-api-scraper.js` | Yelp API scraping | FREE | ✅ Ready |
| `import-businesses-csv.js` | Import from CSV | FREE | ✅ Ready |
| `consolidate-all-businesses.js` | Merge all sources | FREE | ✅ Ready |
| `scrape-chambers.js` | Chamber directories | Varies | ⚠️  Needs Firecrawl |
| `scrape-yellow-pages.js` | Yellow Pages | FREE | ❌ Blocked |

---

## 🎯 Expected Results

### After Google Places + Yelp:

```
📈 Total Unique Businesses: 5,500-8,000

🏙️  Coverage:
   Austin: 3,500-5,000
   Cedar Park: 500-800
   Round Rock: 400-600
   Georgetown: 300-500
   Pflugerville: 200-400
   Leander: 150-300
   Other cities: 450-900

🏢 Categories:
   Restaurants: 1,500-2,000
   Healthcare: 800-1,200
   Home Services: 600-900
   Automotive: 400-600
   Retail: 500-800
   Professional Services: 400-600
   Beauty & Personal Care: 300-500
   [... and more]

📊 Data Quality:
   With Phone: 85-95%
   With Address: 100%
   With Zip: 95-100%
   With Rating: 90-95%
   With Website: 60-70%
```

---

## 🚀 Run Everything in One Go

```bash
# 1. Set up environment
cp .env.example .env
# Edit .env with your API keys

# 2. Install dependencies
npm install

# 3. Run data collection
node scripts/google-places-scraper.js
node scripts/yelp-api-scraper.js

# 4. Consolidate
node scripts/consolidate-all-businesses.js

# 5. Check results
cat data/austin-businesses-master.csv | wc -l
```

---

## 📝 CSV Template

Create `my-businesses.csv`:

```csv
Business Name,Address,City,Zip,Phone,Website,Category,Industry
"Franklin Barbecue","900 E 11th St","Austin","78702","(512) 653-1187","https://franklinbbq.com","BBQ","Food & Beverage"
"Tesla Service Center","10701 N Lamar Blvd","Austin","78753","(512) 982-1000","https://tesla.com","Auto Repair","Automotive"
```

Import:
```bash
node scripts/import-businesses-csv.js my-businesses.csv
```

---

## ❓ FAQ

**Q: How much does Google Places cost?**
A: ~$17-32 per 1,000 businesses. For 5,000 businesses: $85-160.

**Q: Is Yelp really free?**
A: Yes! 5,000 API calls per day, FREE. Enough for 2,000-3,000 businesses.

**Q: Can I get all 10,000 businesses for free?**
A: Not easily. Yelp API gives you 2,000-3,000. The rest requires:
- Google Places API ($100+)
- Manual CSV imports (time-intensive)
- Firecrawl API (if you have access)

**Q: What if scraping gets blocked?**
A: Use APIs instead (Google Places, Yelp). They're legal, reliable, and comprehensive.

**Q: How long does it take?**
A: With APIs: 2-4 hours total. Manual CSV: weeks.

---

## 📞 Need Help?

1. **API setup issues:** Check .env file format
2. **Rate limiting:** Add delays between requests
3. **Data quality:** Run consolidation script to deduplicate

---

**Ready to start? Run:**
```bash
node scripts/google-places-scraper.js --test
```

This will do a test run (2 zips × 3 categories) to verify your API key works.

Then run the full version:
```bash
node scripts/google-places-scraper.js
```

🎉 **Good luck!**
