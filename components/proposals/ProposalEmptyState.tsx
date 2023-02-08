import React from 'react'
import { Button } from '../Button'
import EmptyState from '../EmptyState'

import { ArrowUpRight } from '@/components/assets/icons'

import { buildCreateProposalUrl } from 'utils/helpers'

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
          <Button>
            Submit a proposal <ArrowUpRight />
          </Button>
        </a>
      }
    />
  )
}

export default ProposalEmptyState
