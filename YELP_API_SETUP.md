# 🟡 Yelp API Setup Guide (FREE)

Get **2,000-3,000 MORE Austin businesses for FREE!**

---

## Step 1: Get Your FREE Yelp API Key (5 minutes)

### 1. Go to Yelp Developers Portal
**URL:** https://www.yelp.com/developers/v3/manage_app

### 2. Sign In or Sign Up
- Click **"Log In"** (top right)
- Or **"Sign Up"** if you don't have an account
- Use email or Google/Facebook to sign in

### 3. Create New App
- Click **"Create New App"** button
- Fill out the form:

```
App Name: Austin Business Scraper
Company: [Your name or company]
Industry: Technology
Website: https://github.com/[your-username]
  (or any website - can use github.com)
Description: Collecting business data for Austin, Texas area
```

- ✅ **Check** "I have read and agree to Yelp Fusion API Terms of Use"
- Click **"Create New App"**

### 4. Copy Your API Key
- You'll see your **Client ID** and **API Key**
- Copy the **API Key** (long string like: `abc123xyz...`)
- **IMPORTANT:** Save this somewhere - you'll need it in the next step

---

## Step 2: Add API Key to .env File

### Option A: Using Terminal

```bash
cd /home/user/LocalBusinessBuildout

# Edit .env file
echo "YELP_API_KEY=YOUR_KEY_HERE" >> .env
```

Replace `YOUR_KEY_HERE` with your actual API key.

### Option B: Manual Edit

1. Open `/home/user/LocalBusinessBuildout/.env` in text editor
2. Find the line:
   ```
   YELP_API_KEY=your_yelp_api_key_here
   ```
3. Replace `your_yelp_api_key_here` with your actual key
4. Save the file

**Example:**
```bash
YELP_API_KEY=abc123_your_actual_key_here_xyz789
```

---

## Step 3: Test Your Setup

```bash
# Test with 3 searches first
node scripts/yelp-api-scraper.js --test
```

**Expected output:**
```
🟡 Yelp Fusion API Scraper Starting...
🔑 API Key: abc123...
Starting 6 searches...

[1/6] restaurants in Austin, TX 78701
  ✓ Found 50 results

... etc ...

✅ Saved 250+ businesses
```

**If you see this - YOU'RE READY!** ✅

---

## Step 4: Run Full Scrape (Gets 2,000-3,000 Businesses)

```bash
# Full scrape - takes 10-15 minutes
npm run scrape:yelp

# OR manually:
node scripts/yelp-api-scraper.js
```

**What happens:**
- Searches 11 cities × 17 categories = **187 searches**
- Gets 20-50 results per search
- Takes **~10-15 minutes** (rate limited to 1/second)
- **100% FREE** (under 5,000 calls/day limit)

**Expected results:**
- 2,000-3,000 unique businesses
- Restaurants, services, retail, healthcare, etc.
- Phone numbers, ratings, reviews for each

---

## Step 5: Merge Everything Together

```bash
# Consolidate all sources
npm run consolidate
```

**Final database will have:**
```
Current: 218 businesses
+ Yelp: 2,000-3,000 businesses
= TOTAL: 2,200-3,200+ businesses!
```

**All for $0!** 🎉

---

## ⚠️ Troubleshooting

### Error: "YELP_API_KEY not found"
- Make sure you added the key to `.env` file
- Check that there's no spaces around the `=` sign
- Make sure the file is named exactly `.env` (not `.env.txt`)

### Error: "Invalid API key" or "401 Unauthorized"
- Double-check you copied the entire API key
- Go back to https://www.yelp.com/developers/v3/manage_app
- Make sure you copied the **API Key** (not Client ID)

### Error: "429 Rate limit"
- You've hit the 5,000 calls/day limit
- Wait 24 hours and try again
- Or split the scrape across multiple days

### No results found
- Check your internet connection
- Try the `--test` flag first to verify it works
- Some zip codes may have fewer businesses

---

## 📊 What You'll Get

**Data for each business:**
- ✅ Name
- ✅ Address
- ✅ City & Zip
- ✅ Phone number
- ✅ Category (restaurants, dentists, etc.)
- ✅ Rating (1-5 stars)
- ✅ Review count
- ✅ Price range ($, $$, $$$, $$$$)
- ✅ Yelp URL
- ✅ Coordinates (lat/lng)

**Categories covered:**
- Restaurants & Food (500-800)
- Healthcare & Medical (300-500)
- Beauty & Personal Care (200-400)
- Home Services (200-400)
- Automotive (150-300)
- Professional Services (150-300)
- Shopping & Retail (200-400)
- Active Life & Fitness (100-200)
- Hotels & Travel (50-100)
- Arts & Entertainment (50-100)

---

## 🚀 Next Steps After Yelp

**You'll have 2,200-3,200 businesses!**

Want even MORE?
1. **Google Places API** (~$100) - adds 3,000-5,000 more
2. **Manual CSV imports** (FREE) - add specialty businesses
3. **Search for more GitHub datasets** (FREE)

But with Yelp alone, you'll have a solid database! 💪

---

## 💡 Pro Tips

1. **Run overnight** - takes 10-15 minutes, let it run while you sleep
2. **Check the data** after: `head data/yelp-businesses.csv`
3. **Look for duplicates**: The consolidation script auto-deduplicates
4. **Export to Excel**: Open the CSV files in Excel/Google Sheets

---

## ❓ Questions?

**Q: Is this really free?**
A: YES! Yelp gives you 5,000 API calls/day for FREE. This script uses ~187 calls.

**Q: Do I need a credit card?**
A: NO! No payment info required for Yelp API.

**Q: How often can I run this?**
A: Once per day (you have 5,000 calls/day limit).

**Q: Will this get me banned?**
A: No - you're using their official API the correct way.

---

**Ready?** Go to Step 1 and get your API key! 🚀

**Time to complete:** 5 minutes setup + 15 minutes scraping = **20 minutes total**

**Cost:** $0 ✅
