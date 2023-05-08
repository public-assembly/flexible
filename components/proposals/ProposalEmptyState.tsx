import React from 'react'
import EmptyState from '../EmptyState'
import { ArrowUpRight } from '@/components/assets/icons'
import { buildCreateProposalUrl } from 'utils/helpers'
import Button from '@/components/base/Button'
import { ENV } from 'utils/env'
import { useTokenContext } from '@public-assembly/dao-utils'

const ProposalEmptyState = () => {
  const { tokenSettings } = useTokenContext()

  return (
    <EmptyState
      heading={`${tokenSettings?.[0]} has not created any proposals yet.`}
      actions={
        <a
          target="_blank"
          rel="noreferrer"
          href={buildCreateProposalUrl(ENV.TOKEN_ADDRESS)}
          className="focus:outline-none"
        >
          <Button
            variant="secondary"
            size="md"
            suffix={<ArrowUpRight className="ml-[6px] text-tertiary" />}
          >
            Submit a proposal
          </Button>
        </a>
      }
    />
  )
}

export default ProposalEmptyState
