/**
 * Modified from ourzora/nouns-builder
 * https://github.com/ourzora/nouns-builder/blob/main/apps/web/src/components/NetworkController/index.tsx
 * */

import React, { ReactNode } from "react"
import { ENV } from "@/utils/env"

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

export const NetworkController = ({ children }: NetworkControllerProps) => {
  return <>{children}</>
}

NetworkController.Mainnet = FeatureMainnet
NetworkController.Testnet = FeatureTestnet
