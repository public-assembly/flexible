/* @ts-ignore */
import * as React from "react"
import { useEffect, useState } from "react"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import Balancer from "react-wrap-balancer"
import { cn } from "utils/cn"
import { intervalToDuration, formatDuration } from "date-fns"

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
            "h-full gap-6 p-4 text-primary transition duration-300 border border-tertiary bg-secondary rounded-object custom-shadow",
            "hover:border-primary"
          )}
        >
          {/* Statuses */}
          <Flex className="flex-wrap items-center self-stretch justify-between gap-2">
            <Flex className="gap-2">
              {proposal.status != "ACTIVE" ? (
                <ProposalLabel variant="secondary">
                  {proposal.status}
                </ProposalLabel>
              ) : (
                <ProposalLabel>{proposal.status}</ProposalLabel>
              )}
              {needsAction ? <ProposalLabel>Needs vote</ProposalLabel> : null}
            </Flex>
            <ProposalTimestamp proposal={proposal} size="xs" />
          </Flex>

          <Stack className="h-full gap-2">
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

export function ProposalTimestamp({
  proposal,
  size = "sm",
}: {
  proposal: any
  size?: "sm" | "xs"
}) {
  
  const [timestampBadge, setTimestampBadge] = useState<string>("")

  const pastDateFormat: [string, Intl.DateTimeFormatOptions] = [
    "en-us",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    },
  ]

  const pastDateFormatted = new Date(proposal.voteEnd * 1000).toLocaleString(
    ...pastDateFormat
  )

  const expiresAtFormatted = formatDuration(
    intervalToDuration({
      start: new Date(),
      end: new Date(proposal.expiresAt * 1000),
    }),

    { format: ["days", "hours", "minutes"] }
  )

  const voteEndFormatted = formatDuration(
    intervalToDuration({
      start: new Date(),
      end: new Date(proposal.voteEnd * 1000),
    }),

    { format: ["days", "hours", "minutes"] }
  )

  const voteStartFormatted = formatDuration(
    intervalToDuration({
      start: new Date(),
      end: new Date(proposal.voteStart * 1000),
    }),

    { format: ["days", "hours", "minutes"] }
  )

  useEffect(() => {
    function getTimestampBadge(proposal) {
      if (proposal.status === "ACTIVE") {
        setTimestampBadge(`Voting ends in ${voteEndFormatted}`)
      } else if (proposal.status === "PENDING") {
        setTimestampBadge(`Voting starts in ${voteStartFormatted}`)
      } else if (proposal.status === "EXECUTABLE") {
        setTimestampBadge(`Expires in ${expiresAtFormatted}`)
      } else if (proposal.status === "QUEUED") {
        setTimestampBadge(`Expires in ${expiresAtFormatted}`)
      } else if (proposal.status === "EXECUTED") {
        setTimestampBadge(`Ended ${pastDateFormatted}`)
      } else if (proposal.status === "CANCELED") {
        setTimestampBadge(`Ended ${pastDateFormatted}`)
      } else if (proposal.status === "DEFEATED") {
        setTimestampBadge(`Ended ${pastDateFormatted}`)
      } else if (proposal.status === "VETOED") {
        setTimestampBadge(`Ended ${pastDateFormatted}`)
      }
    }
    getTimestampBadge(proposal)
  }, [proposal])

  return (
    <>
      {size === "sm" ? (
        <BodySmall className="text-primary/50">{timestampBadge}</BodySmall>
      ) : (
        <BodyExtraSmall className="text-primary/50">
          {timestampBadge}
        </BodyExtraSmall>
      )}
    </>
  )
}
