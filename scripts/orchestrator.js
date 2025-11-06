#!/usr/bin/env node

/**
 * ATX Revival Orchestrator
 * Coordinates all agents in the web redesign pipeline
 */

import DiscoveryAgent from './agents/discovery-agent.js';
import FirecrawlParserAgent from './agents/firecrawl-parser-agent.js';
import RedesignAgent from './agents/redesign-agent.js';
import DeployAgent from './agents/deploy-agent.js';
import OutreachAgent from './agents/outreach-agent.js';
import { config } from '../config/config.js';

class Orchestrator {
  constructor(options = {}) {
    this.options = {
      limit: options.limit || null,
      phases: options.phases || ['all'],
      skipDiscovery: options.skipDiscovery || false,
    };
  }

  /**
   * Main execution method
   */
  async run() {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  🎯 ATX REVIVAL - Austin Business Web Redesign Engine');
    console.log('═══════════════════════════════════════════════════════════\n');

    const startTime = Date.now();

    try {
      // Phase 1: Discovery
      if (this.shouldRunPhase('discovery')) {
        await this.runPhase('Phase 1: Discovery', async () => {
          const agent = new DiscoveryAgent();
          await agent.run();
        });
      }

      // Phase 2: Parsing (with Firecrawl)
      if (this.shouldRunPhase('parse')) {
        await this.runPhase('Phase 2: Parsing (Firecrawl)', async () => {
          const agent = new FirecrawlParserAgent();
          await agent.run(this.options.limit);
        });
      }

      // Phase 3: Redesign
      if (this.shouldRunPhase('redesign')) {
        await this.runPhase('Phase 3: Redesign', async () => {
          const agent = new RedesignAgent();
          await agent.run(this.options.limit);
        });
      }

      // Phase 4: Deploy
      if (this.shouldRunPhase('deploy')) {
        await this.runPhase('Phase 4: Deploy', async () => {
          const agent = new DeployAgent();
          await agent.run();
        });
      }

      // Phase 5: Outreach
      if (this.shouldRunPhase('outreach')) {
        await this.runPhase('Phase 5: Outreach', async () => {
          const agent = new OutreachAgent();
          await agent.run();
        });
      }

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);

      console.log('\n═══════════════════════════════════════════════════════════');
      console.log(`  ✅ ATX REVIVAL COMPLETED SUCCESSFULLY`);
      console.log(`  ⏱️  Total time: ${duration}s`);
      console.log('═══════════════════════════════════════════════════════════\n');

      this.printNextSteps();
    } catch (error) {
      console.error('\n❌ Pipeline failed:', error.message);
      console.error(error.stack);
      process.exit(1);
    }
  }

  /**
   * Run a specific phase
   */
  async runPhase(phaseName, phaseFn) {
    console.log(`\n${'═'.repeat(63)}`);
    console.log(`  ${phaseName.toUpperCase()}`);
    console.log(`${'═'.repeat(63)}\n`);

    const startTime = Date.now();
    await phaseFn();
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log(`\n  ⏱️  ${phaseName} completed in ${duration}s`);
  }

  /**
   * Check if a phase should run
   */
  shouldRunPhase(phase) {
    if (this.options.phases.includes('all')) return true;
    return this.options.phases.includes(phase);
  }

  /**
   * Print next steps guide
   */
  printNextSteps() {
    console.log('📋 NEXT STEPS:\n');
    console.log('1. Review the generated redesigns:');
    console.log('   - Check redesigns/ directory for HTML files');
    console.log('   - Open in browser to preview\n');

    console.log('2. Deploy to Vercel:');
    console.log('   cd vercel_deploy');
    console.log('   vercel --prod\n');

    console.log('3. Review outreach messages:');
    console.log('   - Check data/outreach.json');
    console.log('   - Configure email provider');
    console.log('   - Send test emails\n');

    console.log('4. Monitor results:');
    console.log('   - Track email open rates');
    console.log('   - Monitor lead form submissions');
    console.log('   - Iterate on design/messaging\n');

    console.log('═══════════════════════════════════════════════════════════\n');
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    limit: null,
    phases: ['all'],
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--limit' && args[i + 1]) {
      options.limit = parseInt(args[i + 1]);
      i++;
    } else if (arg === '--phase' && args[i + 1]) {
      if (options.phases.includes('all')) {
        options.phases = [];
      }
      options.phases.push(args[i + 1]);
      i++;
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }
  }

  return options;
}

// Print help message
function printHelp() {
  console.log(`
ATX Revival Orchestrator - Usage Guide

USAGE:
  node scripts/orchestrator.js [OPTIONS]

OPTIONS:
  --limit <number>     Limit processing to N businesses (for testing)
  --phase <phase>      Run specific phase(s) only
                       Phases: discovery, parse, redesign, deploy, outreach
                       Can be specified multiple times
  --help, -h          Show this help message

EXAMPLES:
  # Run full pipeline with 5 businesses (testing)
  node scripts/orchestrator.js --limit 5

  # Run only discovery and parsing
  node scripts/orchestrator.js --phase discovery --phase parse

  # Run redesign for first 10 businesses
  node scripts/orchestrator.js --phase redesign --limit 10

  # Run full pipeline
  npm start

INDIVIDUAL AGENTS:
  npm run discover     # Run discovery agent only
  npm run parse        # Run parser agent only
  npm run redesign     # Run redesign agent only
  npm run deploy       # Run deploy agent only
  npm run outreach     # Run outreach agent only
`);
}

// Run orchestrator
if (import.meta.url === `file://${process.argv[1]}`) {
  const options = parseArgs();
  const orchestrator = new Orchestrator(options);
  orchestrator.run();
}

export default Orchestrator;
