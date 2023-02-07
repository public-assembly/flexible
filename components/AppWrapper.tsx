import NextNProgress from 'nextjs-progressbar'
import { SWRConfig } from 'swr'
import { NFTFetchConfiguration } from '@zoralabs/nft-hooks'
import { ZDKFetchStrategy } from '@zoralabs/nft-hooks/dist/strategies'
import { Header } from './Header'
import { Footer } from './Footer'

export const strategy = new ZDKFetchStrategy('1', 'https://api.zora.co/graphql')

export function AppWrapper({ children }: { children: JSX.Element }) {
  return (
    <NFTFetchConfiguration networkId='1' strategy={strategy}>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
        }}
      >
        <NextNProgress
          color='#ff89de'
          startPosition={0.125}
          stopDelayMs={200}
          height={2}
          showOnShallow={true}
          options={{ showSpinner: false }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </SWRConfig>
    </NFTFetchConfiguration>
  )
}
