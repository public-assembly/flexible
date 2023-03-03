import clsx from 'clsx'
import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

type FlexProps = PropsWithChildren<{
  className?: string
}>

export function Flex(props: FlexProps) {
  return <div className={clsx('flex', props.className)}>{props.children}</div>
}

export const MotionFlex = motion(Flex)

Flex.displayName = 'Flex'
