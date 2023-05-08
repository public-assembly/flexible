import { useAuth } from "@/hooks/useAuth"
import { ConnectKitButton } from "connectkit"
import { Zorb } from "./base/Zorb"
import { Flex } from "./base/Flex"
import { Headline } from "./base/Typography"

export default function AltConnectButton() {
  const { address, ensName } = useAuth()

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        if (!isConnected) {
          return (
            <button
              className="flex justify-center mt-6 py-3 px-8 bg-white font-medium rounded border border-[#333333] min-w-[156px] hover:bg-opacity-80"
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
