import Link from "next/link"
import { Variants, motion } from "framer-motion"
import { cn } from "utils/cn"
import { ENV } from "utils/env"

import Button from "@/components/base/Button"
import { Flex } from "@/components/base/Flex"
import { useAuth } from "../hooks/useAuth"
import { useIsMobile } from "../hooks/useIsMobile"
import ConnectButton from "./ConnectButton"
import styles from "./Header.module.css"
import { Navigation } from "./Navigation"
import { Copy, Exit } from "./assets/icons"
import DropdownMenu from "./base/DropdownMenu"
import { Stack } from "./base/Stack"
import { Headline } from "./base/Typography"
import { Zorb } from "./base/Zorb"
import EditTheme from "./EditTheme"

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
        <Headline>{ENV.SITE_TITLE}</Headline>
      </Link>

      <Flex className="gap-6">
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
  const { logout, isConnected } = useAuth()
  const { address, ensName } = useAuth()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button size="icon" className="group" variant="burger">
          {/* Icon is styled with module css and animates using data attributes from radix */}
          <div
            className={cn(
              styles.icon,
              "group-radix-state-open:after:rotate-180 group-radix-state-open:before:rotate-90"
            )}
          />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content sideOffset={4} className="min-w-[328px]">
        <Stack className="flex flex-col gap-6 pb-6">
          {isConnected ? (
            <>
              <Flex className="items-center gap-4">
                <Zorb address={address} size={32} radius={999} />
                <Headline>{ensName ? ensName : address}</Headline>
              </Flex>
              <DropdownMenu.Item
                type="button"
                onClick={() => console.log("open theme")}
              >
                <EditTheme />
              </DropdownMenu.Item>
            </>
          ) : (
            <ConnectButton />
          )}
        </Stack>
        <DropdownMenu.Separator />
        <Stack>
          <DropdownMenu.Item
            type="external-link"
            href="https://github.com/public-assembly/flexible"
          >
            <Flex className="items-center w-full gap-4 py-4 hover:bg-tertiary/10 rounded-object">
              <Copy />
              Copy our template
            </Flex>
          </DropdownMenu.Item>
          {isConnected && (
            <DropdownMenu.Item type="button" onClick={logout}>
              <Flex className="items-center gap-4 py-4 rounded-object hover:cursor-pointer hover:bg-tertiary/10 focus:outline-none">
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
