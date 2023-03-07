import React, { useEffect } from "react"

import { useProposals } from "@/hooks/useProposals"
import { motion } from "framer-motion"
import { isServerSide } from "utils/helpers"

import { Seo } from "@/components/Seo"
import CountingNumbers from "@/components/base/CountingNumbers"
import { Divider } from "@/components/base/Divider"
import { Flex } from "@/components/base/Flex"
import { Stack } from "@/components/base/Stack"
import { Caption } from "@/components/base/Typography"
import ProposalEmptyState from "@/components/proposals/ProposalEmptyState"
import { ProposalList } from "@/components/proposals/ProposalList"

function ProposalsPage() {
  const {
    totalProposalCount,
    activeProposals,
    proposals,
    activeProposalCount,
    isEmpty,
    hasActiveProposals,
    hasProposals,
  } = useProposals()

  const [loading, setLoading] = React.useState(false)
  useEffect(() => {
    setLoading(true)
  }, [])

  if (isServerSide()) return null
  if (!loading) return null

  return (
    <motion.section className="flex flex-col items-center justify-center min-h-full gap-8 px-4 pb-10 m-auto max-w-7xl grow">
      <Seo title="proposals" />

      <ProposalListStats
        activeProposalCount={activeProposalCount}
        totalProposalCount={totalProposalCount}
      />

      <Stack className="items-center justify-center w-full h-full">
        {isEmpty ? <ProposalEmptyState /> : null}

        {hasActiveProposals ? (
          <>
            <ProposalList proposals={activeProposals} type="active" />
            <Divider />
          </>
        ) : null}

        {hasProposals && (
          <ProposalList proposals={proposals} type="not-active" />
        )}
      </Stack>
    </motion.section>
  )
}

export default ProposalsPage

function ProposalListStats({ activeProposalCount, totalProposalCount }) {
  return (
    <Flex className="justify-start hidden w-full gap-10 md:flex">
      <Caption>
        <CountingNumbers value={activeProposalCount} interval={1} /> Active
      </Caption>
      <Caption>
        <CountingNumbers value={totalProposalCount} interval={1} /> Total
      </Caption>
    </Flex>
  )
}
