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
import { useActiveAuction, useDaoTokenQuery } from "@public-assembly/dao-utils"
import { AuctionCountdown } from "./AuctionCountdown"
import ConnectButton from "../ConnectButton"
import { ethers, BigNumber } from "ethers"
import { BidHistory } from "./BidHistory"
import { fromUnixTime, format } from "date-fns"
import { Settle } from "./Settle"
import { useAuth } from "@/hooks/useAuth"

const MotionButton = motion(Button)

interface AuctionSheetProps {
  currentTokenId: string
  tokenName: string
  winningBid: string
  isEnded: boolean
  isLastToken: boolean
  auctionState: any
  minBidAmount: any
}

export function AuctionSheet({
  currentTokenId,
  tokenName,
  winningBid,
  isEnded,
  isLastToken,
  auctionState,
  minBidAmount,
}: AuctionSheetProps) {
  const { isMobile } = useIsMobile()

  const [open, setOpen] = useState<boolean | undefined>()

  const { isConnected } = useAuth()

  const {
    createBid,
    updateBidAmount,
    createBidSuccess,
    createBidLoading,
    isValidBid,
  } = useActiveAuction(ENV.TOKEN_ADDRESS)

  const { tokenData } = useDaoTokenQuery({
    tokenAddress: ENV.TOKEN_ADDRESS,
    tokenId: currentTokenId.toString(),
  })

  useEffect(() => {}, [createBidSuccess])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    createBid()
  }

  const externalLinkBaseURI = "https://nouns.build/dao"

  return (
    <AnimatePresence>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="custom-shadow">
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
              className="px-[12px] w-fit md:hidden uppercase fixed z-50 bottom-4 left-4 caption"
            >
              <ArrowUp className="min-w-[16px]" />
              <span className="px-2">Auction</span>
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
              className="px-[12px] w-fit max-md:hidden uppercase absolute right-0 top-10 group caption"
            >
              <ArrowLeft className="min-w-[24px] group-radix-state-open:after:rotate-180 group-radix-state-open:before:rotate-90" />
              <span className="px-2">Auction</span>
            </MotionButton>
          )}
        </SheetTrigger>
        {open && (
          // onInteractOutside={(e) => e.preventDefault()}
          <SheetContent position={isMobile ? "bottom" : "right"} size="auction">
            <SheetHeader>
              <SheetTitle>
                <Headline>
                  <a
                    href={`${externalLinkBaseURI}/${ENV.TOKEN_ADDRESS}/${currentTokenId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[24px] hover:underline flex flex-row items-center gap-2"
                  >
                    <span>{tokenName}</span>
                    <ArrowUpRight size={24} className="text-tertiary" />
                  </a>
                </Headline>
              </SheetTitle>
              <Flex className="gap-10">
                {!isEnded ? (
                  <>
                    {/* Auction countdown */}
                    <Stack>
                      <AuctionCountdown auctionState={auctionState} />
                      <BodySmall className="text-tertiary">
                        Auction ends in
                      </BodySmall>
                    </Stack>
                    {/* Highest bid */}
                    <Stack>
                      <Caption className="uppercase text-primary">
                        {`${ethers.utils.formatEther(
                          BigNumber.from(auctionState.highestBid)
                        )} ETH`}
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
                          fromUnixTime(
                            tokenData?.mintInfo.mintContext
                              .blockNumber as number
                          ),
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
              {isLastToken ? (
                isEnded ? (
                  !isConnected ? (
                    <ConnectButton />
                  ) : (
                    <Settle />
                  )
                ) : (
                  <div>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-y-4"
                    >
                      <input
                        disabled={createBidLoading}
                        className="px-4 py-3 bg-transparent rounded-lg border border-primary caption focus:text-primary placeholder:text-tertiary"
                        type="text"
                        pattern="[0-9]+(\.[0-9]+)?"
                        onKeyDown={(event) => {
                          const pattern = /[0-9\.]/
                          if (
                            !pattern.test(event.key) &&
                            event.key !== "Backspace" &&
                            event.key !== "Delete"
                          ) {
                            event.preventDefault()
                          }
                        }}
                        placeholder={`${minBidAmount.toFixed(4)} OR HIGHER`}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => updateBidAmount(event.target.value)}
                      />
                      <label className="absolute ml-72 sm:ml-64 mt-3">
                        ETH
                      </label>
                      {!createBidLoading && !createBidSuccess ? (
                        <Button disabled={!isValidBid} size="lg">
                          Enter Bid
                        </Button>
                      ) : (
                        <Button size="lg">
                          <Pending className="animate-spin" />
                        </Button>
                      )}
                    </form>
                  </div>
                )
              ) : null}
              {/* Bid History */}
              <BidHistory
                tokenId={currentTokenId}
                tokenAddress={ENV.TOKEN_ADDRESS}
              />
            </SheetHeader>
          </SheetContent>
        )}
      </Sheet>
    </AnimatePresence>
  )
}
