/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // basePath removed - business pages now at root level (e.g., /franklin-barbecue)
  trailingSlash: true,
}

module.exports = nextConfig
