/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Fix for pdf-lib and other browser-only packages
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        path: false,
      }
    }

    // Fix for react-pdf / pdfjs worker
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    }

    return config
  },
  // Suppress specific warnings from pdf-lib
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
