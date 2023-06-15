import { auctionAbi, useAuctionContext } from '@public-assembly/dao-utils'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

export function useSettle({onTxConfirmed}: {onTxConfirmed?: () => any}) {
  const { auctionAddress } = useAuctionContext()

  const { config } = usePrepareContractWrite({
    address: auctionAddress,
    abi: auctionAbi,
    functionName: 'settleCurrentAndCreateNewAuction',
  })
  const { data, write: settle } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      onTxConfirmed && onTxConfirmed()
    }
  })

  return {
    settle,
    isLoading,
    isSuccess,
  }
}
