/**
 * Modified from ourzora/nouns-builder
 * https://github.com/ourzora/nouns-builder/blob/main/apps/web/src/components/NetworkController/index.tsx
 * */

import { ENV } from '@/utils/env'
import { ReactNode } from 'react'

interface NetworkControllerProps {
  children: ReactNode
}

interface FeatureContainerProps {
  children: ReactNode
}

const showFeature = (chainId: number) => chainId === ENV.CHAIN

const FeatureMainnet = ({ children }: FeatureContainerProps) => {
  if (showFeature(1)) return <>{children}</>
  return null
}

const FeatureTestnet = ({ children }: FeatureContainerProps) => {
  if (showFeature(5)) return <>{children}</>
  return null
}

const FeatureZoraTestnet = ({ children }: FeatureContainerProps) => {
  if (showFeature(999)) return <>{children}</>
  return null
}

const FeatureZoraMainnet = ({ children }: FeatureContainerProps) => {
  if (showFeature(7777777)) return <>{children}</>
  return null
}

const FeatureBaseMainnet = ({ children }: FeatureContainerProps) => {
  if (showFeature(8453)) return <>{children}</>
  return null
}


export const NetworkController = ({ children }: NetworkControllerProps) => {
  return <>{children}</>
}

NetworkController.Mainnet = FeatureMainnet
NetworkController.Testnet = FeatureTestnet
NetworkController.ZORA_Testnet = FeatureZoraTestnet
NetworkController.ZORA_Mainnet = FeatureZoraMainnet
NetworkController.Base_Mainnet = FeatureBaseMainnet
