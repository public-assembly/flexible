import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from 'utils/cn'

import styles from './Navigation.module.css'
import { Flex } from './base/Flex'
import { Headline } from './base/Typography'

type NavLinkProps = {
  slug: string
  title: string
}

const navLinks: NavLinkProps[] = [
  {
    slug: '/',
    title: 'Auction',
  },
  {
    slug: '/proposals',
    title: 'Props',
  },
  {
    slug: '/about',
    title: 'About',
  },
]

export function Navigation() {
  return (
    <Flex className="mb-8 flex-col gap-6 md:mb-0 md:flex-row">
      {navLinks.map((page) => (
        <NavLink key={page.slug} slug={page.slug} title={page.title} />
      ))}
    </Flex>
  )
}
// TODO: Figure out the logic for isCurrentPath given a dynamic segment
function NavLink({ slug, title }: NavLinkProps) {
  const pathname = usePathname()

  const currentPath = pathname === slug

  return (
    <Link
      href={slug}
      key={slug}
      className={cn(
        'group relative flex cursor-pointer flex-row transition duration-300'
      )}
    >
      <Headline
        className={cn(
          currentPath ? styles.linkUnderlineIsActive : '',
          'headline group-hover:text-tertiary',
          styles.linkUnderline
        )}
      >
        {title}
      </Headline>
    </Link>
  )
}
