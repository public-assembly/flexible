import { motion } from "framer-motion"

import ProposalCard from "@/components/proposals/ProposalCard"
import { variants } from "@/components/proposals/animations"

export function NotActiveProposalList({ proposals }) {
  if (!proposals) return null
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        exit={{ opacity: 0 }}
        className="flex flex-wrap w-full gap-6 md:gap-10 md:grid md:grid-cols-3"
      >
        {proposals.map((proposal) => (
          <motion.div
            variants={variants}
            key={`proposal-${proposal.proposalId}`}
            className="w-full wrapper"
          >
            <ProposalCard proposal={proposal} />
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}
