import React from 'react'

function ArrowUpRight({ size = 16, className = 'text-primary' }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      className={className}
      viewBox='0 0 24 24'
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M19.003 6.53v8.123a.5.5 0 01-.5.5h-1.03a.5.5 0 01-.5-.5V8.467l-10.39 10.39a.5.5 0 01-.708 0l-.729-.73a.5.5 0 010-.706l10.39-10.39H9.35a.5.5 0 01-.5-.5V5.5a.5.5 0 01.5-.5h9.153a.501.501 0 01.5.5v1.03z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export default React.memo(ArrowUpRight)
