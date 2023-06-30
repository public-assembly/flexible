'use client'

import { DrawerContextProvider } from '@/components/drawer/DrawerProvider'
import { ThemeProvider } from '@/context/ThemeProvider'
import {
  GovernorProvider,
  ManagerProvider,
  MetadataProvider,
  TokenProvider,
} from '@public-assembly/builder-utils'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { Space_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import React from 'react'
import { Provider } from 'react-wrap-balancer'
import { SWRConfig } from 'swr'
import { ENV } from 'utils/env'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

/** Import both default fonts from Figma. This resolves the FOUT (flash of unstyled text): https://nextjs.org/docs/basic-features/font-optimization*/
export const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  style: ['normal'],
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const satoshi = localFont({
  variable: '--font-satoshi',
  src: [
    {
      path: '.././public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '.././public/fonts/Satoshi-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '.././public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '.././public/fonts/Satoshi-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '.././public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },

    {
      path: '.././public/fonts/Satoshi-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
})

const { chains } = configureChains(
  [ENV.CHAIN === 1 ? mainnet : goerli],
  [alchemyProvider({ apiKey: ENV.ALCHEMY_KEY }), publicProvider()]
)

const config = createConfig(
  getDefaultConfig({
    appName: 'Flexible',
    walletConnectProjectId: ENV.WALLET_CONNECT as string,
    chains,
  })
)

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-space-mono: ${spaceMono.style.fontFamily};
          }

          :root {
            --font-satoshi: ${satoshi.style.fontFamily};
          }

          .headline {
            font-family: var(--headline);
          }

          .body {
            font-family: var(--body);
          }

          .caption {
            font-family: var(--caption);
          }
        `}
      </style>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <WagmiConfig config={config}>
          <ConnectKitProvider theme="web95">
            <Provider>
              <ManagerProvider
                tokenAddress={ENV.TOKEN_ADDRESS as `0x${string}`}
              >
                <GovernorProvider>
                  <MetadataProvider>
                    <TokenProvider>
                      <ThemeProvider platformIndex={ENV.PLATFORM_INDEX}>
                        <DrawerContextProvider>
                          {mounted && children}
                        </DrawerContextProvider>
                      </ThemeProvider>
                    </TokenProvider>
                  </MetadataProvider>
                </GovernorProvider>
              </ManagerProvider>
            </Provider>
          </ConnectKitProvider>
        </WagmiConfig>
      </SWRConfig>
    </>
  )
}
