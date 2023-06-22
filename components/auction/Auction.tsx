import { BlurImage } from '@/components/BlurImage'
import { Flex } from '@/components/base/Flex'
import { Stack } from '@/components/base/Stack'
import { useIsMobile } from '@/hooks/useIsMobile'
import {
  useAuctionState,
  useCountdown,
  useHistoricalAuctionQuery,
  useHistoricalTokenQuery,
  useManagerContext,
  useTokenContext,
  useTokenExplorer,
} from '@public-assembly/builder-utils'
import { motion } from 'framer-motion'
import Label from '../base/Label'
import { AuctionSheet } from './AuctionSheet'
import { ExplorerButtons } from './ExplorerButtons'

const Auction = ({ tokenId }: { tokenId: number }) => {
  const { isMobile } = useIsMobile()
  const { tokenAddress } = useManagerContext()
  const { auctionState } = useAuctionState()
  const { isEnded } = useCountdown(auctionState.endTime)

  const {
    incrementId,
    decrementId,
    navigatedTokenId,
    isFirstToken,
    isLastToken,
  } = useTokenExplorer({ tokenId })

  const { tokenName, tokenImage, tokenOwner } = useHistoricalTokenQuery({
    tokenAddress: tokenAddress,
    tokenId: BigInt(navigatedTokenId),
  })

  // Todo: Return winningTx from subgraph query
  const { winningBid } = useHistoricalAuctionQuery({
    tokenAddress: tokenAddress,
    tokenId: BigInt(navigatedTokenId),
  })

  let tokenData

  const { tokenSettings } = useTokenContext()

  return (
    <Stack className="min-h-screen justify-center gap-4 px-4">
      <Flex className="relative w-full justify-center">
        <Stack className="relative aspect-square h-full max-h-[600px] w-full max-w-[600px] justify-between p-4">
          <div className="absolute inset-0 z-0 aspect-square w-full">
            {tokenImage && (
              <BlurImage
                src={tokenImage}
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
                  {`${tokenSettings?.[0]}`}
                </Label>
              )}
              {/* Current bid/Historical bid badge */}
              {isLastToken && !isEnded ? (
                <Label variant="row" className="z-10">
                  {/* href={winningTx} */}
                  <a className="flex">
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
                tokenOwner != '0x0000000000000000000000000000000000000000' ? (
                <Label
                  variant="row"
                  className="z-10"
                >{`Allocated to ${tokenOwner}`}</Label>
              ) : (
                <Flex className="z-10 gap-4">
                  {winningBid && tokenOwner ? (
                    <>
                      <Label variant="row">{`${winningBid} ETH`}</Label>
                      <Label variant="row">{`${tokenOwner}`}</Label>
                    </>
                  ) : null}
                </Flex>
              )}
            </Flex>
          )}
        </Stack>

        {/* Desktop/Tablet Auction button */}
        <AuctionSheet
          navigatedTokenId={navigatedTokenId.toString()}
          tokenName={tokenName as string}
          winningBid={winningBid as string}
          isEnded={isEnded}
          isLastToken={isLastToken}
          auctionState={auctionState}
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
                {/* href={winningTx} */}
                <a className="flex">
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
              tokenOwner != '0x0000000000000000000000000000000000000000' ? (
              <Label
                variant="row"
                className="z-10"
              >{`Allocated to ${tokenOwner}`}</Label>
            ) : (
              <Flex className="z-10 gap-4">
                {winningBid && tokenOwner ? (
                  <>
                    <Label variant="row">{`${winningBid} ETH`}</Label>
                    <Label variant="row">{`${tokenOwner}`}</Label>
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
