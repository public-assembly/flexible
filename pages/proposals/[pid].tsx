import { ArrowLeft } from '@/components/assets/icons'
import { Flex } from '@/components/base/Flex'
import { Stack } from '@/components/base/Stack'
import { Body } from '@/components/base/Typography'
import ProposalLabel from '@/components/proposals/ProposalLabel'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useProposals } from '@/hooks/useProposals'
import { Headline } from '../../components/base/Typography'
import { RichText } from '@/components/base/Richtext'
import { ProposalTimestamp, Proposer } from '@/components/proposals/ProposalCard'
import ProposalVoteButton from '@/components/proposals/ProposalVoteButton'
import { Divider } from '@/components/base/Divider'

function ProposalDetailPage() {
  const { allProposals } = useProposals()
  const { pid } = useRouter().query

  const proposal = allProposals?.find((proposal) => proposal.proposalId === pid)

  return (
    <Stack className='w-full px-10'>
      <Stack className='w-full gap-10 pt-10'>
        <ProposalNavigation />

        {/* Header section */}
        <Stack className='gap-4'>
          <Flex className='gap-6'>
            <ProposalLabel textTransform='titlecase'>{proposal?.status}</ProposalLabel>
            <ProposalTimestamp voteStart={proposal?.voteStart} />
          </Flex>
          <Stack className='gap-2'>
            <Headline>{proposal?.title}</Headline>
            <Proposer proposer={proposal?.proposer} />
          </Stack>

          <div className='pt-2'>
            <ProposalVoteButton />
          </div>
        </Stack>
      </Stack>
      <Divider />
      <RichText html={proposal?.description} className='w-full' />
    </Stack>
  )
}

export default ProposalDetailPage

function ProposalNavigation() {
  return (
    <Link href='/proposals' className='cursor-pointer'>
      <Flex className='gap-2 w-fit'>
        <ArrowLeft /> <Body>Back to proposals</Body>
      </Flex>
    </Link>
  )
}
