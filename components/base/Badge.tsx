import { ReactNode } from 'react'

import { VariantProps } from 'cva'
import { cn } from 'utils/cn'

import CountingNumbers from '@/components/base/CountingNumbers'
import { Stack } from '@/components/base/Stack'
import { BodySmall, Headline } from '@/components/base/Typography'
import { labelVariants } from '@/components/proposals/ProposalLabel'

type BadgeProps = {
  className?: string
  value: number
  children: ReactNode
} & VariantProps<typeof labelVariants>

export function Badge(props: BadgeProps) {
  return (
    <Stack
      className={cn(
        props.className,
        'h-24 w-24 flex-col items-center justify-center gap-1 rounded-object bg-secondary px-6 py-4'
      )}
    >
      <Headline>
        <CountingNumbers value={props.value} />
      </Headline>
      <BodySmall>{props.children}</BodySmall>
    </Stack>
  )
}
