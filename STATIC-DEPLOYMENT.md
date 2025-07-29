# Static Deployment Guide 📁

## 🎯 Generate Static Files for Server Upload

This guide shows how to generate static files that you can upload directly to any web server without needing Node.js/npm on the server.

**✅ Centrally configured via `deployment.config.js`**  
All paths, assets, resources, and contract information are automatically managed from one configuration file.

**🔄 Multi-Project Ready**  
Use the same codebase for multiple NFT collections by simply changing the configuration file!

## 🚀 Quick Start

### 1. Generate Static Files

```bash
# Install dependencies (only needed once)
npm install

# Generate static export
npm run deploy
```

**This automatically:**
- ✅ Generates the PWA manifest from your contract configuration
- ✅ Creates an `/out` folder with all static files ready for upload! 📦
- ✅ Configures all asset paths based on your `DEPLOYMENT_PATH`

### 2. Upload to Server

The `/out` folder contains everything you need:
```
out/
├── index.html                    # Main page
├── _next/                       # JavaScript and CSS files  
├── logo.png                     # Your brand logo
├── nft-placeholder.gif          # Your NFT image
├── favicon.ico                  # Main favicon
├── favicon-16x16.png           # Small favicon
├── favicon-32x32.png           # Medium favicon
├── apple-touch-icon.png        # iOS icon
├── android-chrome-192x192.png  # Android icon (small)
├── android-chrome-512x512.png  # Android icon (large)
├── site.webmanifest            # PWA manifest
├── og-image.png                # Social media image (optional)
└── ...                         # All other assets
```

**Simply upload the entire `/out` folder contents to your web server! 🌐**

## 📋 Step-by-Step Instructions

### Step 1: Prepare Environment

Create `.env.local` file:
```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_production_project_id
```

### Step 2: Replace Assets (Required)

```bash
# Replace placeholder with your War Chicks artwork
cp your-war-chicks-image.gif public/nft-placeholder.gif

# Add your logo (REQUIRED)
cp your-logo.png public/logo.png

# Add favicon files (REQUIRED)
cp your-favicon.ico public/favicon.ico
cp your-favicon-16x16.png public/favicon-16x16.png
cp your-favicon-32x32.png public/favicon-32x32.png
cp your-apple-touch-icon.png public/apple-touch-icon.png
cp your-android-chrome-192x192.png public/android-chrome-192x192.png
cp your-android-chrome-512x512.png public/android-chrome-512x512.png

# Add social media image (OPTIONAL)
cp your-og-image.png public/og-image.png
```

**⚠️ Important:** Make sure to add all required assets to the `public` folder before deploying!

### Favicon Requirements

Generate a complete favicon package from your logo:

**Required Files:**
- `favicon.ico` (16x16, 32x32, 48x48)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

**Recommended Tools:**
- [Favicon.io](https://favicon.io/) - Generate from logo
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Complete package

### Step 3: Generate Static Files

```bash
# Generate production-ready static files
npm run deploy
```

**Output:**
```
✨ Static files generated in /out folder - ready for upload!
```

### Step 4: Upload to Server

**Upload Methods:**

**A) FTP/SFTP:**
```bash
# Using SCP (replace with your server details)
scp -r out/* user@mint.cosmicmeta.io:/var/www/html/war-chicks/

# Using rsync
rsync -av out/ user@mint.cosmicmeta.io:/var/www/html/war-chicks/
```

**B) Control Panel File Manager:**
1. Compress `out` folder → `war-chicks.zip`
2. Upload via hosting control panel
3. Extract to your domain folder

**C) Git Deployment:**
```bash
# Create deployment repository
git init
git add out/*
git commit -m "War Chicks deployment"
git push origin main
```

## 🌐 Server Configuration

### Apache (.htaccess)

Create `.htaccess` in your `/war-chicks/` upload folder:
```apache
RewriteEngine On

# Handle client-side routing for subdirectory deployment
RewriteBase /war-chicks/
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /war-chicks/index.html [L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Cache static assets
<filesMatch "\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
</filesMatch>
```

**✅ Paths are automatically configured:**
All CSS, JS, images, and other assets will load from `/war-chicks/` subdirectory.

### Nginx

Add to your nginx config:
```nginx
location /war-chicks/ {
    alias /var/www/html/war-chicks/;
    try_files $uri $uri/ /war-chicks/index.html;
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    
    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|svg|woff|woff2)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }
}
```

## 📁 File Structure After Upload

```
your-server/
└── var/www/html/war-chicks/          # Your site root
    ├── index.html                    # ✅ Main minting page
    ├── _next/                        # ✅ App assets
    │   ├── static/chunks/            # JavaScript bundles
    │   └── static/css/               # Stylesheets
    ├── logo.png                      # ✅ Your brand logo
    ├── nft-placeholder.gif           # ✅ Your NFT image
    ├── favicon.ico                   # ✅ Main favicon
    ├── favicon-16x16.png            # ✅ Small favicon
    ├── favicon-32x32.png            # ✅ Medium favicon
    ├── apple-touch-icon.png         # ✅ iOS icon
    ├── android-chrome-192x192.png   # ✅ Android icon (small)
    ├── android-chrome-512x512.png   # ✅ Android icon (large)
    ├── site.webmanifest             # ✅ PWA manifest
    ├── og-image.png                 # ✅ Social media image
    └── .htaccess                    # ✅ Server config (if Apache)
```

## 🔧 Path Configuration (Centralized & Configurable)

### ✅ Single Configuration File

The app uses a **centralized configuration** system for easy path management:

```javascript
// deployment.config.js (✅ Single source of truth)
const CONTRACT_ADDRESS = '0xcAdb229D7989Aa25D35A8eEe7539E08E43c55fE8';
const CONTRACT_NAME = 'Cosmic Meta War Chicks';
const DEPLOYMENT_PATH = '/war-chicks';  // 👈 Change this to deploy anywhere!

// Auto-generates all paths and configurations:
const config = {
  CONTRACT_ADDRESS,
  CONTRACT_NAME,
  // ... all contract settings
  basePath: DEPLOYMENT_PATH,
  assetPrefix: DEPLOYMENT_PATH,
  paths: {
    favicon: DEPLOYMENT_PATH + '/favicon.ico',
    logo: DEPLOYMENT_PATH + '/logo.png',
    // ... all other paths
  }
};
```

**Current Configuration:**
- Site URL: `https://mint.cosmicmeta.io/war-chicks/`
- CSS files: `https://mint.cosmicmeta.io/war-chicks/_next/static/css/...`
- JS files: `https://mint.cosmicmeta.io/war-chicks/_next/static/chunks/...`
- Images: `https://mint.cosmicmeta.io/war-chicks/logo.png`
- All paths automatically work! ✅

### 🎯 Deploy to Different Paths

**To change deployment path, edit ONE file:**

```javascript
// deployment.config.js
const DEPLOYMENT_PATH = '/your-new-path';  // Change this line only!
```

**Examples:**
- `'/nft-mint'` → `mint.cosmicmeta.io/nft-mint/`
- `'/collection'` → `mint.cosmicmeta.io/collection/`
- `''` → `mint.cosmicmeta.io/` (root domain)

Then regenerate:
```bash
npm run deploy
```

**✅ Everything updates automatically:**
- Next.js configuration
- All asset paths
- Favicon paths
- Meta tags
- PWA manifest
- Open Graph images

## ✅ Verification Checklist

After upload, test these URLs:

**1. Functionality Tests:**
- [ ] `https://mint.cosmicmeta.io/war-chicks/` - Main page loads ✅
- [ ] All CSS/JS assets load from `/war-chicks/_next/...` ✅
- [ ] Logo displays correctly at the top ✅
- [ ] Favicon appears in browser tab ✅
- [ ] Images load from correct paths (check Network tab) ✅
- [ ] Wallet connection works (MetaMask, WalletConnect)
- [ ] Contract diagnostics show green (if enabled)
- [ ] Mobile responsive design works
- [ ] Error messages display correctly

## 🚨 Troubleshooting

### Common Issues:

**❌ Blank page / JavaScript errors:**
```bash
# Check browser console for CORS errors
# Ensure all files uploaded correctly
# Verify .htaccess configuration
```

**❌ Images not loading:**
```bash
# Check file paths in browser network tab
# Ensure logo.png and other image files uploaded to correct location
# Verify permissions (755 for directories, 644 for files)
# Make sure logo.png exists in public folder before building
```

**❌ Favicon not showing:**
```bash
# Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
# Check if all favicon files are uploaded correctly
# Verify favicon.ico, favicon-16x16.png, favicon-32x32.png exist
# Test in incognito/private browsing mode
# Allow 24-48 hours for favicon caching to clear on some browsers
```

**❌ Wallet connection fails:**
```bash
# Verify NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is set
# Check browser console for WalletConnect errors
# Test on different browsers/devices
```

**❌ 404 errors on refresh:**
```bash
# Add .htaccess for Apache
# Configure nginx try_files
# Enable client-side routing support
```

## 🔄 Update Process

When you need to update the site:

```bash
# 1. Make your changes to the code
# 2. Regenerate static files
npm run deploy

# 3. Re-upload the /out folder
scp -r out/* user@mint.cosmicmeta.io:/var/www/html/war-chicks/

# 4. Clear any caches (CDN, browser)
```

## 📊 Performance Tips

**Optimize for Static Hosting:**

1. **Compress Assets:**
```bash
# Gzip compression (if server supports)
find out -name "*.js" -o -name "*.css" -o -name "*.html" | xargs gzip -k
```

2. **CDN Integration:**
- Upload to CDN (Cloudflare, AWS CloudFront)
- Update DNS to point to CDN

3. **Monitoring:**
- Set up uptime monitoring
- Monitor Core Web Vitals
- Track minting success rates

## 🎉 You're Ready!

Your **Cosmic Meta War Chicks** minting site is now:

✅ **Serverless** - No Node.js required on server  
✅ **Fast** - Static files load instantly  
✅ **Secure** - No server-side vulnerabilities  
✅ **Scalable** - Can handle high traffic  
✅ **Simple** - Easy to deploy and maintain  

### Quick Deploy Summary:

```bash
# 1. Generate files
npm run deploy

# 2. Upload /out folder to server
# 3. Configure .htaccess or nginx
# 4. Test and launch! 🚀
```

**Your War Chicks are ready to fly! 🐣⚔️✨** 