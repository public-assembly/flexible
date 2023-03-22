import { Flex } from "@/components/base/Flex"
import {
  Headline,
  Body,
  BodySmall,
  Caption,
} from "@/components/base/Typography"
import Balancer from "react-wrap-balancer"
import { useAuth } from "@/hooks/useAuth"
import Button from "@/components/base/Button"
import { Stack } from "@/components/base/Stack"
import { ArrowUpRight } from "@/components/assets/icons"
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractEvent,
} from "wagmi"
import { platformThemeRegistryAbi } from "abi/platformThemeRegistryAbi"
import { Hash } from "types"
import { Pending } from "@/components/assets/icons"
import { useState } from "react"
import ConnectButton from "@/components/ConnectButton"
import useCopyText from "@/hooks/useCopyText"
import { Copy } from "@/components/assets/icons"

const themeRegistry = "0x9a23AE640040e4d34E9e00E500003000017144F4"

export function IndexSuccess({ platformIndex }: { platformIndex?: number }) {
  const { handleCopy, hasCopied } = useCopyText()
  console.log(hasCopied)

  return (
    <>
      <Stack className="items-center text-center gap-y-8 w-auto md:w-[496px]">
        <div>
          <Headline>Here is your platform index!</Headline>
          <Balancer>
            <BodySmall>
              When deploying your platform, you&apos;ll provide this value as an
              environment variable.
            </BodySmall>
          </Balancer>
        </div>
        <button
          className="flex items-center"
          onClick={() => platformIndex && handleCopy(platformIndex.toString())}
        >
          <Headline>{platformIndex}</Headline>
          <Copy className="ml-1 mt-.5 hover:cursor-pointer active:scale-125 transform" />
        </button>
        <div className="mx-auto">
          <Flex className="items-center max-w-[328px]">
            <a
              href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpublic-assembly%2Fflexible&env=NEXT_PUBLIC_SITE_TITLE,NEXT_PUBLIC_APP_ID,NEXT_PUBLIC_SITE_DESCRIPTION,NEXT_PUBLIC_TWITTER_HANDLE,NEXT_PUBLIC_WEBSITE_URL,NEXT_PUBLIC_CHAIN_ID,NEXT_PUBLIC_ALCHEMY_KEY,NEXT_PUBLIC_TOKEN_ADDRESS,NEXT_PUBLIC_PLATFORM_INDEX,NEXT_PUBLIC_WEB3STORAGE_TOKEN"
              target="_blank"
              rel="noreferrer"
              className="hover:underline mr-1"
            >
              Take me to Vercel
            </a>
            <ArrowUpRight />
          </Flex>
        </div>
      </Stack>
    </>
  )
}

export default function Platform() {
  const { address, isConnected } = useAuth()

  const { config } = usePrepareContractWrite({
    address: themeRegistry,
    abi: platformThemeRegistryAbi,
    functionName: "newPlatformIndex",
    args: [address as Hash, ""],
  })

  const { data, write: newIndex } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const [platformIndex, setPlatformIndex] = useState<number>()

  useContractEvent({
    address: themeRegistry,
    abi: platformThemeRegistryAbi,
    eventName: "PlatformThemeUpdated",
    listener(platformIndex, sender, newTheme) {
      setPlatformIndex(Number(platformIndex))
      console.log(
        "platformIndex, sender, newTheme:",
        platformIndex,
        sender,
        newTheme
      )
    },
    // Receive only a single event, then stop listener
    once: true,
  })

  return (
    <Stack className="p-6 mt-40">
      <Flex className="mx-auto border border-slate-300 p-8 rounded-lg custom-shadow w-auto">
        {isSuccess ? (
          <IndexSuccess platformIndex={platformIndex} />
        ) : (
          <>
            <Stack className="items-center text-center gap-y-8 w-auto md:w-[496px]">
              <div>
                <Headline>Ready to create your own DAO interface?</Headline>
                <Balancer>
                  {!isConnected ? (
                    <BodySmall>
                      Please connect your wallet to get started.
                    </BodySmall>
                  ) : (
                    <BodySmall>
                      The first step is to setup a platform index, this costs
                      gas.
                    </BodySmall>
                  )}
                </Balancer>
              </div>
              {!isConnected ? (
                <span className="w-auto md:w-[328px]">
                  <ConnectButton />
                </span>
              ) : (
                <Button onClick={() => newIndex?.()} className="max-w-[328px]">
                  {!isLoading ? (
                    "Create index"
                  ) : (
                    <Pending className="animate-spin" />
                  )}
                </Button>
              )}
            </Stack>
          </>
        )}
      </Flex>
      {/* To see components side by side */}
      {/* <Flex className="justify-center mx-auto border border-slate-300 p-8 rounded-lg custom-shadow w-auto">
        <IndexSuccess platformIndex={platformIndex} />
      </Flex> */}
    </Stack>
  )
}
