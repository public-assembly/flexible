import { SWRConfig } from 'swr'
import { NFTFetchConfiguration } from '@zoralabs/nft-hooks'
import { ZDKFetchStrategy } from '@zoralabs/nft-hooks/dist/strategies'
import { Header } from './Header'
import { Footer } from './Footer'
import { TopProgressBar } from './TopProgressBar'

export const strategy = new ZDKFetchStrategy('1', 'https://api.zora.co/graphql')

export function AppWrapper({ children }: { children: JSX.Element }) {
  return (
    <NFTFetchConfiguration networkId='1' strategy={strategy}>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
        }}
      >
        <TopProgressBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </SWRConfig>
    </NFTFetchConfiguration>
  )
}
