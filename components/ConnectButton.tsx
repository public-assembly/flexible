import { useAuth } from "@/hooks/useAuth"
import { ConnectKitButton, useModal } from "connectkit"
// openSwitchNetworks, useChains
import { Zorb } from "./base/Zorb"
import { Button } from "@/components/base/Button"
import { ENV } from "@/utils/env"
import { Flex } from "./base/Flex"
import { Headline } from "./base/Typography"
import Error from "./assets/icons/Error"

export default function ConnectButton() {
  const { address, ensName } = useAuth()

  return (
    <ConnectKitButton.Custom>
      {/* {({ chain, mounted, account, openConnectModal, openChainModal }) => { */}

      {({ isConnected, isConnecting, show, hide, address }) => {
        // const { open, openSwitchNetworks } = useModal()
        // const chains = useChains()

        return (
          <Button size="lg" onClick={show}>
            Connect Wallet
          </Button>
        )

        // if (chains?.id !== ENV.CHAIN) {
        //   return (
        //     <Button
        //       size="md"
        //       icon="left"
        //       className="border border-black text-[#FF0000] bg-white hover:bg-white/50"
        //       onClick={show}
        //     >
        //       <Error className="mr-[6px]" />
        //       Switch Network
        //     </Button>
        //   )
        // }
        // return (
        //   <Flex className="items-center gap-4">
        //     <Zorb address={address} size={32} radius={999} />
        //     <Headline>{ensName ? ensName : address}</Headline>
        //   </Flex>
        // )
      }}
    </ConnectKitButton.Custom>
  )
}
