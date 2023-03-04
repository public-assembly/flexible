import { ENV } from 'utils/env';

export const ETHERSCAN_BASE_URL = {
  1: "https://etherscan.io",
  5: "https://goerli.etherscan.io",
}[ENV.CHAIN]

export const ETHER_ACTOR_BASE_URL = "https://ether.actor"