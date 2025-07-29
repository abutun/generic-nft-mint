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
- 🖼️ **Local Assets**: Includes custom placeholder image with project branding
- 🔍 **Contract Diagnostics**: Built-in debugging tools to verify contract compatibility
- 🛠️ **Enhanced Error Handling**: Comprehensive error reporting and troubleshooting
- 📡 **Reliable RPC**: Multiple free public RPC endpoints for stable connectivity
- ⚡ **Hydration Safe**: Optimized for server-side rendering with client-side Web3
- 🎛️ **Configurable UI**: Toggle configuration panel for development vs production modes

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
# Create environment file
touch .env.local

# Add your WalletConnect Project ID
echo "NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here" >> .env.local
```

**Required Environment Variables:**

```env
# WalletConnect Project ID (Required for wallet connections)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here

# Optional: Default contract configuration
NEXT_PUBLIC_DEFAULT_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_DEFAULT_PRICE_PER_TOKEN=50000000000000000
NEXT_PUBLIC_DEFAULT_MAX_SUPPLY=10000
```

**Get a free WalletConnect Project ID:**
1. Visit [https://cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create a free account
3. Create a new project
4. Copy your Project ID to `.env.local`

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
- Use the **Contract Diagnostics** panel to verify compatibility

#### 2. Code Configuration
Edit the default configuration in `src/app/page.tsx`:

```typescript
// Feature flags
const ENABLE_CONFIGURATION_PANEL = true; // Set to false to hide configuration section

const DEFAULT_CONFIG: ContractConfig = {
  address: '0x...', // Your contract address
  name: 'Your NFT Collection',
  symbol: 'SYMBOL',
  description: 'Your collection description',
  image: '/nft-placeholder.svg', // or '/nft-placeholder.gif'
  maxSupply: 10000,
  pricePerToken: '50000000000000000', // 0.05 ETH in wei
  maxPerWallet: 10,
  isPublicSaleActive: true,
  isWhitelistSaleActive: false,
};
```

> **Example**: The app is currently configured with CMWC (Cosmic Meta War Chicks) contract for demonstration purposes. Replace with your own contract details.

### Configuration Panel Toggle

You can enable/disable the configuration section using the feature flag:

**Development Mode** (`ENABLE_CONFIGURATION_PANEL = true`):
- ✅ Shows configuration panel in left sidebar
- ✅ Contract diagnostics available
- ✅ Information panel with contract details
- ✅ 3-column layout (sidebar + minting interface)

**Production Mode** (`ENABLE_CONFIGURATION_PANEL = false`):
- 🎯 Clean, simplified UI
- 🎯 Minting interface centered and full-width
- 🎯 No configuration options visible to end users
- 🎯 Perfect for production deployments

### Required Contract Functions

Your ERC-721 contract should implement these functions:

```solidity
// Read functions
function name() external view returns (string memory);
function symbol() external view returns (string memory);
function totalSupply() external view returns (uint256);
function MAX_TOKENS() external view returns (uint256);
function price() external view returns (uint256);
function mainSale() external view returns (bool);
function balanceOf(address owner) external view returns (uint256);

// Write functions
function mint(address _to, uint256 _quantity) external payable;
```

### Optional Functions (Enhanced Features)
```solidity
// Enhanced minting features
function paused() external view returns (bool);
function maxMint() external view returns (uint256);
function preMintPrice() external view returns (uint256);
function preMint(address _to, uint256 _quantity) external payable;
function hasPresaleAccess(address wallet) external view returns (bool);
```

## Contract Diagnostics

The application includes a **built-in diagnostics tool** to help debug contract compatibility issues:

### Features
- ✅ **Address Validation**: Verifies contract address format
- 🌐 **Network Detection**: Confirms network connectivity
- 🔍 **Function Testing**: Tests basic ERC721 functions (`name`, `symbol`, `totalSupply`)
- 📊 **Real-time Status**: Shows live contract status
- 🔄 **Collapsible Interface**: Expandable diagnostics panel (initially closed)

### How to Use
1. The diagnostics panel appears in the left sidebar
2. Click on "Contract Diagnostics" to expand
3. Green ✅ icons indicate working functions
4. Red ❌ icons show errors with detailed messages
5. Use the diagnosis summary for troubleshooting guidance

### Common Status Messages
- ✅ **All tests pass**: Contract is compatible and ready to use
- ❌ **Contract not found**: Invalid address or wrong network
- ⚠️ **Partial compatibility**: Basic functions work, but custom functions may need ABI updates

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

### Placeholder Image
- Replace `public/nft-placeholder.svg` with your collection's image
- Update the `image` field in the default configuration (`src/app/page.tsx`)
- Supports any web-compatible image format (SVG, PNG, JPG, etc.)

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
- **Styling**: Tailwind CSS with Glass Morphism effects
- **Web3**: Wagmi, Viem, RainbowKit
- **RPC Providers**: Multiple free public endpoints (Cloudflare, PublicNode, 1RPC, Builder0x69)
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Error Handling**: Custom error boundaries and diagnostics
- **Components**: Collapsible UI, Client-side only rendering
- **Package Manager**: npm/yarn

## Key Components

- **MintInterface**: Main minting component with wallet integration
- **ContractDiagnostics**: Real-time contract testing and debugging
- **ClientOnly**: Prevents hydration errors with Web3 components
- **Providers**: Web3 provider configuration with multiple RPC endpoints

## Contract Requirements

Your NFT contract should be ERC-721 compatible and include:

1. **Public minting function**: `mint(address _to, uint256 _quantity) payable`
2. **Price getter**: `price() returns (uint256)`
3. **Supply tracking**: `totalSupply()` and `MAX_TOKENS()`
4. **Sale status**: `mainSale() returns (bool)`

## Security Considerations

- This is a client-side application - no private keys are stored
- Always verify contract addresses before minting
- Test on testnets before mainnet deployment
- Users should verify transaction details in their wallet

## Troubleshooting

### Common Issues

**ABI Encoding Error**: 
- Ensure your contract's `mint` function signature matches: `mint(address _to, uint256 _quantity)`
- Verify function names match the ABI: `price()`, `mainSale()`, `MAX_TOKENS()`

**RPC/Connection Issues**:
- **HTTP 401 Unauthorized**: The app uses free public RPC endpoints that don't require API keys
- **Internal Error**: Usually indicates RPC provider issues or invalid contract address
- **Missing WalletConnect Project ID**: Add `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` to `.env.local`

**Hydration Errors**:
- The app uses `ClientOnly` components to prevent server-side rendering issues
- If you see hydration mismatches, ensure you're not importing Web3 components on the server
- Refresh the page if wallet connection state appears inconsistent

**Contract Diagnostics Errors**:
- **Red ❌ Contract not found**: Verify the contract address and ensure you're on the correct network
- **Network not connected**: Connect your wallet or check network configuration
- **Function call failures**: Contract may not implement required ERC721 functions

**Transaction Failures**:
- Ensure sufficient ETH balance for gas fees and mint price
- Check if public sale is active on the contract
- Verify you haven't exceeded max tokens per wallet
- Use Contract Diagnostics to verify contract state

### Advanced Debugging

**Use Contract Diagnostics**:
1. Click on "Contract Diagnostics" in the sidebar
2. Check each test result for specific error messages
3. Use the diagnosis summary for troubleshooting guidance

**Console Logs**:
- Open browser developer tools (F12)
- Check the Console tab for detailed error messages
- Look for Web3 provider connection issues

**RPC Provider Debugging**:
The app tries multiple RPC providers in this order:
1. Cloudflare ETH (`https://cloudflare-eth.com`)
2. PublicNode (`https://ethereum-rpc.publicnode.com`)
3. 1RPC (`https://1rpc.io/eth`)
4. Builder0x69 (`https://rpc.builder0x69.io`)
5. Wagmi Public Provider (fallback)

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