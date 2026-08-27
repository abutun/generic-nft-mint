/**
 * Collection profiles for Generic NFT Mint.
 *
 * Select one profile at build time:
 *   MINT_COLLECTION=default npm run build
 *
 * Keep brand-specific production profiles in a separate file and pass it with
 * MINT_CONFIG_PATH. See README.md for the external-config workflow.
 */
module.exports = {
  default: {
    deploymentPath: '',
    siteOrigin: 'https://mint.example.com',
    address: '0x0000000000000000000000000000000000000000',
    name: 'Example NFT Collection',
    shortName: 'Example NFT',
    symbol: 'ENFT',
    description: 'Replace this example profile with your collection details before deployment.',
    maxSupply: 1000,
    pricePerToken: '0',
    maxPerWallet: 3,
    websiteUrl: '',
    whitepaperUrl: '',
    marketplaceUrl: '',
    marketplaceName: '',
    saleStatus: 'active',
  },
  'second-collection': {
    deploymentPath: '/second-collection',
    siteOrigin: 'https://mint.example.com',
    address: '0x0000000000000000000000000000000000000000',
    name: 'Second Example Collection',
    shortName: 'Second NFT',
    symbol: 'SNFT',
    description: 'A second profile demonstrating a subdirectory deployment.',
    maxSupply: 500,
    pricePerToken: '10000000000000000',
    maxPerWallet: 2,
    websiteUrl: '',
    whitepaperUrl: '',
    marketplaceUrl: '',
    marketplaceName: '',
    saleStatus: 'active',
  },
};
