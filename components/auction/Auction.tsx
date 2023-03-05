import { useAuction } from "@/hooks/useAuction"
// Hooks
import { useIsMobile } from "@/hooks/useIsMobile"
import { motion } from "framer-motion"
import { cn } from "utils/cn"
// Utils
import { ENV } from "utils/env"

import { BlurImage } from "@/components/BlurImage"
// Icons
import { ArrowLeft, ArrowRight, ArrowUp } from "@/components/assets/icons"
import { AuctionSheet } from "@/components/auction/AuctionSheet"
import { DesktopAuctionSheet } from "@/components/auction/DesktopAuctionSheet"
import { MobileAuctionSheet } from "@/components/auction/MobileAuctionSheet"
import { TokenWinningBid } from "@/components/auction/TokenWinningBid"
// Components
import Button from "@/components/base/Button"
import { Flex } from "@/components/base/Flex"
import { Stack } from "@/components/base/Stack"

const Auction = () => {
  const { isMobile } = useIsMobile()
  const {
    totalSupply,
    incrementId,
    decrementId,
    tokenId,
    isFirstToken,
    isLastToken,
    thumbnail,
    tokenName,
  } = useAuction()

  if (!totalSupply) return null
  return (
    <Stack className="h-full gap-4 px-4 pt-20 overflow-x-hidden ">
      <Flex className="relative justify-center w-full">
        <Stack className="relative justify-between max-h-[690px]  max-w-[690px] w-full h-full p-4 bg-cover border aspect-square rounded-object border-primary bg-default-auction">
          <div className="absolute inset-0 z-0 w-full aspect-square rounded-object">
            {thumbnail && (
              <BlurImage
                src={thumbnail}
                height={690}
                width={690}
                alt={`${tokenId}`}
              />
            )}
          </div>

          {/* Explorer buttons */}
          <Flex className="gap-4">
            <Button
              variant="tertiary"
              onClick={decrementId}
              className={cn(
                "w-fit z-10",
                isFirstToken && "pointer-events-none opacity-20"
              )}
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="tertiary"
              onClick={incrementId}
              className={cn(
                "w-fit z-10",
                isLastToken && "pointer-events-none opacity-20"
              )}
            >
              <ArrowRight />
            </Button>
          </Flex>

          {isMobile ? null : (
            <Flex className="justify-between">
              <div className="z-10 px-4 py-2 bg-primary text-secondary rounded-object">
                <span>{tokenName}</span>
              </div>
              <TokenWinningBid
                tokenAddress={ENV.TOKEN_ADDRESS}
                tokenId={tokenId}
              />
            </Flex>
          )}
        </Stack>

        {/* Desktop/Tablet Auction button */}
        <AuctionSheet tokenId={tokenId} />
      </Flex>

      {/* Mobile auction button */}
      {isMobile ? (
        <Stack className="justify-between flex-grow w-full h-full">
          <Stack className="gap-2">
            <motion.div className="px-4 py-2 bg-primary text-secondary rounded-object w-fit">
              {tokenName}
            </motion.div>
            <TokenWinningBid
              tokenAddress={ENV.TOKEN_ADDRESS}
              tokenId={tokenId}
            />
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  )
}

export default Auction
