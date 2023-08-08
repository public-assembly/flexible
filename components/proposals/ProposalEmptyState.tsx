import { ArrowUpRight } from '@/components/assets/icons'
import Button from '@/components/base/Button'
import {
  useDaoDetailsQuery,
  useTokenContext,
} from '@public-assembly/builder-utils'
import { ENV } from 'utils/env'
import EmptyState from '../EmptyState'

const ProposalEmptyState = () => {
  const { tokenAddress } = useTokenContext()
  const { daoDetails } = useDaoDetailsQuery({ tokenAddress: tokenAddress })

  const NOUNS_BUILDER_BASE_URL = 'https://nouns.build'
  const TESTNET_NOUNS_BUILDER_BASE_URL = 'https://testnet.nouns.build'

  const url: string =
    ENV.CHAIN == 1
      ? new URL(
          `/dao/ethereum/${ENV.TOKEN_ADDRESS}/proposal/create`,
          NOUNS_BUILDER_BASE_URL
        ).toString()
      : ENV.CHAIN == 5
      ? new URL(
          `/dao/goerli/${ENV.TOKEN_ADDRESS}/proposal/create`,
          TESTNET_NOUNS_BUILDER_BASE_URL
        ).toString()
      : new URL(
          `/dao/zora-goerli/${ENV.TOKEN_ADDRESS}/proposal/create`,
          TESTNET_NOUNS_BUILDER_BASE_URL
        ).toString()

  return (
    <EmptyState
      heading={`${daoDetails.name} has not created any proposals yet.`}
      actions={
        <a
          target="_blank"
          rel="noreferrer"
          href={url}
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
