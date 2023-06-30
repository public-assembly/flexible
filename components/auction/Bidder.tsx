import { Flex } from '@/components/base/Flex'
import { Link } from '@/components/base/Link'
import { Body } from '@/components/base/Typography'
import { Zorb } from '@/components/base/Zorb'
import { buildEtherscanLink } from '@/utils/helpers'
import { Hex } from 'viem'
import { useEnsAvatar, useEnsName } from 'wagmi'
import { shortenAddress } from '../../utils/shortenAddress'

type BidderProps = {
  address: Hex
  isHighestBidder?: boolean
}

export function Bidder(props: BidderProps) {
  const { data: ensName } = useEnsName({
    address: props.address,
  })
  const { data: ensAvatar } = useEnsAvatar({
    name: props.address,
  })

  return (
    <Flex className="flex-nowrap items-center gap-2">
      <Zorb
        address={props.address}
        ensImage={ensAvatar}
        size={16}
        radius={999}
      />
      <Body
        className={props.isHighestBidder ? 'text-secondary' : 'text-primary'}
      >
        <Link href={buildEtherscanLink('address', props.address)}>
          {ensName ?? shortenAddress(props.address)}
        </Link>
      </Body>
    </Flex>
  )
}
