import { useAuction } from "@/hooks/useAuction"

import { ArrowUp } from "@/components/assets/icons"
import Button from "@/components/base/Button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/base/Sheet"
import { Headline } from "@/components/base/Typography"

export function MobileAuctionSheet() {
  const { tokenName } = useAuction()

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="tertiary"
          className="max-w-[133px] uppercase absolute bottom-4 left-4"
        >
          <ArrowUp className="mr-2" />
          Auction
        </Button>
      </SheetTrigger>
      <SheetContent position="bottom">
        <SheetHeader>
          <SheetTitle>
            <Headline>{tokenName}</Headline>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
