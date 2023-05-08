import { ArrowUpRight } from '@/components/assets/icons'
import Button from '@/components/base/Button'
import { useTokenContext } from '@public-assembly/dao-utils'
import { ENV } from 'utils/env'
import { buildCreateProposalUrl } from 'utils/helpers'
import EmptyState from '../EmptyState'

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
