import { ETHERSCAN_BASE_URL } from "constants/etherscan";

export const isServerSide = () => typeof window === 'undefined'

const NOUNS_BUILDER_BASE_URL = 'https://nouns.build'

export const buildCreateProposalUrl = (daoAddress: string) => new URL(`/dao/${daoAddress}/proposal/create`, NOUNS_BUILDER_BASE_URL).toString()

export const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `${r} ${g} ${b})`;
}

export const buildEtherscanAddressLink = (address: string) => {
  return new URL(`/address/${address}`, ETHERSCAN_BASE_URL).toString()
}

type EtherscanLinkType = 'address' | 'tx' | 'contract'

export function buildEtherscanLink(type: EtherscanLinkType, hash?: string) {
  return new URL(`/${type}/${hash}`, ETHERSCAN_BASE_URL).toString()
}