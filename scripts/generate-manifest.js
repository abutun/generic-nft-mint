#!/usr/bin/env node

/**
 * Generate site.webmanifest dynamically based on deployment configuration
 */

const fs = require('fs');
const path = require('path');
const deploymentConfig = require('../deployment.config.js');

const manifest = {
  "name": deploymentConfig.CONTRACT_NAME,
  "short_name": deploymentConfig.CONTRACT_SHORT_NAME,
  "description": deploymentConfig.CONTRACT_DESCRIPTION,
  "icons": [
    {
      "src": deploymentConfig.paths.androidIcon192,
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": deploymentConfig.paths.androidIcon512,
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#1e1b4b",
  "background_color": "#0f172a",
  "display": "standalone",
  "orientation": "portrait",
  "start_url": deploymentConfig.pwa.startUrl,
  "scope": deploymentConfig.pwa.scope
};

// Write to public folder
const publicDir = path.join(__dirname, '..', 'public');
const manifestPath = path.join(publicDir, 'site.webmanifest');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write the manifest file
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log('✅ Generated site.webmanifest with deployment configuration');
console.log(`   Path: ${deploymentConfig.basePath || 'root'}`);
console.log(`   Start URL: ${manifest.start_url}`);
console.log(`   Scope: ${manifest.scope}`); 