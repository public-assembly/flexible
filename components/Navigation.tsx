import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Flex } from './base/Flex'

type NavLinkProps = {
  slug: string
  title: string
}

const navLinks: NavLinkProps[] = [
  {
    slug: '/auction',
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
    <Flex className='gap-4'>
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
      className={clsx(
        'relative flex flex-row items-center gap-2 transition duration-300 group text-primary hover:text-tertiary cursor-pointer'
      )}
    >
      {title}
      <span
        className={clsx(
          isCurrentPath ? 'max-w-full' : 'max-w-0',
          'block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-highlight'
        )}
      />
    </Link>
  )
}
