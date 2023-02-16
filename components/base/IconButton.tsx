import React from 'react'
import { Button } from '../Button'
import NextLinks from './NextLinks'

type IconButtonProps = {
  icon: React.ReactNode
  href: string
  tooltip: string
  // onClick: () => void
}

const IconButton = (props: IconButtonProps) => {
  return (
    <Button size='icon' shape='circle' intent='primary' className='w-fit'>
      <NextLinks href={props.href} tooltip={props.tooltip}>
        {props.icon}
      </NextLinks>
    </Button>
  )
}

export default IconButton
