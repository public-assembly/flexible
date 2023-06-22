import { governorAbi, useGovernorContext } from '@public-assembly/builder-utils'
import { Hash } from 'viem'
import { useContractRead } from 'wagmi'

export const PROPOSAL_STATES = {
  0: 'PENDING',
  1: 'ACTIVE',
  2: 'CANCELED',
  3: 'DEFEATED',
  4: 'SUCCEEDED',
  5: 'QUEUED',
  6: 'EXPIRED',
  7: 'EXECUTED',
  8: 'VETOED',
}

function parseState(state: number): string {
  return PROPOSAL_STATES[state]
}

export function useProposalState({ proposalId }: { proposalId: string }) {
  const { governorAddress } = useGovernorContext()

  const { data: proposalState } = useContractRead({
    address: governorAddress,
    abi: governorAbi,
    functionName: 'state',
    args: [proposalId as Hash],
  })

  return parseState(Number(proposalState))
}
