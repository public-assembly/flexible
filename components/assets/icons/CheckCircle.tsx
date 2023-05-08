import React from 'react'
import { IconProps } from './types'

function CheckCircle({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12ZM7.14645 12.5474L9.88263 15.2836L10.0538 15.4548L10.0555 15.4565L10.0791 15.4801C10.2744 15.6754 10.591 15.6754 10.7862 15.4801L16.8563 9.41007C17.0515 9.2148 17.0515 8.89822 16.8563 8.70296L16.6598 8.50645C16.4645 8.31118 16.1479 8.31119 15.9527 8.50645L10.4327 14.0264L8.05007 11.6438C7.8548 11.4485 7.53822 11.4485 7.34296 11.6438L7.14645 11.8403C6.95118 12.0356 6.95118 12.3522 7.14645 12.5474Z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export default React.memo(CheckCircle)
