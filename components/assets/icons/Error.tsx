import React from 'react'
import { IconProps } from './types'

function Error({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 19.875C16.3492 19.875 19.875 16.3492 19.875 12C19.875 7.65076 16.3492 4.125 12 4.125C7.65076 4.125 4.125 7.65076 4.125 12C4.125 16.3492 7.65076 19.875 12 19.875ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.5 15C11.2239 15 11 14.7761 11 14.5L11 6.5C11 6.22386 11.2239 6 11.5 6L12.5 6C12.7761 6 13 6.22386 13 6.5L13 14.5C13 14.7761 12.7761 15 12.5 15L11.5 15Z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.5 18C11.2239 18 11 17.7761 11 17.5L11 16.5C11 16.2239 11.2239 16 11.5 16L12.5 16C12.7761 16 13 16.2239 13 16.5L13 17.5C13 17.7761 12.7761 18 12.5 18L11.5 18Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default React.memo(Error)
