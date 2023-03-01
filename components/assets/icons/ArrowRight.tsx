import React from 'react'
import { IconProps } from './types'

function ArrowRight({ className }: IconProps) {
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
        d='M19 12a7 7 0 11-14 0 7 7 0 0114 0zm1 0a8 8 0 11-16 0 8 8 0 0116 0zm-7.953-3.09l2.734 2.549H7.312c-.172 0-.312.13-.312.291v.583c0 .16.14.291.313.291h7.38l-2.646 2.466a.278.278 0 000 .413l.442.412c.122.113.32.113.442 0l3.536-3.297.442-.412a.278.278 0 000-.412l-.443-.413-3.535-3.296a.329.329 0 00-.442 0l-.442.412a.278.278 0 000 .412z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export declare const ArrowRightIcon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
export default React.memo(ArrowRight)
