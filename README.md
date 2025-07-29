# Generic NFT Mint

A beautiful, configurable NFT minting interface for any ERC-721 contract. Built with Next.js, TypeScript, and modern Web3 technologies.

## Features

- 🎨 **Beautiful UI**: Modern, responsive design with glass morphism effects
- 🔗 **Multi-Wallet Support**: Connect with MetaMask, WalletConnect, and more
- ⚙️ **Configurable**: Easy contract configuration through the UI
- 🌐 **Multi-Network**: Support for Ethereum, Polygon, Arbitrum, and more
- 📱 **Mobile Friendly**: Fully responsive design
- 🚀 **Fast & Reliable**: Built with Next.js and optimized Web3 libraries
- 🔒 **Secure**: Client-side only, no data collection

## Quick Start

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/your-username/generic-nft-mint.git
cd generic-nft-mint

# Install dependencies
npm install
# or
yarn install
```

### 2. Environment Setup

```bash
# Copy the environment template
cp .env.example .env.local

# Edit .env.local with your configuration
# Get a WalletConnect Project ID at https://cloud.walletconnect.com
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Contract Configuration

You can configure the NFT contract in two ways:

#### 1. Through the UI (Recommended)
- Click "Configure Contract" in the left panel
- Enter your contract address and settings
- Save the configuration

#### 2. Environment Variables
Set these in your `.env.local` file:

```env
NEXT_PUBLIC_DEFAULT_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_DEFAULT_PRICE_PER_TOKEN=50000000000000000
NEXT_PUBLIC_DEFAULT_MAX_SUPPLY=10000
```

### Required Contract Functions

Your ERC-721 contract should implement these functions:

```solidity
// Read functions
function name() external view returns (string memory);
function symbol() external view returns (string memory);
function totalSupply() external view returns (uint256);
function maxSupply() external view returns (uint256);
function cost() external view returns (uint256);
function publicSale() external view returns (bool);
function balanceOf(address owner) external view returns (uint256);

// Write functions
function mint(uint256 _mintAmount) external payable;
```

## Supported Networks

- Ethereum Mainnet
- Polygon
- Arbitrum
- Optimism
- Goerli (Testnet)
- Sepolia (Testnet)

## Customization

### Styling
- Edit `src/app/globals.css` for global styles
- Modify Tailwind configuration in `tailwind.config.js`
- Customize components in `src/components/`

### Contract ABI
If your contract has different function names, update the ABI in:
- `src/lib/contract-abi.ts`

### Add New Networks
Edit the network configuration in:
- `src/components/providers.tsx`

## Deployment

### Vercel (Recommended)

```bash
# Build the project
npm run build

# Deploy to Vercel
npx vercel
```

### Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Technologies Used

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3**: Wagmi, Viem, RainbowKit
- **Icons**: Lucide React
- **Package Manager**: npm/yarn

## Contract Requirements

Your NFT contract should be ERC-721 compatible and include:

1. **Public minting function**: `mint(uint256 quantity) payable`
2. **Price getter**: `cost() returns (uint256)`
3. **Supply tracking**: `totalSupply()` and `maxSupply()`
4. **Sale status**: `publicSale() returns (bool)`

## Security Considerations

- This is a client-side application - no private keys are stored
- Always verify contract addresses before minting
- Test on testnets before mainnet deployment
- Users should verify transaction details in their wallet

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- Create an issue on GitHub for bugs
- Join our Discord for community support
- Check the documentation for common questions

---

Built with ❤️ for the Web3 community 