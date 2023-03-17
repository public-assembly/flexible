import React from "react"
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
import { governorAbi, useGovernorContext } from "@public-assembly/dao-utils"
import { useAuth } from "@/hooks/useAuth"
import { BigNumber } from "ethers"

const ProposalVoteButton = ({ proposal }) => {
  const { address } = useAuth()
  const { governorAddress } = useGovernorContext()
  const { data: availableVotes } = useContractRead({
    address: governorAddress,
    abi: governorAbi,
    functionName: "getVotes",
    args: [address as string, BigNumber.from(proposal?.timeCreated)],
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="max-w-[327px]" size="lg">
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
          <Button variant="tertiary" className="items-center w-full gap-x-1">
            <Check />
            {availableVotes?.toString()} vote for
          </Button>
          <Button variant="tertiary" className="items-center w-full gap-x-1">
            <Exit />
            {availableVotes?.toString()} vote against
          </Button>
          <Button variant="tertiary" className="items-center w-full gap-x-1">
            <Minus />
            Abstain from voting
          </Button>
        </Stack>
        <Stack>
          <textarea
            placeholder="Comment(optional)"
            className="py-2 px-3 w-full min-h-[167px] text-black"
          ></textarea>
        </Stack>
        <DialogFooter>
          <Button
            variant="tertiary"
            type="submit"
            className="w-full py-8 lg:py-7"
          >
            Submit vote
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProposalVoteButton
