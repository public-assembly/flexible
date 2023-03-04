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

export function DesktopAuctionSheet() {
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
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
