import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // MongoDB configuration
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/ordinals-swap',

  // JWT configuration
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',

  // Web3 configuration
  web3Provider: process.env.WEB3_PROVIDER || 'http://localhost:8545',
  networkId: process.env.NETWORK_ID || '1',

  // Ordinals API configuration
  ordinalsApiUrl: process.env.ORDINALS_API_URL || 'https://api.ordinals.com',
  ordinalsApiKey: process.env.ORDINALS_API_KEY,

  // Rate limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100'),

  // Swap configuration
  minSwapAmount: parseFloat(process.env.MIN_SWAP_AMOUNT || '0.0001'),
  maxSwapAmount: parseFloat(process.env.MAX_SWAP_AMOUNT || '1.0'),
  swapFeePercentage: parseFloat(process.env.SWAP_FEE_PERCENTAGE || '0.5'),

  // Security
  corsOrigin: process.env.CORS_ORIGIN || '*',
  enableRateLimit: process.env.ENABLE_RATE_LIMIT === 'true',
} as const; 