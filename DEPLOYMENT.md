# Deployment Guide

This guide deploys Generic NFT Mint without coupling the reusable codebase to a particular collection.

## 1. Prepare the profile map

Create a private or project-owned `collections.config.js` outside this repository. The map can contain one or many collections.

```js
module.exports = {
  'collection-a': {
    deploymentPath: '/collection-a',
    siteOrigin: 'https://mint.example.com',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    name: 'Collection A',
    shortName: 'Collection A',
    symbol: 'COLA',
    description: 'Collection A description.',
    maxSupply: 1000,
    pricePerToken: '0',
    maxPerWallet: 3,
    websiteUrl: '',
    whitepaperUrl: '',
    marketplaceUrl: '',
    marketplaceName: '',
    saleStatus: 'active',
  },
};
```

Use the same `siteOrigin` for profiles hosted on the same domain and a distinct `deploymentPath` for each subdirectory. Use `deploymentPath: ''` only for the root site.

## 2. Set public build configuration

Configure a WalletConnect project ID. This is the only required public environment variable for wallet connectivity.

```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
```

For a managed host, add this variable in the host's environment settings. Do not add wallet private keys, seed phrases, or owner credentials.

## 3. Validate the selected collection

From the repository root:

```bash
MINT_CONFIG_PATH=/absolute/path/to/collections.config.js \
MINT_COLLECTION=collection-a \
npm run type-check

MINT_CONFIG_PATH=/absolute/path/to/collections.config.js \
MINT_COLLECTION=collection-a \
npm run build
```

The build fails early for an unknown profile, a missing required field, an invalid address, or an unsafe deployment path.

Check the generated `out/` folder:

- `out/index.html` contains the selected collection's title and metadata.
- Links and image URLs include the selected base path.
- `out/site.webmanifest` has the selected name, scope, and start URL.
- `out/_next/` exists and is referenced from the generated HTML.

## 4. Put static assets in the final target

Before publishing generated output, create the target directory and place that collection's art and icon files there. Required names are listed in [README.md](README.md#assets-and-collection-isolation).

For a profile at `/collection-a`, the target should be:

```text
/var/www/mint/collection-a/
```

For a root profile, the target is the static site root itself:

```text
/var/www/mint/
```

## 5. Publish runtime output safely

Use the provided publisher after a successful build:

```bash
MINT_CONFIG_PATH=/absolute/path/to/collections.config.js \
MINT_COLLECTION=collection-a \
MINT_STATIC_ROOT=/var/www/mint \
npm run publish:collection
```

The script refuses to publish outside `MINT_STATIC_ROOT` and refuses a nonexistent target. It replaces only generated runtime files, clearing stale hashed bundles while preserving collection artwork:

```text
_next/
404/
404.html
index.html
index.txt
site.webmanifest
```

It does not copy or remove collection art, logos, placeholders, or icons. This prevents one collection's images from being mixed into another's folder.

## Managed hosts

For Vercel, Netlify, Cloudflare Pages, or a CI platform:

1. Set `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`.
2. Make the external configuration file available in the build environment, or use a project-owned config file committed to that site's repository.
3. Set `MINT_CONFIG_PATH` and `MINT_COLLECTION` for the one collection being built.
4. Use `npm run build` as the build command.
5. Publish the resulting `out/` directory at the desired root or subpath.

Do not set `MINT_CONFIG_PATH` to a path that exists only on a developer laptop in a remote CI environment.

## Pre-launch checklist

- [ ] The profile points to the intended mainnet contract address.
- [ ] `siteOrigin` and `deploymentPath` produce the exact public URL.
- [ ] The target folder contains the intended collection images and icons.
- [ ] `price()` on-chain is correct; a free mint has been set to zero on-chain by the owner.
- [ ] `saleStatus` matches the intended website state.
- [ ] Mint, wallet connect, rejected transaction, and wrong-network flows were tested.
- [ ] Desktop and mobile pages load without missing assets.
- [ ] No secret exists in the repository, browser bundle, or host environment exposed to clients.

## Rollback

Keep a dated copy of the prior static target before a release. If a release has a presentation or build issue, restore the previous runtime files and keep the collection assets intact. On-chain price and sale changes are independent of a static-site rollback.
