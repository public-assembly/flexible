import React from 'react'
import { IconProps } from './types'

function ArrowRight({ className }: IconProps) {
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
        fillRule='evenodd'
        d='M19.854 11.51a.5.5 0 010 .707l-.708.708-5.656 5.656a.5.5 0 01-.707 0l-.708-.707a.5.5 0 010-.707l4.233-4.232H4.5a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h11.95l-4.375-4.374a.5.5 0 010-.707l.708-.708a.5.5 0 01.707 0l5.656 5.657.708.707z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export declare const ArrowRightIcon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
export default React.memo(ArrowRight)
