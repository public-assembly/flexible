import { useAuth } from "@/hooks/useAuth"
import { ConnectButton as RKConnectButton } from "@rainbow-me/rainbowkit"
import { Zorb } from "./base/Zorb"
import { Button } from "@/components/base/Button"
import { ENV } from "@/utils/env"
import { Flex } from "./base/Flex"
import { Headline } from "./base/Typography"
import Error from "./assets/icons/Error"

export default function ConnectButton() {
  const { address, ensName } = useAuth()

  return (
    <RKConnectButton.Custom>
      {({ chain, mounted, account, openConnectModal, openChainModal }) => {
        return (
          <>
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button size="md" onClick={openConnectModal}>
                    Connect Wallet
                  </Button>
                )
              }
              if (chain?.id !== ENV.CHAIN) {
                return (
                  <Button
                    size="md"
                    icon="left"
                    className="border border-black text-[#FF0000] bg-white hover:bg-white/50"
                    onClick={openChainModal}
                  >
                    <Error className="mr-[6px]" />
                    Switch Network
                  </Button>
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
