import React from 'react'
import { Seo } from '@/components/Seo'

import { useActiveAuction } from '@public-assembly/dao-utils'
import { ENV } from 'utils/env'

export interface TokenExplorerProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Nounish NFT Contract address
   */
  tokenAddress: `0x${string}`
  /**
   * Renderer Component for current auction
   */
  auctionRenderer?: React.ReactNode
  /**
   * Renderer Component for dao tokens
   */
  tokenRenderer?: React.ReactNode
}
export function AuctionPage() {
  // const { totalSupply } = useActiveAuction(ENV.DAO_ADDRESS)

  // const [tokenId, setTokenId] = React.useState(0)

  // React.useEffect(() => {
  //   totalSupply && setTokenId(totalSupply - 1)
  // }, [totalSupply])

  // const incrementId = React.useCallback(() => {
  //   if (totalSupply && tokenId < totalSupply - 1) {
  //     setTokenId(tokenId + 1)
  //   }
  // }, [setTokenId, tokenId])

  // const decrementId = React.useCallback(() => {
  //   if (totalSupply && tokenId > 0) {
  //     setTokenId(tokenId - 1)
  //   }
  // }, [setTokenId, tokenId])

  // if (!totalSupply) return null

  return (
    <section className='max-w-[1240px] m-auto px-4 gap-8 flex flex-col'>
      <Seo title='examples' />
      <div className='bg-slate-300 p-4 rounded-2xl text-black'>
        {/* <TokenTitle /> */}

        {/* <CurrentAuction address={ENV.DAO_ADDRESS} /> */}
        {/* <TokenThumbnail tokenId={} />
        <div {...props} className='flex flex-col gap-2'>
          {tokenId === totalSupply - 1 ? (
            <>{auctionRenderer || <CurrentAuction tokenAddress={tokenAddress} />}</>
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1440px]' {...props}>
              <TokenThumbnail tokenId={tokenId} tokenAddress={tokenAddress} />
              <div className='flex flex-col justify-end gap-4'>
                <TokenTitle tokenAddress={tokenAddress} tokenId={tokenId} />
                <div className='flex flex-row gap-10'>
                  <TokenHolder tokenAddress={tokenAddress} tokenId={tokenId} />
                  <TokenWinningBid tokenAddress={tokenAddress} tokenId={tokenId} />
                </div>
              </div>
            </div>
          )}
          <div className='flex flex-row gap-1'>
            <Button onClick={decrementId} className={`${tokenId === 0 && 'pointer-events-none opacity-20'}`}>
              <ArrowUpLeft />
            </Button>
            <Button
              onClick={incrementId}
              className={`${tokenId === totalSupply - 1 && 'pointer-events-none opacity-20'}`}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
        <TokenExplorer tokenAddress={ENV.DAO_ADDRESS} /> */}
      </div>
    </section>
  )
}

export default AuctionPage
