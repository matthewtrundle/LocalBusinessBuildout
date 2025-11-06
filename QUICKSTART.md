# 🚀 Quick Start Guide

Get ATX Revival running in 5 minutes!

---

## Step 1: Install Dependencies

```bash
npm install
```

---

## Step 2: Run Test Pipeline

Test with 5 businesses to verify everything works:

```bash
npm start -- --limit 5
```

This will:
1. ✅ Discover 25 curated Austin businesses
2. ✅ Parse 5 homepages
3. ✅ Generate 5 redesigns
4. ✅ Create deployment files
5. ✅ Generate outreach emails

**Expected time**: ~2-3 minutes

---

## Step 3: View Results

### Check Generated Redesigns

```bash
# List redesigns
ls -la redesigns/

# Open a redesign in browser
open redesigns/jos-coffee/index.html
# or for Linux:
xdg-open redesigns/jos-coffee/index.html
```

### Review Data Files

```bash
# View discovered businesses
cat data/businesses.json | jq '.[0:5]'

# View parsed data
cat data/parsed/jos-coffee.json | jq

# View outreach messages
cat data/outreach.json | jq '.[0:1]'
```

---

## Step 4: Preview Showcase Page

```bash
# Open showcase index
open vercel_deploy/index.html
# or for Linux:
xdg-open vercel_deploy/index.html
```

You should see a beautiful showcase page with all redesigned businesses!

---

## Step 5: Run Full Pipeline

Ready to process more businesses?

```bash
# Run with 25 businesses
npm start -- --limit 25

# Run all discovered businesses (300 target)
npm start
```

---

## 📊 Understanding the Output

### Console Output

You'll see progress for each phase:

```
═══════════════════════════════════════════════════════════
  🎯 ATX REVIVAL - Austin Business Web Redesign Engine
═══════════════════════════════════════════════════════════

═══════════════════════════════════════════════════════════
  PHASE 1: DISCOVERY
═══════════════════════════════════════════════════════════

🔍 DiscoveryAgent starting...

📂 No existing businesses found, starting fresh
🎯 Discovering from curated Austin business list...
  ✓ Added 25 businesses from curated list

🔗 Validating business URLs...
  ✓ Valid URLs: 23
  ✗ Invalid URLs: 2

📊 Discovery Summary:
  Total businesses: 25
  Target: 300
  Progress: 8%
  Valid URLs: 23 (92%)
```

### File Structure After Running

```
LocalBusinessBuildout/
├── data/
│   ├── businesses.json         # ✅ 25 businesses
│   ├── parsed/
│   │   ├── jos-coffee.json     # ✅ Parsed data
│   │   └── ...
│   ├── raw_sites/
│   │   ├── jos-coffee.html     # ✅ Original HTML
│   │   └── ...
│   ├── deployment_log.json     # ✅ Deployment records
│   └── outreach.json           # ✅ 5 outreach messages
│
├── redesigns/
│   ├── jos-coffee/
│   │   ├── index.html          # ✅ Redesigned page
│   │   └── metadata.json
│   └── ...
│
└── vercel_deploy/
    ├── index.html              # ✅ Showcase page
    ├── businesses/
    │   ├── jos-coffee/
    │   │   └── index.html      # ✅ Deployed page
    │   └── ...
    └── vercel.json
```

---

## 🎯 Next Steps

### 1. Customize Redesigns

Want to tweak the design template?

Edit `scripts/agents/redesign-agent.js` in the `generateRedesignHtml()` function.

### 2. Add More Businesses

Add your favorite Austin spots to `scripts/agents/discovery-agent.js`:

```javascript
const curatedBusinesses = [
  {
    name: "Your Business",
    url: "https://yourbusiness.com",
    industry: "restaurant",
    address: "123 Main St, Austin, TX 78701"
  },
  // ... existing businesses
];
```

### 3. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd vercel_deploy
vercel --prod
```

### 4. Send Outreach Emails

Review messages in `data/outreach.json` and configure your email provider.

---

## 🐛 Troubleshooting

### Issue: "Cannot find module"

**Solution**: Run `npm install`

### Issue: Parsing fails for some sites

**Normal!** Some sites may:
- Block bots
- Require JavaScript
- Have slow response times
- Be temporarily down

Check `data/parse_errors.json` for details.

### Issue: Redesigns look plain

**Expected!** The template uses:
- Placeholder images
- Generic text
- Default colors

To enhance:
1. Integrate real brand colors from parsed data
2. Add actual business photos
3. Customize copy for each industry

---

## 🎨 Pro Tips

### Run Phases Independently

```bash
# Just discover
npm run discover

# Just redesign (assumes parsing is done)
npm run redesign

# Just deploy
npm run deploy
```

### Check Quality

```bash
# Count successful parses
cat data/businesses.json | jq '[.[] | select(.parsed == true)] | length'

# Count redesigns
ls -1 redesigns/ | wc -l

# View parse errors
cat data/parse_errors.json | jq
```

### Test One Business

```bash
# Limit to 1 for fastest testing
npm start -- --limit 1
```

---

## 📚 Learn More

- Full documentation: [README.md](README.md)
- Agent specs: `agents/*.yml`
- Configuration: `config/config.js`

---

## 💡 Common Workflows

### Workflow 1: Quick Test

```bash
npm start -- --limit 5
open redesigns/*/index.html
```

### Workflow 2: Production Run

```bash
npm start
cd vercel_deploy
vercel --prod
```

### Workflow 3: Iterate on Design

```bash
# Edit redesign-agent.js
npm run redesign
open redesigns/jos-coffee/index.html
# Repeat until satisfied
```

---

## ✅ You're Ready!

You now have a working ATX Revival pipeline!

**What you've built**:
- ✅ Automated business discovery
- ✅ Web scraping & content extraction
- ✅ AI-powered redesign generation
- ✅ Deployment-ready showcase
- ✅ Personalized outreach system

**Scale it up**:
- Run with `--limit 50` for more businesses
- Deploy to production Vercel
- Send outreach campaigns
- Track leads and conversions

Happy redesigning! 🎨
