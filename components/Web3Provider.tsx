import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'

import { createClient, configureChains, WagmiConfig } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'
import { alchemyProvider } from 'wagmi/providers/alchemy'

// Choose which chains you'd like to show
const chains = [mainnet, goerli]

const { provider, webSocketProvider } = configureChains(chains, [
  publicProvider(),
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY! }),
  infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_KEY! }),
])

const { connectors } = getDefaultWallets({
  appName: process.env.NEXT_PUBLIC_SITE_TITLE!,
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

const Web3Provider = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        coolMode
        theme={lightTheme({
          accentColor: 'black',
          borderRadius: 'large',
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Web3Provider
