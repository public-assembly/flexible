import "../styles/globals.css"
import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import { Space_Mono } from "next/font/google"
import localFont from "next/font/local"
import NextHead from "next/head"
import { GovernorProvider, AuctionProvider } from "@public-assembly/dao-utils"
import { Provider } from "react-wrap-balancer"
import { SWRConfig } from "swr"
import { ENV } from "utils/env"

import { Header } from "@/components/Header"
import { TopProgressBar } from "@/components/TopProgressBar"
import Web3Provider from "@/components/Web3Provider"
import { DrawerContextProvider } from "@/components/drawer/DrawerProvider"
import { ThemeProvider } from "@/context/ThemeProvider"
import { Drawer } from "@/components/Drawer"

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

export default function ExampleApp({ Component, pageProps }: AppProps) {
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
        <title>Public Assembly</title>
      </NextHead>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Web3Provider>
          <Provider>
            <DynamicManagerProvider
              tokenAddress={ENV.TOKEN_ADDRESS as `0x${string}`}
            >
              <GovernorProvider>
                <DynamicAuctionProvider>
                  <ThemeProvider platformIndex={ENV.PLATFORM_INDEX}>
                    <TopProgressBar />
                    <DrawerContextProvider>
                      <Header />
                      <Drawer />
                      <Component {...pageProps} />
                    </DrawerContextProvider>
                  </ThemeProvider>
                </DynamicAuctionProvider>
              </GovernorProvider>
            </DynamicManagerProvider>
          </Provider>
        </Web3Provider>
      </SWRConfig>
    </>
  )
}
