import { cn } from "utils/cn"

import { ArrowUpRight } from "@/components/assets/icons"
import { Badge } from "@/components/base/Badge"
import { Flex } from "@/components/base/Flex"
import Label from "@/components/base/Label"
import { Stack } from "@/components/base/Stack"
import { Body, Caption } from "@/components/base/Typography"

type VotesSectionProps = {
  forVotes: number
  againstVotes: number
  abstainVotes: number
  className?: string
  proposalThreshold: number
}

export function VotesSection({
  forVotes,
  className,
  againstVotes,
  abstainVotes,
  proposalThreshold,
}: VotesSectionProps) {
  return (
    <Stack className={cn(className, " gap-6 pt-2")}>
      <VotesList
        forVotes={forVotes}
        againstVotes={againstVotes}
        abstainVotes={abstainVotes}
      />

      <Flex className="gap-6 transition-colors duration-200 ease-in-out cursor-pointer group group-hover:text-primary">
        <a className="inline-flex items-center justify-center gap-1 underline text-primary/50">
          Voting snapshot <ArrowUpRight className="text-primary/50" />
        </a>
        <Label variant="rowInverse">
          <Body>Voting threshold</Body>
          <Caption>{proposalThreshold}</Caption>
        </Label>
      </Flex>
    </Stack>
  )
}

function VotesList({
  forVotes,
  againstVotes,
  abstainVotes,
}: {
  forVotes: number
  againstVotes: number
  abstainVotes: number
}) {
  return (
    <Flex className="gap-6">
      <Badge value={forVotes}>For</Badge>
      <Badge value={againstVotes}>Against</Badge>
      <Badge value={abstainVotes}>Abstain</Badge>
    </Flex>
  )
}
