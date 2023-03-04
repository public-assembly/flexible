/* @ts-ignore */
import * as React from "react"

import Link from "next/link"
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

export default function ProposalCard({ proposal }) {
  return (
    <Link href={`proposals/${proposal.proposalId}`}>
      <Stack
        className={cn(
          "h-full gap-6 px-4 py-4 text-primary transition duration-300 border border-tertiary bg-secondary rounded-object shadow-surface-elevation-low",
          "hover:shadow-surface-elevation-medium hover:border-primary ",
          "active:shadow-surface-elevation-low"
        )}
      >
        {/* Statuses */}
        <Flex className="items-center self-stretch justify-between gap-2 ">
          <Flex className="gap-2">
            <ProposalLabel>{proposal.status}</ProposalLabel>
            <ProposalLabel>Needs vote</ProposalLabel>
          </Flex>
          <ProposalTimestamp voteStart={proposal.voteStart} size="xs" />
        </Flex>

        <Stack className="gap-2">
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
  )
}

function ProposalTitle({ title }) {
  return (
    <BodyLarge className="">
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
