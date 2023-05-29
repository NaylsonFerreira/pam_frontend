require('dotenv').config();


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true
  }
}

if (process.env.NODE_ENV == 'production') {
  nextConfig['basePath'] = `${process.env.NEXT_PUBLIC_BASE_URL || ''}`
}

module.exports = nextConfig
