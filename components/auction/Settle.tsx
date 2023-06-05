import { auctionAbi, useAuctionContext } from '@public-assembly/dao-utils'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { Pending } from '../assets/icons'
import Button from '../base/Button'

export function Settle() {
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

  return (
    <>
      {!isSuccess ? (
        <Button size="lg" disabled={isLoading} onClick={() => settle?.()}>
          {!isLoading ? 'Settle auction' : <Pending className="animate-spin" />}
        </Button>
      ) : (
        <Button size="lg" disabled={true}>
          Settled successfully
        </Button>
      )}
    </>
  )
}
