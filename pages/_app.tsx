import { Drawer } from '@/components/Drawer'
import { DrawerContextProvider } from '@/components/drawer/DrawerProvider'
import { Header } from '@/components/Header'
import { Seo } from '@/components/Seo'
import { TopProgressBar } from '@/components/TopProgressBar'
import { ThemeProvider } from '@/context/ThemeProvider'
import {
  GovernorProvider,
  MetadataProvider,
  TokenProvider,
} from '@public-assembly/dao-utils'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { Space_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { Provider } from 'react-wrap-balancer'
import { SWRConfig } from 'swr'
import { ENV } from 'utils/env'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import '../styles/globals.css'

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
      path: './fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },

    {
      path: './fonts/Satoshi-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
})

/**
 * Provider configuration
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
    import('@public-assembly/dao-utils').then(
      (module) => module.ManagerProvider
    ),
  {
    ssr: false,
  }
) as React.FC<DynamicManagerProviderProps>

const DynamicAuctionProvider = dynamic(
  () =>
    import('@public-assembly/dao-utils').then(
      (module) => module.AuctionProvider
    ),
  {
    ssr: false,
  }
) as React.FC<DynamicAuctionProviderProps>

const { chains, provider } = configureChains(
  [ENV.CHAIN === 1 ? mainnet : goerli],
  [alchemyProvider({ apiKey: ENV.ALCHEMY_KEY }), publicProvider()]
)

const client = createClient(
  getDefaultClient({
    appName: 'Flexible',
    chains,
    provider,
  })
)

export default function App({ Component, pageProps }: AppProps) {
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
        <WagmiConfig client={client}>
          <ConnectKitProvider theme="web95">
            <Provider>
              <DynamicManagerProvider
                tokenAddress={ENV.TOKEN_ADDRESS as `0x${string}`}
              >
                <GovernorProvider>
                  <DynamicAuctionProvider>
                    <MetadataProvider>
                      <TokenProvider>
                        <Seo />
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
          </ConnectKitProvider>
        </WagmiConfig>
      </SWRConfig>
    </>
  )
}
