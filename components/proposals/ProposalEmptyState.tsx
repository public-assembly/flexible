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

  function getURL() {
    switch (ENV.CHAIN) {
      case 1:
        return new URL(
          `/dao/ethereum/${ENV.TOKEN_ADDRESS}/proposal/create`,
          NOUNS_BUILDER_BASE_URL
        ).toString();
      case 5:
        return new URL(
          `/dao/goerli/${ENV.TOKEN_ADDRESS}/proposal/create`,
          TESTNET_NOUNS_BUILDER_BASE_URL
        ).toString();
      case 999:
        return new URL(
          `/dao/zora-goerli/${ENV.TOKEN_ADDRESS}/proposal/create`,
          TESTNET_NOUNS_BUILDER_BASE_URL
        ).toString();
      case 7777777:
        return new URL(
          `/dao/zora/${ENV.TOKEN_ADDRESS}/proposal/create`,
          NOUNS_BUILDER_BASE_URL
        ).toString();
      case 8453:
        return new URL(
          `/dao/base/${ENV.TOKEN_ADDRESS}/proposal/create`,
          NOUNS_BUILDER_BASE_URL
        ).toString();
      default:
        throw new Error('Invalid chain value');
    }
  }

  return (
    <EmptyState
      heading={`${daoDetails.name} has not created any proposals yet.`}
      actions={
        <a
          target="_blank"
          rel="noreferrer"
          href={getURL()}
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
