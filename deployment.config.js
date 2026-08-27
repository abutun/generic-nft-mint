/**
 * Resolves one collection profile for the current build.
 *
 * MINT_COLLECTION chooses a key in the active config file. MINT_CONFIG_PATH
 * optionally points at a brand-specific config file outside this repository.
 */
const path = require('path');

const defaultConfigPath = path.join(__dirname, 'collections.config.js');
const configPath = process.env.MINT_CONFIG_PATH
  ? path.resolve(process.cwd(), process.env.MINT_CONFIG_PATH)
  : defaultConfigPath;

let collectionConfigs;
try {
  collectionConfigs = require(configPath);
} catch (error) {
  throw new Error(`Unable to load collection config at ${configPath}: ${error.message}`);
}

const collectionSlug = process.env.MINT_COLLECTION || 'default';
const collection = collectionConfigs[collectionSlug];

if (!collection) {
  throw new Error(
    `Unknown MINT_COLLECTION "${collectionSlug}" in ${configPath}. Available collections: ${Object.keys(collectionConfigs).join(', ')}`
  );
}

const requiredFields = [
  'deploymentPath',
  'siteOrigin',
  'address',
  'name',
  'shortName',
  'symbol',
  'description',
  'maxSupply',
  'pricePerToken',
  'maxPerWallet',
  'saleStatus',
];

for (const field of requiredFields) {
  const isEmptyPath = field === 'deploymentPath' && collection[field] === '';
  if ((collection[field] === undefined || collection[field] === null || collection[field] === '') && !isEmptyPath) {
    throw new Error(`Collection "${collectionSlug}" is missing required field "${field}".`);
  }
}

if (!/^0x[a-fA-F0-9]{40}$/.test(collection.address)) {
  throw new Error(`Collection "${collectionSlug}" has an invalid contract address.`);
}

if (!['active', 'sold-out'].includes(collection.saleStatus)) {
  throw new Error(`Collection "${collectionSlug}" must use saleStatus "active" or "sold-out".`);
}

function normalizeDeploymentPath(value) {
  if (value === '') return '';
  if (typeof value !== 'string' || value.includes('..')) {
    throw new Error(`Collection "${collectionSlug}" has an unsafe deploymentPath.`);
  }

  const normalized = `/${value.replace(/^\/+|\/+$/g, '')}`;
  if (normalized === '/') return '';
  return normalized;
}

const deploymentPath = normalizeDeploymentPath(collection.deploymentPath);
const siteOrigin = collection.siteOrigin.replace(/\/+$/, '');
const getAssetPath = (assetPath) => {
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  return deploymentPath ? `${deploymentPath}/${cleanPath}` : `/${cleanPath}`;
};

const paths = {
  favicon: getAssetPath('favicon.ico'),
  favicon16: getAssetPath('favicon-16x16.png'),
  favicon32: getAssetPath('favicon-32x32.png'),
  appleIcon: getAssetPath('apple-touch-icon.png'),
  androidIcon192: getAssetPath('android-chrome-192x192.png'),
  androidIcon512: getAssetPath('android-chrome-512x512.png'),
  manifest: getAssetPath('site.webmanifest'),
  ogImage: getAssetPath('og-image.png'),
  logo: getAssetPath('logo.png'),
  nftPlaceholder: getAssetPath('nft-placeholder.gif'),
};

module.exports = {
  COLLECTION_SLUG: collectionSlug,
  CONFIG_PATH: configPath,
  CONTRACT_ADDRESS: collection.address,
  CONTRACT_NAME: collection.name,
  CONTRACT_SHORT_NAME: collection.shortName,
  CONTRACT_SYMBOL: collection.symbol,
  CONTRACT_DESCRIPTION: collection.description,
  CONTRACT_MAX_SUPPLY: collection.maxSupply,
  CONTRACT_PRICE_PER_TOKEN: collection.pricePerToken,
  CONTRACT_MAX_PER_WALLET: collection.maxPerWallet,
  CONTRACT_SALE_STATUS: collection.saleStatus,
  WEBSITE_URL: collection.websiteUrl || '',
  WHITEPAPER_URL: collection.whitepaperUrl || '',
  MARKETPLACE_URL: collection.marketplaceUrl || '',
  MARKETPLACE_NAME: collection.marketplaceName || '',
  basePath: deploymentPath,
  assetPrefix: deploymentPath,
  getAssetPath,
  paths,
  siteUrl: `${siteOrigin}${deploymentPath}`,
  pwa: {
    startUrl: deploymentPath ? `${deploymentPath}/` : '/',
    scope: deploymentPath ? `${deploymentPath}/` : '/',
  },
};
