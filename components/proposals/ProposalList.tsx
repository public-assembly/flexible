import { motion } from "framer-motion"

import { cn } from "@/utils/cn"
import ProposalCard from "@/components/proposals/ProposalCard"
import { variants } from "@/components/proposals/animations"

type ProposalListProps = {
  proposals: any
  // Group the proposals by active or not-active  uses different layout in page
  type: "active" | "not-active"
}

export function ProposalList({ proposals, type }: ProposalListProps) {
  if (!proposals) return null
  return (
    <>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={variants}
        exit={{ opacity: 0 }}
        className={cn(
          type === "active"
            ? "flex flex-wrap w-full gap-6 md:gap-10 md:grid md:grid-cols-2 group"
            : "flex flex-wrap w-full gap-6 md:gap-10 md:grid md:grid-cols-3 group"
        )}
      >
        {proposals.map((proposal) => (
          <motion.li
            variants={variants}
            key={proposal.proposalId}
            className="w-full "
          >
            <ProposalCard proposal={proposal} />
          </motion.li>
        ))}
      </motion.ul>
    </>
  )
}
