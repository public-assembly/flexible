import { motion } from "framer-motion"

import { MotionFlex } from "@/components/base/Flex"
import ProposalCard from "@/components/proposals/ProposalCard"
import { variants } from "@/components/proposals/animations"

export function ActiveProposalList({ proposals }) {
  if (!proposals) return null
  return (
    <>
      <MotionFlex
        initial="hidden"
        animate="visible"
        variants={variants}
        exit={{ opacity: 0 }}
        className="flex-wrap w-full gap-6 md:gap-10 md:grid md:grid-cols-2"
      >
        {proposals.map((proposal) => (
          <>
            <motion.div
              variants={variants}
              key={proposal.proposalId}
              className="w-full"
            >
              <ProposalCard key={proposal.id} proposal={proposal} />
            </motion.div>
          </>
        ))}
      </MotionFlex>
    </>
  )
}
