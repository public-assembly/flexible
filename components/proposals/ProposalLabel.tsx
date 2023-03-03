import { VariantProps, cva } from 'cva'
import { forwardRef, ReactNode } from 'react'

import { cn } from 'utils/cn'

const labelVariants = cva(
  [
    'border-[.5px] rounded-[2px] w-fit px-1 py-[2px] lowercase  h-5 inline-flex items-center box-border',
    'text-xs leading-4 font-medium',
  ],
  {
    variants: {
      variant: {
        primary: ['bg-primary text-secondary'],
        secondary: ['bg-secondary text-primary'],
        tertiary: ['border-tertiary text-primary/50 bg-tertiary/50'],
      },
      textTransform: {
        uppercase: 'uppercase',
        lowercase: 'lowercase',
        titlecase: 'lowercase first-letter:capitalize',
      },
    },
    defaultVariants: {
      variant: 'primary',
      textTransform: 'titlecase',
    },
  }
)

export type LabelProps = { className?: string; children: ReactNode } & VariantProps<typeof labelVariants>

const ProposalLabel = forwardRef<HTMLDivElement, LabelProps>(
  ({ className, textTransform, variant, children, ...props }, ref) => {
    return (
      <div className={cn(className, labelVariants({ variant, textTransform }))} ref={ref} {...props}>
        {children}
      </div>
    )
  }
)

ProposalLabel.displayName = 'ProposalLabel'

export { ProposalLabel, labelVariants }
export default ProposalLabel
