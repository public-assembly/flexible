import { useGovernorContext } from '@public-assembly/builder-utils'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { PROPOSAL_STATES, useProposalState } from './useProposalState'

export const useActiveProposals = () => {
  const { daoProposals } = useGovernorContext()

  const [activeProposals, setActiveProposals] = useState<any[] | null>(null)
  const [restProposals, setRestProposals] = useState<any[] | null>(null)
  const [activeProposalCount, setActiveProposalCount] = useState(0)
  const [totalProposalCount, setTotalProposalCount] = useState(0)
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {
    if (!daoProposals) return

    if (daoProposals.length === 0) {
      setIsEmpty(true)
    }

    // Get states for all proposals
    const proposalsWithState = daoProposals.map((proposal) => ({
      ...proposal,
      state: useProposalState({ proposalId: proposal.id }),
    }))

    // Split proposals into active and rest of proposals
    const splitProposals = _.partition(
      proposalsWithState,
      (proposal) => proposal.state === PROPOSAL_STATES[1]
    )

    setTotalProposalCount(daoProposals.length)
    setActiveProposalCount(splitProposals[0].length)

    if (splitProposals[0].length > 0) {
      setActiveProposals(splitProposals[0])
    }
    if (splitProposals[1].length > 0) {
      setRestProposals(splitProposals[1])
    }
  }, [daoProposals])

  return {
    activeProposalCount,
    totalProposalCount,
    activeProposals,
    proposals: restProposals,
    allProposals: daoProposals,
    isEmpty,
    hasActiveProposals: activeProposalCount > 0,
    hasProposals: totalProposalCount > 0,
  }
}
