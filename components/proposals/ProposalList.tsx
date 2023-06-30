import ProposalCard from '@/components/proposals/ProposalCard'
import { variants } from '@/components/proposals/animations'
import { cn } from '@/utils/cn'
import { StatefulProposal } from '@public-assembly/builder-utils'
import { motion } from 'framer-motion'

type ProposalListProps = {
  proposals: StatefulProposal[]
  // Grouping the proposals by active versus not-active uses a different page layout
  type: 'active' | 'not-active'
}

export function ProposalList({ proposals, type }: ProposalListProps) {
  if (!proposals) return null

  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={variants}
      exit={{ opacity: 0 }}
      className={cn(
        type === 'active'
          ? 'group flex w-full flex-wrap gap-6 md:grid md:grid-cols-2 md:gap-10'
          : 'group flex w-full flex-wrap gap-6 md:grid md:grid-cols-3 md:gap-10'
      )}
    >
      {proposals.map((proposal) => (
        <motion.li
          variants={variants}
          key={proposal.proposalId}
          className="w-full"
        >
          <ProposalCard proposal={proposal} />
        </motion.li>
      ))}
    </motion.ul>
  )
}
