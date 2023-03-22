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
import { useContractRead } from "wagmi"
import {
  governorAbi,
  useGovernorContext,
  useVote,
} from "@public-assembly/dao-utils"
import { useAuth } from "@/hooks/useAuth"
import { BigNumber } from "ethers"
import { Hash } from "types"

const ProposalVoteButton = ({ proposal }) => {
  const [support, setSupport] = useState<0 | 1 | 2 | undefined>()
  const [reason, setReason] = useState<string | undefined>()

  const { castVote, castVoteWithReason } = useVote({
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="max-w-[328px]" size="lg">
          Submit vote
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Voting</DialogTitle>
          <DialogDescription>
            Votes are permanent and cannot be altered after being submitted
            onchain.
          </DialogDescription>
        </DialogHeader>
        <Stack className="grid gap-4 py-6">
          <Button
            onClick={() => setSupport(1)}
            variant="tertiary"
            className="items-center w-full gap-x-1"
          >
            <Check />
            {availableVotes?.toString()} vote for
          </Button>
          <Button
            onClick={() => setSupport(0)}
            variant="tertiary"
            className="items-center w-full gap-x-1"
          >
            <Exit />
            {availableVotes?.toString()} vote against
          </Button>
          <Button
            onClick={() => setSupport(2)}
            variant="tertiary"
            className="items-center w-full gap-x-1"
          >
            <Minus />
            Abstain from voting
          </Button>
        </Stack>
        <Stack>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Comment (optional)"
            className="py-2 px-3 w-full min-h-[167px] text-black"
          ></textarea>
        </Stack>
        <DialogFooter>
          {reason == "" ? (
            <Button
              onClick={() => castVote?.()}
              variant="tertiary"
              type="submit"
              className="w-full"
            >
              Submit vote
            </Button>
          ) : (
            <Button
              onClick={() => castVoteWithReason?.()}
              variant="tertiary"
              type="submit"
              className="w-full"
            >
              Submit vote with reason
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProposalVoteButton
