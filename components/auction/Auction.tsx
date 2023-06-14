import { Flex } from '@/components/base/Flex'
import { Stack } from '@/components/base/Stack'
import { BlurImage } from '@/components/BlurImage'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useSettle } from '@/hooks/useSettle'
import {
  useActiveAuction,
  useBid,
  useBidder,
  useCountdown,
  useDaoTokenQuery,
  useManagerContext,
  useTokenContext,
  useTokenExplorer,
  useTokenMetadata,
} from '@public-assembly/dao-utils'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Hash } from 'types'
import { ENV } from 'utils/env'
import Label from '../base/Label'
import { AuctionSheet } from './AuctionSheet'
import { ExplorerButtons } from './ExplorerButtons'

const Auction = () => {
  const { isMobile } = useIsMobile()
  const { tokenAddress } = useManagerContext()
  const { auctionState, minBidAmount } = useActiveAuction(tokenAddress as Hash)
  const { isEnded } = useCountdown(auctionState.endTime)

  const {
    incrementId,
    decrementId,
    tokenId,
    currentTokenId,
    isFirstToken,
    isLastToken,
  } = useTokenExplorer()

  const { settle, isLoading, isSuccess } = useSettle()

  const settleProps = { settle, isLoading, isSuccess };

  const { tokenName, tokenThumbnail } = useTokenMetadata(
    currentTokenId.toString()
  )

  const { winningBid, winningTx, tokenEvents } = useBid({
    tokenId: currentTokenId.toString(),
    tokenAddress: tokenAddress as Hash,
  })

  const [tokenOwner, setTokenOwner] = useState<string | Hash>()

  useEffect(() => {
    if (tokenEvents?.length != 0) {
      setTokenOwner(tokenEvents?.[tokenEvents.length - 1].bidder)
    } else {
      setTokenOwner(tokenData?.owner)
    }
  }, [])

  const resolvedTokenOwner = useBidder(tokenOwner).bidder

  const { tokenData } = useDaoTokenQuery({
    tokenAddress: ENV.TOKEN_ADDRESS,
    tokenId: currentTokenId.toString(),
  })

  const { tokenSettings } = useTokenContext()

  return (
    <Stack className="min-h-screen justify-center gap-4 px-4">
      <Flex className="relative w-full justify-center">
        <Stack className="relative aspect-square h-full max-h-[600px] w-full max-w-[600px] justify-between p-4">
          <div className="absolute inset-0 z-0 aspect-square w-full">
            {tokenThumbnail && (
              <BlurImage
                src={tokenThumbnail}
                height={600}
                width={600}
                alt={`${tokenId}`}
              />
            )}
          </div>

          <ExplorerButtons
            incrementId={incrementId}
            decrementId={decrementId}
            isFirstToken={isFirstToken}
            isLastToken={isLastToken}
          />

          {isMobile ? null : (
            <Flex className="justify-between">
              {/* Current token/Historical token badge */}
              {tokenName ? (
                <Label variant="row" className="z-10">
                  {tokenName}
                </Label>
              ) : (
                <Label variant="row" className="z-10 animate-pulse">
                  {tokenSettings?.[0]}
                </Label>
              )}
              {/* Current bid/Historical bid badge */}
              {isLastToken && !isEnded ? (
                <Label variant="row" className="z-10">
                  <a className="flex" href={winningTx}>
                    <span className="mr-4">Current bid</span>
                    {winningBid ? `${winningBid} ETH` : ''}
                  </a>
                </Label>
              ) : !tokenData ? (
                <Flex className="gap-x-4">
                  <Label variant="row" className="animate-pulse">
                    N/A
                  </Label>
                  <Label variant="row" className="animate-pulse">
                    0x...
                  </Label>
                </Flex>
              ) : winningBid === 'N/A' &&
                tokenData?.owner !=
                  '0x0000000000000000000000000000000000000000' ? (
                <Label
                  variant="row"
                  className="z-10"
                >{`Allocated to ${resolvedTokenOwner}`}</Label>
              ) : (
                <Flex className="z-10 gap-4">
                  {winningBid && resolvedTokenOwner ? (
                    <>
                      <Label variant="row">{`${winningBid} ETH`}</Label>
                      <Label variant="row">{`${resolvedTokenOwner}`}</Label>
                    </>
                  ) : null}
                </Flex>
              )}
            </Flex>
          )}
        </Stack>

        {/* Desktop/Tablet Auction button */}
        <AuctionSheet
          currentTokenId={currentTokenId.toString()}
          tokenName={tokenName as string}
          winningBid={winningBid as string}
          isEnded={isEnded}
          isLastToken={isLastToken}
          auctionState={auctionState}
          minBidAmount={minBidAmount}
          settleProps={settleProps}
        />
      </Flex>

      {/* Mobile auction button */}
      {isMobile ? (
        <Stack className="h-full w-full flex-grow justify-between">
          <Stack className="gap-4">
            {/* Current token/Historical token badge */}
            <motion.div className="w-fit rounded-object bg-primary px-4 py-2 text-secondary">
              {tokenName}
            </motion.div>
            {/* Current bid/Historical bid badge */}
            {isLastToken && !isEnded ? (
              <Label variant="row" className="z-10">
                <a className="flex" href={winningTx}>
                  <span className="mr-4">Current bid</span>
                  {winningBid ? `${winningBid} ETH` : ''}
                </a>
              </Label>
            ) : !tokenData ? (
              <Flex className="gap-x-4">
                <Label variant="row" className="animate-pulse">
                  N/A
                </Label>
                <Label variant="row" className="animate-pulse">
                  0x...
                </Label>
              </Flex>
            ) : winningBid === 'N/A' &&
              tokenData?.owner !=
                '0x0000000000000000000000000000000000000000' ? (
              <Label
                variant="row"
                className="z-10"
              >{`Allocated to ${resolvedTokenOwner}`}</Label>
            ) : (
              <Flex className="z-10 gap-4">
                {winningBid && resolvedTokenOwner ? (
                  <>
                    <Label variant="row">{`${winningBid} ETH`}</Label>
                    <Label variant="row">{`${resolvedTokenOwner}`}</Label>
                  </>
                ) : null}
              </Flex>
            )}
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  )
}

export default Auction
