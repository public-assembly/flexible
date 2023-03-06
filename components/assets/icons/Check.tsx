import React from 'react'
import { IconProps } from './types'

function Check({ className }: IconProps) {
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
        d='M8.459 16.824l.002.001.676.677.04.04a.5.5 0 00.707 0l9.972-9.972a.5.5 0 000-.707l-.716-.717a.5.5 0 00-.708 0l-8.901 8.902-3.958-3.958a.5.5 0 00-.707 0l-.717.717a.5.5 0 000 .707l4.31 4.31z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export default React.memo(Check)
