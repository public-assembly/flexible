import React from 'react'
import { IconProps } from './types'

function Exit({ className }: IconProps) {
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
        d='M16.476 17.856a.5.5 0 00.707 0l.673-.673a.5.5 0 000-.707l-4.475-4.475 4.475-4.475a.5.5 0 000-.707l-.673-.673a.5.5 0 00-.707 0l-4.475 4.475-4.475-4.475a.5.5 0 00-.707 0l-.673.673a.5.5 0 000 .707l4.475 4.475-4.475 4.475a.5.5 0 000 .707l.673.673a.5.5 0 00.707 0l4.475-4.475 4.475 4.475z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export default React.memo(Exit)
