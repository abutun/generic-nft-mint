const deploymentConfig = require('./deployment.config.js');
const clientDeploymentConfig = {
  COLLECTION_SLUG: deploymentConfig.COLLECTION_SLUG,
  CONTRACT_ADDRESS: deploymentConfig.CONTRACT_ADDRESS,
  CONTRACT_NAME: deploymentConfig.CONTRACT_NAME,
  CONTRACT_SHORT_NAME: deploymentConfig.CONTRACT_SHORT_NAME,
  CONTRACT_SYMBOL: deploymentConfig.CONTRACT_SYMBOL,
  CONTRACT_DESCRIPTION: deploymentConfig.CONTRACT_DESCRIPTION,
  CONTRACT_MAX_SUPPLY: deploymentConfig.CONTRACT_MAX_SUPPLY,
  CONTRACT_PRICE_PER_TOKEN: deploymentConfig.CONTRACT_PRICE_PER_TOKEN,
  CONTRACT_MAX_PER_WALLET: deploymentConfig.CONTRACT_MAX_PER_WALLET,
  CONTRACT_SALE_STATUS: deploymentConfig.CONTRACT_SALE_STATUS,
  WEBSITE_URL: deploymentConfig.WEBSITE_URL,
  WHITEPAPER_URL: deploymentConfig.WHITEPAPER_URL,
  MARKETPLACE_URL: deploymentConfig.MARKETPLACE_URL,
  MARKETPLACE_NAME: deploymentConfig.MARKETPLACE_NAME,
  basePath: deploymentConfig.basePath,
  siteUrl: deploymentConfig.siteUrl,
  pwa: deploymentConfig.pwa,
  paths: deploymentConfig.paths,
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // Enable static export
  basePath: deploymentConfig.basePath, // Dynamic path from config
  assetPrefix: deploymentConfig.assetPrefix, // Dynamic asset prefix from config
  env: {
    MINT_COLLECTION: deploymentConfig.COLLECTION_SLUG,
    NEXT_PUBLIC_MINT_DEPLOYMENT_CONFIG: JSON.stringify(clientDeploymentConfig),
  },
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
