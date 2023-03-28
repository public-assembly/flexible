import Button from "../base/Button"
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi"
import { Pending } from "../assets/icons"
import { useAuctionContext, auctionAbi } from "@public-assembly/dao-utils"

export function Settle() {
  const { auctionAddress } = useAuctionContext()

  const { config } = usePrepareContractWrite({
    address: auctionAddress,
    abi: auctionAbi,
    functionName: "settleCurrentAndCreateNewAuction",
  })
  const { data, write: settle } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <Button size="lg" disabled={isLoading} onClick={() => settle?.()}>
      {!isLoading ? "Settle auction" : <Pending className="animate-spin" />}
    </Button>
  )
}
