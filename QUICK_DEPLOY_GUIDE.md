# 🚀 QUICK DEPLOYMENT FIX

## The Problem
You're getting 404s because you deployed the wrong directory!

## The Solution (Choose One)

### ⚡ Option 1: Fix Existing Vercel Deployment (Fastest)

1. Go to your Vercel dashboard: https://vercel.com
2. Click on your project
3. Go to **Settings** → **General**
4. Find **Root Directory**
5. Change it to: `redesigns`
6. Save and go to **Deployments**
7. Click the ︙ menu on latest deployment → **Redeploy**

**That's it!** Your pages will now work.

---

### 🆕 Option 2: Deploy Fresh with CLI

```bash
# Navigate to the correct directory
cd /home/user/LocalBusinessBuildout/redesigns

# Deploy
vercel --prod

# Answer prompts:
# Link to existing project? → Choose based on if you want new or update existing
# Root directory? → Press Enter (you're already in it)
```

---

### ✅ Option 3: Verify Setup Before Deploying

```bash
# 1. Go to the correct directory
cd /home/user/LocalBusinessBuildout/redesigns

# 2. Build locally first
npm run build

# 3. Test production build
npm run start
# Visit: http://localhost:3000/franklin-barbecue
# Should work! Ctrl+C to stop

# 4. Deploy
vercel --prod
```

---

## 🔍 How to Test After Deployment

Replace `YOUR-URL` with your actual Vercel URL:

```bash
# Test homepage
curl -I https://YOUR-URL.vercel.app/

# Test a business page
curl -I https://YOUR-URL.vercel.app/franklin-barbecue

# Both should return 200 OK (not 404)
```

Or just open these in your browser:
- https://YOUR-URL.vercel.app/franklin-barbecue
- https://YOUR-URL.vercel.app/torchys-tacos
- https://YOUR-URL.vercel.app/uchi

---

## 📁 Directory Structure Explanation

```
LocalBusinessBuildout/          ← ❌ DON'T deploy this (root)
└── redesigns/                  ← ✅ Deploy THIS directory
    ├── src/app/                ← Your 78 pages are here
    ├── package.json            ← Next.js config
    └── next.config.js
```

---

## 🎯 After Deployment Works

1. Copy your Vercel URL (e.g., `https://austin-redesigns.vercel.app`)
2. Update emails:
   ```bash
   cd /home/user/LocalBusinessBuildout

   # Edit the generator
   nano scripts/generate-outreach-emails.js
   # Change line 196: const baseUrl = 'https://YOUR-ACTUAL-URL.vercel.app';

   # Regenerate emails
   node scripts/generate-outreach-emails.js
   ```

3. Start researching contact emails for tier-1 businesses
4. Send first outreach batch!

---

## 💡 Quick Test

```bash
# Count your pages (should be 78 + homepage = 79 total)
ls /home/user/LocalBusinessBuildout/redesigns/src/app/*/page.tsx | wc -l

# Should output: 79
```

---

**TL;DR**: Deploy from `/redesigns` directory, not root. That's the whole fix! 🎉
