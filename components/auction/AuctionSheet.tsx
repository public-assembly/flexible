import {
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  Pending,
} from '@/components/assets/icons'
import Button from '@/components/base/Button'
import { Grid } from '@/components/base/Grid'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/base/Sheet'
import { Stack } from '@/components/base/Stack'
import { BodySmall, Caption, Headline } from '@/components/base/Typography'
import { useAuth } from '@/hooks/useAuth'
import { useIsMobile } from '@/hooks/useIsMobile'
import { ENV } from '@/utils/env'
import { useActiveAuction, useDaoTokenQuery } from '@public-assembly/dao-utils'
import { format, fromUnixTime } from 'date-fns'
import { BigNumber, ethers } from 'ethers'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ConnectButton from '../ConnectButton'
import { AuctionCountdown } from './AuctionCountdown'
import { BidHistory } from './BidHistory'
import { Settle } from './Settle'

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

  const externalLinkBaseURI = 'https://nouns.build/dao'

  return (
    <AnimatePresence>
      <Sheet open={open} onOpenChange={setOpen} modal={isMobile}>
        <SheetTrigger asChild className="custom-shadow">
          {isMobile ? (
            <MotionButton
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{
                ease: 'easeInOut',
                duration: 0.8,
                delay: 0.6,
                easings: [0.44, 0, 0.56, 1],
              }}
              variant="tertiary"
              className="caption fixed bottom-4 left-4 z-50 w-fit px-[12px] uppercase md:hidden"
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
                ease: 'easeInOut',
                duration: 0.8,
                delay: 0.5,
                easings: [0.44, 0, 0.56, 1],
              }}
              variant="tertiary"
              className="caption group absolute right-0 top-10 w-fit px-[12px] uppercase max-md:hidden"
            >
              <ArrowLeft className="min-w-[24px] group-radix-state-open:before:rotate-90 group-radix-state-open:after:rotate-180" />
              <span className="px-2">Auction</span>
            </MotionButton>
          )}
        </SheetTrigger>
        {open && (
          <SheetContent
            size="auction"
            position={isMobile ? 'bottom' : 'right'}
            onInteractOutside={(e) => {
              if (!isMobile) {
                e.preventDefault()
              }
            }}
          >
            <SheetHeader>
              <SheetTitle>
                <Headline>
                  <a
                    href={`${externalLinkBaseURI}/${ENV.TOKEN_ADDRESS}/${currentTokenId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-row items-center gap-2 text-[24px] hover:underline"
                  >
                    <span>{tokenName}</span>
                    <ArrowUpRight size={24} className="text-tertiary" />
                  </a>
                </Headline>
              </SheetTitle>
              <Grid className="grid-cols-2">
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
                        <span className="uppercase">
                          {tokenData?.mintInfo
                            ? `${format(
                                fromUnixTime(
                                  tokenData?.mintInfo.mintContext
                                    .blockNumber as number
                                ),
                                'MMMM d, yyyy'
                              )}`
                            : 'N/A'}
                        </span>
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
              </Grid>
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
                        className="caption rounded-lg border border-primary bg-transparent px-4 py-3 placeholder:text-tertiary focus:text-primary"
                        type="text"
                        pattern="[0-9]+(\.[0-9]+)?"
                        onKeyDown={(event) => {
                          const pattern = /[0-9\.]/
                          if (
                            !pattern.test(event.key) &&
                            event.key !== 'Backspace' &&
                            event.key !== 'Delete'
                          ) {
                            event.preventDefault()
                          }
                        }}
                        placeholder={`${minBidAmount?.toFixed(4)} OR HIGHER`}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => updateBidAmount(event.target.value)}
                      />
                      <label className="absolute mt-3 ml-72 sm:ml-64">
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
