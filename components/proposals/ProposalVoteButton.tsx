import { useState, useMemo } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../base/Dialog"
import { Check, Minus, Exit } from "../assets/icons"
import { Stack } from "../base/Stack"
import { Button } from "../base/Button"
import { cn } from "utils/cn"
import { useContractRead } from "wagmi"
import {
  governorAbi,
  useGovernorContext,
  useVote,
} from "@public-assembly/dao-utils"
import { Headline, BodyLarge } from "../base/Typography"
import { useAuth } from "@/hooks/useAuth"
import { BigNumber } from "ethers"
import { Hash } from "types"
import { Pending } from "../assets/icons"

const ProposalVoteButton = ({ proposal }) => {
  const [support, setSupport] = useState<0 | 1 | 2 | undefined>()
  const [reason, setReason] = useState<string | undefined>()
  const [activeButton, setActiveButton] = useState<number>()

  const {
    castVote,
    castVoteWithReason,
    castVoteLoading,
    castVoteWithReasonLoading,
  } = useVote({
    proposal,
    support,
    reason,
  })
  const { address } = useAuth()
  const { governorAddress } = useGovernorContext()

  const { data: availableVotes } = useContractRead({
    address: governorAddress,
    abi: governorAbi,
    functionName: "getVotes",
    args: [address as Hash, BigNumber.from(proposal?.timeCreated)],
  })

  if (proposal.status != "ACTIVE") return null
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="min-w-[328px]" size="lg">
          Submit vote
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-y-6 border border-primary">
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
              "flex justify-center items-center w-full gap-x-1 h-12",
              "bg-secondary border border-primary/50 rounded-lg",
              "hover:bg-primary hover:text-secondary",
              activeButton == 1 && "text-secondary bg-primary",
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
              "flex justify-center items-center w-full gap-x-1 h-12",
              "bg-secondary border border-primary/50 rounded-lg",
              "hover:bg-primary hover:text-secondary",
              activeButton == 0 && "text-secondary bg-primary",
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
              "flex justify-center items-center w-full gap-x-1 h-12",
              "bg-secondary border border-primary/50 rounded-lg",
              "hover:bg-primary hover:text-secondary",
              activeButton == 2 && "text-secondary bg-primary",
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
            className="py-2 px-3 w-full min-h-[167px] text-black"
          ></textarea>
        </Stack>
        <DialogFooter>
          {!reason ? (
            <Button
              onClick={() => castVote?.()}
              size="lg"
              type="submit"
              className="w-full"
              disabled={support === undefined || support === null}
            >
              {!castVoteLoading ? (
                "Submit vote"
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
                "Submit vote with reason"
              ) : (
                <Pending className="animate-spin" />
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProposalVoteButton
