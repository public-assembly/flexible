/* @ts-ignore */
import * as React from 'react'
import { Flex } from '@/components/base/Flex'
import ProposalLabel from './ProposalLabel'
import { Stack } from '@/components/base/Stack'
import { Hash } from 'types'
import { useEnsName } from 'wagmi'
import { shortenAddress } from 'utils/shortenAddress'
import { BodyExtraSmall, BodyLarge } from '@/components/base/Typography'
import Balancer from 'react-wrap-balancer'
import Link from 'next/link'

export default function ProposalCard({ proposal }) {
  console.log(`🚀 ------------------------------------------------------------------🚀`)
  console.log(`🚀 ~ file: ProposalCard.tsx:15 ~ ProposalCard ~ proposal:`, proposal)
  console.log(`🚀 ------------------------------------------------------------------🚀`)
  return (
    <Link href={`proposals/${proposal.proposalId}`} className='w-full'>
      <Stack className='gap-6 px-4 py-4 text-black transition-shadow duration-300 border hover:shadow-surface-elevation-medium shadow-surface-elevation-low border-tertiary bg-secondary rounded-object'>
        <Flex className='justify-between'>
          <Flex className='gap-2'>
            <ProposalLabel>{proposal.status}</ProposalLabel>
            <ProposalLabel>Needs vote</ProposalLabel>
          </Flex>
          <ProposalTimestamp voteStart={proposal.voteStart} />
        </Flex>

        <Stack className='gap-2'>
          <ProposalTitle title={proposal.title} />

          <Proposer proposer={proposal.proposer} />
        </Stack>
        <ProposalVotes
          forVotes={proposal.forVotes}
          againstVotes={proposal.againstVotes}
          abstainVotes={proposal.abstainVotes}
        />
      </Stack>
    </Link>
  )
}

type ProposerProps = {
  proposer: Hash | undefined
}
export function Proposer({ proposer }: ProposerProps) {
  const { data: ensName } = useEnsName({
    address: proposer,
  })

  const proposerPretty = React.useMemo(() => (ensName ? ensName : shortenAddress(proposer)), [ensName, proposer])

  return <BodyExtraSmall className='text-primary/50'>by {proposerPretty}</BodyExtraSmall>
}

function ProposalStatus({ status }) {
  return <div className='px-4 py-2 text-sm font-bold text-secondary bg-primary rounded-xl'>{status}</div>
}

function Label({ children }) {
  return <div className='text-sm font-bold text-secondary bg-primary rounded-object'>{children}</div>
}

function ProposalTitle({ title }) {
  return (
    <BodyLarge className=''>
      <Balancer>{title}</Balancer>
    </BodyLarge>
  )
}

function ProposalVotes({
  forVotes,
  againstVotes,
  abstainVotes,
}: {
  forVotes: number
  againstVotes: number
  abstainVotes: number
}) {
  console.log({ forVotes, againstVotes, abstainVotes })
  return (
    <Flex className='hidden gap-2 md:flex text-primary!important'>
      {forVotes > 0 ? (
        <ProposalLabel variant='tertiary' textTransform='uppercase'>
          {forVotes} For
        </ProposalLabel>
      ) : null}
      {againstVotes > 0 ? (
        <ProposalLabel variant='tertiary' textTransform='uppercase'>
          {againstVotes} Against
        </ProposalLabel>
      ) : null}
      {abstainVotes > 0 ? (
        <ProposalLabel variant='tertiary' textTransform='uppercase'>
          {abstainVotes} Abstain
        </ProposalLabel>
      ) : null}
    </Flex>
  )
}

export function ProposalTimestamp({ voteStart }) {
  const dateFormat: [string, Intl.DateTimeFormatOptions] = [
    'en-us',
    {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    },
  ]

  const voteStartFormatted = new Date(voteStart * 1000).toLocaleString(...dateFormat)

  return <BodyExtraSmall className='text-primary/50'>{voteStartFormatted}</BodyExtraSmall>
}
