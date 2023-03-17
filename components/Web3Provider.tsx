import "@rainbow-me/rainbowkit/styles.css"
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit"
import { createClient, configureChains, WagmiConfig } from "wagmi"
import { mainnet, goerli } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
// import { infuraProvider } from 'wagmi/providers/infura'
import { alchemyProvider } from "wagmi/providers/alchemy"
import { ENV } from "utils/env"

// Choose which chains you'd like to show
const chains = [mainnet, goerli]

const { provider, webSocketProvider } = configureChains(chains, [
  publicProvider(),
  alchemyProvider({ apiKey: ENV.ALCHEMY_KEY }),
  // infuraProvider({ apiKey: ENV.INFURA_KEY! }),
])

const { connectors } = getDefaultWallets({
  appName: ENV.SITE_TITLE!,
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
          accentColor: "black",
          borderRadius: "large",
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Web3Provider
