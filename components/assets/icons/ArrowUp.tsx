import React from 'react'
import { IconProps } from './types'

function ArrowUp({ className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width='24'
      height='24'
      fill='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        fillRule='evenodd'
        d='M11.645 4.146a.5.5 0 01.707 0l.708.708 5.656 5.656a.5.5 0 010 .707l-.707.708a.5.5 0 01-.707 0L13 7.622V19.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5V7.62l-4.304 4.305a.5.5 0 01-.707 0l-.708-.708a.5.5 0 010-.707l5.656-5.655.001-.001.707-.708z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export default React.memo(ArrowUp)
