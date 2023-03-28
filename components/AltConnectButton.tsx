import { useAuth } from "@/hooks/useAuth"
import { ConnectButton as RKConnectButton } from "@rainbow-me/rainbowkit"
import { Zorb } from "./base/Zorb"
import { Button } from "@/components/base/Button"
import { ENV } from "@/utils/env"
import { Flex } from "./base/Flex"
import { Headline } from "./base/Typography"
import Error from "./assets/icons/Error"

export default function AltConnectButton() {
  const { address, ensName } = useAuth()

  return (
    <RKConnectButton.Custom>
      {({ chain, mounted, account, openConnectModal, openChainModal }) => {
        return (
          <>
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <button
                    className="flex justify-center mt-6 py-3 px-8 bg-white font-medium rounded border border-[#333333] min-w-[156px] hover:bg-opacity-80"
                    onClick={openConnectModal}
                  >
                    Connect Wallet
                  </button>
                )
              }
              if (chain?.id !== ENV.CHAIN) {
                return (
                  <button
                    className="flex justify-center mt-6 py-3 px-8 bg-white font-medium rounded border border-[#333333] min-w-[156px] hover:bg-opacity-80"
                    onClick={openChainModal}
                  >
                    Switch Network
                  </button>
                )
              }
              return (
                <Flex className="items-center gap-4">
                  <Zorb address={address} size={32} radius={999} />
                  <Headline>{ensName ? ensName : address}</Headline>
                </Flex>
              )
            })()}
          </>
        )
      }}
    </RKConnectButton.Custom>
  )
}
