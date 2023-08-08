import { ENV } from 'utils/env'

export const ETHERSCAN_BASE_URL = {
  1: 'https://etherscan.io',
  5: 'https://goerli.etherscan.io',
  999: 'https://testnet.explorer.zora.energy/',
  7777777: 'https://explorer.zora.energy/',
  8453: "https://base.blockscout.com"
}[ENV.CHAIN]

export const ETHER_ACTOR_BASE_URL = 'https://ether.actor'
