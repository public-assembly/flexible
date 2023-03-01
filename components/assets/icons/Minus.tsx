import React from 'react'
import { IconProps } from './types'

function Minus({ className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        fill='currentColor'
        d='M4 11.5a.5.5 0 01.5-.5h15a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-15a.5.5 0 01-.5-.5v-1z'
      ></path>
    </svg>
  )
}

export default React.memo(Minus)
