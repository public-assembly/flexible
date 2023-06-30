import { useActiveProposals } from '@/hooks/useActiveProposals'
import { motion } from 'framer-motion'

import CountingNumbers from '@/components/base/CountingNumbers'
import { Divider } from '@/components/base/Divider'
import { Flex } from '@/components/base/Flex'
import { Stack } from '@/components/base/Stack'
import { Caption } from '@/components/base/Typography'
import ProposalEmptyState from '@/components/proposals/ProposalEmptyState'
import { ProposalList } from '@/components/proposals/ProposalList'
import { StatefulProposal } from '@public-assembly/builder-utils'

export default function ProposalsPage() {
  const {
    totalProposalCount,
    activeProposals,
    proposals,
    activeProposalCount,
    isEmpty,
    hasActiveProposals,
    hasProposals,
  } = useActiveProposals()

  return (
    <motion.section className="m-auto flex min-h-full max-w-7xl grow flex-col items-center justify-center gap-8 px-4 pb-10">
      <ProposalListStats
        activeProposalCount={activeProposalCount}
        totalProposalCount={totalProposalCount}
      />

      <Stack className="h-full w-full items-center justify-center">
        {isEmpty ? <ProposalEmptyState /> : null}

        {hasActiveProposals ? (
          <>
            <ProposalList
              proposals={activeProposals as StatefulProposal[]}
              type="active"
            />
            <Divider className="bg-tertiary" />
          </>
        ) : null}

        {hasProposals && (
          <ProposalList
            proposals={proposals as StatefulProposal[]}
            type="not-active"
          />
        )}
      </Stack>
    </motion.section>
  )
}

function ProposalListStats({ activeProposalCount, totalProposalCount }) {
  return (
    <Flex className="hidden w-full justify-start gap-10 md:flex">
      <Caption>
        <CountingNumbers value={activeProposalCount} interval={1} /> Active
      </Caption>
      <Caption>
        <CountingNumbers value={totalProposalCount} interval={1} /> Total
      </Caption>
    </Flex>
  )
}
