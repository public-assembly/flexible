import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useProposalPermissions } from "@/hooks/useProposalPermissions"
import ProposalVoteButton from "../ProposalVoteButton"
import Label from "@/components/base/Label"
import { buildEtherscanLink } from "@/utils/helpers"
import { PROPOSAL_SUPPORT, NOUNS_PROPOSAL_SUPPORT } from "types"
import {
  Veto,
  Cancel,
  Execute,
  Queue,
} from "@/components/proposals/ProposalActions"
import { Check, Minus, Exit } from "@/components/assets/icons"
import { Flex } from "@/components/base/Flex"

export function ProposalVoteStatus({ proposal }) {
  const { address, isConnected } = useAuth()
  const { canVeto, canCancel, canVote } = useProposalPermissions(proposal)
  /**
   * If the current proposal needs action from the connected user
   */
  const [needsAction, setNeedsAction] = useState<boolean>(false)
  /**
   * If the connected user has voted, how they voted
   */
  const [voteSupport, setVoteSupport] = useState<PROPOSAL_SUPPORT | null>(null)
  /**
   * The transaction hash of the connected user's voting instance
   */
  const [txHash, setTxHash] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!address) return
    // Return all voting instances for this proposal
    const proposalVotes = proposal.votes
    // Return votes conducted by the connected address
    const vote = proposalVotes.find(
      (vote: any) => vote.voter === address.toLowerCase()
    )
    // Get the hash of the voting instance
    const hash = vote?.transactionInfo?.transactionHash
    // If there is a hash, set it to the txHash state variable
    if (hash) setTxHash(hash)
    // Check if the connected address has voted on this proposal.
    const hasVoted = proposalVotes.some(
      (vote: any) => vote.voter === address.toLowerCase()
    )
    // If the connected address has voted, set their support to the voteSupport state variable
    if (hasVoted) setVoteSupport(vote.support)
    // Set the needsAction boolean to true if they haven't voted and false if not
    setNeedsAction(!hasVoted)
  }, [address, proposal.votes, voteSupport])

  /**
   * If the user is disconnected return nothing
   */
  if (!isConnected) return null
  /**
   * If the proposal has succeeded return the following button
   */
  if (proposal.status == "SUCCEEDED") return <Queue proposal={proposal} />
  /**
   * If the proposal is executable return the following button
   */
  if (proposal.status == "EXECUTABLE") return <Execute proposal={proposal} />
  /**
   * If the user can cancel, return the following button
   */
  if (canCancel && proposal.status != "EXECUTED")
    return <Cancel proposal={proposal} />
  /**
   * If the user can't vote and the proposal is active, return the following badge
   */
  if (!canVote && proposal.status == "ACTIVE")
    return <Label>You are not eligible to vote</Label>
  /**
   * If the user can vote, return the following button
   */
  if (canVote && needsAction) return <ProposalVoteButton proposal={proposal} />
  /**
   * If the user can vote and can veto, return the following group of buttons
   */
  if (canVote && canVeto && proposal.status != "EXECUTED")
    return (
      <Flex className="gap-6">
        <ProposalVoteButton proposal={proposal} />
        <Veto proposal={proposal} />
      </Flex>
    )
  /**
   * If the user has voted, return the following badges
   */
  return (
    <>
      {(() => {
        switch (voteSupport) {
          case NOUNS_PROPOSAL_SUPPORT.ABSTAIN:
            return (
              <Label
                showIcon
                iconLeft={<Exit />}
                showExternalLinkIcon
                externalLink={buildEtherscanLink("tx", txHash)}
              >
                You abstained from voting
              </Label>
            )
          case NOUNS_PROPOSAL_SUPPORT.FOR:
            return (
              <>
                <Label
                  showIcon
                  iconLeft={<Check className="cursor-pointer" />}
                  showExternalLinkIcon
                  externalLink={buildEtherscanLink("tx", txHash)}
                >
                  You voted for this proposal
                </Label>
              </>
            )

          case NOUNS_PROPOSAL_SUPPORT.AGAINST:
            return (
              <Label
                showIcon
                iconLeft={<Minus />}
                showExternalLinkIcon
                externalLink={buildEtherscanLink("tx", txHash)}
              >
                You voted against this proposal
              </Label>
            )
          default:
            return null
        }
      })()}
    </>
  )
}
