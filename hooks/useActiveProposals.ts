import { useGovernorContext } from '@public-assembly/builder-utils'
import _ from 'lodash'
import { useEffect, useState } from 'react'

export const useActiveProposals = () => {
  const { proposals } = useGovernorContext()

  const [activeProposals, setActiveProposals] = useState<typeof proposals>()
  const [restProposals, setRestProposals] = useState<typeof proposals>()
  const [activeProposalCount, setActiveProposalCount] = useState<number>(0)
  const [totalProposalCount, setTotalProposalCount] = useState<number>(0)
  const [isEmpty, setIsEmpty] = useState<boolean>(false)

  useEffect(() => {
    if (!proposals) return

    if (proposals.length === 0) {
      setIsEmpty(true)
    }

    // Split proposals into active and rest of proposals
    const splitProposals = _.partition(
      proposals,
      (proposal) => proposal.state === 'Active'
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
    isEmpty,
    hasActiveProposals: activeProposalCount > 0,
    hasProposals: totalProposalCount > 0,
  }
}
