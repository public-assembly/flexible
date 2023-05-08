import { Bidder } from '@/components/auction/Bidder'
import { cn } from '@/utils/cn'
import { useBid } from '@public-assembly/dao-utils'
import { Hash } from 'types'
import { Flex } from '../base/Flex'
import { Caption } from '../base/Typography'

interface BidHistoryProps {
  tokenId: string
  tokenAddress: `0x${string}`
}

export function BidHistory({ tokenId, tokenAddress }: BidHistoryProps) {
  const { tokenEvents } = useBid({ tokenId, tokenAddress })

  const reversedBidEvents = tokenEvents ? [...tokenEvents].reverse() : []

  return (
    <Flex className="max-h-[312px] w-full min-w-[306px] flex-col gap-y-2 overflow-y-auto pt-8">
      {reversedBidEvents?.map((event, index) => {
        const isFirstChild = index === 0
        return (
          <Flex
            key={`${event.amount}-${event.bidder}`}
            className={`w-full items-center justify-between rounded-lg p-3 ${
              isFirstChild
                ? 'bg-primary text-secondary'
                : 'border border-tertiary text-primary'
            }`}
          >
            <Bidder
              address={event.bidder as Hash}
              isHighestBidder={isFirstChild}
            />
            <BidAmount isHighestBid={isFirstChild} event={event} />
          </Flex>
        )
      })}
    </Flex>
  )
}

function BidAmount({ isHighestBid, event }) {
  return (
    <Caption
      className={cn(
        'uppercase',
        isHighestBid ? 'text-secondary' : 'text-primary'
      )}
    >
      {`${Number(event.amount).toFixed(4)} ETH`}
    </Caption>
  )
}
