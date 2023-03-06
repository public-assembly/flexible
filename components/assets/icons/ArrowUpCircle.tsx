import React from 'react'
import { IconProps } from './types'

function ArrowUpCircle({ className }: IconProps) {
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
        d='M19 12a7 7 0 11-14 0 7 7 0 0114 0zm1 0a8 8 0 11-16 0 8 8 0 0116 0zm-11.09-.047l2.549-2.734v7.469c0 .172.13.312.291.312h.583c.16 0 .291-.14.291-.313v-7.38l2.466 2.646a.278.278 0 00.413 0l.412-.442a.329.329 0 000-.442l-3.297-3.536-.412-.441a.278.278 0 00-.412 0l-.413.442-3.296 3.535a.329.329 0 000 .442l.412.442a.278.278 0 00.412 0z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export default React.memo(ArrowUpCircle)
