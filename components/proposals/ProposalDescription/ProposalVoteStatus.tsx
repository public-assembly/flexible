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
import ConnectButton from "@/components/ConnectButton"

export function ProposalVoteStatus({ proposal }) {
  const { address, isConnected } = useAuth()
  const { canVeto, canCancel, canVote } = useProposalPermissions(proposal)
  /**
   * If the current proposal has been voted on from the connected user
   */
  const [hasVoted, setHasVoted] = useState<boolean>(false)
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
    if (hasVoted) {
      setVoteSupport(vote.support)
      setHasVoted(true)
    }
  }, [address, proposal.votes])

  if (!isConnected) {
    return <ConnectButton />
  } else if (!hasVoted) {
    if (proposal.status == "SUCCEEDED") {
      return (
        <Flex className="gap-6">
          <Queue proposal={proposal} />
          {/* If the user can cancel, render the cancel button */}
          {canCancel ? <Cancel proposal={proposal} /> : null}
        </Flex>
      )
    } else if (proposal.status == "EXECUTABLE") {
      return (
        <Flex className="gap-6">
          <Execute proposal={proposal} />
          {/* If the user can veto, render the veto button
           * The submitter of the proposal can also cancel this prop,
           * but we're not rendering that option
           */}
          {canVeto ? <Veto proposal={proposal} /> : null}
        </Flex>
      )
    } else if (proposal.status == "QUEUED") {
      return (
        <Flex className="gap-6">
          {/* If the user can cancel, render the cancel button */}
          {canCancel ? <Cancel proposal={proposal} /> : null}
          {/* If the user can veto, render the veto button */}
          {canVeto ? <Veto proposal={proposal} /> : null}
          {/* When executable = When queued + queue buffer
          Time remaining = When executable - now */}
        </Flex>
      )
    } else if (proposal.status == "ACTIVE") {
      return (
        <Flex className="gap-6">
          {canVote ? (
            <ProposalVoteButton proposal={proposal} />
          ) : (
            <Label>You are not eligible to vote on this proposal </Label>
          )}
          {/* If the user can cancel, render the cancel button */}
          {canCancel ? <Cancel proposal={proposal} /> : null}
          {/* If the user can veto, render the veto button */}
          {canVeto ? <Veto proposal={proposal} /> : null}
        </Flex>
      )
    } else if (proposal.status == "PENDING") {
      return (
        <Flex className="gap-6">
          {/* If the user can cancel, render the cancel button */}
          {canCancel ? <Cancel proposal={proposal} /> : null}
          {/* If the user can veto, render the veto button */}
          {canVeto ? <Veto proposal={proposal} /> : null}
          {/* When active = When submitted + buffer
          Time remaining = When active - now */}
        </Flex>
      )
    } else if (proposal.status == "EXECUTED") {
      return <Label>You did not vote on this proposal</Label>
    } else {
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
                    You voted abstain for this proposal
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
  }
}
