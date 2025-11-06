# 🎯 ATX Revival

**Austin Business Web Redesign Engine**

An automated, AI-powered pipeline that discovers, redesigns, and showcases modern homepages for 300 small businesses in Austin, Texas.

---

## 🌟 Overview

ATX Revival is a multi-phase build pipeline that:

1. **Discovers** 300 small businesses in Austin (<500 employees)
2. **Fetches** and parses their existing landing pages
3. **Redesigns** each page using modern AI-driven design principles
4. **Publishes** redesigns to a live Vercel showcase
5. **Outreaches** to business owners with personalized messages

The result is a **self-propagating design showcase** that demonstrates modern web capabilities and generates inbound leads.

---

## 🏗️ Architecture

### Multi-Agent System

```
┌─────────────────────────────────────────────────────────────┐
│                     ORCHESTRATOR                            │
│  Coordinates all agents and manages pipeline execution     │
└──────────────┬──────────────────────────────────────────────┘
               │
    ┌──────────┴──────────┬──────────┬──────────┬──────────┐
    │                     │          │          │          │
┌───▼────┐    ┌──────────▼───┐   ┌──▼─────┐  ┌─▼──────┐ ┌─▼────────┐
│Discovery│───▶│ Parser Agent │──▶│Redesign│─▶│ Deploy │─▶│ Outreach │
│ Agent  │    │              │   │ Agent  │  │ Agent  │ │  Agent   │
└────────┘    └──────────────┘   └────────┘  └────────┘ └──────────┘
```

### Agents

- **DiscoveryAgent**: Finds and validates Austin businesses
- **ParserAgent**: Extracts content and design from homepages
- **RedesignAgent**: Generates modern HTML/CSS redesigns
- **DeployAgent**: Publishes to Vercel showcase
- **OutreachAgent**: Creates personalized email campaigns

---

## 📁 Project Structure

```
LocalBusinessBuildout/
├── agents/                  # Agent YAML specifications
│   ├── discovery-agent.yml
│   ├── parser-agent.yml
│   ├── redesign-agent.yml
│   ├── deploy-agent.yml
│   └── outreach-agent.yml
│
├── config/                  # Configuration files
│   └── config.js           # Central configuration
│
├── data/                    # Data storage
│   ├── businesses.json     # Business database
│   ├── parsed/             # Extracted content
│   ├── raw_sites/          # Original HTML
│   ├── parse_errors.json   # Error logs
│   ├── deployment_log.json # Deployment records
│   └── outreach.json       # Outreach queue
│
├── redesigns/              # Generated redesigns
│   └── {business-slug}/
│       ├── index.html
│       └── metadata.json
│
├── vercel_deploy/          # Vercel deployment directory
│   ├── index.html          # Showcase homepage
│   ├── businesses/         # Individual business pages
│   └── vercel.json         # Vercel configuration
│
├── scripts/                # Agent implementations
│   ├── orchestrator.js     # Main orchestrator
│   └── agents/
│       ├── discovery-agent.js
│       ├── parser-agent.js
│       ├── redesign-agent.js
│       ├── deploy-agent.js
│       └── outreach-agent.js
│
├── package.json
├── .env.example
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- **Git**

### Installation

```bash
# Clone repository
git clone <repository-url>
cd LocalBusinessBuildout

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API keys
```

### Run Pipeline

```bash
# Full pipeline (all phases)
npm start

# Test with 5 businesses
npm start -- --limit 5

# Run specific phases
npm start -- --phase discovery --phase parse

# Run individual agents
npm run discover
npm run parse
npm run redesign
npm run deploy
npm run outreach
```

---

## 📊 Pipeline Phases

### Phase 1: Discovery

Discovers Austin businesses from curated lists and APIs.

```bash
npm run discover
```

**Output**: `data/businesses.json`

**Features**:
- Curated Austin business list (25+ popular spots)
- Optional Yelp API integration
- Optional Google Maps API integration
- URL validation
- Duplicate detection

---

### Phase 2: Parsing

Fetches and extracts structured data from homepages.

```bash
npm run parse
```

**Output**:
- `data/raw_sites/{slug}.html` (raw HTML)
- `data/parsed/{slug}.json` (structured data)

**Extracted Data**:
- Metadata (title, description, favicon)
- Content (headlines, CTAs, about text)
- Navigation (menu items, footer links)
- Design (colors, fonts)
- Assets (logo, images)
- Technical (mobile viewport, structured data)

---

### Phase 3: Redesign

Generates modern, responsive redesigns using AI principles.

```bash
npm run redesign
```

**Output**: `redesigns/{slug}/index.html`

**Design Framework**:
- Mobile-first responsive layout
- TailwindCSS styling
- Semantic HTML5
- WCAG 2.1 AA accessibility
- SEO optimization
- Fast load times (<100KB)

**Sections**:
1. Header with navigation
2. Hero with CTA
3. Features grid
4. About section
5. Contact form
6. Footer

---

### Phase 4: Deploy

Prepares and deploys redesigns to Vercel.

```bash
npm run deploy
```

**Output**:
- `vercel_deploy/businesses/{slug}/` (individual pages)
- `vercel_deploy/index.html` (showcase homepage)
- `vercel_deploy/vercel.json` (configuration)

**URL Structure**:
- Showcase: `https://austin-sites.domainlabs.ai/`
- Business: `https://austin-sites.domainlabs.ai/businesses/{slug}/`

---

### Phase 5: Outreach

Generates personalized outreach campaigns.

```bash
npm run outreach
```

**Output**: `data/outreach.json`

**Features**:
- Personalized subject lines
- Custom opening lines
- Unique redesign URLs
- Professional tone
- CAN-SPAM compliant

---

## ⚙️ Configuration

### Environment Variables

Create `.env` file with:

```env
# API Keys
GOOGLE_MAPS_API_KEY=your_key_here
YELP_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
SENDGRID_API_KEY=your_key_here
VERCEL_TOKEN=your_token_here
```

### Config Options

Edit `config/config.js`:

```javascript
export const config = {
  discovery: {
    targetCity: 'Austin, Texas',
    maxBusinesses: 300,
    maxEmployees: 500,
  },

  parser: {
    timeout: 15000,
    rateLimit: { requestsPerSecond: 1 },
  },

  redesign: {
    framework: 'Domain Labs Modern Web Framework',
    defaultColors: { ... },
  },

  // ... more options
};
```

---

## 🎨 Design Framework

### Domain Labs Modern Web Framework

**Principles**:
1. Mobile-first responsive design
2. Clear visual hierarchy
3. High contrast ratios (4.5:1 minimum)
4. Generous whitespace
5. Semantic HTML5
6. Fast load times

**Typography**:
- Headings: Inter, Poppins, or System fonts
- Body: System font stack
- H1: 2.5rem (mobile), 4rem (desktop)
- Line height: 1.6

**Colors**:
- Primary: `#2563eb` (blue)
- Accent: `#7c3aed` (purple)
- Neutral: `#1f2937` (dark gray)
- Background: `#ffffff` or `#f9fafb`

**Accessibility**:
- Semantic HTML tags
- ARIA labels
- Keyboard navigable
- Alt text for all images
- Proper heading hierarchy

---

## 📈 Success Metrics

### Targets

- **Discovery**: 90% valid URLs (250+ businesses)
- **Parsing**: 85% successful fetches, 70% complete data
- **Redesign**: 100% valid HTML, mobile-friendly
- **Deploy**: All pages accessible, <3s load time
- **Outreach**: 30% open rate, 10% click rate, 5% reply rate

### Expected Results

From 300 contacts:
- **90 email opens** (30%)
- **30 link clicks** (10%)
- **15 replies** (5%)
- **6+ qualified leads** (2%)

---

## 🛠️ Development

### Adding New Businesses

Edit `scripts/agents/discovery-agent.js` and add to `curatedBusinesses` array:

```javascript
{
  name: "Business Name",
  url: "https://example.com",
  industry: "restaurant",
  address: "Address, Austin, TX 78704"
}
```

### Customizing Redesigns

Edit `scripts/agents/redesign-agent.js` in the `generateRedesignHtml()` method.

### Testing

```bash
# Test with 5 businesses
npm start -- --limit 5

# Test single phase
npm start -- --phase parse --limit 3

# Run discovery only
npm run discover
```

---

## 📝 Best Practices

### Ethical Guidelines

1. **Respect robots.txt** - Always honor site policies
2. **Rate limiting** - Max 1 request/second per domain
3. **No copyright infringement** - Use URLs only, not assets
4. **Transparency** - Label as concept redesigns
5. **CAN-SPAM compliance** - Include unsubscribe, physical address

### Legal Considerations

- Concept redesigns are for demonstration purposes only
- Not affiliated with businesses shown
- Use publicly available business contact info
- Honor opt-out requests immediately

---

## 🔧 Troubleshooting

### Common Issues

**Problem**: `npm start` fails with module errors
**Solution**: Run `npm install` to install dependencies

**Problem**: Parsing fails for HTTPS sites
**Solution**: Check network connectivity, verify URL is accessible

**Problem**: No businesses found in discovery
**Solution**: Ensure `data/businesses.json` exists or let agent create it

**Problem**: Vercel deployment fails
**Solution**: Check `vercel.json` syntax, verify Vercel CLI is installed

---

## 🚀 Deployment to Vercel

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd vercel_deploy
vercel --prod
```

### Automatic Deployment

1. Push `vercel_deploy/` to GitHub
2. Connect repository to Vercel
3. Auto-deploy on push to main branch

---

## 📊 Monitoring & Analytics

### Track Results

1. **Email metrics** - Open rates, click rates (via SendGrid)
2. **Web analytics** - Page views, conversions (via Google Analytics)
3. **Lead capture** - Form submissions (via webhook or CRM)
4. **Response tracking** - Update `outreach.json` with replies

### Iterate

- Analyze which industries respond best
- A/B test subject lines
- Refine design templates
- Adjust outreach timing

---

## 🔮 Future Enhancements

### Roadmap

- [ ] Integrate Anthropic Claude API for AI-generated redesigns
- [ ] Add screenshot comparison (before/after images)
- [ ] Implement Lighthouse scoring for each redesign
- [ ] Add email sending via SendGrid/AWS SES
- [ ] Create admin dashboard for tracking
- [ ] Expand to other cities (Dallas, Denver, Seattle)
- [ ] Add A/B testing for designs
- [ ] Integrate CRM for lead management

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- **TailwindCSS** - Utility-first CSS framework
- **Cheerio** - HTML parsing
- **Axios** - HTTP client
- **Vercel** - Deployment platform
- **Austin Business Community** - For inspiration

---

## 📞 Contact

**Domain Labs**
Austin, TX
hello@domainlabs.ai

---

## 🎯 Project Status

**Version**: 1.0.0
**Status**: ✅ Core pipeline complete
**Last Updated**: November 2025

---

Built with ❤️ in Austin, Texas
