import * as React from "react"
import { Web3Storage } from "web3.storage"
import { useThemeContext } from "../context/ThemeProvider"
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi"
import { platformThemeRegistryAbi } from "../abi/platformThemeRegistryAbi"
import { BigNumber } from "ethers"
import { ENV } from "@/utils/env"
import { Pending } from "./assets/icons"

function getAccessToken() {
  return ENV.WEB3STORAGE_TOKEN
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() as string })
}

const themeRegistry = "0x9a23AE640040e4d34E9e00E500003000017144F4"
/**
 * Grab the platform index defined as an environment variable
 */
// @ts-ignore
const platformIndex = process.env.NEXT_PUBLIC_PLATFORM_INDEX as number

export function Save() {
  const { newMetadata } = useThemeContext()
  const [uri, setUri] = React.useState<string>("")
  const [themeReady, setThemeReady] = React.useState<boolean>(false)

  const { config } = usePrepareContractWrite({
    address: themeRegistry,
    abi: platformThemeRegistryAbi,
    functionName: "setPlatformTheme",
    args: [BigNumber.from(platformIndex), uri],
    enabled: Boolean(uri),
    onSuccess() {
      setThemeReady(true)
    },
  })

  const { data, write: setTheme } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  React.useEffect(() => {
    if (setTheme && themeReady) {
      setTheme()
    }
    setThemeReady(false)
    console.log("Theme is ready")
  }, [themeReady])

  async function handleClick() {
    const client = makeStorageClient()
    try {
      const blobThemeData = new Blob([newMetadata])
      // prettier-ignore
      // @ts-ignore
      const cid = await client.put([blobThemeData], { wrapWithDirectory: false });
      const uri = "ipfs://" + cid
      /**
       * Set state variable to cid in uri format
       */
      setUri(uri)
      console.log("Uri:", uri)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex justify-center bg-white w-full p-4">
      <button
        disabled={isLoading}
        className="bg-[#121212] hover:bg-[#121212]/50 active:bg-[#121212] dark:bg-[#121212] dark:text-[#121212] text-[#f2fdf7] text-lg py-3 font-['Satoshi'] rounded w-full"
        onClick={handleClick}
      >
        {!isLoading ? "Save" : <Pending className="animate-spin" />}
      </button>
    </div>
  )
}
