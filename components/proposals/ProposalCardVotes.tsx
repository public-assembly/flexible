import { Flex } from '@/components/base/Flex'
import ProposalLabel from '@/components/proposals/ProposalLabel'

export function ProposalCardVotes({
  forVotes,
  againstVotes,
  abstainVotes,
}: {
  forVotes: number
  againstVotes: number
  abstainVotes: number
}) {
  return (
    <Flex className="text-primary!important hidden gap-2 md:flex">
      {forVotes > 0 ? (
        <ProposalLabel variant="tertiaryVotes" textTransform="uppercase">
          {forVotes} For
        </ProposalLabel>
      ) : null}
      {againstVotes > 0 ? (
        <ProposalLabel variant="tertiaryVotes" textTransform="uppercase">
          {againstVotes} Against
        </ProposalLabel>
      ) : null}
      {abstainVotes > 0 ? (
        <ProposalLabel variant="tertiaryVotes" textTransform="uppercase">
          {abstainVotes} Abstain
        </ProposalLabel>
      ) : null}
    </Flex>
  )
}
