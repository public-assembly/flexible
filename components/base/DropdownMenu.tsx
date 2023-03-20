import { FC, forwardRef, PropsWithChildren } from 'react'
import React from 'react'

import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'

import { withClassName } from '../withClassName'
import { cva, cx } from 'cva'
import { cn } from 'utils/cn'

import NextLink from 'next/link'

/* DropdownMenu.Content */
const Overlay: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={cn(
        'overlay',
        'fixed bottom-0 left-0 w-screen h-screen pointer-events-none',
        'backdrop-blur-[24px] bg-black/60 filter md:hidden',
        'group-radix-state-closed:animate-fadeOut group-radix-state-open:animate-fadeIn',
        'data-closed:animate-fadeOut data-open:animate-fadeIn data-[side=top]:data-[state=open]:animate-fadeIn data-[side=top]:data-[state=closed]:animate-fadeOut'
      )}
    >
      {children}
    </div>
  )
}

const ContentInner: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={cn(
        'content-inner',
        'relative p-6 overflow-auto bg-secondary',
        'rounded-object max-w-[80vw]',
        // 'origin-radix-dropdown-menu shadow-md',
        'origin-radix-dropdown-menu custom-shadow',
        // mobile sheet animations
        'group-radix-state-open:animate-longFadeInUp',
        'group-radix-state-closed:animate-longFadeInDown',
        'group-radix-state-open:md:animate-slide-down',
        'group-radix-state-closed:md:animate-slide-up'
      )}
    >
      {children}
    </div>
  )
}

const ContentOuter = withClassName(
  DropdownPrimitive.Content,
  cn('content-outer', 'group', 'radix-state-closed:animate-fakeFade origin-radix-dropdown-menu')
)

type ContentProps = React.ComponentProps<typeof DropdownPrimitive.Content>

const Content = forwardRef(function Content(
  props: ContentProps,
  /* We need to forward the ref here because Radix won't add an exit transition */
  ref: React.Ref<HTMLDivElement> | undefined
) {
  const { children, ...rest } = props
  return (
    <ContentOuter {...rest} ref={ref}>
      <Overlay />
      <ContentInner>{children}</ContentInner>
    </ContentOuter>
  )
})

Content.defaultProps = {
  align: 'start',
  collisionPadding: 8,
  sideOffset: 8,
}

/* DropdownMenu.Item */
const sharedBaseStyles = cva([
  'gap-3',
  'w-full',
  'flex',
  'items-center',
  'py-1',
  'text-primary',
  'cursor-pointer',
  'transition-colors',
  'transition-color-1-ease',
  'rounded-md',
  'text-3',
  'font-body',
  'leading-2',
  'no-underline',
  'focus:outline-none',
  'focus:bg-primary/10',
  'disabled:text-primary/50',
  'disabled:bg-transparent!',
])

type BaseItemLinkProps = {
  className?: string
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'a'>

const BaseItemLink = React.forwardRef<HTMLAnchorElement, BaseItemLinkProps>(
  (props, forwardedRef: React.Ref<HTMLAnchorElement>) => {
    // const BaseItemLink: FC<PropsWithChildren> = ({ children }) => (
    return (
      <a className={cx(sharedBaseStyles(), props.className)} ref={forwardedRef}>
        {props.children}
      </a>
    )
  }
)
BaseItemLink.displayName = 'BaseItemLink'

// todo pass the base styles as well
const BaseItem = withClassName(DropdownPrimitive.Item, 'base-item')

type BaseItemProps = React.ComponentProps<typeof BaseItem>

type BaseDropdownItemProps = {
  children: React.ReactNode
  /** @warn not used by inside DropdownMenu.Item */
  icon?: React.ReactNode
  enabled?: boolean
  // variant?: BaseItemProps['variant']
}

export type DropdownItemTypeProps =
  | {
      type?: 'button'
      onClick(): void
    }
  | {
      type: 'link'
      href: string
      onClick?(): void
    }
  | {
      type: 'external-link'
      href: string
      onClick?(): void
    }

export type DropdownItemProps = BaseDropdownItemProps & DropdownItemTypeProps

function Item(props: DropdownItemProps) {
  switch (props.type) {
    case 'link': {
      const { children, href, ...rest } = props
      return (
        <NextLink href={href} passHref>
          <DropdownPrimitive.Item {...rest} asChild>
            <BaseItemLink>{children}</BaseItemLink>
          </DropdownPrimitive.Item>
        </NextLink>
      )
    }
    case 'external-link': {
      const { children, href, ...rest } = props
      return (
        <DropdownPrimitive.Item {...rest} asChild>
          <BaseItemLink href={href} target='_blank' rel='noreferrer'>
            {children}
          </BaseItemLink>
        </DropdownPrimitive.Item>
      )
    }
    default: {
      return <BaseItem {...props} />
    }
  }
}

const DropdownSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownPrimitive.Separator
    ref={ref}
    className={cn('dropdown-separator my-1 h-px bg-tertiary/50', className)}
    {...props}
  />
))
DropdownSeparator.displayName = DropdownPrimitive.Separator.displayName

const Dropdown = {
  Content,
  Item,
  Portal: DropdownPrimitive.Portal,
  Root: DropdownPrimitive.Root,
  Separator: DropdownSeparator,
  Trigger: DropdownPrimitive.Trigger,
}

export default Dropdown
