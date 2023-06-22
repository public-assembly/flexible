import { useAuth } from '@/hooks/useAuth'
import { governorAbi, useGovernorContext } from '@public-assembly/builder-utils'
import { useState } from 'react'
import { Hex } from 'viem'
import { useContractReads } from 'wagmi'

export function useProposalPermissions(proposal) {
  const { governorAddress } = useGovernorContext()
  const { address } = useAuth()
  const [canVeto, setCanVeto] = useState<boolean>(false)
  const [canCancel, setCanCancel] = useState<boolean>(false)
  const [canVote, setCanVote] = useState<boolean>(false)

  const governorContract = {
    address: governorAddress,
    abi: governorAbi,
  }

  useContractReads({
    contracts: [
      {
        ...governorContract,
        functionName: 'vetoer',
      },
      {
        ...governorContract,
        functionName: 'getProposal',
        args: [proposal.proposalId],
      },
      {
        ...governorContract,
        functionName: 'getVotes',
        args: [address as Hex, BigInt(proposal?.timeCreated)],
      },
    ],
    onSuccess(proposalPermissions) {
      // Todo: address type safety
      // @ts-ignore
      if (proposalPermissions[0] === address) {
        setCanVeto(true)
      }

      if (proposalPermissions[1]?.[0] === address) {
        setCanCancel(true)
      }

      let availableVotes
      if (proposalPermissions[2] !== null) {
        availableVotes = proposalPermissions[2]
      }

      if (availableVotes?.toNumber() > 0) {
        setCanVote(true)
      }
    },
  })

  return {
    canVeto,
    canCancel,
    canVote,
  }
}
