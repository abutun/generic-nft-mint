# Deployment Guide: Cosmic Meta War Chicks

## 🚀 Production Deployment to mint.cosmicmeta.io/war-chicks

This guide covers deploying the Cosmic Meta War Chicks minting interface to your production domain.

## 📋 Pre-Deployment Checklist

### ✅ Configuration Verification

**1. Production Settings Enabled:**
```typescript
// src/app/page.tsx
const ENABLE_CONFIGURATION_PANEL = false; // ✅ Clean UI for end users
```

**2. Contract Configuration:**
```typescript
const DEFAULT_CONFIG: ContractConfig = {
  address: '0xcAdb229D7989Aa25D35A8eEe7539E08E43c55fE8', // ✅ War Chicks contract
  name: 'Cosmic Meta War Chicks',
  symbol: 'CMWC',
  maxSupply: 2222,
  pricePerToken: '12500000000000000', // 0.0125 ETH
  // ... other settings
};
```

**3. Environment Variables:**
```env
# .env.local or .env.production
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_production_project_id
```

### 🖼️ Assets Preparation

**Replace Placeholder Image:**
1. Replace `public/nft-placeholder.gif` with War Chicks artwork
2. Optimize image for web (recommended: WebP format, <500KB)
3. Update `image` field in config if using different filename

**SEO Optimization:**
- Update `public/favicon.ico` with War Chicks logo
- Add `public/og-image.png` for social media sharing
- Consider updating `src/app/layout.tsx` with proper meta tags

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

**Quick Deploy:**
```bash
# Install Vercel CLI
npm i -g vercel

# Build and deploy
npm run build
vercel --prod

# Set custom domain
vercel domains add mint.cosmicmeta.io
vercel alias your-deployment-url.vercel.app mint.cosmicmeta.io
```

**Environment Variables in Vercel:**
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add: `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` = `your_production_project_id`
3. Redeploy to apply changes

### Option 2: Custom Server/VPS

**Build for Production:**
```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start production server
npm start
```

**Nginx Configuration Example:**
```nginx
server {
    listen 80;
    server_name mint.cosmicmeta.io;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**SSL Certificate:**
```bash
# Using certbot for Let's Encrypt
sudo certbot --nginx -d mint.cosmicmeta.io
```

### Option 3: Netlify

**Deploy Steps:**
1. Build: `npm run build && npm run export`
2. Upload `out/` folder to Netlify
3. Set custom domain: `mint.cosmicmeta.io`
4. Add environment variables in Netlify dashboard

## 🔧 Production Optimizations

### Performance

**1. Image Optimization:**
```bash
# Optimize images before deployment
npm install -g imagemin-cli
imagemin public/*.{jpg,png,gif} --out-dir=public/optimized
```

**2. Bundle Analysis:**
```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

### Security

**1. Content Security Policy (CSP):**
Add to `next.config.js`:
```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ]
  }
}
```

**2. Environment Variables Security:**
- Never expose private keys in environment variables
- Use production WalletConnect Project ID
- Verify all public environment variables

## 📊 Monitoring & Analytics

### Web3 Monitoring

**1. Contract Monitoring:**
- Monitor contract events for mint transactions
- Track gas usage and transaction success rates
- Set up alerts for contract errors

**2. User Analytics:**
```javascript
// Add to components for tracking
gtag('event', 'mint_attempt', {
  contract_address: config.address,
  quantity: quantity,
  user_address: userAddress
});
```

### Error Tracking

**Sentry Integration:**
```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: 'production'
});
```

## 🧪 Testing Before Deploy

### Pre-Production Tests

**1. Testnet Testing:**
- Deploy to Goerli/Sepolia first
- Test all minting scenarios
- Verify error handling

**2. Load Testing:**
```bash
# Install artillery for load testing
npm install -g artillery
artillery quick --count 100 --num 10 https://mint.cosmicmeta.io/war-chicks
```

**3. Cross-Browser Testing:**
- Test on Chrome, Firefox, Safari, Edge
- Test mobile wallet apps (MetaMask Mobile, WalletConnect)
- Verify responsive design

## 🚨 Post-Deployment

### Launch Checklist

**1. Functionality Tests:**
- [ ] Wallet connection works
- [ ] Contract diagnostics show green
- [ ] Minting transactions complete successfully
- [ ] Error messages display correctly
- [ ] Mobile responsiveness verified

**2. Performance Tests:**
- [ ] Page load time < 3 seconds
- [ ] Images load properly
- [ ] No console errors
- [ ] Web3 provider connections stable

**3. SEO & Social:**
- [ ] Meta tags display correctly
- [ ] Open Graph images work
- [ ] Twitter cards render properly
- [ ] Favicon loads correctly

### Monitoring Setup

**1. Uptime Monitoring:**
```bash
# Using UptimeRobot or similar
curl -X POST "https://api.uptimerobot.com/v2/newMonitor" \
  -d "api_key=your_api_key" \
  -d "type=1" \
  -d "url=https://mint.cosmicmeta.io/war-chicks" \
  -d "friendly_name=War Chicks Mint Site"
```

**2. Error Alerts:**
- Set up Sentry alerts for critical errors
- Monitor wallet connection failures
- Track transaction failure rates

## 🎯 Domain-Specific Configuration

### Subdomain Setup (mint.cosmicmeta.io)

**DNS Configuration:**
```
Type: A
Name: mint
Value: [Your server IP]
TTL: 300
```

**Or CNAME for services like Vercel:**
```
Type: CNAME  
Name: mint
Value: cname.vercel-dns.com
TTL: 300
```

### Path-Based Routing (/war-chicks)

If using path-based routing instead of subdomain:

**Next.js Configuration:**
```javascript
// next.config.js
const nextConfig = {
  basePath: '/war-chicks',
  assetPrefix: '/war-chicks'
}
```

**Update all asset paths:**
```typescript
// Update image references
image: '/war-chicks/nft-placeholder.gif'
```

## 🔄 Maintenance

### Regular Updates

**1. Dependencies:**
```bash
# Monthly security updates
npm audit fix
npm update
```

**2. RPC Endpoints:**
- Monitor RPC provider uptime
- Update endpoints if services change
- Test fallback providers

**3. Contract Monitoring:**
- Verify contract functions still work
- Monitor for any contract upgrades
- Test minting periodically

### Backup Strategy

**1. Code Backup:**
- Keep deployment branch in Git
- Tag production releases
- Document configuration changes

**2. Environment Backup:**
- Backup environment variables
- Document deployment configuration
- Keep deployment scripts updated

---

## 🎉 Ready to Deploy!

Your Cosmic Meta War Chicks minting site is now ready for production deployment to `mint.cosmicmeta.io/war-chicks`!

### Quick Deploy Commands:

```bash
# Final check
npm run build
npm run start

# Deploy to Vercel
vercel --prod

# Or build for custom server
npm run build
```

**Remember:**
- Test thoroughly before going live
- Monitor closely after launch
- Have rollback plan ready
- Keep environment variables secure

Good luck with your War Chicks launch! 🚀✨ 