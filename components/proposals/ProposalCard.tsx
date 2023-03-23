/* @ts-ignore */
import * as React from "react"
import { useEffect } from "react"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import Balancer from "react-wrap-balancer"
import { cn } from "utils/cn"

import { Flex } from "@/components/base/Flex"
import { Stack } from "@/components/base/Stack"
import {
  BodyExtraSmall,
  BodyLarge,
  BodySmall,
} from "@/components/base/Typography"
import { Proposer } from "@/components/proposals/Proposer"
import { ProposalCardVotes } from "./ProposalCardVotes"
import ProposalLabel from "./ProposalLabel"
import { useGovernorContext } from "@public-assembly/dao-utils"
import { useContractRead } from "wagmi"
import { governorAbi } from "@public-assembly/dao-utils"
import { BigNumber } from "ethers"
import { Hash } from "types"

export default function ProposalCard({ proposal }) {
  const { address } = useAuth()
  const [needsAction, setNeedsAction] = React.useState<boolean>(false)

  const { governorAddress } = useGovernorContext()

  const { data: availableVotes } = useContractRead({
    address: governorAddress,
    abi: governorAbi,
    functionName: "getVotes",
    args: [address as Hash, BigNumber.from(proposal?.timeCreated)],
  })

  useEffect(() => {
    if (proposal.status != "ACTIVE") return
    if (!address || !availableVotes || availableVotes.toNumber() < 1) return
    const proposalVotes = proposal.votes
    // Check if the current address can vote, and if they've voted on this proposal.
    const hasVoted = proposalVotes.some(
      (vote: any) => vote.voter === address.toLowerCase()
    )
    setNeedsAction(!hasVoted)
  }, [address, proposal.votes])

  return (
    <>
      <Link
        href={`proposals/${proposal.proposalId}`}
        className="transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100"
      >
        <Stack
          className={cn(
            "h-full gap-6 px-4 py-4 text-primary transition duration-300 border border-tertiary bg-secondary rounded-object shadow-surface-elevation-low custom-shadow",
            "hover:shadow-surface-elevation-medium hover:border-primary ",
            "active:shadow-surface-elevation-low"
          )}
        >
          {/* Statuses */}
          <Flex className="flex-wrap items-center self-stretch justify-between gap-2">
            <Flex className="gap-2">
              <ProposalLabel>{proposal.status}</ProposalLabel>
              {needsAction ? <ProposalLabel>Needs vote</ProposalLabel> : null}
            </Flex>
            <ProposalTimestamp voteStart={proposal.voteStart} size="xs" />
          </Flex>

          <Stack className="h-full gap-2 ">
            <ProposalTitle title={proposal.title} />
            <span className="text-xs font-medium text-primary/50">
              by <Proposer proposer={proposal.proposer} />
            </span>
          </Stack>

          <ProposalCardVotes
            forVotes={proposal.forVotes}
            againstVotes={proposal.againstVotes}
            abstainVotes={proposal.abstainVotes}
          />
        </Stack>
      </Link>
    </>
  )
}

function ProposalTitle({ title }) {
  return (
    <BodyLarge>
      <Balancer>{title}</Balancer>
    </BodyLarge>
  )
}

// TODO: Add the different timestamp formats
export function ProposalTimestamp({
  voteStart,
  size = "sm",
}: {
  voteStart: number
  size?: "sm" | "xs"
}) {
  const dateFormat: [string, Intl.DateTimeFormatOptions] = [
    "en-us",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    },
  ]

  const voteStartFormatted = new Date(voteStart * 1000).toLocaleString(
    ...dateFormat
  )

  return (
    <>
      {size === "sm" ? (
        <BodySmall className="text-primary/50">
          Voting starts {voteStartFormatted}
        </BodySmall>
      ) : (
        <BodyExtraSmall className="text-primary/50">
          {/* Voting starts {voteStartFormatted} */}
          Starts in 3 hours 24 min
        </BodyExtraSmall>
      )}
    </>
  )
}
