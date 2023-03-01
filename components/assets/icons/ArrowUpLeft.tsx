import React from 'react'
import { IconProps } from './types'

function ArrowUpLeft({ className }: IconProps) {
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
        d='M7.03 8.467v6.186a.5.5 0 01-.5.5H5.5a.5.5 0 01-.5-.5V5.5a.5.5 0 01.5-.5H14.653a.5.5 0 01.5.5v1.03a.5.5 0 01-.5.5H8.467l10.39 10.39a.5.5 0 010 .708l-.73.729a.5.5 0 01-.706 0L7.03 8.467z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export default React.memo(ArrowUpLeft)
