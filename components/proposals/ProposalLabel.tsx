import { ReactNode, forwardRef } from "react"

import { VariantProps, cva } from "cva"
import { cn } from "utils/cn"

const labelVariants = cva(
  ["border-[.5px] rounded-[2px] w-fit px-1 py-[2px] ", "text-xs  font-medium"],
  {
    variants: {
      variant: {
        primary: ["bg-primary text-secondary"],
        secondary: ["bg-secondary text-primary"],
        tertiary: ["border-tertiary text-primary/50 bg-tertiary/50"],
        badge: ["px-6 py-4 "],
      },
      textTransform: {
        titleCase: "lowercase first-letter:capitalize",
        uppercase: "uppercase",
        lowercase: "lowercase",
      },
    },
    defaultVariants: {
      variant: "primary",
      textTransform: "titleCase",
    },
  }
)

export type LabelProps = {
  className?: string
  children: ReactNode
} & VariantProps<typeof labelVariants>

const ProposalLabel = forwardRef<HTMLDivElement, LabelProps>(
  ({ className, textTransform, variant, children, ...props }, ref) => {
    return (
      <div
        className={cn(className, labelVariants({ variant, textTransform }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ProposalLabel.displayName = "ProposalLabel"

export { ProposalLabel, labelVariants }
export default ProposalLabel
