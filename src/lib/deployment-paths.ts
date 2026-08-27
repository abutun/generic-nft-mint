/**
 * Build-time collection values made available to server and client components.
 * The config file itself is resolved by Node in next.config.js, allowing a
 * deployment to keep its private brand profiles outside this repository.
 */
type AssetPaths = {
  favicon: string;
  favicon16: string;
  favicon32: string;
  appleIcon: string;
  androidIcon192: string;
  androidIcon512: string;
  manifest: string;
  ogImage: string;
  logo: string;
  nftPlaceholder: string;
};

type SerializedDeploymentConfig = {
  COLLECTION_SLUG: string;
  CONTRACT_ADDRESS: string;
  CONTRACT_NAME: string;
  CONTRACT_SHORT_NAME: string;
  CONTRACT_SYMBOL: string;
  CONTRACT_DESCRIPTION: string;
  CONTRACT_MAX_SUPPLY: number;
  CONTRACT_PRICE_PER_TOKEN: string;
  CONTRACT_MAX_PER_WALLET: number;
  CONTRACT_SALE_STATUS: 'active' | 'sold-out';
  WEBSITE_URL: string;
  WHITEPAPER_URL: string;
  PROJECT_URL: string;
  PROJECT_NAME: string;
  MARKETPLACE_URL: string;
  MARKETPLACE_NAME: string;
  basePath: string;
  siteUrl: string;
  pwa: { startUrl: string; scope: string };
  paths: AssetPaths;
};

const rawConfig = process.env.NEXT_PUBLIC_MINT_DEPLOYMENT_CONFIG;

if (!rawConfig) {
  throw new Error('Missing build-time deployment configuration. Run the app through Next.js scripts.');
}

let deploymentConfig: SerializedDeploymentConfig;
try {
  deploymentConfig = JSON.parse(rawConfig) as SerializedDeploymentConfig;
} catch {
  throw new Error('Build-time deployment configuration is not valid JSON.');
}

const getAssetPath = (assetPath: string) => {
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  return deploymentConfig.basePath ? `${deploymentConfig.basePath}/${cleanPath}` : `/${cleanPath}`;
};

export const DEPLOYMENT_PATHS = {
  ...deploymentConfig,
  ...deploymentConfig.paths,
  startUrl: deploymentConfig.pwa.startUrl,
  scope: deploymentConfig.pwa.scope,
  getAssetPath,
};

export default DEPLOYMENT_PATHS;
