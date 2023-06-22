'use client'

import { useActiveProposals } from '@/hooks/useActiveProposals'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Balancer from 'react-wrap-balancer'

import { ArrowLeft } from '@/components/assets/icons'
import { Divider } from '@/components/base/Divider'
import { Flex } from '@/components/base/Flex'
import { RichText } from '@/components/base/Richtext'
import { Stack } from '@/components/base/Stack'
import { Body } from '@/components/base/Typography'
import { ProposalTimestamp } from '@/components/proposals/ProposalCard'
import {
  DecodedTransactions,
  ProposalVoteStatus,
  VotesSection,
} from '@/components/proposals/ProposalDescription'
import ProposalLabel from '@/components/proposals/ProposalLabel'
import { Proposer } from '@/components/proposals/Proposer'
import { BodyLarge, Headline } from '../../components/base/Typography'
import { Hex } from 'viem'

function ProposalDetailPage() {
  const { allProposals } = useActiveProposals()
  const { pid } = useRouter().query

  if (!allProposals) return null

  const proposal = allProposals.find((proposal) => proposal.id === pid)

  if (!proposal) return null
  return (
    <Stack className="w-full px-4 md:px-10">
      <Stack className="w-full gap-10 pt-10">
        <ProposalNavigation />
        <Flex className="h-full w-full justify-between">
          {/* Header section */}
          <Stack className="w-fit gap-4">
            {/* <Flex className="items-center gap-6">
              {proposal.status === 'ACTIVE' ? (
                <ProposalLabel>{proposal.status}</ProposalLabel>
              ) : proposal.status === 'PENDING' ||
                proposal.status === 'QUEUED' ||
                proposal.status === 'EXECUTED' ||
                proposal.status === 'SUCCEEDED' ? (
                <ProposalLabel variant="secondary">
                  {proposal.status}
                </ProposalLabel>
              ) : (
                <ProposalLabel variant="tertiary">
                  {proposal.status}
                </ProposalLabel>
              )}
              <ProposalTimestamp proposal={proposal} size="sm" />
            </Flex> */}
            <Stack className="w-full gap-2">
              <Balancer>
                <Headline>{proposal.title}</Headline>
              </Balancer>
              <p className="body text-primary/50">
                By <Proposer proposer={proposal.proposer as Hex} />
              </p>
            </Stack>

            <div className="pt-2">
              <ProposalVoteStatus proposal={proposal} />
            </div>

            {/* Mobile Proposal Votes section */}
            <VotesSection
              className="md:hidden"
              forVotes={proposal.forVotes}
              abstainVotes={proposal.abstainVotes}
              againstVotes={proposal.againstVotes}
              votingThreshold={proposal.quorumVotes}
              // @ts-ignore - TODO: Update dao-utils gql.ts
              transactionHash={proposal.transactionInfo.transactionHash}
            />
          </Stack>

          {/* Desktop Proposal Votes section */}
          <VotesSection
            className="hidden md:flex"
            forVotes={proposal.forVotes}
            abstainVotes={proposal.abstainVotes}
            againstVotes={proposal.againstVotes}
            votingThreshold={proposal.quorumVotes}
            // @ts-ignore - TODO: Update dao-utils gql.ts
            transactionHash={proposal.transactionInfo.transactionHash}
          />
        </Flex>
      </Stack>
      <Divider className="bg-primary/50" />

      {/* Proposal description */}
      <RichText html={String(proposal.description)} className="w-full" />

      {/* Proposer */}
      <section id="Proposer">
        <BodyLarge className="py-10">Proposer</BodyLarge>
        <Flex className="items-center">
          <Proposer
            proposer={proposal.proposer as Hex}
            className="text-primary"
          />
        </Flex>
      </section>

      {/* Proposal transactions */}
      <section id="Proposal Transactions">
        <BodyLarge className="py-10">Proposed Transactions</BodyLarge>
        <DecodedTransactions
          calldatas={(proposal.calldatas as unknown) as string[]}
          targets={proposal.targets}
          values={proposal.values}
        />
      </section>
    </Stack>
  )
}

export default ProposalDetailPage

function ProposalNavigation() {
  return (
    <Link href="/proposals" className="group cursor-pointer">
      <Flex className="w-fit gap-2">
        <ArrowLeft className="text-primary transition duration-200 ease-in-out group-hover:-translate-x-1 " />{' '}
        <Body>Back to proposals</Body>
      </Flex>
    </Link>
  )
}
