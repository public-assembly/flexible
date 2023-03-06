import React from 'react'
import EmptyState from '../EmptyState'

import { ArrowUpRight } from '@/components/assets/icons'

import { buildCreateProposalUrl } from 'utils/helpers'
import Button from '@/components/base/Button'

const ProposalEmptyState = () => {
  return (
    <EmptyState
      heading={`${process.env.NEXT_PUBLIC_SITE_TITLE} has not created any proposals yet.`}
      actions={
        <a
          target='_blank'
          rel='noreferrer'
          href={buildCreateProposalUrl(process.env.NEXT_PUBLIC_DAO_ADDRESS!)}
          className='focus:outline-none'
        >
          <Button variant='secondary' size='md' suffix={<ArrowUpRight className='text-tertiary ml-[6px]' />}>
            Submit a proposal
          </Button>
        </a>
      }
    />
  )
}

export default ProposalEmptyState
