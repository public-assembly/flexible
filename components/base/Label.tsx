import { ReactNode, forwardRef } from "react"

import { VariantProps, cva } from "cva"
import { cn } from "utils/cn"

import { ArrowUpRight } from "@/components/assets/icons"
import CountingNumbers from "@/components/base/CountingNumbers"
import { BodySmall, Headline } from "@/components/base/Typography"

const labelVariants = cva(["w-fit h-fit flex rounded-object items-center"], {
  variants: {
    variant: {
      badge: ["flex-col gap-1 px-6 py-4 bg-secondary rounded-object "],
      row: ["px-4 py-2 bg-primary gap-4 text-secondary text-base font-medium"],
      rowInverse: ["px-4 py-2 bg-secondary gap-4 text-primary  text-base"],
    },
    titleCase: {
      true: "",
    },
  },
  defaultVariants: {
    variant: "rowInverse",
  },
})

export type LabelProps = {
  className?: string
  showIcon?: boolean
  iconLeft?: ReactNode
  externalLink?: string
  showExternalLinkIcon?: boolean
  value?: number
  children: ReactNode
} & VariantProps<typeof labelVariants>

const Label = forwardRef<HTMLDivElement, LabelProps>(
  ({ className, titleCase, variant, children, ...props }, ref) => {
    // This is the only place where the variant is used, and it's not used in the return statement
    if (variant === "badge" && !!props.value)
      return (
        <div
          className={cn(className, labelVariants({ variant, titleCase }))}
          ref={ref}
          {...props}
        >
          <Headline>
            <CountingNumbers value={props.value} />
          </Headline>
          <BodySmall>{children}</BodySmall>
        </div>
      )

    return (
      <div
        className={cn(className, labelVariants({ variant, titleCase }))}
        ref={ref}
        {...props}
      >
        {props.showIcon ? (
          <span className="text-primary">{props.iconLeft}</span>
        ) : null}

        {children}

        {props.externalLink && props.showExternalLinkIcon ? (
          <ArrowUpRight className="text-tertiary" />
        ) : null}
      </div>
    )
  }
)

Label.displayName = "Label"

export { Label, labelVariants }
export default Label
