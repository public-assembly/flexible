import { useAuction } from "@/hooks/useAuction"

import { ArrowUp } from "@/components/assets/icons"
import Button from "@/components/base/Button"
import Sheet from "@/components/base/Sheet"
import { Headline } from "@/components/base/Typography"

export function MobileAuctionSheet() {
  const { tokenName } = useAuction()

  return (
    <Sheet.Root>
      <Sheet.Trigger>
        <Button
          variant="tertiary"
          className="max-w-[133px] uppercase absolute bottom-4 left-4"
        >
          <ArrowUp className="mr-2" />
          Auction
        </Button>
      </Sheet.Trigger>
      <Sheet.Content position="bottom">
        <Sheet.Header>
          <Sheet.Title className="">
            <Headline>{tokenName}</Headline>
          </Sheet.Title>
          <Sheet.Description>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </Sheet.Description>
        </Sheet.Header>
      </Sheet.Content>
    </Sheet.Root>
  )
}
