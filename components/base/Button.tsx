import * as React from "react"
import { VariantProps, cva } from "cva"

import { cn } from "utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-colors focus:outline-none focus:ring-2 border-s dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-primary/50",
  {
    variants: {
      variant: {
        default:
          "bg-highlight hover:bg-highlight/50 active:bg-highlight border-primary border rounded-button w-full focus:ring-slate-400 focus:ring-offset-2",
        primary:
          "bg-primary hover:bg-primary/50 active:bg-primary dark:bg-primary dark:text-primary text-secondary",
        secondary: [
          "bg-primary text-white",
          "hover:bg-secondary hover:border-primary hover:border hover:text-black ",
          "active:bg-primary active:text-white",
          "disabled:border-tertiary disabled:text-tertiary",
          "focus:ring-primary focus:ring-offset-1",
          // I want to select and style the first <svg> child element of every button
          "[&>svg]:w-auto [&>svg]:h-4",
        ],
        tertiary: [
          "bg-secondary border border-primary/50 rounded-button",
          "hover:bg-primary hover:text-secondary",
          "active:border-primary active:text-primary active:bg-secondary",
          "dark:bg-tertiary dark:text-tertiary",
          "focus:ring-primary focus:ring-offset-1",
          "disabled:text-primary/50 disabled:border-primary/50",
        ],
        link: "bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
        burger:
          "data-[state=open]:bg-primary bg-transparent hover:bg-primary/50 data-[state=open]:text-secondary focus:ring-2 active:ring-primary focus:ring-primary",
      },
      icon: {
        true: "",
        left: "[&>svg]:mr-[6px]",
        right: "[&>svg]:ml-[6px]",
        standalone: "",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-button",
        md: "h-12 py-3 px-8 rounded-button",
        lg: "h-11 px-8 py-4 rounded-button",
        icon: "p-2",
      },
    },
    compoundVariants: [
      // Button with icon in size 'sm'
      {
        variant: "secondary",
        icon: true,
        size: "md",
        // apply the following classes to the svg icon
        // todo: debug why these styles aren't applying
        className:
          "first:[&>svg]:mr-[6px] last:[&>svg]:ml-[6px] [&>svg]:w-auto [&>svg]:h-5",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
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

Button.displayName = "Button"

export { Button, buttonVariants }
export default Button
