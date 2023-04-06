import Button from "../base/Button"
import { Pending } from "../assets/icons"
import { useGovernorContext, governorAbi } from "@public-assembly/dao-utils"
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi"

/**
 * Veto a proposal
 */
export function Veto({ proposal }) {
  const { governorAddress } = useGovernorContext()

  const { config } = usePrepareContractWrite({
    address: governorAddress,
    abi: governorAbi,
    functionName: "veto",
    args: [proposal.proposalId],
  })
  const { data, write: veto } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <Button
      size="lg"
      variant="alert"
      className="max-w-[328px]"
      disabled={isLoading}
      onClick={() => veto?.()}
    >
      {!isLoading ? "Veto" : <Pending className="animate-spin" />}
    </Button>
  )
}

/**
 * Execute a proposal
 */
export function Execute({ proposal }) {
  const { governorAddress } = useGovernorContext()

  const { config } = usePrepareContractWrite({
    address: governorAddress,
    abi: governorAbi,
    functionName: "execute",
    args: [
      proposal.targets,
      proposal.values,
      proposal.calldatas,
      proposal.descriptionHash,
      proposal.proposer,
    ],
  })
  const { data, write: execute } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <Button
      size="lg"
      className="max-w-[328px]"
      disabled={isLoading}
      onClick={() => execute?.()}
    >
      {!isLoading ? "Execute" : <Pending className="animate-spin" />}
    </Button>
  )
}

/**
 * Queue a proposal
 */
export function Queue({ proposal }) {
  const { governorAddress } = useGovernorContext()

  const { config } = usePrepareContractWrite({
    address: governorAddress,
    abi: governorAbi,
    functionName: "queue",
    args: [proposal.proposalId],
  })
  const { data, write: queue } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <Button
      size="lg"
      className="max-w-[328px]"
      disabled={isLoading}
      onClick={() => queue?.()}
    >
      {!isLoading ? "Queue" : <Pending className="animate-spin" />}
    </Button>
  )
}

/**
 * Cancel a proposal
 */
export function Cancel({ proposal }) {
  const { governorAddress } = useGovernorContext()

  const { config } = usePrepareContractWrite({
    address: governorAddress,
    abi: governorAbi,
    functionName: "cancel",
    args: [proposal.proposalId],
  })
  const { data, write: cancel } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  /**
   * Add pertaining state check
   */
  return (
    <Button
      size="lg"
      variant="alert"
      className="max-w-[328px]"
      disabled={isLoading}
      onClick={() => cancel?.()}
    >
      {!isLoading ? "Cancel proposal" : <Pending className="animate-spin" />}
    </Button>
  )
}
