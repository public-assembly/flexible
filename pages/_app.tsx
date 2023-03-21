// @ts-nocheck
// Styles
import "../styles/globals.css"
// Next.js
import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import { Space_Mono } from "next/font/google"
import localFont from "next/font/local"
import NextHead from "next/head"
// RainbowKit
import "@rainbow-me/rainbowkit/styles.css"
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit"
// wagmi
import { createClient, configureChains, WagmiConfig } from "wagmi"
import { mainnet, goerli } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import { alchemyProvider } from "wagmi/providers/alchemy"
// dao-utils
import {
  GovernorProvider,
  MetadataProvider,
  TokenProvider,
} from "@public-assembly/dao-utils"
// Local
import { ENV } from "utils/env"
import { Header } from "@/components/Header"
import { TopProgressBar } from "@/components/TopProgressBar"
import { DrawerContextProvider } from "@/components/drawer/DrawerProvider"
import { ThemeProvider } from "@/context/ThemeProvider"
import { Drawer } from "@/components/Drawer"
// Misc
import { Provider } from "react-wrap-balancer"
import { SWRConfig } from "swr"

/** Import both default fonts from Figma. This resolves the FOUT (flash of unstyled text): https://nextjs.org/docs/basic-features/font-optimization*/
export const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  style: ["normal"],
  weight: ["400", "700"],
  subsets: ["latin"],
})

export const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    {
      path: "./fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },

    {
      path: "./fonts/Satoshi-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
})

/**
 * dao-utils provider configuration
 */

type ManagerProviderProps = {
  tokenAddress: `0x${string}`
  children: React.ReactNode
}

type AuctionProviderProps = {
  children: React.ReactNode
}

interface DynamicManagerProviderProps extends ManagerProviderProps {
  // Define any additional props that you want to pass to the ManagerProvider
}

interface DynamicAuctionProviderProps extends AuctionProviderProps {
  // Define any additional props that you want to pass to the AuctionProvider
}

const DynamicManagerProvider = dynamic(
  () =>
    import("@public-assembly/dao-utils").then(
      (module) => module.ManagerProvider
    ),
  {
    ssr: false,
  }
) as React.FC<DynamicManagerProviderProps>

const DynamicAuctionProvider = dynamic(
  () =>
    import("@public-assembly/dao-utils").then(
      (module) => module.AuctionProvider
    ),
  {
    ssr: false,
  }
) as React.FC<DynamicAuctionProviderProps>

/**
 * wagmi configuration
 */
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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${satoshi.style.fontFamily},
              ${spaceMono.style.fontFamily}, font-sans;
          }
        `}
      </style>
      <NextHead>
        <title>{ENV.SITE_TITLE}</title>
      </NextHead>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            modalSize="compact"
            theme={lightTheme({
              accentColor: "black",
              borderRadius: "large",
            })}
          >
            <Provider>
              <DynamicManagerProvider
                tokenAddress={ENV.TOKEN_ADDRESS as `0x${string}`}
              >
                <GovernorProvider>
                  <DynamicAuctionProvider>
                    <MetadataProvider>
                      <TokenProvider>
                        <ThemeProvider platformIndex={ENV.PLATFORM_INDEX}>
                          <TopProgressBar />
                          <DrawerContextProvider>
                            <Header />
                            <Drawer />
                            <Component {...pageProps} />
                          </DrawerContextProvider>
                        </ThemeProvider>
                      </TokenProvider>
                    </MetadataProvider>
                  </DynamicAuctionProvider>
                </GovernorProvider>
              </DynamicManagerProvider>
            </Provider>
          </RainbowKitProvider>
        </WagmiConfig>
      </SWRConfig>
    </>
  )
}
