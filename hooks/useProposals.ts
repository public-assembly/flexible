import { useEffect, useState } from "react"

import { useGovernorContext } from "@public-assembly/dao-utils"
import _ from "lodash"

import { NOUNS_PROPOSAL_STATUS } from "../types/index"

// TODO: Fix the refresh of proposal stats and setup zustand
export const useProposals = () => {
  const { proposals } = useGovernorContext()

  const [activeProposals, setActiveProposals] = useState<any[] | null>(null)
  const [restProposals, setRestProposals] = useState<any[] | null>(null)
  const [activeProposalCount, setActiveProposalCount] = useState(0)
  const [totalProposalCount, setTotalProposalCount] = useState(0)
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {
    if (!proposals) return

    if (proposals.length === 0) {
      setIsEmpty(true)
    }

    // Split proposals into active and rest of proposals
    const splitProposals = _.partition(
      proposals,
      (proposal) => proposal.status === NOUNS_PROPOSAL_STATUS.ACTIVE
    )

    setTotalProposalCount(proposals.length)
    setActiveProposalCount(splitProposals[0].length)

    if (splitProposals[0].length > 0) {
      setActiveProposals(splitProposals[0])
    }
    if (splitProposals[1].length > 0) {
      setRestProposals(splitProposals[1])
    }
  }, [proposals])

  return {
    activeProposalCount,
    totalProposalCount,
    activeProposals,
    proposals: restProposals,
    allProposals: proposals,
    isEmpty,
    hasActiveProposals: activeProposalCount > 0,
    hasProposals: totalProposalCount > 0,
  }
}
