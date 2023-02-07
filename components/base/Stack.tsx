import { ReactNode } from 'react'
import { clsx } from 'clsx'

type Props = {
  className?: string
  children: ReactNode
}

export function Stack({ className, children }: Props) {
  return <div className={clsx('flex flex-col', className)}>{children}</div>
}

export function VStack(props: Props) {
  return <Stack {...props} className={clsx('', props.className)} />
}

export function HStack(props: Props) {
  return <div className={clsx('flex', props.className)}>{props.children}</div>
}
