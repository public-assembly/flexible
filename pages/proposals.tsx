import { Seo } from '@/components/Seo'
import React, { useEffect } from 'react'
import { ManagerProvider, GovernorProvider, ProposalPageGrid } from '@public-assembly/dao-utils'
import { isServerSide } from 'utils/helpers'
import ProposalEmptyState from '@/components/proposals/ProposalEmptyState'
import ProposalVoteButton from '@/components/proposals/ProposalVoteButton'

function Proposals() {
  const [loading, setLoading] = React.useState(false)
  const tokenAddress = '0xd2e7684cf3e2511cc3b4538bb2885dc206583076' as `0x${string}`
  useEffect(() => {
    setLoading(true)
  }, [])

  if (isServerSide()) return null
  if (!loading) return null
  return (
    <section className='max-w-[1240px] m-auto px-4 gap-8 flex flex-col'>
      <Seo title='proposals' />
      <div>
        <ManagerProvider tokenAddress={tokenAddress}>
          <GovernorProvider>
            <ProposalVoteButton />
            <ProposalEmptyState />
            {/* <ProposalPageGrid /> */}
          </GovernorProvider>
        </ManagerProvider>
      </div>
    </section>
  )
}

export default Proposals
