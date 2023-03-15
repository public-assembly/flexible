import Button from "../base/Button"
import { usePrepareContractWrite, useContractWrite } from "wagmi"
import { ethers } from "ethers"
import { useAuctionContext } from "@public-assembly/dao-utils"

export function Settle() {
  const { auctionAddress } = useAuctionContext()

  const { config, isLoading, error } = usePrepareContractWrite({
    address: auctionAddress,
    abi: auctionAbi,
    functionName: "settle",
  })
  const { write: settle } = useContractWrite(config)

  return (
    <Button onClick={() => settle?.()} className="py-8 lg:py-7">
      Settle auction
    </Button>
  )
}
