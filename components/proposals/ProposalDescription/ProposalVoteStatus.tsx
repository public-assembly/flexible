import ConnectButton from '@/components/ConnectButton'
import { Check, Exit, Minus } from '@/components/assets/icons'
import { Flex } from '@/components/base/Flex'
import Label from '@/components/base/Label'
import { Stack } from '@/components/base/Stack'
import {
  Cancel,
  Execute,
  Queue,
  Veto,
} from '@/components/proposals/ProposalActions'
import { useAuth } from '@/hooks/useAuth'
import { buildEtherscanLink } from '@/utils/helpers'
import { useProposalPermissions } from '@public-assembly/builder-utils'
import { useEffect, useState } from 'react'
import { NOUNS_PROPOSAL_SUPPORT, PROPOSAL_SUPPORT } from 'types'
import VotingDialog from '../VotingDialog'

const voteSupportMessages = {
  for: 'You voted for this proposal',
  against: 'You voted against this proposal',
  abstain: 'You voted abstain for this proposal',
}

type ProposalVoteBadgeProps = {
  voteSupport: PROPOSAL_SUPPORT | null
  txHash: string | undefined
}

function ProposalVoteBadge({ voteSupport, txHash }: ProposalVoteBadgeProps) {
  return (
    <Label
      showIcon
      iconLeft={
        voteSupport == NOUNS_PROPOSAL_SUPPORT.ABSTAIN ? (
          <Minus />
        ) : voteSupport == NOUNS_PROPOSAL_SUPPORT.FOR ? (
          <Check />
        ) : (
          <Exit />
        )
      }
      showExternalLinkIcon
      externalLink={buildEtherscanLink('tx', txHash)}
    >
      {voteSupport == NOUNS_PROPOSAL_SUPPORT.ABSTAIN
        ? voteSupportMessages.abstain
        : voteSupport == NOUNS_PROPOSAL_SUPPORT.FOR
        ? voteSupportMessages.for
        : voteSupportMessages.against}
    </Label>
  )
}

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
    return (
      <div className="max-w-[328px]">
        <ConnectButton />
      </div>
    )
  } else if (proposal.state == 'Executed') {
    if (!hasVoted) {
      return (
        <>
          {!canVote ? (
            <Label>You were not eligible to vote on this proposal</Label>
          ) : (
            <Label>You did not vote on this proposal</Label>
          )}
        </>
      )
    } else {
      return <ProposalVoteBadge voteSupport={voteSupport} txHash={txHash} />
    }
  } else if (proposal.state == 'Executable') {
    if (!hasVoted) {
      return (
        <Stack className={'gap-6'}>
          {!canVote ? (
            <Label>You were not eligible to vote on this proposal</Label>
          ) : (
            <Label>You did not vote on this proposal </Label>
          )}
          <Flex className="gap-6">
            <Execute proposal={proposal} />
            {/* If the user can veto, render the veto button
             * The submitter of the proposal can also cancel this prop,
             * but we're not rendering that option
             */}
            {canVeto ? <Veto proposal={proposal} /> : null}
          </Flex>
        </Stack>
      )
    } else {
      return (
        <Stack className="gap-6">
          <ProposalVoteBadge voteSupport={voteSupport} txHash={txHash} />
          <Flex className="gap-6">
            <Execute proposal={proposal} />
            {/* If the user can veto, render the veto button
             * The submitter of the proposal can also cancel this prop,
             * but we're not rendering that option
             */}
            {canVeto ? <Veto proposal={proposal} /> : null}
          </Flex>
        </Stack>
      )
    }
  } else if (proposal.state == 'Queued') {
    if (!hasVoted) {
      return (
        <Stack className={canVeto || canCancel ? 'gap-6' : ''}>
          {!canVote ? (
            <Label>You were not eligible to vote on this proposal</Label>
          ) : (
            <Label>You did not vote on this proposal </Label>
          )}
          <Flex className="gap-6">
            {/* If the user can cancel, render the cancel button */}
            {canCancel ? <Cancel proposal={proposal} /> : null}
            {/* If the user can veto, render the veto button */}
            {canVeto ? <Veto proposal={proposal} /> : null}
            {/* When executable = When queued + queue buffer
            Time remaining = When executable - now */}
          </Flex>
        </Stack>
      )
    } else {
      return (
        <Stack className="gap-6">
          <ProposalVoteBadge voteSupport={voteSupport} txHash={txHash} />
          <Flex className="gap-6">
            {/* If the user can cancel, render the cancel button */}
            {canCancel ? <Cancel proposal={proposal} /> : null}
            {/* If the user can veto, render the veto button */}
            {canVeto ? <Veto proposal={proposal} /> : null}
            {/* When executable = When queued + queue buffer
            Time remaining = When executable - now */}
          </Flex>
        </Stack>
      )
    }
  } else if (proposal.state == 'Succeeded') {
    if (!hasVoted) {
      return (
        <Stack className={canCancel ? 'gap-6' : ''}>
          {!canVote ? (
            <Label>You were not eligible to vote on this proposal</Label>
          ) : (
            <Label>You did not vote on this proposal </Label>
          )}
          <Flex className="gap-6">
            <Queue proposal={proposal} />
            {/* If the user can cancel, render the cancel button */}
            {canCancel ? <Cancel proposal={proposal} /> : null}
          </Flex>
        </Stack>
      )
    } else {
      return (
        <Stack className="gap-6">
          <ProposalVoteBadge voteSupport={voteSupport} txHash={txHash} />
          <Flex className="gap-6">
            {/* If the user can cancel, render the cancel button */}
            {canCancel ? <Cancel proposal={proposal} /> : null}
          </Flex>
        </Stack>
      )
    }
  } else if (proposal.state == 'Defeated') {
    if (!hasVoted) {
      return (
        <Stack>
          {!canVote ? (
            <Label>You were not eligible to vote on this proposal</Label>
          ) : (
            <Label>You did not vote on this proposal </Label>
          )}
        </Stack>
      )
    } else {
      return (
        <Stack className="gap-6">
          <ProposalVoteBadge voteSupport={voteSupport} txHash={txHash} />
        </Stack>
      )
    }
  } else if (proposal.state == 'Active') {
    if (!hasVoted) {
      return (
        <Stack className={canCancel ? 'gap-6' : ''}>
          {!canVote ? (
            <Label>You are not eligible to vote on this proposal</Label>
          ) : (
            <Flex className="gap-6">
              <VotingDialog proposal={proposal} />
              {/* If the user can cancel, render the cancel button */}
              {canCancel ? <Cancel proposal={proposal} /> : null}
            </Flex>
          )}
        </Stack>
      )
    } else {
      return (
        <Stack className={canCancel || canVeto ? 'gap-6' : ''}>
          <ProposalVoteBadge voteSupport={voteSupport} txHash={txHash} />
          <Flex className="gap-6">
            {/* If the user can cancel, render the cancel button */}
            {canCancel ? <Cancel proposal={proposal} /> : null}
            {/* If the user can veto, render the veto button */}
            {canVeto ? <Veto proposal={proposal} /> : null}
            {/* When over = When went live - active buffer
            Time remaining = When over - now */}
          </Flex>
        </Stack>
      )
    }
  } else if (proposal.state == 'Pending') {
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
  }
  return null
}
