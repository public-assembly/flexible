import { useEffect, useState } from "react"
import { useGovernorContext, governorAbi } from "@public-assembly/dao-utils"
import { Hash } from "types"
import { useContractReads } from "wagmi"
import { BigNumber } from "ethers"
import { useAuth } from "@/hooks/useAuth"

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

  const { data } = useContractReads({
    contracts: [
      {
        ...governorContract,
        functionName: "vetoer",
      },
      {
        ...governorContract,
        functionName: "getProposal",
        args: [proposal.proposalId],
      },
      {
        ...governorContract,
        functionName: "getVotes",
        args: [address as Hash, BigNumber.from(proposal?.timeCreated)],
      },
    ],
    onSuccess(proposalPermissions) {
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

      if (availableVotes.toNumber() >= 1) {
        setCanVote(true)
      }
    },
  })

  console.log("Proposal permissions data:", data)

  return {
    canVeto,
    canCancel,
    canVote,
  }
}
