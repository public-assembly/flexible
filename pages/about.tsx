import { Globe } from "@/components/assets/icons"
import { Flex } from "@/components/base/Flex"
import IconButton from "@/components/base/IconButton"
import { Stack } from "@/components/base/Stack"
import { Body, H2Heading } from "@/components/base/Typography"
import clsx from "clsx"
import { PropsWithChildren } from "react"
import {
  useMetadataContext,
  useTokenContext,
  useManagerContext,
  useDaoCollectionQuery,
} from "@public-assembly/dao-utils"
import { useBalance, useContractRead } from "wagmi"
import { aggregatorAbi } from "abi/aggregatorAbi"
import { Hash } from "types"
import { RichText } from "@/components/base/Richtext"
import Label from "@/components/base/Label"
import { buildEtherscanAddressLink } from "@/utils/helpers"
import HtmlReactParser from "html-react-parser"

export default function AboutPage() {
  const { metadataSettings } = useMetadataContext()
  const { tokenSettings } = useTokenContext()
  const { daoAddresses } = useManagerContext()
  const { ownerCount } = useDaoCollectionQuery({
    // @ts-ignore
    tokenAddress: metadataSettings?.token,
  })

  const { data } = useBalance({
    address: daoAddresses?.treasuryAddress as Hash,
  })

  const { data: latestRoundData } = useContractRead({
    address: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    abi: aggregatorAbi,
    functionName: "latestRoundData",
  })

  const ethUsd = Number(latestRoundData?.answer.toString().substring(0, 4))

  return (
    <Stack className="gap-10 px-4 pt-10 lg:px-10">
      <IconButton
        icon={<Globe />}
        tooltip="website"
        href={`${metadataSettings?.projectURI}`}
      />
      <Flex className="max-w-xl body">
        {HtmlReactParser(
          String(metadataSettings?.description).replace(/\\n/g, "<br />")
        )}
      </Flex>

      <Flex className="gap-6">
        <Card className="px-6 py-4 rounded-object bg-secondary">
          <Stack>
            <H2Heading>{ownerCount}</H2Heading>
            <div className="text-black">Owners</div>
          </Stack>
        </Card>
        <Card className="px-6 py-4 rounded-object bg-secondary">
          <Stack>
            {tokenSettings ? (
              <H2Heading>{tokenSettings[2]?.toNumber() - 1}</H2Heading>
            ) : null}
            <div className="text-black">Total Supply</div>
          </Stack>
        </Card>
      </Flex>
      <Flex className="flex-wrap w-full gap-6 text-black">
        <Label
          showExternalLinkIcon
          externalLink={buildEtherscanAddressLink(
            daoAddresses?.treasuryAddress as Hash
          )}
        >
          {`Treasury balance ${Number(data?.formatted).toFixed(3)} ETH`}
        </Label>
        <Label>
          {`Treasury balance in USD ${(
            Number(data?.formatted) * ethUsd
          ).toLocaleString()}`}
        </Label>
      </Flex>
    </Stack>
  )
}

function Card({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx("bg-white rounded-md w-fit h-fit", className)}>
      {children}
    </div>
  )
}
