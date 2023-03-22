import { Flex } from "@/components/base/Flex"
import {
  Headline,
  Body,
  BodySmall,
  Caption,
} from "@/components/base/Typography"
import { useAuth } from "@/hooks/useAuth"
import Button from "@/components/base/Button"
import { Stack } from "@/components/base/Stack"
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

const themeRegistry = "0x9a23AE640040e4d34E9e00E500003000017144F4"

export function IndexSuccess({ platformIndex }: { platformIndex?: number }) {
  return (
    <>
      <Stack className="text-center gap-y-4">
        <div>
          <Headline>Here is your new platform index!</Headline>
          <BodySmall>Copy and paste this value to your clipboard.</BodySmall>
        </div>
        <Headline>{platformIndex}</Headline>
        <div className="mx-auto">
          <Button className="max-w-[328px]">
            <a
              href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpublic-assembly%2Fflexible&env=NEXT_PUBLIC_SITE_TITLE,NEXT_PUBLIC_APP_ID,NEXT_PUBLIC_SITE_DESCRIPTION,NEXT_PUBLIC_TWITTER_HANDLE,NEXT_PUBLIC_WEBSITE_URL,NEXT_PUBLIC_CHAIN_ID,NEXT_PUBLIC_ALCHEMY_KEY,NEXT_PUBLIC_TOKEN_ADDRESS,NEXT_PUBLIC_PLATFORM_INDEX,NEXT_PUBLIC_WEB3STORAGE_TOKEN"
              target="_blank"
              rel="noreferrer"
            >
              Deploy platform
            </a>
          </Button>
          <BodySmall className="max-w-sm mt-3">
            You'll be prompted for this number when supplying environment
            variables on Vercel.
          </BodySmall>
        </div>
      </Stack>
    </>
  )
}

export default function Platform() {
  const { address } = useAuth()

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
    <Stack className="h-full gap-4 px-4 pt-20 overflow-x-hidden">
      <Flex className="mx-auto border border-slate-300 p-8 rounded-lg custom-shadow w-auto">
        {isSuccess ? (
          <IndexSuccess platformIndex={platformIndex} />
        ) : (
          <>
            <Stack className="text-center gap-y-8">
              <div>
                <Headline>
                  Ready to create your own flexible interface?
                </Headline>
                <BodySmall>
                  Writing to the shared theming registry costs gas.
                </BodySmall>
              </div>
              <div className="mx-auto">
                <Button onClick={() => newIndex?.()} className="max-w-[328px]">
                  {!isLoading ? (
                    "Create index"
                  ) : (
                    <Pending className="animate-spin" />
                  )}
                </Button>
                <BodySmall className="max-w-sm mt-3">
                  By default, you will be the admin of this index.
                </BodySmall>
              </div>
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
