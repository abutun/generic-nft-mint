# Static Deployment and Multi-Mint Publishing

`next.config.js` uses `output: 'export'`, so each selected collection is emitted as static HTML, JavaScript, and a web manifest in `out/`.

## One collection, one build

Choose a profile and build it. Do not reuse an `out/` folder for another collection without rebuilding; `npm run build` removes stale Next.js output first.

```bash
MINT_CONFIG_PATH=/absolute/path/to/collections.config.js \
MINT_COLLECTION=collection-a \
npm run build
```

For an in-repository profile map, omit `MINT_CONFIG_PATH`:

```bash
MINT_COLLECTION=default npm run build
```

The selected profile determines the exported base path, assets, manifest, SEO metadata, and app configuration.

## Publish into an existing static root

Assume this host structure:

```text
/var/www/mint/
├── collection-a/
│   ├── logo.png
│   ├── nft-placeholder.gif
│   └── ... other collection-a assets
└── collection-b/
    ├── logo.png
    ├── nft-placeholder.gif
    └── ... other collection-b assets
```

Build and publish each profile separately:

```bash
MINT_CONFIG_PATH=/absolute/path/to/collections.config.js \
MINT_COLLECTION=collection-a \
npm run build

MINT_CONFIG_PATH=/absolute/path/to/collections.config.js \
MINT_COLLECTION=collection-a \
MINT_STATIC_ROOT=/var/www/mint \
npm run publish:collection

MINT_CONFIG_PATH=/absolute/path/to/collections.config.js \
MINT_COLLECTION=collection-b \
npm run build

MINT_CONFIG_PATH=/absolute/path/to/collections.config.js \
MINT_COLLECTION=collection-b \
MINT_STATIC_ROOT=/var/www/mint \
npm run publish:collection
```

The publisher derives the target from the selected profile's `deploymentPath`, so `collection-a` can be named differently from its URL path if required. It does not infer a site root: `MINT_STATIC_ROOT` is intentionally required.

## Root deployment

For a root profile (`deploymentPath: ''`), the publisher targets the static root itself:

```bash
MINT_COLLECTION=default npm run build
MINT_COLLECTION=default MINT_STATIC_ROOT=/var/www/mint npm run publish:collection
```

Ensure the root directory already exists and contains the root collection's assets. The publisher will reject an absent target rather than create a partially branded mint site.

## Web-server configuration

The export has trailing-slash paths, so a web server must serve `index.html` inside a folder. A minimal Nginx configuration is:

```nginx
server {
    listen 443 ssl http2;
    server_name mint.example.com;
    root /var/www/mint;
    index index.html;

    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }

    location /_next/static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

If separate collection pages live in `/collection-a/` and `/collection-b/`, their own `_next` directories are served through the same static root and no reverse proxy is needed.

## Asset integrity checks

Before and after publishing, compare the asset names and checksums inside every collection folder. On macOS or Linux:

```bash
shasum /var/www/mint/collection-a/logo.png \
  /var/www/mint/collection-a/nft-placeholder.gif \
  /var/www/mint/collection-b/logo.png \
  /var/www/mint/collection-b/nft-placeholder.gif
```

The files within a particular collection should keep their checksum across a runtime-only publish. Different collections may intentionally have different checksums.

## Verify before announcing

For each profile, inspect the final URL in a normal browser session:

- title, logo, placeholder, and social image match the collection;
- asset URLs start with the right deployment path;
- manifest `start_url` and `scope` match the profile;
- the contract address and displayed supply are correct;
- the contract's live price is correct;
- sold-out collections have a disabled mint action;
- the mobile layout has no horizontal overflow.

For a paid mint, verify the wallet asks for the exact expected amount. For a free mint, verify `price()` returns zero from the live contract; changing only the static profile is not sufficient.

## Manual upload alternative

If you do not use the publisher, copy the contents of `out/` to the exact static target after first preserving or restoring that target's collection assets. Never copy one collection's `public/` asset set over another collection's target folder.
