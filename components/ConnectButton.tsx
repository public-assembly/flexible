import { useAuth } from '@/hooks/useAuth'
import { ConnectKitButton } from 'connectkit'
import { Zorb } from './base/Zorb'
import { Button } from '@/components/base/Button'
import { Flex } from './base/Flex'
import { Headline } from './base/Typography'

export default function ConnectButton() {
  const { address, ensName } = useAuth()

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
              <Headline>{ensName ? ensName : address}</Headline>
            </Flex>
          )
        }
      }}
    </ConnectKitButton.Custom>
  )
}
