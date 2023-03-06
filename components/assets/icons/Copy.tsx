import React from 'react'
import { IconProps } from './types'

function Copy({ className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'
      className={className}
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.657 5.6a1.6 1.6 0 011.6-1.6H18.4A1.6 1.6 0 0120 5.6v9.143a1.6 1.6 0 01-1.6 1.6h-2.057V18.4a1.6 1.6 0 01-1.6 1.6H5.6A1.6 1.6 0 014 18.4V9.257a1.6 1.6 0 011.6-1.6h2.057V5.6zM18.4 14.971h-2.057V9.257a1.6 1.6 0 00-1.6-1.6H9.029V5.6c0-.126.102-.229.228-.229H18.4c.126 0 .229.103.229.229v9.143a.229.229 0 01-.229.228zM5.6 9.03a.229.229 0 00-.229.228V18.4c0 .126.103.229.229.229h9.143a.229.229 0 00.228-.229V9.257a.229.229 0 00-.228-.228H5.6zm4.229 2.228c0-.095.076-.171.171-.171h.343c.095 0 .171.076.171.171v2.229h2.229c.095 0 .171.076.171.171V14a.171.171 0 01-.171.171h-2.229V16.4a.171.171 0 01-.171.171H10a.171.171 0 01-.171-.171v-2.229H7.6A.171.171 0 017.429 14v-.343c0-.095.076-.171.171-.171h2.229v-2.229z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export default React.memo(Copy)
