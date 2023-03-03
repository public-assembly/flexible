import { ReactNode, forwardRef } from "react"

import { VariantProps, cva } from "cva"
import { cn } from "utils/cn"

const labelVariants = cva(
  [
    "border-[.5px] rounded-[2px] w-fit px-1 py-[2px]  h-5 inline-flex items-center box-border",
    "text-xs leading-4 font-medium",
  ],
  {
    variants: {
      variant: {
        primary: ["bg-primary text-secondary"],
        secondary: ["bg-secondary text-primary"],
        tertiary: ["border-tertiary text-primary/50 bg-tertiary/50"],
      },
      titleCase: {
        true: "",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

export type LabelProps = {
  className?: string
  children: ReactNode
} & VariantProps<typeof labelVariants>

const ProposalLabel = forwardRef<HTMLDivElement, LabelProps>(
  ({ className, titleCase, variant, children, ...props }, ref) => {
    return (
      <div
        className={cn(className, labelVariants({ variant, titleCase }))}
        ref={ref}
        {...props}
      >
        {/* I need to wrap in a span for some reason the styles for titlecase won't apply otherwise */}
        {titleCase ? (
          <span className="lowercase first-letter:capitalize">{children}</span>
        ) : (
          children
        )}
      </div>
    )
  }
)

ProposalLabel.displayName = "ProposalLabel"

export { ProposalLabel, labelVariants }
export default ProposalLabel
