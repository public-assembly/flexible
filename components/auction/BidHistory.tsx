import { useAuctionContext } from "@public-assembly/dao-utils"
import { useMemo } from "react"
import { Flex } from "../base/Flex"
import { Body, Caption } from "../base/Typography"
import { useEnsName, useAccount } from "wagmi"
import { shortenAddress } from "@/utils/shortenAddress"
import { ethers } from "ethers"
import { Zorb } from "../base/Zorb"

export function BidHistory({ auctionState }: { auctionState: any }) {
  const highestBidder = auctionState?.highestBidder
  const { data: ensName } = useEnsName({
    address: highestBidder,
  })

  const highestBidderPretty = useMemo(
    () => (ensName ? ensName : shortenAddress(highestBidder)),
    [ensName, highestBidder]
  )

  const { address } = useAccount()
  return (
    <Flex className="pt-8 min-w-[306px]">
      <Flex className="w-full justify-between items-center bg-primary rounded-lg p-3">
        <div className="flex nowrap items-center">
          <span className="pr-2">
            <Zorb address={address} size={16} radius={999} />
          </span>
          <Body className="text-secondary">{highestBidderPretty}</Body>
        </div>
        <Caption className="uppercase text-secondary">
          Ξ{" "}
          <span>{`${ethers.utils.formatEther(auctionState?.highestBid)}`}</span>
        </Caption>
      </Flex>
    </Flex>
  )
}
