import { Globe } from '@/components/assets/icons'
import { Flex } from '@/components/base/Flex'
import IconButton from '@/components/base/IconButton'
import Label from '@/components/base/Label'
import { Stack } from '@/components/base/Stack'
import { H2Heading } from '@/components/base/Typography'
import { buildEtherscanAddressLink } from '@/utils/helpers'
import {
  useDaoDetailsQuery,
  useManagerContext,
  useTokenContext,
} from '@public-assembly/builder-utils'
import { aggregatorAbi } from 'abi/aggregatorAbi'
import clsx from 'clsx'
import HtmlReactParser from 'html-react-parser'
import { PropsWithChildren } from 'react'
import { Hex } from 'viem'
import { useBalance, useContractRead } from 'wagmi'

export default function AboutPage() {
  const { tokenSettings, tokenAddress } = useTokenContext()
  const { treasuryAddress } = useManagerContext()

  const { daoDetails } = useDaoDetailsQuery({ tokenAddress: tokenAddress })

  const { data } = useBalance({
    address: treasuryAddress as Hex,
  })

  const { data: latestRoundData } = useContractRead({
    address: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    abi: aggregatorAbi,
    functionName: 'latestRoundData',
  })

  const ethUsd = Number(latestRoundData?.[1].toString().substring(0, 4))

  return (
    <Stack className="gap-10 px-4 pt-10 lg:px-10">
      <IconButton
        icon={<Globe />}
        tooltip="website"
        href={`${daoDetails.projectURI}`}
      />
      <Flex className="body max-w-xl">
        {HtmlReactParser(
          String(daoDetails.description).replace(/\\n/g, '<br />')
        )}
      </Flex>

      <Flex className="gap-6">
        <Card className="rounded-object bg-secondary px-6 py-4">
          <Stack>
            <H2Heading>{daoDetails.ownerCount}</H2Heading>
            <div className="text-black">Owners</div>
          </Stack>
        </Card>
        <Card className="rounded-object bg-secondary px-6 py-4">
          <Stack>
            {tokenSettings ? (
              <H2Heading>{Number(daoDetails.totalSupply) - 1}</H2Heading>
            ) : null}
            <div className="text-black">Total Supply</div>
          </Stack>
        </Card>
      </Flex>
      <Flex className="w-full flex-wrap gap-6 text-black">
        <Label
          showExternalLinkIcon
          externalLink={buildEtherscanAddressLink(treasuryAddress as Hex)}
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
    <div className={clsx('h-fit w-fit rounded-md bg-white', className)}>
      {children}
    </div>
  )
}
