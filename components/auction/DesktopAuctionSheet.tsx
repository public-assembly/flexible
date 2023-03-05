import { useAuction } from "@/hooks/useAuction"
import { motion } from "framer-motion"

import { ArrowLeft } from "@/components/assets/icons"
import Button from "@/components/base/Button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/base/Sheet"

// import Sheet from "@/components/base/SheetTest"

export function DesktopAuctionSheet() {
  const { tokenName } = useAuction()
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="tertiary"
          className="max-w-[133px] uppercase absolute  right-0 top-10 group"
        >
          <ArrowLeft className="mr-2 group-radix-state-open:after:rotate-180 group-radix-state-open:before:rotate-90" />
          Auction
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <motion.div className="py-2 text-primary rounded-object w-fit">
              {tokenName}
            </motion.div>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
