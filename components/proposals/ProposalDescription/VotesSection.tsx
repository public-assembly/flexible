import { cn } from 'utils/cn'

import { ArrowUpRight } from '@/components/assets/icons'
import { Badge } from '@/components/base/Badge'
import { Flex } from '@/components/base/Flex'
import Label from '@/components/base/Label'
import { Stack } from '@/components/base/Stack'
import { Body, Caption } from '@/components/base/Typography'
import { buildEtherscanLink } from '@/utils/helpers'
import Link from 'next/link'
import { Hash } from 'viem'

type VotesSectionProps = {
  forVotes: number
  againstVotes: number
  abstainVotes: number
  votingThreshold: number
  transactionHash: Hash
  className?: string
}

export function VotesSection({
  forVotes,
  againstVotes,
  abstainVotes,
  votingThreshold,
  transactionHash,
  className,
}: VotesSectionProps) {
  return (
    <Stack className={cn(className, 'gap-6')}>
      <VotesList
        forVotes={forVotes}
        againstVotes={againstVotes}
        abstainVotes={abstainVotes}
      />

      <Flex className="justify-end gap-x-6">
        <Link
          className="flex items-center"
          href={buildEtherscanLink('tx', transactionHash)}
        >
          <Body className="hover:none text-primary/50 underline">
            Voting snapshot
          </Body>
          <ArrowUpRight className="ml-1 text-tertiary" />
        </Link>

        <Label className="flex cursor-default" variant="rowInverse">
          <Body>Voting threshold</Body>
          <Caption>{votingThreshold}</Caption>
        </Label>
      </Flex>
    </Stack>
  )
}

function VotesList({
  forVotes,
  againstVotes,
  abstainVotes,
}: {
  forVotes: number
  againstVotes: number
  abstainVotes: number
}) {
  return (
    <Flex className="justify-end gap-6">
      <Badge value={forVotes}>For</Badge>
      <Badge value={againstVotes}>Against</Badge>
      <Badge value={abstainVotes}>Abstain</Badge>
    </Flex>
  )
}
