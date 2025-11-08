/**
 * Website Quality Scorer
 * Analyzes website quality and assigns a score from 1-10
 * Target: Identify businesses with poor websites (score 1-5) for redesign outreach
 */

class WebsiteScorer {
  constructor() {
    this.scores = {
      design: 0,
      technical: 0,
      content: 0,
      modern: 0
    }
  }

  /**
   * Score a website based on its HTML content and metadata
   * @param {Object} scrapeData - FireCrawl scrape result
   * @returns {Object} - Score breakdown and total
   */
  scoreWebsite(scrapeData) {
    this.reset()

    const html = scrapeData.html || ''
    const metadata = scrapeData.metadata || {}
    const markdown = scrapeData.markdown || ''

    // Score different aspects
    this.scoreDesign(html, metadata)
    this.scoreTechnical(html, metadata)
    this.scoreContent(html, markdown, metadata)
    this.scoreModernity(html, metadata)

    // Calculate total (average of all scores)
    const total = Math.round(
      (this.scores.design + this.scores.technical + this.scores.content + this.scores.modern) / 4
    )

    return {
      total,
      breakdown: { ...this.scores },
      verdict: this.getVerdict(total),
      targetForRedesign: total <= 5
    }
  }

  reset() {
    this.scores = { design: 0, technical: 0, content: 0, modern: 0 }
  }

  /**
   * Score design quality (0-10)
   */
  scoreDesign(html, metadata) {
    let score = 5 // Start at 5

    // POSITIVE indicators
    if (html.includes('flexbox') || html.includes('display: flex') || html.includes('d-flex')) score += 1
    if (html.includes('grid') || html.includes('display: grid')) score += 1
    if (html.includes('font-family') && !html.includes('Times New Roman')) score += 0.5
    if (html.includes('background-gradient') || html.includes('linear-gradient')) score += 0.5
    if (html.includes('box-shadow') || html.includes('shadow')) score += 0.5
    if (html.includes('transition') || html.includes('animation')) score += 0.5

    // NEGATIVE indicators (poor design)
    if (html.includes('<table') && html.includes('layout')) score -= 2 // Table layout = old
    if (html.includes('<font')) score -= 2 // Font tags = ancient
    if (html.includes('marquee')) score -= 3 // Marquee = terrible
    if (html.includes('<center>')) score -= 1 // Center tags = old
    if (html.includes('bgcolor=')) score -= 1 // Inline bgcolor = old
    if (html.match(/<br\s*\/?>\s*<br\s*\/?>/g)?.length > 5) score -= 1 // Excessive line breaks

    // Check for modern CSS frameworks
    if (html.includes('bootstrap') || html.includes('tailwind')) score += 1
    if (html.includes('material-ui') || html.includes('mui')) score += 1

    this.scores.design = Math.max(0, Math.min(10, score))
  }

  /**
   * Score technical quality (0-10)
   */
  scoreTechnical(html, metadata) {
    let score = 5

    // Mobile viewport
    if (metadata.viewport || html.includes('viewport')) score += 2
    else score -= 2

    // Semantic HTML5
    const semanticTags = ['<header', '<nav', '<main', '<section', '<article', '<footer', '<aside']
    const semanticCount = semanticTags.filter(tag => html.includes(tag)).length
    score += Math.min(2, semanticCount * 0.5)

    // Meta tags
    if (metadata.description) score += 1
    if (metadata.ogTitle || metadata.ogImage) score += 1

    // Responsive images
    if (html.includes('srcset') || html.includes('picture')) score += 1

    // Performance indicators
    if (html.includes('async') || html.includes('defer')) score += 0.5
    if (html.includes('preload') || html.includes('prefetch')) score += 0.5

    // Bad technical signs
    if (html.includes('<!--[if IE')) score -= 2 // IE conditionals = old
    if (html.includes('flash') || html.includes('.swf')) score -= 3 // Flash = ancient
    if (!html.includes('<!DOCTYPE html>') && !html.includes('<!DOCTYPE HTML')) score -= 1

    this.scores.technical = Math.max(0, Math.min(10, score))
  }

  /**
   * Score content quality (0-10)
   */
  scoreContent(html, markdown, metadata) {
    let score = 5

    // Professional images
    const imgCount = (html.match(/<img/g) || []).length
    if (imgCount > 0 && imgCount < 50) score += 1
    if (imgCount > 50) score -= 1 // Too many images = cluttered

    // Navigation
    if (html.includes('<nav') || html.includes('navigation') || html.includes('menu')) score += 1

    // Contact info
    const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(markdown)
    const hasPhone = /\(\d{3}\)\s*\d{3}-\d{4}|\d{3}-\d{3}-\d{4}/.test(markdown)
    if (hasEmail) score += 1
    if (hasPhone) score += 1

    // Content length (good amount of content)
    const contentLength = markdown.length
    if (contentLength > 500 && contentLength < 5000) score += 1
    if (contentLength < 200) score -= 1 // Too little content

    // Structured content
    const headingCount = (markdown.match(/^#{1,6}\s/gm) || []).length
    if (headingCount >= 3 && headingCount <= 15) score += 1

    // Bad content signs
    if (markdown.includes('Lorem ipsum')) score -= 3 // Placeholder text
    if (markdown.includes('Coming soon')) score -= 1
    if (markdown.includes('Under construction')) score -= 2

    this.scores.content = Math.max(0, Math.min(10, score))
  }

  /**
   * Score modernity (0-10)
   */
  scoreModernity(html, metadata) {
    let score = 5

    // Modern frameworks/libraries
    if (html.includes('react') || html.includes('React')) score += 2
    if (html.includes('vue') || html.includes('Vue')) score += 2
    if (html.includes('angular') || html.includes('Angular')) score += 2
    if (html.includes('next') || html.includes('gatsby')) score += 2
    if (html.includes('webpack') || html.includes('vite')) score += 1

    // Modern CSS
    if (html.includes('css-grid') || html.includes('display: grid')) score += 1
    if (html.includes('var(--') || html.includes('css variables')) score += 1

    // Modern features
    if (html.includes('service-worker') || html.includes('pwa')) score += 1
    if (html.includes('webp') || html.includes('avif')) score += 1

    // Old/outdated signs
    if (html.includes('jquery') || html.includes('jQuery')) score -= 1 // jQuery = dated
    if (html.includes('bower_components')) score -= 2 // Bower = ancient
    if (html.includes('flash')) score -= 3
    if (metadata.generator?.includes('WordPress') && !html.includes('gutenberg')) score -= 0.5
    if (metadata.generator?.includes('Wix')) score -= 1
    if (metadata.generator?.includes('Squarespace')) score -= 0.5
    if (metadata.generator?.includes('GoDaddy')) score -= 2

    // Very old patterns
    if (html.includes('frameset') || html.includes('<frame')) score -= 3
    if (html.includes('document.write')) score -= 1

    this.scores.modern = Math.max(0, Math.min(10, score))
  }

  /**
   * Get verdict based on total score
   */
  getVerdict(score) {
    if (score >= 8) return 'Excellent - Skip for redesign'
    if (score >= 6) return 'Good - Consider skipping'
    if (score >= 4) return 'Average - Potential target'
    if (score >= 2) return 'Poor - Great target for redesign'
    return 'Terrible - Prime target for redesign'
  }
}

export default WebsiteScorer
