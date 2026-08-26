# Generic NFT Mint

A static, multi-collection mint front end for compatible ERC-721 contracts. It is built with Next.js, TypeScript, wagmi, ethers, and RainbowKit, and can publish independent collections from one codebase.

The repository ships with safe example profiles only. Your collection addresses, branding, and deployment URLs belong in your own configuration file.

## What it supports

- One build profile per collection, selected with `MINT_COLLECTION`
- A root site or any number of subdirectory sites such as `/collection-a/`
- Free mints, paid mints, and a UI-level sold-out state
- Collection-specific SEO, PWA manifest, images, and static-export paths
- Static hosting with no server-side wallet or private-key handling
- Optional development diagnostics; hidden in the production UI by default

## Important: contract state is authoritative

The app reads `price()` and sale state from the contract at runtime. `pricePerToken` is only the initial UI fallback while that read is unavailable. A free mint requires the contract owner to execute the contract's own price update (for example `setPrice(0)`) on-chain.

Likewise, `saleStatus: 'sold-out'` disables the UI, but it does not alter a contract. Use it as a clear website state after confirming the collection is exhausted or the sale should no longer be offered.

## Quick start

```bash
git clone https://github.com/abutun/generic-nft-mint.git
cd generic-nft-mint
npm install

# WalletConnect project ID used by RainbowKit
printf 'NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id\n' > .env.local

# Start the example root profile
MINT_COLLECTION=default npm run dev
```

Open <http://localhost:3000>. Replace the placeholder details in `collections.config.js` before using the app publicly.

## Collection profiles

`collections.config.js` is a map. The key is the profile name passed as `MINT_COLLECTION`; each entry controls exactly one build.

```js
module.exports = {
  'my-collection': {
    deploymentPath: '/my-collection',
    siteOrigin: 'https://mint.example.com',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    name: 'My Collection',
    shortName: 'My NFT',
    symbol: 'MNFT',
    description: 'A concise collection description.',
    maxSupply: 1000,
    pricePerToken: '0', // wei; a fallback, not an on-chain update
    maxPerWallet: 3,
    websiteUrl: 'https://example.com', // use '' to hide
    whitepaperUrl: '', // use '' to hide
    saleStatus: 'active', // 'active' or 'sold-out'
  },
};
```

Required fields are validated when the build starts. `deploymentPath` is `''` for the domain root, or a safe URL subpath such as `/my-collection`. Contract addresses must be valid 20-byte `0x` addresses.

Use a wei string for `pricePerToken`: `10000000000000000` is `0.01 ETH`, and `0` represents a free-mint fallback.

## Keep production profiles outside the template

For a reusable fork, do not commit client-specific data to this repository. Put the profile map in a separate location and supply it at build time:

```bash
MINT_CONFIG_PATH=/absolute/path/to/collections.config.js \
MINT_COLLECTION=my-collection \
npm run build
```

`MINT_CONFIG_PATH` is resolved by the build process only. The selected profile is serialized into the static output; no other profiles are exposed in that build.

Keep each production site's profile map with that site's deployment files or in its private build configuration.

## Build a profile

```bash
# Root profile
MINT_COLLECTION=default npm run build

# Subdirectory profile from an external map
MINT_CONFIG_PATH=/absolute/path/to/collections.config.js \
MINT_COLLECTION=my-collection \
npm run build
```

`npm run build` clears the prior Next.js output, generates the correct manifest, and exports static files to `out/`. `build:collection` is an alias that makes the same build command explicit in CI.

For a full static deployment guide, see [STATIC-DEPLOYMENT.md](STATIC-DEPLOYMENT.md). For managed-host and safety guidance, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Assets and collection isolation

Every collection needs its own assets with these names in the static target it will serve:

```text
logo.png
nft-placeholder.gif
favicon.ico
favicon-16x16.png
favicon-32x32.png
apple-touch-icon.png
android-chrome-192x192.png
android-chrome-512x512.png
og-image.png
```

The static publisher copies only the generated application runtime (`_next`, HTML, text export, and manifest). It deliberately leaves the assets above untouched, so a publish for one profile cannot replace another collection's artwork.

## Contract compatibility

The mint UI expects the ERC-721 contract ABI in `src/lib/contract-abi.ts` to match your contract. It uses standard metadata reads plus the mint and sale functions supported by that ABI. Before launch, test a mint on a testnet or with the intended mainnet contract and verify:

- the connected wallet is on the expected network;
- `price()` returns the intended amount;
- sale/paused checks reflect the contract state;
- the mint function, quantity limit, and payment value match the contract;
- transaction confirmation and error messages work in a real wallet.

If your contract exposes different function names or uses a different mint flow, update the ABI and mint hooks before deploying.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Generate the manifest and start Next.js development mode. |
| `npm run build` | Clean, generate the manifest, and statically export the selected profile. |
| `npm run build:collection` | Alias for `npm run build`; pair it with the profile environment variables. |
| `npm run publish:collection` | Copy only runtime output into an existing static target. Requires `MINT_STATIC_ROOT`. |
| `npm run type-check` | Run TypeScript validation. |
| `npm run lint` | Run the Next.js lint command. |

## Production UI

`src/app/page.tsx` has `ENABLE_CONFIGURATION_PANEL = false` by default. Keep it false for public sites: the profile file is the production source of truth. Set it to `true` only when locally inspecting a contract or testing the configuration panel.

## Security notes

- Never put a private key, owner wallet seed phrase, or API secret in this app or a `NEXT_PUBLIC_*` variable.
- WalletConnect IDs are public identifiers and belong in `.env.local` or your host's environment settings.
- A static deployment cannot execute owner-only contract actions. Use the owner wallet and a trusted wallet interface for actions such as `setPrice(0)`.
- Review the final output and live contract values before announcing a mint.

## License

See the repository license, if present, before redistribution or commercial use.
