import * as React from 'react'
import { VariantProps, cva } from 'cva'

import { cn } from 'utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 border-s dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-primary/50',
  {
    variants: {
      variant: {
        default:
          'bg-highlight hover:bg-highlight/50 active:bg-highlight border-primary border rounded-button w-full focus:ring-slate-400 focus:ring-offset-2',
        primary: 'bg-primary hover:bg-primary/50 active:bg-primary dark:bg-primary dark:text-primary text-secondary',
        secondary: 'bg-secondary hover:bg-secondary/50 active:bg-secondary dark:bg-secondary dark:text-secondary',
        tertiary: 'bg-tertiary hover:bg-tertiary/50 active:bg-tertiary dark:bg-tertiary dark:text-tertiary',
        ghost:
          'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
        link: 'bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent',
        burger:
          'data-[state=open]:bg-primary bg-transparent hover:bg-primary/50 data-[state=open]:text-secondary focus:ring-2 active:ring-primary focus:ring-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-button',
        lg: 'h-11 px-8 rounded-button',
        icon: 'p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})

Button.displayName = 'Button'

export { Button, buttonVariants }