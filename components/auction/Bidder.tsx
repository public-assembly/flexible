import { Flex } from "@/components/base/Flex"
import { Body } from "@/components/base/Typography"
import { Zorb } from "@/components/base/Zorb"
import { Hash } from "types"
import { useEnsName, useEnsAvatar } from "wagmi"
import { shortenAddress } from "../../utils/shortenAddress"

type BidderProps = {
  address: Hash
  isHighestBidder?: boolean
}

export function Bidder(props: BidderProps) {
  const { data: ensName } = useEnsName({
    address: props.address,
  })
  const { data: ensAvatar } = useEnsAvatar({
    address: props.address,
  })

  return (
    <Flex className="items-center gap-2 flex-nowrap">
      <Zorb
        address={props.address}
        ensImage={ensAvatar}
        size={16}
        radius={999}
      />
      <Body
        className={props.isHighestBidder ? "text-secondary" : "text-primary"}
      >
        {ensName ?? shortenAddress(props.address)}
      </Body>
    </Flex>
  )
}
