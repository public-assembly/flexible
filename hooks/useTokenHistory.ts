import { zoraApiFetcher } from '@public-assembly/dao-utils'
import { gql } from 'graphql-tag'
import useSWR from 'swr'

let Chain
;(function (Chain) {
  Chain['Goerli'] = 'GOERLI'
  Chain['Mainnet'] = 'MAINNET'
  Chain['Rinkeby'] = 'RINKEBY'
})(Chain || (Chain = {}))

const CHAIN = {
  1: Chain.Mainnet,
  5: Chain.Goerli,
}[process.env.NEXT_PUBLIC_CHAIN_ID || 1]

const DAO_TOKEN_HISTORY = gql`
  query MyQuery($tokenAddress: String!, $tokenId: String!) {
    nouns {
      nounsMarkets(
        where: { tokens: { address: $tokenAddress, tokenId: $tokenId } }
      ) {
        nodes {
          duration
          endTime
          startTime
          extended
          timeBuffer
          estimatedDurationTime
        }
      }
    }
  }
`

export function useTokenHistory(
  tokenAddress: string | undefined,
  tokenId: string
) {
  const { data: tokenHistory, error } = useSWR('tokenChange', async () =>
    zoraApiFetcher(DAO_TOKEN_HISTORY, {
      tokenAddress,
      tokenId,
      chain: CHAIN,
    })
  )
  return {
    tokenHistory: tokenHistory?.nouns?.nounsMarkets?.nodes[0],
    error,
  }
}
