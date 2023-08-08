import { useAuth } from '@/hooks/useAuth'
import {
  governorAbi,
  useGovernorContext,
  useVote,
} from '@public-assembly/builder-utils'
import { useEffect, useState } from 'react'
import { cn } from 'utils/cn'
import { Hash } from 'viem'
import { useContractRead } from 'wagmi'
import { Check, Exit, Minus, Pending } from '../assets/icons'
import { Button } from '../base/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../base/Dialog'
import { Stack } from '../base/Stack'
import { BodyLarge, Headline } from '../base/Typography'
import VotingSuccess from './VotingSuccess'

const VotingDialog = ({ proposal }) => {
  const [open, setOpen] = useState(false)
  const [support, setSupport] = useState<0 | 1 | 2 | undefined>()
  const [reason, setReason] = useState<string | undefined>()
  const [activeButton, setActiveButton] = useState<number>()
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)

  const {
    castVote,
    castVoteSuccess,
    castVoteWithReason,
    castVoteWithReasonSuccess,
    castVoteLoading,
    castVoteWithReasonLoading,
  } = useVote({
    proposalId: proposal.id,
    support,
    reason,
  })
  const { address } = useAuth()
  const { governorAddress } = useGovernorContext()

  const { data: availableVotes } = useContractRead({
    address: governorAddress,
    abi: governorAbi,
    functionName: 'getVotes',
    args: [address as Hash, proposal.timeCreated],
  })

  useEffect(() => {
    if (castVoteSuccess || castVoteWithReasonSuccess) {
      setOpen(false)
      setSuccessDialogOpen(true)
    }
  }, [castVoteSuccess, castVoteWithReasonSuccess])

  if (proposal.state != 'Active') return null
  return (
    <>
      {successDialogOpen && <VotingSuccess reason={reason} />}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="min-w-[328px]" size="lg">
            Submit vote
          </Button>
        </DialogTrigger>
        <DialogContent className="gap-y-6 border border-primary sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <Headline>Voting</Headline>
            </DialogTitle>
            <DialogDescription>
              Votes are permanent and cannot be altered after being submitted
              onchain.
            </DialogDescription>
          </DialogHeader>
          <Stack className="grid gap-4">
            {/* Vote for */}
            <button
              onClick={() => {
                setSupport(1)
                setActiveButton(1)
              }}
              className={cn([
                'flex h-12 w-full items-center justify-center gap-x-1',
                'rounded-lg border border-primary/50 bg-secondary',
                'hover:bg-primary hover:text-secondary',
                activeButton == 1 && 'bg-primary text-secondary',
              ])}
            >
              <Check />
              {availableVotes?.toString()} vote for
            </button>
            {/* Vote against */}
            <button
              onClick={() => {
                setSupport(0)
                setActiveButton(0)
              }}
              className={cn([
                'flex h-12 w-full items-center justify-center gap-x-1',
                'rounded-lg border border-primary/50 bg-secondary',
                'hover:bg-primary hover:text-secondary',
                activeButton == 0 && 'bg-primary text-secondary',
              ])}
            >
              <Exit />
              {availableVotes?.toString()} vote against
            </button>
            {/* Abstain from voting */}
            <button
              onClick={() => {
                setSupport(2)
                setActiveButton(2)
              }}
              className={cn([
                'flex h-12 w-full items-center justify-center gap-x-1',
                'rounded-lg border border-primary/50 bg-secondary',
                'hover:bg-primary hover:text-secondary',
                activeButton == 2 && 'bg-primary text-secondary',
              ])}
            >
              <Minus />
              Abstain from voting
            </button>
          </Stack>
          <Stack className="gap-y-2">
            <BodyLarge>Reason for vote</BodyLarge>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Comment (optional)"
              className="min-h-[96px] w-full px-3 py-2 text-black"
            ></textarea>
          </Stack>
          <DialogFooter>
            {!reason ? (
              <Button
                onClick={() => {
                  castVote?.()
                }}
                size="lg"
                type="submit"
                className="w-full"
                disabled={support === undefined || support === null}
              >
                {!castVoteLoading ? (
                  'Submit vote'
                ) : (
                  <Pending className="animate-spin" />
                )}
              </Button>
            ) : (
              <Button
                onClick={() => castVoteWithReason?.()}
                size="lg"
                type="submit"
                className="w-full"
                disabled={support === undefined || support === null}
              >
                {!castVoteWithReasonLoading ? (
                  'Submit vote with reason'
                ) : (
                  <Pending className="animate-spin" />
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default VotingDialog
