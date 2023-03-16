import { Flex } from "../base/Flex"
import { Body, Caption } from "../base/Typography"
import { shortenAddress } from "@/utils/shortenAddress"
import { Zorb } from "../base/Zorb"
import { useBid } from "@/hooks/useBid"
import { Hash } from "types"
import { ensOrShorten } from "@/utils/ensOrShorten"
import { useEffect } from "react"

interface BidHistoryProps {
  tokenId: string
  tokenAddress: `0x${string}`
}

export function BidHistory({ tokenId, tokenAddress }: BidHistoryProps) {

  const { auctionEvents } = useBid({ tokenId, tokenAddress })

  const reversedBidEvents = auctionEvents ? [...auctionEvents].reverse() : []

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
            <div className="flex nowrap items-center">
              <span className="pr-2">
                <Zorb address={event.bidder} size={16} radius={999} />
              </span>
              <Body
                className={`${
                  isFirstChild ? "text-secondary" : "text-primary"
                }`}
              >
                {/* {ensOrShorten(event.bidder as Hash)} */}
                {shortenAddress(event.bidder)}
              </Body>
            </div>
            <Caption
              className={`uppercase ${
                isFirstChild ? "text-secondary" : "text-primary"
              }`}
            >
              Ξ <span>{`${Number(event.amount).toFixed(4)}`}</span>
            </Caption>
          </Flex>
        )
      })}
    </Flex>
  )
}
