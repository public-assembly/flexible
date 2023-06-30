import { Flex } from '@/components/base/Flex'
import { Stack } from '@/components/base/Stack'
import {
  BodyExtraSmall,
  BodyLarge,
  BodySmall,
} from '@/components/base/Typography'
import { Proposer } from '@/components/proposals/Proposer'
import { useAuth } from '@/hooks/useAuth'
import {
  StatefulProposal,
  governorAbi,
  useGovernorContext,
} from '@public-assembly/builder-utils'
import { formatDuration, intervalToDuration } from 'date-fns'
import Link from 'next/link'
import * as React from 'react'
import { useEffect, useState } from 'react'
import Balancer from 'react-wrap-balancer'
import { cn } from 'utils/cn'
import { Hex } from 'viem'
import { useContractRead } from 'wagmi'
import { ProposalCardVotes } from './ProposalCardVotes'
import ProposalLabel from './ProposalLabel'

export default function ProposalCard({
  proposal,
}: {
  proposal: StatefulProposal
}) {
  const { address } = useAuth()
  const [needsAction, setNeedsAction] = React.useState<boolean>(false)

  const { governorAddress } = useGovernorContext()

  const { data: availableVotes } = useContractRead({
    address: governorAddress,
    abi: governorAbi,
    functionName: 'getVotes',
    args: [address as Hex, proposal.timeCreated],
  })

  useEffect(() => {
    if (proposal.state !== 'Active') return
    if (!address || !availableVotes || Number(availableVotes) < 1) return
    const proposalVotes = proposal.votes

    const hasVoted = proposalVotes.some(
      (vote: any) => vote.voter === address.toLowerCase()
    )
    setNeedsAction(!hasVoted)
  }, [address, proposal.votes])

  return (
    <>
      <Link
        href={`proposals/${proposal.proposalId}`}
        className="transition-opacity duration-300 hover:!opacity-100 group-hover:opacity-50"
      >
        <Stack
          className={cn(
            'custom-shadow h-full gap-6 rounded-object border border-tertiary bg-secondary p-4 text-primary transition duration-300',
            'hover:border-primary'
          )}
        >
          {/* States */}
          <Flex className="flex-wrap items-center justify-between gap-2 self-stretch">
            <Flex className="gap-2">
              {proposal.state === 'Active' ? (
                <ProposalLabel>{proposal.state}</ProposalLabel>
              ) : proposal.state === 'Pending' ||
                proposal.state === 'Queued' ||
                proposal.state === 'Executed' ||
                proposal.state === 'Succeeded' ? (
                <ProposalLabel variant="secondary">
                  {proposal.state}
                </ProposalLabel>
              ) : (
                <ProposalLabel variant="tertiary">
                  {proposal.state}
                </ProposalLabel>
              )}
              {needsAction ? <ProposalLabel>Needs vote</ProposalLabel> : null}
            </Flex>
            <ProposalTimestamp proposal={proposal} size="xs" />
          </Flex>

          <Stack className="h-full gap-2">
            <ProposalTitle title={proposal.title} />
            <span className="body text-xs font-medium text-primary/50">
              by <Proposer proposer={proposal.proposer} />
            </span>
          </Stack>

          <ProposalCardVotes
            forVotes={proposal.forVotes}
            againstVotes={proposal.againstVotes}
            abstainVotes={proposal.abstainVotes}
          />
        </Stack>
      </Link>
    </>
  )
}

function ProposalTitle({ title }) {
  return (
    <BodyLarge>
      <Balancer>{title}</Balancer>
    </BodyLarge>
  )
}

export function ProposalTimestamp({
  proposal,
  size = 'sm',
}: {
  proposal: StatefulProposal
  size?: 'sm' | 'xs'
}) {
  const [timestampBadge, setTimestampBadge] = useState<string>()

  const pastDateFormat: [string, Intl.DateTimeFormatOptions] = [
    'en-us',
    {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    },
  ]

  const pastDateFormatted = new Date(proposal.voteEnd * 1000).toLocaleString(
    ...pastDateFormat
  )

  const expiresAtFormatted = formatDuration(
    intervalToDuration({
      start: new Date(),
      end: new Date(proposal.expiresAt * 1000),
    }),

    { format: ['days', 'hours', 'minutes'] }
  )

  const voteEndFormatted = formatDuration(
    intervalToDuration({
      start: new Date(),
      end: new Date(proposal.voteEnd * 1000),
    }),

    { format: ['days', 'hours', 'minutes'] }
  )

  const voteStartFormatted = formatDuration(
    intervalToDuration({
      start: new Date(),
      end: new Date(proposal.voteStart * 1000),
    }),

    { format: ['days', 'hours', 'minutes'] }
  )

  useEffect(() => {
    function getTimestampBadge(proposal: StatefulProposal) {
      if (proposal.state === 'Active') {
        setTimestampBadge(`Voting ends in ${voteEndFormatted}`)
      } else if (proposal.state === 'Pending') {
        setTimestampBadge(`Voting starts in ${voteStartFormatted}`)
      } else if (proposal.state === 'Executable') {
        setTimestampBadge(`Expires in ${expiresAtFormatted}`)
      } else if (proposal.state === 'Queued') {
        setTimestampBadge(`Expires in ${expiresAtFormatted}`)
      } else if (proposal.state === 'Executed') {
        setTimestampBadge(`Ended ${pastDateFormatted}`)
      } else if (proposal.state === 'Canceled') {
        setTimestampBadge(`Ended ${pastDateFormatted}`)
      } else if (proposal.state === 'Defeated') {
        setTimestampBadge(`Ended ${pastDateFormatted}`)
      } else if (proposal.state === 'Vetoed') {
        setTimestampBadge(`Ended ${pastDateFormatted}`)
      }
    }
    getTimestampBadge(proposal)
  }, [proposal])

  return (
    <>
      {size === 'sm' ? (
        <BodySmall className="text-primary/50">{timestampBadge}</BodySmall>
      ) : (
        <BodyExtraSmall className="text-primary/50">
          {timestampBadge}
        </BodyExtraSmall>
      )}
    </>
  )
}
