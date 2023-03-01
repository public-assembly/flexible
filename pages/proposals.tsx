import { Seo } from '@/components/Seo'
import React, { useEffect } from 'react'
import { ProposalPageGrid } from '@public-assembly/dao-utils'
import { isServerSide } from 'utils/helpers'
import ProposalEmptyState from '@/components/proposals/ProposalEmptyState'
import { Stack } from '@/components/base/Stack'

function Proposals() {
  const [loading, setLoading] = React.useState(false)
  useEffect(() => {
    setLoading(true)
  }, [])

  if (isServerSide()) return null
  if (!loading) return null
  return (
    <section className='max-w-[1240px] m-auto px-4 gap-8 flex flex-col h-full justify-center items-center'>
      <Seo title='proposals' />
      <Stack className='items-center justify-center h-full'>
        <ProposalEmptyState />
        <ProposalPageGrid />
      </Stack>
    </section>
  )
}

export default Proposals
