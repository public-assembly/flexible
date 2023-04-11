import Link from "next/link"
import { useRouter } from "next/router"
import { Variants, motion } from "framer-motion"
import { cn } from "utils/cn"
import { ENV } from "utils/env"
import { useState } from "react"
import Button from "@/components/base/Button"
import { Flex } from "@/components/base/Flex"
import { useAuth } from "../hooks/useAuth"
import { useIsMobile } from "../hooks/useIsMobile"
import ConnectButton from "./ConnectButton"
import { Navigation } from "./Navigation"
import { Copy, Exit, PlusIcon, Minus } from "./assets/icons"
import DropdownMenu from "./base/DropdownMenu"
import { Stack } from "./base/Stack"
import { Body, Headline } from "./base/Typography"
import { useDrawer } from "./drawer/useDrawer"
import { NetworkController } from "./NetworkController"
import { BigNumber } from "ethers"
import { useContractRead } from "wagmi"
import { platformThemeRegistryAbi } from "abi/platformThemeRegistryAbi"
import { Hash } from "types"
import { useTokenContext } from "@public-assembly/dao-utils"

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
        ease: "easeInOut",
        duration: 0.8,
        delay: 0.5,
        easings: [0.44, 0, 0.56, 1],
      }}
      className="flex flex-row items-center justify-between w-full px-4 py-4 bg-transparent"
    >
      {/* Header Logo */}
      <Link href="/">
        <NetworkController.Mainnet>
          <Headline className="headline">{tokenSettings?.[0]}</Headline>
        </NetworkController.Mainnet>
        <NetworkController.Testnet>
          <Flex>
            <Headline className="headline">{tokenSettings?.[0]}</Headline>
            <Flex className="items-center justify-center px-6 py-1 ml-4 border rounded-lg border-primary bg-highlight hover:cursor-default">
              <Body className="font-medium text-primary">Goerli</Body>
            </Flex>
          </Flex>
        </NetworkController.Testnet>
      </Link>

      <Flex className="gap-6 items-center">
        {!isMobile && <Navigation />}
        <MobileDropdown />
      </Flex>
    </motion.header>
  )
}

/* Mobile burger navigation */
type MobileDropdownProps = {
  isConnected?: boolean
}

function MobileDropdown(props: MobileDropdownProps) {
  const { address, logout, isConnected, chain } = useAuth()
  const [canEdit, setCanEdit] = useState<boolean>(false)
  const { requestOpen } = useDrawer()
  const router = useRouter()

  const themeRegistry = "0x9a23AE640040e4d34E9e00E500003000017144F4"

  useContractRead({
    address: themeRegistry,
    abi: platformThemeRegistryAbi,
    functionName: "getRole",
    args: [BigNumber.from(ENV.PLATFORM_INDEX), address as Hash],
    onSuccess(getRole) {
      if (getRole === 1 || getRole === 2) {
        setCanEdit(true)
      }
    },
  })

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <DropdownMenu.Root onOpenChange={() => setIsOpen(!isOpen)}>
      <DropdownMenu.Trigger asChild>
        <Button size="icon" className="rounded-object" variant="burger">
          {!isOpen ? (
            <PlusIcon className="w-8 h-8 text-primary" />
          ) : (
            <Minus className="w-8 h-8 text-secondary" />
          )}
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content sideOffset={4} className="min-w-[328px]">
        <Stack className="gap-y-4">
          {/* Hide navigation from within the dropdown menu on screen sizes above 640px */}
          <span className="sm:hidden">
            <Navigation />
          </span>
          {/* Connect */}
          <DropdownMenu.Item
            type="button"
            onClick={() => {}}
            className="m-0 p-0"
          >
            <ConnectButton />
          </DropdownMenu.Item>
          {/* Edit theme */}
          {isConnected && chain?.id === ENV.CHAIN ? (
            canEdit ? (
              <DropdownMenu.Item type="button" onClick={() => {}}>
                <Button
                  size="md"
                  variant="secondary"
                  onClick={() => requestOpen("palette")}
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
              onClick={() => router.push("/platform")}
            >
              Copy this template
            </Button>
          </DropdownMenu.Item>

          {isConnected && (
            <>
              <DropdownMenu.Separator />
              <DropdownMenu.Item type="button" onClick={logout}>
                <Flex className="items-center gap-2 py-2 rounded-object hover:cursor-pointer hover:bg-highlight/50 focus:outline-none body text-primary">
                  <Exit className="text-primary ml-1" />
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
