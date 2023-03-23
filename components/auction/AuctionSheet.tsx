import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"
import { AnimatePresence, motion } from "framer-motion"
import { ENV } from "@/utils/env"
import {
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  Pending,
} from "@/components/assets/icons"
import Button from "@/components/base/Button"
import { Flex } from "@/components/base/Flex"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/base/Sheet"
import { Stack } from "@/components/base/Stack"
import { BodySmall, Caption, Headline } from "@/components/base/Typography"
import {
  AuthCheck,
  useActiveAuction,
} from "@public-assembly/dao-utils"
import { AuctionCountdown } from "./AuctionCountdown"
import ConnectButton from "../ConnectButton"
import { ethers } from "ethers"
import { BidHistory } from "./BidHistory"
import { fromUnixTime, format} from "date-fns"
import { Settle } from "./Settle"

const MotionButton = motion(Button)

interface AuctionSheetProps {
  tokenId: string
  tokenTitle: string
  tokenBlock?: number
  winningBid?: string
  auctionEnded: boolean
}

// TODO: use mobile button on ssr if windowWidth < 768
export function AuctionSheet({
  tokenId,
  tokenTitle,
  tokenBlock,
  winningBid,
  auctionEnded,
}: AuctionSheetProps) {
  const { isMobile } = useIsMobile()

  const [open, setOpen] = useState<boolean | undefined>()

  const {
    auctionData,
    createBid,
    updateBidAmount,
    createBidSuccess,
    createBidLoading,
    isValidBid,
  } = useActiveAuction(ENV.TOKEN_ADDRESS)

  const externalLinkBaseURI = "https://nouns.build/dao"

  if (!auctionData?.endTime) return null
  return (
    <AnimatePresence>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {isMobile ? (
            <MotionButton
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{
                ease: "easeInOut",
                duration: 0.8,
                delay: 0.6,
                easings: [0.44, 0, 0.56, 1],
              }}
              variant="tertiary"
              className="md:hidden max-w-[133px] uppercase fixed z-50 bottom-4 left-4"
            >
              <ArrowUp className="mr-2" />
              Auction
            </MotionButton>
          ) : (
            <MotionButton
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{
                ease: "easeInOut",
                duration: 0.8,
                delay: 0.5,
                easings: [0.44, 0, 0.56, 1],
              }}
              variant="tertiary"
              className="max-md:hidden max-w-[133px] uppercase absolute right-0 top-10 group"
            >
              <ArrowLeft className="mr-2 group-radix-state-open:after:rotate-180 group-radix-state-open:before:rotate-90" />
              Auction
            </MotionButton>
          )}
        </SheetTrigger>
        {open && (
          <SheetContent position={isMobile ? "bottom" : "right"} size="auction">
            <SheetHeader>
              <SheetTitle>
                <Headline>
                  {" "}
                  <a
                    href={`${externalLinkBaseURI}/${ENV.TOKEN_ADDRESS}/${tokenId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[24px] hover:underline flex flex-row items-center gap-2"
                  >
                    <span>{tokenTitle}</span>
                    <ArrowUpRight size={24} className="text-tertiary" />
                  </a>
                </Headline>
              </SheetTitle>
              <Flex className="gap-10">
                {!auctionEnded ? (
                  <>
                    {/* Auction countdown */}
                    <Stack>
                      <AuctionCountdown auctionData={auctionData} />
                      <BodySmall className="text-tertiary">
                        Auction ends in
                      </BodySmall>
                    </Stack>
                    {/* Highest bid */}
                    <Stack>
                      <Caption className="uppercase text-primary">
                        Ξ
                        {ethers.utils.formatEther(
                          // @ts-ignore
                          auctionData?.highestBidPriceRaw
                        )}
                      </Caption>
                      <BodySmall className="text-tertiary">
                        Highest bid
                      </BodySmall>
                    </Stack>
                  </>
                ) : (
                  <>
                    {/* Auction ended */}
                    <Stack>
                      <Caption>
                        <span className="uppercase">{`${format(
                          fromUnixTime(tokenBlock as number),
                          "MMMM d, yyyy"
                        )}`}</span>
                      </Caption>
                      <BodySmall className="text-tertiary">
                        Auction ended
                      </BodySmall>
                    </Stack>
                    {/* Winning bid */}
                    <Stack>
                      <Caption className="uppercase text-primary">
                        {winningBid}
                      </Caption>
                      <BodySmall className="text-tertiary">
                        Winning bid
                      </BodySmall>
                    </Stack>
                  </>
                )}
              </Flex>
              {auctionData.tokenId == tokenId ? (
                auctionEnded ? (
                  <Settle />
                ) : (
                  <AuthCheck
                    connectButton={<ConnectButton />}
                    connectCopy={"Connect to bid"}
                    formUI={
                      <div>
                        <form
                          onSubmit={createBid}
                          className="flex flex-col gap-y-4"
                        >
                          <input
                            className="px-4 py-3 bg-transparent rounded-lg border border-[#121212] text-tertiary caption"
                            type="text"
                            pattern="[0-9.]*"
                            placeholder={`Ξ ${auctionData.minBidAmount?.toFixed(
                              4
                            )} OR HIGHER`}
                            onChange={(event: any) =>
                              updateBidAmount(event.target.value)
                            }
                          />
                          {!createBidLoading && !createBidSuccess ? (
                            <Button
                              disabled={!isValidBid}
                              className="py-8 lg:py-7"
                            >
                              Enter Bid
                            </Button>
                          ) : (
                            <>
                              <Button className="py-8 lg:py-7">
                                <Pending className="animate-spin" />
                              </Button>
                              {createBidSuccess && (
                                <Caption>Bid placed</Caption>
                              )}
                            </>
                          )}
                        </form>
                      </div>
                    }
                  />
                )
              ) : null}
              {/* Bid History */}
              <BidHistory tokenId={tokenId} tokenAddress={ENV.TOKEN_ADDRESS} />
            </SheetHeader>
          </SheetContent>
        )}
      </Sheet>
    </AnimatePresence>
  )
}
