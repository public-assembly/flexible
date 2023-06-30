import { ArrowLeft, ArrowUp, ArrowUpRight } from '@/components/assets/icons'
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
import { ENV } from '@/utils/env'
import { AnimatePresence, motion } from 'framer-motion'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { useState } from 'react'
import { Hex } from 'viem'
import { BidHistory } from './BidHistory'

const MotionButton = motion(Button)

interface AuctionProps {
  isMobile: boolean
  tokenAddress: Hex
  router: AppRouterInstance
  isLastToken: boolean
  navigatedTokenId: number
  tokenName: string | undefined
  tokenOwner: string | undefined
  winningBid: string
  winningBidder: string | undefined
  endTime: string | undefined
  bids:
    | {
        bidder: any
        amount: string
      }[]
    | undefined
}

export function HistoricalAuctionSheet(props: AuctionProps) {
  const [open, setOpen] = useState<boolean | undefined>()

  const externalLinkBaseURI = `https://${
    ENV.CHAIN === 5 ? 'goerli.' : ''
  }nouns.build/dao`

  return (
    <AnimatePresence>
      <Sheet open={open} onOpenChange={setOpen} modal={props.isMobile}>
        <SheetTrigger asChild className="custom-shadow">
          {props.isMobile ? (
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
            position={props.isMobile ? 'bottom' : 'right-center'}
            onInteractOutside={(e) => {
              if (!props.isMobile) {
                e.preventDefault()
              }
            }}
          >
            <SheetHeader>
              <SheetTitle>
                <Headline>
                  <a
                    href={`${externalLinkBaseURI}/${props.tokenAddress}/${props.navigatedTokenId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-row items-center gap-2 text-[24px] hover:underline"
                  >
                    <span>{props.tokenName}</span>
                    <ArrowUpRight size={24} className="text-tertiary" />
                  </a>
                </Headline>
              </SheetTitle>
              <Grid className="grid-cols-2">
                {/* Auction ended */}
                <Stack>
                  {!!props.endTime ? (
                    <>
                      <Caption>
                        <span className="uppercase">{`${props.endTime}`}</span>
                      </Caption>
                      <BodySmall className="text-tertiary">
                        Auction ended
                      </BodySmall>
                    </>
                  ) : (
                    <>
                      <Caption>
                        <span className="uppercase">{`${props.tokenOwner}`}</span>
                      </Caption>
                      <BodySmall className="text-tertiary">
                        Allocated to
                      </BodySmall>
                    </>
                  )}
                </Stack>
                {/* Winning bid */}
                <Stack>
                  <Caption className="uppercase text-primary">
                    {props.winningBid === ''
                      ? 'N/A'
                      : `${props.winningBid + ' ETH'}`}
                  </Caption>
                  <BodySmall className="text-tertiary">Winning bid</BodySmall>
                </Stack>
              </Grid>
              {/* Bid History */}
              <BidHistory bids={props.bids} />
            </SheetHeader>
          </SheetContent>
        )}
      </Sheet>
    </AnimatePresence>
  )
}
