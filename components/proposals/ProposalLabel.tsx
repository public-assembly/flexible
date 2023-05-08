import { forwardRef, ReactNode } from 'react'

import { cva, VariantProps } from 'cva'
import { cn } from 'utils/cn'

const labelVariants = cva(
  ['rounded-[2px] w-fit px-1 py-[2px] text-xs font-medium body'],
  {
    variants: {
      variant: {
        primary: ['bg-primary text-secondary'],
        secondary: ['bg-secondary text-primary border-[0.5px] border-primary'],
        tertiary: ['text-primary/50 border-[0.5px] border-primary/50'],
        tertiaryVotes: ['text-primary bg-tertiary/50 caption'],
      },
      textTransform: {
        titleCase: 'lowercase first-letter:capitalize',
        uppercase: 'uppercase',
        lowercase: 'lowercase',
      },
    },
    defaultVariants: {
      variant: 'primary',
      textTransform: 'titleCase',
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

ProposalLabel.displayName = 'ProposalLabel'

export { ProposalLabel, labelVariants }
export default ProposalLabel
