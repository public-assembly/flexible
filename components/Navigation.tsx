import Link from 'next/link'
import { useRouter } from 'next/router'
import { cn } from 'utils/cn'
import { Flex } from './base/Flex'
import { Headline } from './base/Typography'

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
];

export function Navigation() {
  return (
    <Flex className='gap-6'>
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
    <Link href={slug} key={slug} className={cn('relative flex flex-row transition duration-300 group cursor-pointer')}>
      <Headline
        className={cn(isCurrentPath ? 'link-underline--active' : '', 'group-hover:text-tertiary link-underline')}
      >
        {title}
      </Headline>
    </Link>
  )
}
