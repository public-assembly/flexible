export function H2Heading({ children }) {
  return <h2 className='text-4xl font-medium text-black primary'>{children}</h2>
}

export function Headline({ children }) {
  return <h1 className='text-2xl font-medium leading-10 tracking-[-0.5px] text-primary'>{children}</h1>
}

export function Caption({ children }) {
  return <span className='text-base font-regular text-primary'>{children}</span>
}

export function BodySmall({ children }) {
  return <span className='text-xs font-medium text-primary'>{children}</span>
}

export function Body({ children }) {
  return <p className='text-base font-medium text-primary'>{children}</p>
}
