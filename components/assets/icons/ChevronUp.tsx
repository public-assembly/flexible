import React from 'react'
import { IconProps } from './types'

function ChevronUp({ className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      className={className}
      height='24'
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M5.146 14.646a.5.5 0 000 .707l.895.895a.5.5 0 00.707 0l5.251-5.252 5.251 5.252a.5.5 0 00.708 0l.894-.894a.5.5 0 000-.707L13.25 9.044a1.017 1.017 0 00-.003-.003l-.894-.895a.5.5 0 00-.707 0l-6.5 6.5z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export default React.memo(ChevronUp)
