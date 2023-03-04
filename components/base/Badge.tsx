import { ReactNode } from "react"

import { VariantProps } from "cva"
import { cn } from "utils/cn"

import CountingNumbers from "@/components/base/CountingNumbers"
import { Stack } from "@/components/base/Stack"
import { BodySmall, Headline } from "@/components/base/Typography"
import { labelVariants } from "@/components/proposals/ProposalLabel"

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
        "flex-col gap-1 px-6 py-4 bg-secondary rounded-object w-24 h-24 justify-center items-center"
      )}
    >
      <Headline>
        <CountingNumbers value={props.value} />
      </Headline>
      <BodySmall>{props.children}</BodySmall>
    </Stack>
  )
}
