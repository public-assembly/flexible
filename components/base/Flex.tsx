import clsx from 'clsx'
import { PropsWithChildren } from 'react'

type FlexProps = PropsWithChildren<{
  className?: string
}>

export function Flex(props: FlexProps) {
  return <div className={clsx('flex', props.className)}>{props.children}</div>
}

Flex.displayName = 'Flex'
