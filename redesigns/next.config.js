/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/businesses',
  trailingSlash: true,
}

module.exports = nextConfig
