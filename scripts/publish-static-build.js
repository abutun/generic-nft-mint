#!/usr/bin/env node

/**
 * Copy only generated runtime files into the active profile's static folder.
 * Existing collection artwork stays untouched.
 */
const fs = require('fs');
const path = require('path');
const deploymentConfig = require('../deployment.config.js');

const root = path.resolve(__dirname, '..');
const staticRootInput = process.env.MINT_STATIC_ROOT;
const outDir = path.join(root, 'out');

if (!staticRootInput) {
  throw new Error('Set MINT_STATIC_ROOT to the static site root before publishing.');
}

const staticRoot = path.resolve(staticRootInput);
const targetDir = path.resolve(staticRoot, deploymentConfig.basePath.replace(/^\/+/, ''));
const relativeTarget = path.relative(staticRoot, targetDir);

if (relativeTarget.startsWith('..') || path.isAbsolute(relativeTarget)) {
  throw new Error('Refusing to publish outside MINT_STATIC_ROOT.');
}

if (!fs.existsSync(targetDir)) {
  throw new Error(`Static target does not exist: ${targetDir}. Add its collection assets before publishing.`);
}

for (const entry of ['_next', '404', '404.html', 'index.html', 'index.txt', 'site.webmanifest']) {
  const source = path.join(outDir, entry);
  if (!fs.existsSync(source)) continue;

  fs.cpSync(source, path.join(targetDir, entry), {
    recursive: true,
    force: true,
  });
}

console.log(`Published ${deploymentConfig.COLLECTION_SLUG} runtime to ${targetDir}`);
