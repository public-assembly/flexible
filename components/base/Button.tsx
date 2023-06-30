import { cva, VariantProps } from 'cva'
import * as React from 'react'

import { cn } from 'utils/cn'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center text-base font-medium transition-colors body',
    'focus:outline-none focus:ring-2',
    'dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-offset-slate-900',
    'disabled:opacity-50 disabled:pointer-events-none',
    'data-[state=open]:bg-primary/50',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-highlight rounded-button w-full border border-primary text-primary',
          'hover:bg-highlight/50',
          'active:bg-highlight',
          'disabled:bg-secondary disabled:border-tertiary disabled:text-tertiary',
          'focus:ring-slate-400 focus:ring-offset-2',
        ],
        secondary: [
          'bg-primary rounded-button w-full text-secondary',
          'hover:bg-secondary hover:border hover:border-primary hover:text-primary ',
          'active:bg-primary active:text-primary',
          'disabled:border-tertiary disabled:text-tertiary disabled:bg-secondary',
          'focus:ring-primary focus:ring-offset-1',
          // TODO: select and style the first <svg> child element of every button
          '[&>svg]:w-auto [&>svg]:h-4',
        ],
        tertiary: [
          'bg-secondary rounded-button w-full border border-primary text-primary',
          'hover:bg-primary hover:text-secondary',
          'active:border-primary active:text-primary active:bg-secondary',
          'dark:bg-tertiary dark:text-tertiary',
          'focus:ring-primary focus:ring-offset-1',
          'disabled:text-primary/50 disabled:border-primary/50',
        ],
        alert: [
          'border border-black text-[#FF0000] bg-white rounded-button w-full',
          'hover:bg-white/50',
          'focus:ring-primary focus:ring-offset-1',
        ],
        link: 'bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent',

        burger:
          'hover:bg-primary/50  data-[state=open]:bg-primary data-[state=open]:text-secondary bg-transparent focus:ring-2 active:ring-primary focus:ring-primary',
      },
      icon: {
        true: '',
        left: '[&>svg]:mr-[6px]',
        right: '[&>svg]:ml-[6px]',
        standalone: '',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-button',
        md: 'h-12 py-3 px-8 rounded-button',
        lg: 'h-14 px-8 py-4 rounded-button',
        icon: 'p-2',
      },
    },
    compoundVariants: [
      // Button with icon in size 'sm'
      {
        variant: 'secondary',
        icon: true,
        size: 'md',
        // apply the following classes to the svg icon
        // todo: debug why these styles aren't applying
        className:
          'first:[&>svg]:mr-[6px] last:[&>svg]:ml-[6px] [&>svg]:w-auto [&>svg]:h-5',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
export type ButtonProps = {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
} & VariantProps<typeof buttonVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, prefix, suffix, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {!!prefix ? prefix : null}
        {props.children}
        {!!suffix ? suffix : null}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
export default Button
