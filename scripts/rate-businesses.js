#!/usr/bin/env node

/**
 * Business Rating & Quality Analyzer
 * Rates all 218 businesses based on available data
 * (Cannot fetch websites due to 403 blocking)
 */

import fs from 'fs/promises';

class BusinessRater {
  constructor() {
    this.businesses = [];
    this.ratings = [];
  }

  async run() {
    console.log('⭐ Business Rating System Starting...\n');

    // Load businesses
    const data = await fs.readFile('/home/user/LocalBusinessBuildout/data/austin-businesses-master.json', 'utf-8');
    this.businesses = JSON.parse(data);

    console.log(`📊 Rating ${this.businesses.length} businesses...\n`);

    // Rate each business
    for (const business of this.businesses) {
      const rating = this.rateBusiness(business);
      this.ratings.push({
        name: business.name,
        city: business.city,
        category: business.category || business.industry,
        ...rating,
      });
    }

    // Sort by overall score
    this.ratings.sort((a, b) => b.overall_score - a.overall_score);

    // Save results
    await this.saveResults();

    // Print analysis
    this.printAnalysis();

    console.log('\n✅ Business rating complete!');
  }

  /**
   * Rate a single business (0-100 score)
   */
  rateBusiness(business) {
    const scores = {
      data_completeness: this.scoreDataCompleteness(business),
      contact_quality: this.scoreContactQuality(business),
      online_presence: this.scoreOnlinePresence(business),
      reputation: this.scoreReputation(business),
      business_size: this.scoreBusinessSize(business),
    };

    // Calculate weighted overall score
    const overall_score = Math.round(
      scores.data_completeness * 0.25 +
      scores.contact_quality * 0.25 +
      scores.online_presence * 0.20 +
      scores.reputation * 0.20 +
      scores.business_size * 0.10
    );

    // Determine grade
    let grade = 'F';
    if (overall_score >= 90) grade = 'A+';
    else if (overall_score >= 85) grade = 'A';
    else if (overall_score >= 80) grade = 'A-';
    else if (overall_score >= 75) grade = 'B+';
    else if (overall_score >= 70) grade = 'B';
    else if (overall_score >= 65) grade = 'B-';
    else if (overall_score >= 60) grade = 'C+';
    else if (overall_score >= 55) grade = 'C';
    else if (overall_score >= 50) grade = 'C-';
    else if (overall_score >= 40) grade = 'D';

    return {
      overall_score,
      grade,
      ...scores,
      strengths: this.identifyStrengths(scores),
      weaknesses: this.identifyWeaknesses(scores),
    };
  }

  /**
   * Score data completeness (0-100)
   */
  scoreDataCompleteness(business) {
    let score = 0;
    const fields = {
      name: 20,
      address: 15,
      city: 10,
      zip: 10,
      phone: 15,
      website: 15,
      category: 10,
      industry: 5,
    };

    for (const [field, points] of Object.entries(fields)) {
      if (business[field] && String(business[field]).trim().length > 0) {
        score += points;
      }
    }

    return score;
  }

  /**
   * Score contact information quality (0-100)
   */
  scoreContactQuality(business) {
    let score = 0;

    // Phone number
    if (business.phone) {
      score += 40;
      // Bonus for properly formatted phone
      if (business.phone.match(/\(\d{3}\)\s\d{3}-\d{4}/)) {
        score += 10;
      }
    }

    // Email
    if (business.email) {
      score += 25;
    }

    // Website
    if (business.website) {
      score += 25;
      // Bonus for HTTPS
      if (business.website.startsWith('https://')) {
        score += 5;
      }
    }

    return Math.min(score, 100);
  }

  /**
   * Score online presence (0-100)
   */
  scoreOnlinePresence(business) {
    let score = 0;

    // Has website
    if (business.website) {
      score += 40;
    }

    // Has Yelp presence
    if (business.yelp_url || business.yelp_id) {
      score += 20;
    }

    // Has Google Maps
    if (business.google_place_id || business.google_maps_url) {
      score += 20;
    }

    // Listed in multiple sources
    if (business.sources && Array.isArray(business.sources)) {
      score += business.sources.length * 5;
    }

    // Has social media
    if (business.facebook || business.instagram || business.twitter) {
      score += 10;
    }

    return Math.min(score, 100);
  }

  /**
   * Score reputation/reviews (0-100)
   */
  scoreReputation(business) {
    let score = 50; // Default baseline

    // Rating score (if available)
    if (business.rating) {
      const rating = parseFloat(business.rating);
      if (rating >= 4.5) score = 95;
      else if (rating >= 4.0) score = 85;
      else if (rating >= 3.5) score = 70;
      else if (rating >= 3.0) score = 55;
      else if (rating >= 2.5) score = 40;
      else score = 25;
    }

    // Bonus for review count
    if (business.review_count) {
      const reviews = parseInt(business.review_count);
      if (reviews >= 500) score += 10;
      else if (reviews >= 100) score += 7;
      else if (reviews >= 50) score += 5;
      else if (reviews >= 10) score += 3;
    }

    return Math.min(score, 100);
  }

  /**
   * Score business size/credibility (0-100)
   */
  scoreBusinessSize(business) {
    let score = 50; // Default for small businesses

    // Public company
    if (business.stock_ticker || business.category === 'Public Company') {
      score = 100;
    }

    // Has employee count
    if (business.employees) {
      const emp = parseInt(business.employees);
      if (emp >= 1000) score = 95;
      else if (emp >= 500) score = 90;
      else if (emp >= 100) score = 80;
      else if (emp >= 50) score = 70;
      else if (emp >= 10) score = 60;
    }

    // Founded year (established businesses)
    if (business.founded_year) {
      const year = parseInt(business.founded_year);
      const age = 2025 - year;
      if (age >= 50) score += 15;
      else if (age >= 25) score += 10;
      else if (age >= 10) score += 5;
    }

    return Math.min(score, 100);
  }

  /**
   * Identify strengths
   */
  identifyStrengths(scores) {
    const strengths = [];

    if (scores.data_completeness >= 90) strengths.push('Complete data');
    if (scores.contact_quality >= 90) strengths.push('Excellent contact info');
    if (scores.online_presence >= 80) strengths.push('Strong online presence');
    if (scores.reputation >= 85) strengths.push('Highly rated');
    if (scores.business_size >= 90) strengths.push('Large/established');

    return strengths.length > 0 ? strengths : ['N/A'];
  }

  /**
   * Identify weaknesses
   */
  identifyWeaknesses(scores) {
    const weaknesses = [];

    if (scores.data_completeness < 60) weaknesses.push('Incomplete data');
    if (scores.contact_quality < 50) weaknesses.push('Poor contact info');
    if (scores.online_presence < 40) weaknesses.push('Weak online presence');
    if (scores.reputation < 50) weaknesses.push('Low/no ratings');
    if (scores.business_size < 40) weaknesses.push('Limited info on size');

    return weaknesses.length > 0 ? weaknesses : ['N/A'];
  }

  /**
   * Save results
   */
  async saveResults() {
    // Save JSON
    await fs.writeFile(
      '/home/user/LocalBusinessBuildout/data/business-ratings.json',
      JSON.stringify(this.ratings, null, 2)
    );

    // Save CSV
    const csv = this.toCSV();
    await fs.writeFile(
      '/home/user/LocalBusinessBuildout/data/business-ratings.csv',
      csv
    );

    console.log('💾 Saved ratings to:');
    console.log('   - data/business-ratings.json');
    console.log('   - data/business-ratings.csv');
  }

  /**
   * Convert to CSV
   */
  toCSV() {
    const headers = [
      'Name', 'City', 'Category', 'Overall Score', 'Grade',
      'Data Complete', 'Contact Quality', 'Online Presence',
      'Reputation', 'Business Size', 'Strengths', 'Weaknesses'
    ];

    const rows = this.ratings.map(r => [
      r.name,
      r.city,
      r.category,
      r.overall_score,
      r.grade,
      r.data_completeness,
      r.contact_quality,
      r.online_presence,
      r.reputation,
      r.business_size,
      r.strengths.join('; '),
      r.weaknesses.join('; ')
    ].map(f => `"${f}"`).join(','));

    return [headers.join(','), ...rows].join('\n');
  }

  /**
   * Print analysis
   */
  printAnalysis() {
    console.log('\n' + '='.repeat(70));
    console.log('📊 BUSINESS RATINGS ANALYSIS');
    console.log('='.repeat(70));

    // Grade distribution
    const gradeCount = {};
    this.ratings.forEach(r => {
      gradeCount[r.grade] = (gradeCount[r.grade] || 0) + 1;
    });

    console.log('\n📈 Grade Distribution:');
    ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'].forEach(grade => {
      if (gradeCount[grade]) {
        const bar = '█'.repeat(Math.ceil(gradeCount[grade] / 2));
        console.log(`   ${grade.padEnd(3)} ${bar} ${gradeCount[grade]}`);
      }
    });

    // Average scores
    const avgScores = {
      overall: 0,
      data: 0,
      contact: 0,
      online: 0,
      reputation: 0,
      size: 0,
    };

    this.ratings.forEach(r => {
      avgScores.overall += r.overall_score;
      avgScores.data += r.data_completeness;
      avgScores.contact += r.contact_quality;
      avgScores.online += r.online_presence;
      avgScores.reputation += r.reputation;
      avgScores.size += r.business_size;
    });

    const count = this.ratings.length;
    console.log('\n📊 Average Scores:');
    console.log(`   Overall:           ${Math.round(avgScores.overall / count)}/100`);
    console.log(`   Data Completeness: ${Math.round(avgScores.data / count)}/100`);
    console.log(`   Contact Quality:   ${Math.round(avgScores.contact / count)}/100`);
    console.log(`   Online Presence:   ${Math.round(avgScores.online / count)}/100`);
    console.log(`   Reputation:        ${Math.round(avgScores.reputation / count)}/100`);
    console.log(`   Business Size:     ${Math.round(avgScores.size / count)}/100`);

    // Top 10 businesses
    console.log('\n🏆 TOP 10 HIGHEST RATED BUSINESSES:');
    this.ratings.slice(0, 10).forEach((r, i) => {
      console.log(`   ${i + 1}. ${r.name} - ${r.grade} (${r.overall_score}/100)`);
      console.log(`      City: ${r.city} | Category: ${r.category}`);
    });

    // Bottom 10
    console.log('\n⚠️  BOTTOM 10 (Need Improvement):');
    this.ratings.slice(-10).reverse().forEach((r, i) => {
      console.log(`   ${i + 1}. ${r.name} - ${r.grade} (${r.overall_score}/100)`);
      console.log(`      Weaknesses: ${r.weaknesses.join(', ')}`);
    });

    // By category
    const categoryAvg = {};
    this.ratings.forEach(r => {
      if (!categoryAvg[r.category]) {
        categoryAvg[r.category] = { sum: 0, count: 0 };
      }
      categoryAvg[r.category].sum += r.overall_score;
      categoryAvg[r.category].count++;
    });

    console.log('\n📋 AVERAGE SCORE BY CATEGORY:');
    Object.entries(categoryAvg)
      .map(([cat, data]) => ({ cat, avg: Math.round(data.sum / data.count) }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 15)
      .forEach(({ cat, avg }) => {
        console.log(`   ${cat}: ${avg}/100`);
      });

    console.log('='.repeat(70));
  }
}

// Run
if (import.meta.url === `file://${process.argv[1]}`) {
  const rater = new BusinessRater();
  rater.run().catch(console.error);
}

export default BusinessRater;
