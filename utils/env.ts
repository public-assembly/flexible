/**
 * These values are present on the client and server.
 * They must be prefixed with NEXT_PUBLIC_.
 * */
const PROCESS = {
  CHAIN: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  ALCHEMY_KEY: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
  VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
  TWITTER_HANDLE: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
  WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
  NETWORK_URL: process.env.NEXT_PUBLIC_NETWORK_URL,
  TOKEN_ADDRESS: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
  /**
   * Environment variables necessary for onchain theming
   */
  PLATFORM_INDEX: process.env.NEXT_PUBLIC_PLATFORM_INDEX ? BigInt(Number(process.env.NEXT_PUBLIC_PLATFORM_INDEX)) : undefined,
  WEB3STORAGE_TOKEN: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN,
  WALLET_CONNECT: process.env.NEXT_PUBLIC_WALLET_CONNECT
}

// Checks that run in all environments
if (PROCESS.CHAIN !== 1 && PROCESS.CHAIN !== 5 && PROCESS.CHAIN !== 999 && PROCESS.CHAIN !== 7777777 && PROCESS.CHAIN !== 8453) {
  throw new Error(
    `${PROCESS.CHAIN} is not supported. Supported values are 1 (mainnet), 5 (goerli), 999 (zora testnet), 7777777 (zora mainnet), and 8453 (base mainnet)`
  )
}
if (!PROCESS.ALCHEMY_KEY && PROCESS.CHAIN !== 999 && PROCESS.CHAIN !== 7777777 && PROCESS.CHAIN !== 8453) {
  throw new Error('PROCESS.ALCHEMY_KEY is not set (must be set when ChainId = 1 or 5')
}
if (!PROCESS.TOKEN_ADDRESS) {
  throw new Error('PROCESS.TOKEN_ADDRESS is not set')
}

type VercelEnv = 'production' | 'preview' | 'development'
const VERCEL_ENV = PROCESS.VERCEL_ENV
  ? (PROCESS.VERCEL_ENV as VercelEnv)
  : ('development' as const)

/**
 * These values are present on the client and server.
 *
 * Some are optional. TS is the source of truth.
 */
export const ENV = {
  CHAIN: PROCESS.CHAIN,
  VERCEL_ENV: VERCEL_ENV,
  /** Cast to a string because we throw an error if this is not set */
  ALCHEMY_KEY: PROCESS.ALCHEMY_KEY as string,
  TWITTER_HANDLE: PROCESS.TWITTER_HANDLE,
  WEBSITE_URL: PROCESS.WEBSITE_URL,
  /** Cast to a string because we throw an error if this is not set */
  TOKEN_ADDRESS: PROCESS.TOKEN_ADDRESS as `0x${string}`,
  PLATFORM_INDEX: PROCESS.PLATFORM_INDEX,
  WEB3STORAGE_TOKEN: PROCESS.WEB3STORAGE_TOKEN,
  WALLET_CONNECT: process.env.NEXT_PUBLIC_WALLET_CONNECT,
} as const

export const isDev = ENV.VERCEL_ENV === 'development'
export const isPreview = ENV.VERCEL_ENV === 'preview'
export const isProd = ENV.VERCEL_ENV === 'production'
