import Auction from '@/components/auction/Auction'
import { usePathname } from 'next/navigation'
import { useAuctionState } from '@public-assembly/builder-utils'
import CurrentAuction from '@/components/auction/CurrentAuction'

export default function AuctionPage({ tokenId }: { tokenId: number }) {
  const pathname = usePathname()
  const { auctionState} = useAuctionState()

  return (pathname.substring(1) === String(auctionState.tokenId) ? <CurrentAuction tokenId={tokenId} /> : <Auction tokenId={tokenId} />)

}
