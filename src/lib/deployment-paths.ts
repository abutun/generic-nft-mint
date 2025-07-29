/**
 * Client-side accessible deployment paths
 * Generated from deployment.config.js for use in React components
 */

// Import the main config - this will be resolved at build time
const deploymentConfig = require('../../deployment.config.js');

export const DEPLOYMENT_PATHS = {
  // Contract configuration
  CONTRACT_ADDRESS: deploymentConfig.CONTRACT_ADDRESS,
  CONTRACT_NAME: deploymentConfig.CONTRACT_NAME,
  CONTRACT_SHORT_NAME: deploymentConfig.CONTRACT_SHORT_NAME,
  CONTRACT_SYMBOL: deploymentConfig.CONTRACT_SYMBOL,
  CONTRACT_DESCRIPTION: deploymentConfig.CONTRACT_DESCRIPTION,
  CONTRACT_MAX_SUPPLY: deploymentConfig.CONTRACT_MAX_SUPPLY,
  CONTRACT_PRICE_PER_TOKEN: deploymentConfig.CONTRACT_PRICE_PER_TOKEN,
  CONTRACT_MAX_PER_WALLET: deploymentConfig.CONTRACT_MAX_PER_WALLET,
  
  // External links
  WEBSITE_URL: deploymentConfig.WEBSITE_URL,
  WHITEPAPER_URL: deploymentConfig.WHITEPAPER_URL,
  
  // Meta tag paths
  favicon: deploymentConfig.paths.favicon,
  favicon16: deploymentConfig.paths.favicon16,
  favicon32: deploymentConfig.paths.favicon32,
  appleIcon: deploymentConfig.paths.appleIcon,
  androidIcon192: deploymentConfig.paths.androidIcon192,
  androidIcon512: deploymentConfig.paths.androidIcon512,
  manifest: deploymentConfig.paths.manifest,
  ogImage: deploymentConfig.paths.ogImage,
  
  // Asset paths
  logo: deploymentConfig.paths.logo,
  nftPlaceholder: deploymentConfig.paths.nftPlaceholder,
  
  // Site configuration
  siteUrl: deploymentConfig.siteUrl,
  basePath: deploymentConfig.basePath,
  
  // PWA configuration
  startUrl: deploymentConfig.pwa.startUrl,
  scope: deploymentConfig.pwa.scope,
  
  // Helper function
  getAssetPath: deploymentConfig.getAssetPath
};

export default DEPLOYMENT_PATHS; 