import React from 'react'
import { IconProps } from './types'

function PlusIcon({ className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.5 4a.5.5 0 00-.5.5V11H4.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5H11v6.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V13h6.5a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5H13V4.5a.5.5 0 00-.5-.5h-1z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export default React.memo(PlusIcon)
