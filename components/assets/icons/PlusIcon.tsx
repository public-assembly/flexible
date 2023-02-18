import React from 'react'

function PlusIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
      <path
        fill='#1E1F22'
        fillRule='evenodd'
        d='M11.5 4a.5.5 0 00-.5.5V11H4.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5H11v6.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V13h6.5a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5H13V4.5a.5.5 0 00-.5-.5h-1z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export default React.memo(PlusIcon)
