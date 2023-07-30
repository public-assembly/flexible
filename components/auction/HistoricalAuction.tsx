import { BlurImage } from '@/components/BlurImage'
import { Flex } from '@/components/base/Flex'
import { Stack } from '@/components/base/Stack'
import { useIsMobile } from '@/hooks/useIsMobile'
import {
  useHistoricalAuctionQuery,
  useHistoricalTokenQuery,
  useManagerContext,
  useTokenExplorer
} from '@public-assembly/builder-utils'
import { useRouter } from 'next/navigation'
import Label from '../base/Label'
import { ExplorerButtons } from './ExplorerButtons'
import { HistoricalAuctionSheet } from './HistoricalAuctionSheet'

const HistoricalAuction = ({ tokenId }: { tokenId: number }) => {
  const { isMobile } = useIsMobile()
  const { tokenAddress } = useManagerContext()
  const router = useRouter()

  const {
    incrementId,
    decrementId,
    navigatedTokenId,
    isFirstToken,
    isLastToken,
  } = useTokenExplorer({ tokenId })

  function incrementAndPush() {
    incrementId()
    router.push(`/${Number(tokenId) + 1}`)
  }

  function decrementAndPush() {
    decrementId()
    router.push(`/${Number(tokenId) - 1}`)
  }

  const { tokenName, tokenImage, tokenOwner } = useHistoricalTokenQuery({
    tokenAddress: tokenAddress,
    tokenId: BigInt(tokenId),
  })

  const { winningBid, winningBidder, endTime, bids } =
    useHistoricalAuctionQuery({
      tokenAddress: tokenAddress,
      tokenId: BigInt(tokenId),
    })

  const auctionProps = {
    isMobile,
    tokenAddress,
    router,
    isLastToken,
    navigatedTokenId,
    tokenName,
    tokenOwner,
    winningBid,
    winningBidder,
    endTime,
    bids,
  }

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
            incrementId={incrementAndPush}
            decrementId={decrementAndPush}
            isFirstToken={isFirstToken}
            isLastToken={isLastToken}
          />

          {isMobile ? null : (
            <Flex className="justify-between">
              <Label variant="row" className="z-10">
                {tokenName}
              </Label>
              {Number(winningBid) > 0 ? (
                <Flex className="z-10 gap-4">
                  <Label variant="row">{`${winningBid} ETH`}</Label>
                  <Label variant="row">{`${winningBidder}`}</Label>
                </Flex>
              ) : (
                <Label
                  variant="row"
                  className="z-10"
                >{`Allocated to ${tokenOwner}`}</Label>
              )}
            </Flex>
          )}
        </Stack>

        <HistoricalAuctionSheet {...auctionProps} />
      </Flex>

      {/* Mobile */}
      {isMobile ? (
        <Stack className="h-full w-full flex-grow justify-between">
          <Stack className="gap-4">
            <Label variant="row" className="z-10">
              {tokenName}
            </Label>
            {Number(winningBid) > 0 ? (
              <Flex className="z-10 gap-4">
                <Label variant="row">{`${winningBid} ETH`}</Label>
                <Label variant="row">{`${winningBidder}`}</Label>
              </Flex>
            ) : (
              <Label
                variant="row"
                className="z-10"
              >{`Allocated to ${tokenOwner}`}</Label>
            )}
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  )
}

export default HistoricalAuction
