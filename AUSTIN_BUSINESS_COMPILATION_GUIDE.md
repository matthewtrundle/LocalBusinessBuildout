# Austin 50-Mile Radius Business Compilation Guide

## 📊 Current Status

**Goal:** 5,000-10,000 businesses within 50 miles of Austin, TX
**Current:** 81 businesses in master database
**Path to Goal:** Use alternative data acquisition methods below

---

## ⚠️ What Didn't Work (and Why)

### 1. Chamber of Commerce Scraping
**Attempted:** All 12 chamber directories
**Result:** ❌ **403 Forbidden** errors
**Reason:** Modern chambers use anti-bot protection (Cloudflare, reCAPTCHA, etc.)

### 2. Yellow Pages Scraping
**Attempted:** YP.com directory searches
**Result:** ❌ **403 Forbidden** errors
**Reason:** Yellow Pages blocks automated requests

### 3. Web scraping (Axios + Cheerio, Puppeteer, WebFetch)
**Result:** All blocked by anti-scraping measures

---

## ✅ What DOES Work

### Current Working Infrastructure

```
✓ Manual curated database (81 businesses)
✓ CSV import tool (scripts/import-businesses-csv.js)
✓ Consolidation script (scripts/consolidate-all-businesses.js)
✓ Data deduplication
✓ Multi-source merging
```

---

## 🚀 How to Reach 5,000-10,000 Businesses

### **Option 1: Use Google Places API** (RECOMMENDED)

Google Places API provides comprehensive business data legally and reliably.

#### Setup:
1. Get API key from Google Cloud Console
2. Enable Places API
3. Use the script provided: `scripts/google-places-scraper.js` (create this)

#### Cost:
- ~$17 per 1,000 businesses (Text Search)
- ~$32 per 1,000 businesses (Nearby Search with details)
- For 10,000 businesses: ~$170-320

#### Coverage:
- ✅ Extremely comprehensive
- ✅ Includes phone, website, hours, ratings
- ✅ Validated business data
- ✅ Legal and ToS-compliant

**Script to create:**
```javascript
// Use Google Places Text Search API
// Search by category + zip code combinations
// Extract: name, address, phone, website, rating, reviews
```

---

### **Option 2: Yelp Fusion API**

Yelp provides business data through their official API.

#### Setup:
1. Sign up at https://www.yelp.com/developers
2. Get API key
3. Use Yelp Fusion API endpoints

#### Cost:
- **FREE** up to 5,000 API calls/day
- Plenty for this project

#### Coverage:
- ✅ Great for restaurants, services, retail
- ✅ Includes reviews and ratings
- ✅ Free tier sufficient

**API Endpoints:**
- `/v3/businesses/search` - Search by location and category
- `/v3/businesses/{id}` - Get details

---

### **Option 3: Manual CSV Import** (Time-intensive but 100% accurate)

Use the CSV import tool to add businesses manually.

#### Process:
1. Create CSV with format:
```csv
Business Name,Address,City,Zip,Phone,Website,Category,Industry
"Franklin BBQ","900 E 11th St","Austin","78702","(512) 653-1187","https://franklinbbq.com","BBQ","Restaurant"
```

2. Import:
```bash
node scripts/import-businesses-csv.js data/my-businesses.csv
```

3. Consolidate:
```bash
node scripts/consolidate-all-businesses.js
```

#### Sources for Manual Data:
- City business license databases (publicly available)
- Local business associations member lists
- Published directories in PDF format
- Community resources
- Local news business listings

---

### **Option 4: Firecrawl API** (If You Have Access)

You mentioned Firecrawl in "bizness environment". If you have an API key:

1. Add to `.env`:
```
FIRECRAWL_API_KEY=your_key_here
```

2. Use existing script:
```bash
node scripts/scrape-chambers.js
```

Firecrawl can bypass anti-bot measures on chamber sites.

---

### **Option 5: Hybrid Approach** (BEST VALUE)

Combine multiple methods:

1. **Google Places API** for 3,000 businesses (~$100)
2. **Yelp API** for 2,000 additional (FREE)
3. **Manual CSV import** for specialty/niche businesses (500)
4. **Total:** 5,500 businesses for ~$100

---

## 📋 Recommended Action Plan

### Phase 1: Google Places API (Immediate - 1-2 days)
```bash
# 1. Get Google API key
# 2. Create google-places-scraper.js
# 3. Run searches for all zip codes × categories
# 4. Expected: 3,000-5,000 businesses
```

### Phase 2: Yelp API (Next 1 day)
```bash
# 1. Get Yelp API key
# 2. Create yelp-api-scraper.js
# 3. Search categories not well-covered by Google
# 4. Expected: +2,000-3,000 businesses
```

### Phase 3: Fill Gaps (Final 1 day)
```bash
# 1. Identify underrepresented categories/cities
# 2. Manual research and CSV import
# 3. Expected: +500-1,000 businesses
```

### Phase 4: Consolidate & Validate
```bash
node scripts/consolidate-all-businesses.js
# Final database: 5,000-10,000 unique businesses
```

---

## 🛠️ Tools Available

| Script | Purpose | Status |
|--------|---------|--------|
| `scrape-chambers.js` | Chamber scraping (blocked) | ❌ |
| `scrape-yellow-pages.js` | YP scraping (blocked) | ❌ |
| `import-businesses-csv.js` | Import from CSV | ✅ |
| `consolidate-all-businesses.js` | Merge all sources | ✅ |
| `google-places-scraper.js` | Google API (to create) | 📝 |
| `yelp-api-scraper.js` | Yelp API (to create) | 📝 |

---

## 📂 Current Database

**Location:** `data/austin-businesses-master.json` and `.csv`

**Breakdown:**
- Austin: 52 businesses
- Cedar Park: 20 businesses
- Round Rock: 3 businesses
- Georgetown: 3 businesses
- Other cities: 3 businesses

**Categories:** Restaurants, Coffee Shops, Salons, Breweries, Services, Healthcare, Retail

**Data Quality:**
- 81% have phone numbers
- 100% have addresses
- 81% have ZIP codes
- 0% have websites (need to add URLs)

---

## 💡 Next Steps

1. **Choose your acquisition method** (Google API recommended)
2. **Get API keys** if using APIs
3. **Run acquisition scripts** to gather businesses
4. **Consolidate** with existing 81 businesses
5. **Validate** data quality
6. **Export** final CSV for your use

---

## 🔗 Resources

- **Google Places API:** https://developers.google.com/maps/documentation/places/web-service
- **Yelp Fusion API:** https://www.yelp.com/developers/documentation/v3
- **Austin Open Data:** https://data.austintexas.gov
- **Firecrawl:** https://firecrawl.dev

---

## 📞 Support

If you need help:
1. Creating API scripts (Google/Yelp)
2. Obtaining API keys
3. Processing specific data formats
4. Validating business information

Just ask!

---

**Created:** November 8, 2025
**Last Updated:** November 8, 2025
**Current Progress:** 81 / 5,000+ businesses (1.6%)
