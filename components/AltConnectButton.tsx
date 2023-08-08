import { useAuth } from '@/hooks/useAuth'
import { ConnectKitButton } from 'connectkit'
import { Flex } from './base/Flex'
import { Headline } from './base/Typography'
import { Zorb } from './base/Zorb'

export default function AltConnectButton() {
  const { address } = useAuth()
  const ensName = false // hardcoded as not available until crosschain ens resolution implemented

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        if (!isConnected) {
          return (
            <button
              className="mt-6 flex min-w-[156px] justify-center rounded border border-[#333333] bg-white py-3 px-8 font-medium hover:bg-opacity-80"
              onClick={show}
            >
              Connect Wallet
            </button>
          )
        } else {
          return (
            <Flex className="items-center gap-4">
              <Zorb address={address} size={32} radius={999} />
              <Headline>{ensName ? ensName : address}</Headline>
            </Flex>
          )
        }
      }}
    </ConnectKitButton.Custom>
  )
}
