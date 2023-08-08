import { Button } from '@/components/base/Button'
import { useAuth } from '@/hooks/useAuth'
import { ConnectKitButton } from 'connectkit'
import { Flex } from './base/Flex'
import { Headline } from './base/Typography'
import { Zorb } from './base/Zorb'
import { shortenAddress } from '@/utils/shortenAddress'

export default function ConnectButton() {
  const { address } = useAuth()
  const ensName = false // hardcoded as not available until crosschain ens resolution implemented

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        if (!isConnected) {
          return (
            <Button size="lg" onClick={show}>
              Connect Wallet
            </Button>
          )
        } else {
          return (
            <Flex className="items-center gap-4">
              <Zorb address={address} size={32} radius={999} />
              <Headline>{ensName ? ensName : shortenAddress(address)}</Headline>
            </Flex>
          )
        }
      }}
    </ConnectKitButton.Custom>
  )
}
