import { useAuth } from '@/hooks/useAuth'
import { ENV } from '@/utils/env'
import * as React from 'react'
import { Hex } from 'viem'
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { Web3Storage } from 'web3.storage'
import { platformThemeRegistryAbi } from '../abi/platformThemeRegistryAbi'
import { useThemeContext } from '../context/ThemeProvider'
import { Pending } from './assets/icons'

function getAccessToken() {
  return ENV.WEB3STORAGE_TOKEN
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() as string })
}

const themeRegistry = '0x9a23AE640040e4d34E9e00E500003000017144F4'

export function Save() {
  const { newMetadata } = useThemeContext()
  const [uri, setUri] = React.useState<string>('')
  const [themeReady, setThemeReady] = React.useState<boolean>(false)
  const [canEdit, setCanEdit] = React.useState<boolean>(false)
  const { address } = useAuth()

  useContractRead({
    address: themeRegistry,
    abi: platformThemeRegistryAbi,
    functionName: 'getRole',
    args: [ENV.PLATFORM_INDEX as bigint, address as Hex],
    onSuccess(getRole) {
      if (getRole === 1 || getRole === 2) {
        setCanEdit(true)
      }
    },
  })

  const { config } = usePrepareContractWrite({
    address: themeRegistry,
    abi: platformThemeRegistryAbi,
    functionName: 'setPlatformTheme',
    args: [ENV.PLATFORM_INDEX as bigint, uri],
    enabled: Boolean(uri),
    onSuccess() {
      setThemeReady(true)
    },
  })

  const { data, write: setTheme, isLoading } = useContractWrite(config)

  useWaitForTransaction({
    hash: data?.hash,
  })

  React.useEffect(() => {
    if (setTheme && themeReady) {
      setTheme()
    }
    setThemeReady(false)
  }, [themeReady])

  async function handleClick() {
    const client = makeStorageClient()
    try {
      const blobThemeData = new Blob([newMetadata])
      // prettier-ignore
      // @ts-ignore
      const cid = await client.put([blobThemeData], { wrapWithDirectory: false });
      const uri = 'ipfs://' + cid
      /**
       * Set state variable to cid in uri format
       */
      setUri(uri)
      console.log('Uri:', uri)
    } catch (err) {
      console.error(err)
    }
  }

  if (!canEdit)
    return (
      <div className="flex w-full justify-center bg-white p-4">
        <div className="w-full rounded-lg bg-[#F1F4F7] px-4 py-2 text-center">
          <p className="text-[#576775]">
            You don&apos;t have permissions to save theming data
          </p>
        </div>
      </div>
    )
  return (
    <div className="flex w-full justify-center bg-white p-4">
      <button
        disabled={isLoading}
        className="disabled:hover:none flex w-full cursor-pointer items-center justify-center rounded bg-[#121212] py-3 font-satoshi text-lg text-[#f2fdf7] hover:bg-[#121212]/50 active:bg-[#121212] dark:bg-[#121212] dark:text-[#121212]"
        onClick={handleClick}
      >
        {!isLoading ? 'Save' : <Pending className="animate-spin" />}
      </button>
    </div>
  )
}
