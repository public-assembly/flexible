import { useAuth } from '@/hooks/useAuth'
import { ConnectButton as RKConnectButton } from '@rainbow-me/rainbowkit'
import { Zorb } from './base/Zorb'
import { Button } from '@/components/base/Button'

export default function ConnectButton({ ...props }) {
  const { ensName } = useAuth()
  return (
    <RKConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        return (
          <>
            {(() => {
              if (!mounted || !account || !chain) {
                return <Button onClick={openConnectModal}>Connect Wallet</Button>
              }
              if (chain.unsupported) {
                return <div className='text-sm text-red-400'>&#x26A0; Wrong Network</div>
              }
              return (
                <Button onClick={openAccountModal}>
                  <div className='flex items-center gap-2 text-sm'>
                    <Zorb address={account.address} size={24} radius={999} />
                    {ensName ? ensName : account.displayName}
                  </div>
                </Button>
              )
            })()}
          </>
        )
      }}
    </RKConnectButton.Custom>
  )
}
