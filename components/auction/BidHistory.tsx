import { Flex } from "../base/Flex"
import { Caption } from "../base/Typography"
import { useBid } from "@/hooks/useBid"
import { Bidder } from "@/components/auction/Bidder"
import { Hash } from "types"
import { cn } from "@/utils/cn"

interface BidHistoryProps {
  tokenId: string
  tokenAddress: `0x${string}`
}

export function BidHistory({ tokenId, tokenAddress }: BidHistoryProps) {
  const { tokenEvents } = useBid({ tokenId, tokenAddress })

  const reversedBidEvents = tokenEvents ? [...tokenEvents].reverse() : []

  return (
    <Flex className="flex-col gap-y-2 pt-8 min-w-[306px] w-full max-h-[312px] overflow-y-auto">
      {reversedBidEvents?.map((event, index) => {
        const isFirstChild = index === 0
        return (
          <Flex
            key={`${event.amount}-${event.bidder}`}
            className={`w-full justify-between items-center rounded-lg p-3 ${
              isFirstChild
                ? "bg-primary text-secondary"
                : "border border-[bg-tertiary] text-primary"
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
        "uppercase",
        isHighestBid ? "text-secondary" : "text-primary"
      )}
    >
      Ξ <span>{`${Number(event.amount).toFixed(4)}`}</span>
    </Caption>
  )
}
