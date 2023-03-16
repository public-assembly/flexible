import React, { useState, useEffect } from "react"
// Utils
import { cn } from "utils/cn"
import { ENV } from "utils/env"
import { BlurImage } from "@/components/BlurImage"
// Icons
import { ArrowLeft, ArrowRight } from "@/components/assets/icons"
import { AuctionSheet } from "@/components/auction/AuctionSheet"
// Components
import Button from "@/components/base/Button"
// Layout & Typography
import { Flex } from "@/components/base/Flex"
import { Stack } from "@/components/base/Stack"
import { Pending } from "@/components/assets/icons"
// Hooks
import {
  useActiveAuction,
  useAuctionContext,
  useCountdown,
} from "@public-assembly/dao-utils"
import { useBid } from "@/hooks/useBid"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useAuction } from "@/hooks/useAuction"
import { motion } from "framer-motion"

import { Body, Caption } from "../base/Typography"

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

  const { winningBid, winningTx } = useBid({
    tokenId,
    tokenAddress: ENV.TOKEN_ADDRESS,
  })

  const { auctionState } = useAuctionContext()

  if (!totalSupply) return null
  return (
    <Stack className="h-full gap-4 px-4 pt-20 overflow-x-hidden ">
      <Flex className="relative justify-center w-full">
        <Stack className="relative justify-between max-h-[690px] max-w-[690px] w-full h-full p-4 bg-cover border aspect-square rounded-object border-primary bg-default-auction">
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
              {/* Current token/Historical token badge */}
              <div className="z-10 px-4 py-2 bg-primary text-secondary rounded-object body">
                <span>{tokenName}</span>
              </div>
              {/* Current bid/Winning bid badge */}
              <Flex className="z-10 items-center gap-4">
                <div className="px-4 py-2 bg-primary text-secondary rounded-object w-fit">
                  <a
                    href={winningTx}
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      !winningTx && "pointer-events-none"
                    }  h-6 inline-flex items-center group`}
                  >
                    <div className="flex gap-x-4">
                      <Body className="text-secondary">
                        {auctionState.tokenId == tokenId
                          ? "Current bid"
                          : "Winning bid"}
                      </Body>
                      <Caption className="text-secondary group-hover:underline">
                        Ξ {winningBid}
                      </Caption>
                    </div>
                  </a>
                </div>
              </Flex>
            </Flex>
          )}
        </Stack>

        {/* Desktop/Tablet Auction button */}
        <AuctionSheet tokenId={tokenId} winningBid={winningBid} />
      </Flex>

      {/* Mobile auction button */}

      {isMobile ? (
        <Stack className="justify-between flex-grow w-full h-full">
          <Stack className="gap-2">
            {/* Current token/Historical token badge */}
            <motion.div className="px-4 py-2 bg-primary text-secondary rounded-object w-fit">
              {tokenName}
            </motion.div>
            {/* Current bid/Winning bid badge */}
            <Flex className="z-10 items-center gap-4">
              <div className="px-4 py-2 bg-primary text-secondary rounded-object w-fit">
                <a
                  href={winningTx}
                  target="_blank"
                  rel="noreferrer"
                  className={`${
                    !winningTx && "pointer-events-none"
                  }  h-6 inline-flex items-center group`}
                >
                  <div className="flex gap-x-4">
                    <Body className="text-secondary">
                      {auctionState.tokenId == tokenId
                        ? "Current bid"
                        : "Winning bid"}
                    </Body>
                    <Caption className="text-secondary group-hover:underline">
                      Ξ {winningBid}
                    </Caption>
                  </div>
                </a>
              </div>
            </Flex>
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  )
}

export default Auction
