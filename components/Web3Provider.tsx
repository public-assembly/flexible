import "@rainbow-me/rainbowkit/styles.css"
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit"
import { createClient, configureChains, WagmiConfig } from "wagmi"
import { mainnet, goerli } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { ENV } from "utils/env"

// Choose which chains you'd like to show
const chains = [mainnet, goerli]

const { provider, webSocketProvider } = configureChains(chains, [
  alchemyProvider({ apiKey: ENV.ALCHEMY_KEY }),
  publicProvider(),
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
        modalSize="compact"
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
