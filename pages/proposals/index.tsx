import { Seo } from '@/components/Seo'
import React, { useEffect } from 'react'
import { isServerSide } from 'utils/helpers'
import ProposalEmptyState from '@/components/proposals/ProposalEmptyState'
import { Stack } from '@/components/base/Stack'
import { Flex } from '@/components/base/Flex'
import { Caption } from '@/components/base/Typography'
import ProposalCard from '@/components/proposals/ProposalCard'
import { useProposals } from '@/hooks/useProposals'
import { motion } from 'framer-motion'
import { MotionFlex } from '../../components/base/Flex'
import { Divider } from '@/components/base/Divider'

export const easing = [0.6, -0.05, 0.01, 0.99]
const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.23,
      delayChildren: 0.2,
      ease: 'easeOut',
      duration: 0.7,
    },
  },
}

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
    <motion.section className='flex flex-col items-center justify-center min-h-full gap-8 px-4 m-auto max-w-7xl grow'>
      <Seo title='proposals' />
      <Flex className='justify-start hidden w-full gap-10 md:flex'>
        <Caption>{activeProposalCount} Active</Caption>
        <Caption>{totalProposalCount} Total</Caption>
      </Flex>

      <Stack className='items-center justify-center w-full h-full'>
        {isEmpty ? <ProposalEmptyState /> : null}

        {hasActiveProposals ? (
          <>
            <ActiveProposals proposals={activeProposals} />
            <Divider />
          </>
        ) : null}

        {hasProposals && <RestProposals proposals={proposals} />}
      </Stack>
    </motion.section>
  )
}

export default ProposalsPage

function RestProposals({ proposals }) {
  if (!proposals) return null
  return (
    <>
      <MotionFlex
        initial='hidden'
        animate='visible'
        variants={variants}
        exit={{ opacity: 0 }}
        className='flex-wrap w-full gap-6 md:gap-10 md:grid md:grid-cols-3'
      >
        {proposals.map((proposal) => (
          <>
            <motion.div variants={variants} key={proposal.proposalId}>
              <ProposalCard key={proposal.id} proposal={proposal} />
            </motion.div>
          </>
        ))}
      </MotionFlex>
    </>
  )
}

function ActiveProposals({ proposals }) {
  if (!proposals) return null
  return (
    <>
      <MotionFlex
        initial='hidden'
        animate='visible'
        variants={variants}
        exit={{ opacity: 0 }}
        className='flex-wrap w-full gap-6 md:gap-10 md:grid md:grid-cols-2'
      >
        {proposals.map((proposal) => (
          <>
            <motion.div variants={variants} key={proposal.proposalId}>
              <ProposalCard key={proposal.id} proposal={proposal} />
            </motion.div>
          </>
        ))}
      </MotionFlex>
    </>
  )
}
