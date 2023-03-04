import Link from "next/link"
import { useRouter } from "next/router"
import { useProposals } from "@/hooks/useProposals"
import Balancer from "react-wrap-balancer"

import { ArrowLeft, Check } from "@/components/assets/icons"
import { Divider } from "@/components/base/Divider"
import { Flex } from "@/components/base/Flex"
import Label from "@/components/base/Label"
import { RichText } from "@/components/base/Richtext"
import { Stack } from "@/components/base/Stack"
import { Body } from "@/components/base/Typography"
import { ProposalTimestamp } from "@/components/proposals/ProposalCard"
import {
  DecodedTransactions,
  VotesSection,
} from "@/components/proposals/ProposalDescription"
import ProposalLabel from "@/components/proposals/ProposalLabel"
import ProposalVoteButton from "@/components/proposals/ProposalVoteButton"
import { Proposer } from "@/components/proposals/Proposer"
import { BodyLarge, Headline } from "../../components/base/Typography"

// TODO; maybe fetch the token image for the proposer
function ProposalDetailPage() {
  const { allProposals } = useProposals()
  const { pid } = useRouter().query

  if (!allProposals) return null

  const proposal = allProposals.find((proposal) => proposal.proposalId === pid)
  console.log({ proposal })

  if (!proposal) return null
  return (
    <Stack className="w-full px-4 md:px-10">
      <Stack className="w-full gap-10 pt-10">
        <ProposalNavigation />

        <Flex className="justify-between w-full h-full">
          {/* Header section */}
          <Stack className="w-full gap-4">
            <Flex className="items-center gap-6">
              <ProposalLabel>{proposal.status}</ProposalLabel>
              <ProposalTimestamp voteStart={proposal.voteStart} size="sm" />
            </Flex>
            <Stack className="w-full gap-2">
              <Balancer>
                <Headline>{proposal.title}</Headline>
              </Balancer>
              <p>
                By <Proposer proposer={proposal.proposer} />
              </p>
            </Stack>

            <div className="pt-2">
              <Label
                showIcon
                iconLeft={<Check />}
                showExternalLinkIcon
                externalLink=""
              >
                You voted against this proposal
              </Label>
              <ProposalVoteButton />
            </div>

            {/* Mobile Proposal Votes section */}
            <VotesSection
              className="md:hidden"
              forVotes={proposal.forVotes}
              abstainVotes={proposal.abstainVotes}
              againstVotes={proposal.againstVotes}
              proposalThreshold={proposal.proposalThreshold}
            />
          </Stack>

          {/* Desktop Proposal Votes section */}
          <VotesSection
            className="hidden md:flex"
            forVotes={proposal.forVotes}
            abstainVotes={proposal.abstainVotes}
            againstVotes={proposal.againstVotes}
            proposalThreshold={proposal.proposalThreshold}
          />
        </Flex>
      </Stack>
      <Divider />

      {/* Proposal description */}
      <RichText html={proposal.description} className="w-full" />

      {/* Proposer */}
      <section id="Proposer">
        <BodyLarge className="py-10">Proposer</BodyLarge>
        <Flex className="items-center">
          <Proposer proposer={proposal.proposer} className="text-primary" />
        </Flex>
      </section>

      {/* Proposal transactions */}
      <section id="Proposal Transactions">
        <BodyLarge className="py-10">Proposed Transactions</BodyLarge>
        <DecodedTransactions
          calldatas={proposal.calldatas}
          targets={proposal.targets}
          values={proposal.values}
        />
      </section>
    </Stack>
  )
}

export default ProposalDetailPage

function ProposalNavigation() {
  return (
    <Link href="/proposals" className="cursor-pointer group">
      <Flex className="gap-2 w-fit">
        <ArrowLeft className="transition duration-200 ease-in-out group-hover:-translate-x-1" />{" "}
        <Body>Back to proposals</Body>
      </Flex>
    </Link>
  )
}
