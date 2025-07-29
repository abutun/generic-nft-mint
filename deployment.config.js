/**
 * Deployment Configuration
 * 
 * Change DEPLOYMENT_PATH to deploy to different subdirectories
 * Examples:
 * - '/war-chicks' → mint.cosmicmeta.io/war-chicks/
 * - '/nft-mint' → mint.cosmicmeta.io/nft-mint/
 * - '' → mint.cosmicmeta.io/ (root domain)
 */

const CONTRACT_ADDRESS = '0xcAdb229D7989Aa25D35A8eEe7539E08E43c55fE8';
const CONTRACT_NAME = 'Cosmic Meta War Chicks';
const CONTRACT_SHORT_NAME = 'War Chicks';
const CONTRACT_SYMBOL = 'CMWC';
const CONTRACT_DESCRIPTION = 'Cosmic Meta War Chicks - A collection of 2,222 unique generative art pieces, 100% stored and living on the Ethereum blockchain.';
const CONTRACT_MAX_SUPPLY = 2222;
const CONTRACT_PRICE_PER_TOKEN = '12500000000000000'; // 0.0125 ETH
const CONTRACT_MAX_PER_WALLET = 10;
const DEPLOYMENT_PATH = '/war-chicks';

// Auto-generate all path configurations
const config = {
  // Contract configuration
  CONTRACT_ADDRESS,
  CONTRACT_NAME,
  CONTRACT_SHORT_NAME,
  CONTRACT_SYMBOL,
  CONTRACT_DESCRIPTION,
  CONTRACT_MAX_SUPPLY,
  CONTRACT_PRICE_PER_TOKEN,
  CONTRACT_MAX_PER_WALLET,
  
  // Main deployment path
  basePath: DEPLOYMENT_PATH,
  
  // Asset prefix (same as basePath for subdirectory deployments)
  assetPrefix: DEPLOYMENT_PATH,
  
  // Helper function to create asset paths
  getAssetPath: (path) => {
    // Remove leading slash from path if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return DEPLOYMENT_PATH ? `${DEPLOYMENT_PATH}/${cleanPath}` : `/${cleanPath}`;
  },
  
  // Common asset paths
  paths: {
    favicon: DEPLOYMENT_PATH ? `${DEPLOYMENT_PATH}/favicon.ico` : '/favicon.ico',
    favicon16: DEPLOYMENT_PATH ? `${DEPLOYMENT_PATH}/favicon-16x16.png` : '/favicon-16x16.png',
    favicon32: DEPLOYMENT_PATH ? `${DEPLOYMENT_PATH}/favicon-32x32.png` : '/favicon-32x32.png',
    appleIcon: DEPLOYMENT_PATH ? `${DEPLOYMENT_PATH}/apple-touch-icon.png` : '/apple-touch-icon.png',
    androidIcon192: DEPLOYMENT_PATH ? `${DEPLOYMENT_PATH}/android-chrome-192x192.png` : '/android-chrome-192x192.png',
    androidIcon512: DEPLOYMENT_PATH ? `${DEPLOYMENT_PATH}/android-chrome-512x512.png` : '/android-chrome-512x512.png',
    manifest: DEPLOYMENT_PATH ? `${DEPLOYMENT_PATH}/site.webmanifest` : '/site.webmanifest',
    ogImage: DEPLOYMENT_PATH ? `${DEPLOYMENT_PATH}/og-image.png` : '/og-image.png',
    logo: DEPLOYMENT_PATH ? `${DEPLOYMENT_PATH}/logo.png` : '/logo.png',
    nftPlaceholder: DEPLOYMENT_PATH ? `${DEPLOYMENT_PATH}/nft-placeholder.gif` : '/nft-placeholder.gif'
  },
  
  // Full URL configuration
  siteUrl: `https://mint.cosmicmeta.io${DEPLOYMENT_PATH}`,
  
  // PWA configuration
  pwa: {
    startUrl: DEPLOYMENT_PATH ? `${DEPLOYMENT_PATH}/` : '/',
    scope: DEPLOYMENT_PATH ? `${DEPLOYMENT_PATH}/` : '/'
  }
};

module.exports = config; 