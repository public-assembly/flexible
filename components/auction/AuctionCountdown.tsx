import { useCountdown } from "@public-assembly/dao-utils"
import { Caption } from "../base/Typography"

export function AuctionCountdown({
  auctionData,
}: {
  auctionData: any
}) {
  const { countdownString } = useCountdown(
    Number(auctionData?.endTime)
  )

  return (
    <Caption>
      <span className="uppercase">{`${countdownString}`}</span>
    </Caption>
  )
}
