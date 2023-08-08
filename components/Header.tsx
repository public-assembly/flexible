import Button from '@/components/base/Button'
import { Flex } from '@/components/base/Flex'
import { cn } from '@/utils/cn'
import { useTokenContext } from '@public-assembly/builder-utils'
import { platformThemeRegistryAbi } from 'abi/platformThemeRegistryAbi'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ENV } from 'utils/env'
import { Hash } from 'viem'
import { useContractRead } from 'wagmi'
import { useAuth } from '../hooks/useAuth'
import { useIsMobile } from '../hooks/useIsMobile'
import { Exit, Minus, PlusIcon } from './assets/icons'
import DropdownMenu from './base/DropdownMenu'
import { Stack } from './base/Stack'
import { Body, Headline } from './base/Typography'
import ConnectButton from './ConnectButton'
import { useDrawer } from './drawer/useDrawer'
import { Navigation } from './Navigation'
import { NetworkController } from './NetworkController'

const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const container: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export function Header() {
  const { isMobile } = useIsMobile()
  const { tokenSettings } = useTokenContext()

  const pathname = usePathname()
  const isAuction =
    pathname !== '/about' &&
    pathname !== '/proposals' &&
    pathname !== '/platform'

  return (
    <motion.header
      variants={container}
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        ease: 'easeInOut',
        duration: 0.8,
        delay: 0.5,
        easings: [0.44, 0, 0.56, 1],
      }}
      className={cn(
        'flex w-full items-center justify-between bg-transparent p-4',
        { 'sm:absolute': isAuction }
      )}
    >
      {/* Header Logo */}
      <Link href="/">
        <NetworkController.Mainnet>
          <Headline className="headline">{tokenSettings?.[0].result}</Headline>
        </NetworkController.Mainnet>
        <NetworkController.Testnet>
          <Flex>
            <Headline className="headline">
              {tokenSettings?.[0].result}
            </Headline>
            <Flex className="ml-4 items-center justify-center rounded-lg border border-primary bg-highlight px-6 py-1 hover:cursor-default">
              <Body className="font-medium text-primary">Goerli</Body>
            </Flex>
          </Flex>
        </NetworkController.Testnet>
        <NetworkController.ZORA_Testnet>
          <Flex>
            <Headline className="headline">
              {tokenSettings?.[0].result}
            </Headline>
            <Flex className="ml-4 items-center justify-center rounded-lg border border-primary bg-highlight px-6 py-1 hover:cursor-default">
              <Body className="font-medium text-primary">Zora Testnet</Body>
            </Flex>
          </Flex>
        </NetworkController.ZORA_Testnet>        
        <NetworkController.ZORA_Mainnet>
          <Flex>
            <Headline className="headline">
              {tokenSettings?.[0].result}
            </Headline>
            <Flex className="ml-4 items-center justify-center rounded-lg border border-primary bg-highlight px-6 py-1 hover:cursor-default">
              <Body className="font-medium text-primary">Zora</Body>
            </Flex>
          </Flex>
        </NetworkController.ZORA_Mainnet>         
        <NetworkController.Base_Mainnet>
          <Flex>
            <Headline className="headline">
              {tokenSettings?.[0].result}
            </Headline>
            <Flex className="ml-4 items-center justify-center rounded-lg border border-primary bg-highlight px-6 py-1 hover:cursor-default">
              <Body className="font-medium text-primary">Base</Body>
            </Flex>
          </Flex>
        </NetworkController.Base_Mainnet>              
      </Link>

      <Flex className="items-center gap-6">
        {!isMobile && <Navigation />}
        <MobileDropdown />
      </Flex>
    </motion.header>
  )
}

function MobileDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [canEdit, setCanEdit] = useState<boolean>(false)
  const { address, logout, isConnected, chain } = useAuth()
  const { requestOpen } = useDrawer()
  const pathname = usePathname()
  const router = useRouter()
  

  useEffect(() => {
    const closeDropdown = () => setIsOpen(false)
    closeDropdown()
  }, [pathname])

  const themeRegistry = '0x9a23AE640040e4d34E9e00E500003000017144F4'

  useContractRead({
    address: themeRegistry,
    abi: platformThemeRegistryAbi,
    functionName: 'getRole',
    args: [ENV.PLATFORM_INDEX as bigint, address as Hash],
    onSuccess(getRole) {
      if (getRole === 1 || getRole === 2) {
        setCanEdit(true)
      }
    },
  })

  return (
    <DropdownMenu.Root onOpenChange={() => setIsOpen(!isOpen)} open={isOpen}>
      <DropdownMenu.Trigger asChild>
        <Button size="icon" className="rounded-object" variant="burger">
          {!isOpen ? (
            <PlusIcon className="h-8 w-8 text-primary" />
          ) : (
            <Minus className="h-8 w-8 text-secondary" />
          )}
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content sideOffset={4} className="min-w-[328px]">
        <Stack className="gap-y-4">
          {/* Hide navigation from within the dropdown menu on screen sizes above 640px */}
          <span className="sm:hidden">
            <Navigation />
          </span>
          <DropdownMenu.Item type="button" onClick={() => {}}>
            <ConnectButton />
          </DropdownMenu.Item>
          {/* Edit theme */}
          {isConnected && chain?.id === ENV.CHAIN ? (
            canEdit ? (
              <DropdownMenu.Item type="button" onClick={() => console.log()}>
                <Button
                  size="md"
                  variant="secondary"
                  onClick={() => requestOpen('palette')}
                  className="mt-2"
                >
                  Edit theme
                </Button>
              </DropdownMenu.Item>
            ) : null
          ) : null}

          {/* Copy this template */}
          <DropdownMenu.Item type="link" href="/platform">
            <Button
              size="md"
              variant="tertiary"
              onClick={() => router.push('/platform')}
            >
              Copy this template
            </Button>
          </DropdownMenu.Item>

          {isConnected && (
            <>
              <DropdownMenu.Separator />
              <DropdownMenu.Item type="button" onClick={logout}>
                <Flex className="body items-center gap-2 rounded-object py-2 text-primary hover:cursor-pointer hover:bg-highlight/50 focus:outline-none">
                  <Exit className="ml-1 text-primary" />
                  Disconnect
                </Flex>
              </DropdownMenu.Item>
            </>
          )}
        </Stack>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
