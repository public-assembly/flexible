import React from 'react'

function ChevronDown() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
      <path
        fill='#1E1F22'
        fillRule='evenodd'
        d='M10.747 15.35l-5.6-5.601a.5.5 0 010-.707l.894-.895a.5.5 0 01.707 0l5.251 5.252 5.251-5.252a.5.5 0 01.708 0l.894.895a.5.5 0 010 .707l-6.5 6.499a.5.5 0 01-.706 0l-.895-.894-.004-.005z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export default React.memo(ChevronDown)
