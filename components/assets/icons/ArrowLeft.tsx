import React from 'react'
import { IconProps } from './types'

function ArrowLeft({ className }: IconProps) {
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
        d='M7.55 12.793l4.375 4.374a.5.5 0 010 .707l-.708.707a.5.5 0 01-.707 0l-5.656-5.656-.708-.708a.5.5 0 010-.707l.708-.707 5.656-5.657a.5.5 0 01.707 0l.708.708a.5.5 0 010 .707l-4.233 4.232H19.5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5H7.55z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export default React.memo(ArrowLeft)
