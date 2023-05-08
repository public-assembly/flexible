import Button from '@/components/base/Button'
import NextLink from 'next/link'
import React from 'react'

type IconButtonProps = {
  icon: React.ReactNode
  href: string
  tooltip: string
}

const IconButton = (props: IconButtonProps) => {
  return (
    <NextLink href={props.href} target="_blank">
      <Button variant="tertiary" className="w-fit px-4 py-2">
        {props.icon}
      </Button>
    </NextLink>
  )
}

export default IconButton
