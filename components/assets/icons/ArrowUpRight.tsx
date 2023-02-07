import React from 'react'

function ArrowUpRight() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
      <path
        fill='#1E1F22'
        fillRule='evenodd'
        d='M19.003 6.53v8.123a.5.5 0 01-.5.5h-1.03a.5.5 0 01-.5-.5V8.467l-10.39 10.39a.5.5 0 01-.708 0l-.729-.73a.5.5 0 010-.706l10.39-10.39H9.35a.5.5 0 01-.5-.5V5.5a.5.5 0 01.5-.5h9.153a.501.501 0 01.5.5v1.03z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export default React.memo(ArrowUpRight)
