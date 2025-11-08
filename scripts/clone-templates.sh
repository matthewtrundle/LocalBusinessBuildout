#!/bin/bash

# Clone All Recommended Next.js Templates
# This script clones the best templates for your business outreach demos

echo "🚀 Cloning Next.js Templates for Business Demos..."
echo ""

# Create templates directory
mkdir -p templates
cd templates

echo "📁 Creating templates directory..."
echo ""

# CATEGORY 1: Business Landing Pages
echo "🏢 CATEGORY 1: Business Landing Pages"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ ! -d "startup-nextjs" ]; then
  echo "⬇️  Cloning Startup Next.js (General Business)..."
  git clone https://github.com/NextJSTemplates/startup-nextjs.git
  echo "✅ Done: startup-nextjs/"
else
  echo "⏭️  Skipping startup-nextjs (already exists)"
fi
echo ""

if [ ! -d "landing-page-starter" ]; then
  echo "⬇️  Cloning Landing Page Starter (Quick Landing Pages)..."
  git clone https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template.git landing-page-starter
  echo "✅ Done: landing-page-starter/"
else
  echo "⏭️  Skipping landing-page-starter (already exists)"
fi
echo ""

if [ ! -d "open-react-template" ]; then
  echo "⬇️  Cloning Open React Template (Tech Services)..."
  git clone https://github.com/cruip/open-react-template.git
  echo "✅ Done: open-react-template/"
else
  echo "⏭️  Skipping open-react-template (already exists)"
fi
echo ""

if [ ! -d "solid-nextjs" ]; then
  echo "⬇️  Cloning Solid Next.js (Corporate/Premium)..."
  git clone https://github.com/NextJSTemplates/solid-nextjs.git
  echo "✅ Done: solid-nextjs/"
else
  echo "⏭️  Skipping solid-nextjs (already exists)"
fi
echo ""

# CATEGORY 2: SaaS & Tech
echo "💻 CATEGORY 2: SaaS & Tech Startups"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ ! -d "saas-boilerplate" ]; then
  echo "⬇️  Cloning SaaS Boilerplate (Advanced Tech)..."
  git clone https://github.com/ixartz/SaaS-Boilerplate.git saas-boilerplate
  echo "✅ Done: saas-boilerplate/"
else
  echo "⏭️  Skipping saas-boilerplate (already exists)"
fi
echo ""

if [ ! -d "play-nextjs" ]; then
  echo "⬇️  Cloning Play Next.js (Modern SaaS)..."
  git clone https://github.com/NextJSTemplates/play-nextjs.git
  echo "✅ Done: play-nextjs/"
else
  echo "⏭️  Skipping play-nextjs (already exists)"
fi
echo ""

if [ ! -d "next-saas-starter" ]; then
  echo "⬇️  Cloning Next SaaS Starter (Lightweight)..."
  git clone https://github.com/Blazity/next-saas-starter.git
  echo "✅ Done: next-saas-starter/"
else
  echo "⏭️  Skipping next-saas-starter (already exists)"
fi
echo ""

# CATEGORY 3: Restaurants
echo "🍽️  CATEGORY 3: Restaurant Templates"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ ! -d "restaurant-cms" ]; then
  echo "⬇️  Cloning Restaurant CMS (Full-Service Restaurants)..."
  git clone https://github.com/cosmicjs/nextjs-restaurant-website-cms.git restaurant-cms
  echo "✅ Done: restaurant-cms/"
else
  echo "⏭️  Skipping restaurant-cms (already exists)"
fi
echo ""

if [ ! -d "asian-restaurant" ]; then
  echo "⬇️  Cloning Asian Restaurant Template..."
  git clone https://github.com/brozinsky/next-restaurant-template.git asian-restaurant
  echo "✅ Done: asian-restaurant/"
else
  echo "⏭️  Skipping asian-restaurant (already exists)"
fi
echo ""

if [ ! -d "digital-menu" ]; then
  echo "⬇️  Cloning Digital Menu (Casual Dining/Food Trucks)..."
  git clone https://github.com/blackgirlbytes/blackgyalbites-nextjs.git digital-menu
  echo "✅ Done: digital-menu/"
else
  echo "⏭️  Skipping digital-menu (already exists)"
fi
echo ""

# Summary
echo "✅ Template Cloning Complete!"
echo ""
echo "📊 SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📁 Location: $(pwd)"
echo ""
echo "Available templates:"
ls -1 | sed 's/^/  📦 /'
echo ""
echo "🚀 NEXT STEPS:"
echo ""
echo "1. Pick a template based on business type:"
echo "   • General business → startup-nextjs"
echo "   • Restaurant → restaurant-cms"
echo "   • Tech/SaaS → saas-boilerplate"
echo "   • Quick landing → landing-page-starter"
echo ""
echo "2. Navigate to template:"
echo "   cd templates/startup-nextjs"
echo ""
echo "3. Install dependencies:"
echo "   npm install"
echo ""
echo "4. Run development server:"
echo "   npm run dev"
echo ""
echo "5. Open browser to:"
echo "   http://localhost:3000"
echo ""
echo "6. Customize and deploy to Vercel:"
echo "   vercel --prod"
echo ""
echo "📚 Full guide: ../NEXTJS_TEMPLATES_GUIDE.md"
echo ""
