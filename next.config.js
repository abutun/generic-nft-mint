const deploymentConfig = require('./deployment.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // Enable static export
  basePath: deploymentConfig.basePath, // Dynamic path from config
  assetPrefix: deploymentConfig.assetPrefix, // Dynamic asset prefix from config
  trailingSlash: true, // Better compatibility with static hosting
  images: {
    unoptimized: true // Required for static export
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

module.exports = nextConfig; 