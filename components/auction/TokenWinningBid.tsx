import * as React from "react"

import {
  etherscanLink,
  useActiveAuction,
  useDaoToken,
  useNounsProtocol,
} from "@public-assembly/dao-utils"
import { ethers } from "ethers"
import { shortenAddress } from "utils/shortenAddress"
import { useEnsName } from "wagmi"

import { Flex } from "@/components/base/Flex"
import { Caption } from "@/components/base/Typography"
import { buildEtherscanAddressLink } from "../../utils/helpers"

export type AuctionEvent = {
  id: number
  bidder: string
  amount: string
  transactionHash: string
}

export const TokenWinningBid = ({
  tokenId,
  tokenAddress,
}: {
  tokenAddress: `0x${string}`
  tokenId: string
}) => {
  const { auctionData } = useActiveAuction(tokenAddress)

  const { tokenData } = useDaoToken({
    tokenAddress: tokenAddress,
    tokenId: tokenId,
  })

  const { auctionContract } = useNounsProtocol({
    tokenAddress: tokenAddress,
    auctionAddress: auctionData?.address,
  })

  const [winningBid, setWinningBid] = React.useState<string | undefined>("N/A")
  const [winningTx, setWinningTx] = React.useState<string | undefined>()
  const [address, setAddress] = React.useState<string | undefined>()

  const { data: ensName } = useEnsName({
    address: address as `0x${string}` | undefined,
  })

  const bidder = React.useMemo(
    () => (ensName ? ensName : shortenAddress(address)),
    [ensName, address]
  )

  React.useEffect(() => {
    async function getBids() {
      try {
        if (tokenData?.mintInfo?.mintContext?.blockNumber) {
          /**
           * https://docs.ethers.io/v5/api/contract/contract/#Contract-queryFilter
           * Used to query the Auction events exposed below:
           * https://github.com/ourzora/nouns-protocol/blob/main/src/auction/IAuction.sol#L16-L22
           */
          const bids = await auctionContract?.queryFilter(
            "AuctionBid" as any,
            tokenData?.mintInfo?.mintContext?.blockNumber,
            "latest" /* Clamp at next token block number if decrementing */
          )
          if (bids) {
            const auctionEventsArray = bids.map((event: any) => {
              return {
                id: parseInt(event.args?.tokenId?._hex, 16),
                bidder: event.args?.bidder as string,
                amount: ethers.utils.formatEther(event.args?.amount),
                transactionHash: event.transactionHash as string,
              }
            }) as AuctionEvent[]

            const tokenEvents = auctionEventsArray?.filter(
              (token) => token?.id === Number(tokenId)
            )

            if (tokenEvents?.length) {
              const lastTokenEvent = tokenEvents.at(-1)
              setAddress(lastTokenEvent?.bidder)
              setWinningBid(`${lastTokenEvent?.amount}`)
              setWinningTx(
                etherscanLink({ hash: lastTokenEvent?.transactionHash })
              )
            } else {
              setWinningBid("N/A")
              setWinningTx(undefined)
            }
          }
        }
      } catch (err) {}
    }
    getBids()

    return function cleanup() {}
  }, [auctionContract, tokenId, tokenData])

  if (!!bidder && !!address)
    return (
      <Flex className="z-10 items-center gap-4 ">
        <div className="px-4 py-2 bg-primary text-secondary rounded-object w-fit">
          <a
            href={winningTx}
            target="_blank"
            rel="noreferrer"
            className={`${
              !winningTx && "pointer-events-none"
            }  h-6 inline-flex items-center group`}
          >
            <Caption className="uppercase text-secondary">
              Ξ <span className="group-hover:underline">{winningBid}</span>
            </Caption>
          </a>
        </div>
        <a
          href={buildEtherscanAddressLink(address)}
          target="_blank"
          rel="noreferrer"
          className={`${
            !winningTx && "pointer-events-none"
          }  h-6 inline-flex items-center group`}
        >
          <div className="px-4 py-2 bg-primary text-secondary rounded-object w-fit">
            {bidder}
          </div>
        </a>
      </Flex>
    )

  return (
    <Flex className="z-10 items-center gap-4 px-4 py-2 bg-primary text-secondary rounded-object w-fit">
      <span className="pr-">Winning bid </span>

      <a
        href={winningTx}
        target="_blank"
        rel="noreferrer"
        className={`${
          !winningTx && "pointer-events-none"
        }  h-6 inline-flex items-center group`}
      >
        <Caption className="uppercase text-secondary">
          Ξ <span className="group-hover:underline">{winningBid}</span>
        </Caption>
      </a>
    </Flex>
  )
}
