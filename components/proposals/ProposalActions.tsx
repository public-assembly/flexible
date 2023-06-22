import { governorAbi, useGovernorContext } from '@public-assembly/builder-utils'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { Pending } from '../assets/icons'
import Button from '../base/Button'

/**
 * Veto a proposal
 */
export function Veto({ proposal }) {
  const { governorAddress } = useGovernorContext()

  const { config } = usePrepareContractWrite({
    address: governorAddress,
    abi: governorAbi,
    functionName: 'veto',
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
      className="min-w-[328px]"
      disabled={isLoading || !veto}
      onClick={() => veto?.()}
    >
      {!isLoading ? 'Veto' : <Pending className="animate-spin" />}
    </Button>
  )
}

/**
 * Execute a proposal
 */
export function Execute({ proposal }) {
  const { governorAddress } = useGovernorContext()

  // Todo: Check if this execution hook is prepared correctly
  const { config } = usePrepareContractWrite({
    address: governorAddress,
    abi: governorAbi,
    functionName: 'execute',
    args: [
      proposal.targets,
      proposal.values,
      proposal.calldatas,
      proposal.descriptionHash,
      proposal.proposer,
    ],
    value: BigInt(proposal.values),
  })
  const { data, write: execute } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <Button
      size="lg"
      className="min-w-[328px]"
      disabled={isLoading || !execute}
      onClick={() => execute?.()}
    >
      {!isLoading ? 'Execute' : <Pending className="animate-spin" />}
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
    functionName: 'queue',
    args: [proposal.proposalId],
  })
  const { data, write: queue } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <Button
      size="lg"
      className="min-w-[328px]"
      disabled={isLoading || !queue}
      onClick={() => queue?.()}
    >
      {!isLoading ? 'Queue' : <Pending className="animate-spin" />}
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
    functionName: 'cancel',
    args: [proposal.proposalId],
  })
  const { data, write: cancel } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <Button
      size="lg"
      variant="alert"
      className="min-w-[328px]"
      disabled={isLoading || !cancel}
      onClick={() => cancel?.()}
    >
      {!isLoading ? 'Cancel proposal' : <Pending className="animate-spin" />}
    </Button>
  )
}
