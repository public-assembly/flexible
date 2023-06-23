import CurrentAuction from '@/components/auction/CurrentAuction'
import HistoricalAuction from '@/components/auction/HistoricalAuction'
import { useAuctionState } from '@public-assembly/builder-utils'
import { usePathname } from 'next/navigation'

export default function AuctionPage({ tokenId }: { tokenId: number }) {
  const pathname = usePathname()
  const { auctionState } = useAuctionState()

  return pathname.substring(1) === String(auctionState.tokenId) ? (
    <CurrentAuction tokenId={tokenId} />
  ) : (
    <HistoricalAuction tokenId={tokenId} />
  )
}
