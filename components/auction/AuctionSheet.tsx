import { useEffect, useState } from "react"

import { useAuction } from "@/hooks/useAuction"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useDaoToken } from "@public-assembly/dao-utils"
import { AnimatePresence, motion } from "framer-motion"

// import Sheet from "@/components/base/SheetTest"
import { ENV } from "@/utils/env"
import { ArrowLeft, ArrowUp } from "@/components/assets/icons"
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

const MotionButton = motion(Button)

// TODO: use mobile button on ssr if windowWidth < 768
export function AuctionSheet({ tokenId }: { tokenId: string }) {
  const { isMobile } = useIsMobile()
  const [open, setOpen] = useState<boolean | undefined>()
  const { tokenName } = useAuction()
  const { tokenData } = useDaoToken({
    tokenAddress: ENV.TOKEN_ADDRESS,
    tokenId: tokenId,
  })

  const tokenTitle = tokenData?.metadata?.name
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
                <Headline>{tokenTitle}</Headline>
              </SheetTitle>
              <Flex className="gap-10">
                {/* Auction time */}
                <Stack>
                  <Caption>January 23, 2023</Caption>
                  <BodySmall className="text-primary/50">
                    Auction ended
                  </BodySmall>
                </Stack>
                {/* Bid */}
                <Stack>
                  <Caption className="font-bold uppercase text-primary">
                    {/* Todo: Bids */}Ξ <span className="">0.145</span>
                  </Caption>
                  <BodySmall className="text-primary/50">Winning bid</BodySmall>
                </Stack>
              </Flex>
            </SheetHeader>
          </SheetContent>
        )}
      </Sheet>
    </AnimatePresence>
  )
}
