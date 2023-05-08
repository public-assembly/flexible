import Link from 'next/link'
import { useRouter } from 'next/router'
import { cn } from 'utils/cn'

import { Flex } from './base/Flex'
import { Headline } from './base/Typography'
import styles from './Navigation.module.css'

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

function NavLink({ slug, title }: NavLinkProps) {
  const router = useRouter()
  const isCurrentPath = router.asPath === slug

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
          isCurrentPath ? styles.linkUnderlineIsActive : '',
          'headline group-hover:text-tertiary',
          styles.linkUnderline
        )}
      >
        {title}
      </Headline>
    </Link>
  )
}
