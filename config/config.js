/**
 * ATX Revival Configuration
 * Central configuration for the Austin Business Web Redesign Engine
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');

export const config = {
  // Project paths
  paths: {
    root: PROJECT_ROOT,
    data: join(PROJECT_ROOT, 'data'),
    rawSites: join(PROJECT_ROOT, 'data', 'raw_sites'),
    parsed: join(PROJECT_ROOT, 'data', 'parsed'),
    redesigns: join(PROJECT_ROOT, 'redesigns'),
    vercelDeploy: join(PROJECT_ROOT, 'vercel_deploy'),
    businesses: join(PROJECT_ROOT, 'vercel_deploy', 'businesses'),
  },

  // Data files
  files: {
    businesses: join(PROJECT_ROOT, 'data', 'businesses.json'),
    parseErrors: join(PROJECT_ROOT, 'data', 'parse_errors.json'),
    deploymentLog: join(PROJECT_ROOT, 'data', 'deployment_log.json'),
    outreach: join(PROJECT_ROOT, 'data', 'outreach.json'),
  },

  // Discovery Agent settings
  discovery: {
    targetCity: 'Austin, Texas',
    maxBusinesses: 300,
    maxEmployees: 500,
    radiusMiles: 20,
    industries: [
      'restaurant',
      'cafe',
      'salon',
      'barbershop',
      'boutique',
      'retail',
      'local_services',
      'fitness',
      'auto_repair',
      'home_services',
    ],
    requiredFields: ['name', 'url', 'address', 'industry'],
  },

  // Parser Agent settings
  parser: {
    userAgent: 'ATX-Revival-Bot/1.0 (Web Design Research)',
    timeout: 15000,
    retryAttempts: 1,
    retryDelay: 5000,
    rateLimit: {
      requestsPerSecond: 1,
      delayBetweenRequests: 1000,
    },
    screenshotViewport: {
      width: 1280,
      height: 900,
    },
  },

  // Redesign Agent settings
  redesign: {
    framework: 'Domain Labs Modern Web Framework',
    tailwindCDN: 'https://cdn.jsdelivr.net/npm/tailwindcss@3.4.0/dist/tailwind.min.css',
    defaultColors: {
      primary: '#2563eb',
      accent: '#7c3aed',
      neutral: '#1f2937',
      background: '#ffffff',
      lightBg: '#f9fafb',
    },
    unsplashBaseUrl: 'https://images.unsplash.com/photo',
    placeholderImages: true,
  },

  // Deploy Agent settings
  deploy: {
    baseUrl: 'https://austin-sites.domainlabs.ai',
    vercelProjectName: 'atx-revival',
    gitBranch: 'main',
    indexPageTitle: 'ATX Revival: Modern Web Designs for Austin Businesses',
  },

  // Outreach Agent settings
  outreach: {
    fromEmail: 'hello@domainlabs.ai',
    fromName: 'Domain Labs - Austin Web Studio',
    replyTo: 'hello@domainlabs.ai',
    maxEmailsPerDay: 50,
    delayBetweenSends: 5000,
    followUpDelay: 7, // days
    maxFollowUps: 2,
  },

  // Quality and success criteria
  quality: {
    minSuccessfulFetches: 0.85,
    minDataCompleteness: 0.70,
    minLighthouseScores: {
      performance: 80,
      accessibility: 90,
      bestPractices: 90,
      seo: 90,
    },
  },

  // Feature flags
  features: {
    enableScreenshots: true,
    enableComparison: true,
    enableDeployment: false, // Set true when ready for Vercel
    enableOutreach: false, // Set true when ready to send emails
    usePuppeteer: true,
    useClaude: true, // Use Claude API for redesigns
  },

  // API Keys (loaded from environment variables)
  api: {
    googleMapsKey: process.env.GOOGLE_MAPS_API_KEY || '',
    yelpKey: process.env.YELP_API_KEY || '',
    anthropicKey: process.env.ANTHROPIC_API_KEY || '',
    sendgridKey: process.env.SENDGRID_API_KEY || '',
    vercelToken: process.env.VERCEL_TOKEN || '',
  },
};

export default config;
