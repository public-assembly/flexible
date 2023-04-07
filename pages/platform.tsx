import { Flex } from "@/components/base/Flex"
import {
  Headline,
  Body,
  BodySmall,
  Caption,
} from "@/components/base/Typography"
import { useAuth } from "@/hooks/useAuth"
import { Exit } from "@/components/assets/icons"
import { Stack } from "@/components/base/Stack"
import { ArrowUpRight } from "@/components/assets/icons"
import { CheckCircle } from "@/components/assets/icons"
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
import AltConnectButton from "@/components/AltConnectButton"
import useCopyText from "@/hooks/useCopyText"
import { Copy } from "@/components/assets/icons"
import { Separator } from "@/components/base/Separator"
import { useRouter } from "next/router"

const themeRegistry = "0x9a23AE640040e4d34E9e00E500003000017144F4"

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
            <p className="text-white text-[1.5rem] font-medium font-satoshi leading-10 tracking-[-0.5px]">
              Ready to create your own DAO interface?
            </p>
            <button onClick={() => router.push("/")}>
              <Exit className="text-white w-8 h-8 hover:cursor-pointer sm:mt-1" />
            </button>
          </Flex>
          <Separator className="mt-8 mb-6 bg-[#333333]"></Separator>
          {!isConnected ? (
            <>
              <p className="text-[#999999] text-base font-satoshi">
                Please connect your wallet.
              </p>
              <AltConnectButton />
            </>
          ) : (
            <>
              <p className="mb-2 flex gap-4 uppercase text-[#3291FF] text-base font-mono">
                1. Create a platform index {!isSuccess ? null : <CheckCircle />}
              </p>
              <p className="text-[#999999] text-base font-satoshi">
                This will allow the person submitting the transaction to change
                the site's theme and grant others similar access.
              </p>

              {!isSuccess ? (
                <button
                  className="flex justify-center mt-6 py-3 px-8 bg-white font-medium font-satoshi rounded border border-[#333333] min-w-[156px] hover:bg-opacity-80"
                  onClick={() => newIndex?.()}
                >
                  {!isLoading ? (
                    "Create Index"
                  ) : (
                    <Pending className="animate-spin" />
                  )}
                </button>
              ) : null}
            </>
          )}
        </div>

        {isSuccess ? (
          <div>
            <Separator className="mt-8 mb-6 bg-[#333333]"></Separator>
            <p className="mb-2 flex gap-4 uppercase text-[#3291FF] text-base font-mono">
              2. Save your index variable {!hasCopied ? null : <CheckCircle />}
            </p>
            <p className="text-[#999999] text-base font-satoshi">
              <span className="text-white font-medium">Important!&nbsp;</span>
              Make sure to remember this number. During the deploy stage,
              you&apos;ll provide this value when prompted for your
              NEXT_PUBLIC_PLATFORM_INDEX.
            </p>
            <div className="flex justify-center text-center">
              <button
                className="flex items-center"
                onClick={() =>
                  platformIndex && handleCopy(platformIndex.toString())
                }
              >
                <p className="my-8 text-white text-[1.5rem] font-bold font-satoshi leading-10 tracking-[-0.5px]">
                  {platformIndex}
                </p>
                <Copy className="ml-2 mt-.5 text-white hover:cursor-pointer active:scale-125 transform" />
              </button>
            </div>
            <button className="flex items-center justify-center py-3 w-full mx-auto bg-white hover:bg-opacity-80">
              <a
                href="https://flexible-docs-peach.vercel.app/docs/deploy_walkthrough"
                target="_blank"
                rel="noreferrer"
                className="mr-1 font-medium font-satoshi"
              >
                Continue to walkthrough
              </a>
              <ArrowUpRight className="text-[#121213]" />
            </button>
          </div>
        ) : null}
      </Flex>
    </Stack>
  )
}
