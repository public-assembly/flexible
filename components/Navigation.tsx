import Link from "next/link"
import { useRouter } from "next/router"
import { cn } from "utils/cn"

import styles from "./Navigation.module.css"
import { Flex } from "./base/Flex"
import { Headline } from "./base/Typography"

type NavLinkProps = {
  slug: string
  title: string
}

const navLinks: NavLinkProps[] = [
  {
    slug: "/",
    title: "Auction",
  },
  {
    slug: "/proposals",
    title: "Props",
  },
  {
    slug: "/about",
    title: "About",
  },
]

export function Navigation() {
  return (
    <Flex className="gap-6 flex-col mb-8 md:mb-0 md:flex-row">
      {navLinks.map((page) => (
        <NavLink key={page.slug} slug={page.slug} title={page.title} />
      ))}
    </Flex>
  )
}

function NavLink({ slug, title }: NavLinkProps) {
  const router = useRouter()
  const isCurrentPath = router.asPath === slug
  return (
    <Link
      href={slug}
      key={slug}
      className={cn(
        "relative flex flex-row transition duration-300 group cursor-pointer"
      )}
    >
      <Headline
        className={cn(
          isCurrentPath ? styles.linkUnderlineIsActive : "",
          "group-hover:text-tertiary headline",
          styles.linkUnderline
        )}
      >
        {title}
      </Headline>
    </Link>
  )
}
