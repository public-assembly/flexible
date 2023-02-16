import DropdownMenu from './base/DropdownMenu'
import { Navigation } from './Navigation'
import ConnectButton from './ConnectButton'
import { Copy, Exit, Minus } from './assets/icons'
import { useAuth } from '../hooks/useAuth'
import { Zorb } from './base/Zorb'
import Link from 'next/link'

import { Flex } from '@/components/base/Flex'
import { Stack } from './base/Stack'
import { Headline } from './base/Typography'
import { Button } from '@/components/base/Button'

export function Header() {
  return (
    <header className='flex flex-row items-center justify-between w-full px-4 bg-transparent lg:sticky lg:top-0'>
      <Link href='/' className=''>
        {process.env.NEXT_PUBLIC_SITE_TITLE}
      </Link>
      <Navigation />
      <MobileDropdown />
    </header>
  )
}

/* Mobile burger navigation */
type MobileDropdownProps = {
  isConnected?: boolean
}

function MobileDropdown(props: MobileDropdownProps) {
  const { logout, isConnected } = useAuth()
  const { address, ensName } = useAuth()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button size='icon' variant='burger'>
          <Minus />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content sideOffset={4} className='min-w-[328px]'>
        <Stack className='flex flex-col gap-6 pb-6'>
          {isConnected ? (
            <>
              <Flex className='items-center gap-4'>
                <Zorb address={address} size={32} radius={999} />
                <Headline>{ensName ? ensName : address}</Headline>
              </Flex>
              <DropdownMenu.Item onClick={() => console.log('open theme')}>
                <Button>Edit theme</Button>
              </DropdownMenu.Item>
            </>
          ) : (
            <ConnectButton />
          )}
        </Stack>
        <DropdownMenu.Separator />
        <Stack>
          <DropdownMenu.Item type='external-link' href='https://github.com/public-assembly/flexible'>
            <Flex className='items-center gap-4 py-4 hover:bg-tertiary/50 rounded-object'>
              <Copy />
              Copy our template
            </Flex>
          </DropdownMenu.Item>
          {isConnected && (
            <DropdownMenu.Item onClick={logout}>
              <Flex className='items-center gap-4 py-4 text-black rounded-object hover:cursor-pointer hover:bg-tertiary/50'>
                <Exit />
                Disconnect
              </Flex>
            </DropdownMenu.Item>
          )}
        </Stack>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
