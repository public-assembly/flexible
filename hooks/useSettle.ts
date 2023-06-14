import { auctionAbi, useAuctionContext } from '@public-assembly/dao-utils'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

export function useSettle() {
  const { auctionAddress } = useAuctionContext()

  const { config } = usePrepareContractWrite({
    address: auctionAddress,
    abi: auctionAbi,
    functionName: 'settleCurrentAndCreateNewAuction',
  })
  const { data, write: settle } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return {
    settle,
    isLoading,
    isSuccess,
  }
}
