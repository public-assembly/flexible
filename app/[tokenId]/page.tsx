'use client'

import AuctionPage from './auction-page'

export default function Page({ params }: { params: { tokenId: number } }) {
  return <AuctionPage tokenId={params.tokenId}/>
}
