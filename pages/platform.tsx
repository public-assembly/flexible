import { Flex } from "@/components/base/Flex"
import {
  Headline,
  Body,
  BodySmall,
  Caption,
} from "@/components/base/Typography"
import Balancer from "react-wrap-balancer"
import { useAuth } from "@/hooks/useAuth"
import { Exit } from "@/components/assets/icons"
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
import { useState, useEffect } from "react"
import ConnectButton from "@/components/ConnectButton"
import useCopyText from "@/hooks/useCopyText"
import { Copy } from "@/components/assets/icons"
import { Separator } from "@/components/base/Separator"
import { useRouter } from "next/router"
import { useThemeContext } from "@/context/ThemeProvider"

const themeRegistry = "0x9a23AE640040e4d34E9e00E500003000017144F4"

export function IndexSuccess({ platformIndex }: { platformIndex?: number }) {
  const { handleCopy, hasCopied } = useCopyText()

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
  const router = useRouter()

  const { address, isConnected } = useAuth()

  const { handleCopy, hasCopied } = useCopyText()

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
    <Stack className="fixed top-0 left-0 w-full h-full bg-[#111111] z-50 p-6">
      <Flex className="flex-col mx-auto my-auto border border-[#333333] p-8 bg-black rounded-lg w-auto sm:w-[478px]">
        <div>
          <Flex className="items-start gap-x-8">
            <Headline className="text-white">
              Ready to create your own DAO interface?
            </Headline>
            <button onClick={() => router.push("/")}>
              <Exit className="text-white w-8 h-8 hover:cursor-pointer sm:mt-1" />
            </button>
          </Flex>
          <Separator className="mt-8 mb-6 bg-[#333333]"></Separator>
          <Caption className="mb-2 uppercase text-[#3291FF]">
            1. Create a platform index
          </Caption>
          <Body className="text-[#999999]">
            The first step is to setup a platform index. This costs a small gas
            fee.
          </Body>
          {!isSuccess ? (
            <button
              className="flex justify-center mt-6 py-3 px-8 bg-white font-medium rounded border border-[#333333] min-w-[156px] hover:bg-opacity-80"
              onClick={() => newIndex?.()}
            >
              {!isLoading ? (
                "Create Index"
              ) : (
                <Pending className="animate-spin" />
              )}
            </button>
          ) : null}
        </div>

        {isSuccess ? (
          <div>
            <Separator className="mt-8 mb-6 bg-[#333333]"></Separator>
            <Caption className="mb-2 uppercase text-[#3291FF]">
              2. Save your index variable
            </Caption>
            <Body className="text-[#999999]">
              <span className="text-white font-medium">Important!&nbsp;</span>
              Make sure to remember this number. During the deploy stage, you'll
              provide this value when prompted for your
              NEXT_PUBLIC_PLATFORM_INDEX.
            </Body>
            <div className="flex justify-center text-center">
              <button
                className="flex items-center"
                onClick={() =>
                  platformIndex && handleCopy(platformIndex.toString())
                }
              >
                <Headline className="my-8 text-white">{platformIndex}</Headline>
                <Copy className="ml-2 mt-.5 text-white hover:cursor-pointer active:scale-125 transform" />
              </button>
            </div>
            <button className="flex items-center justify-center py-3 w-full mx-auto bg-white hover:bg-opacity-80">
              <a
                href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpublic-assembly%2Fflexible&env=NEXT_PUBLIC_SITE_TITLE,NEXT_PUBLIC_APP_ID,NEXT_PUBLIC_SITE_DESCRIPTION,NEXT_PUBLIC_TWITTER_HANDLE,NEXT_PUBLIC_WEBSITE_URL,NEXT_PUBLIC_CHAIN_ID,NEXT_PUBLIC_ALCHEMY_KEY,NEXT_PUBLIC_TOKEN_ADDRESS,NEXT_PUBLIC_PLATFORM_INDEX,NEXT_PUBLIC_WEB3STORAGE_TOKEN"
                target="_blank"
                rel="noreferrer"
                className="mr-1 font-medium"
              >
                Continue to walkthrough
              </a>
              <ArrowUpRight />
            </button>
          </div>
        ) : null}
      </Flex>
    </Stack>
  )
}
