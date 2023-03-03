import { cn } from 'utils/cn'

type TypographyProps = {
  children: React.ReactNode
  className?: string
}

export function H2Heading({ children, className }: TypographyProps) {
  return <h2 className='text-4xl font-medium text-black primary'>{children}</h2>
}

export function H1Heading({ children, className }: TypographyProps) {
  return <h1 className={cn('text-2xl font-medium leading-10 tracking-[-0.5px] text-primary', className)}>{children}</h1>
}

export function Headline({ children, className }: TypographyProps) {
  return <p className={cn('text-2xl font-medium leading-10 tracking-[-0.5px] text-primary', className)}>{children}</p>
}

export function Caption({ children, className }: TypographyProps) {
  return <span className={cn('text-base font-regular text-primary', className)}>{children}</span>
}

export function BodySmall({ children, className }: TypographyProps) {
  return <span className={cn('text-xs font-medium text-primary', className)}>{children}</span>
}

export function Body({ children, className }: TypographyProps) {
  return <p className={cn('text-base font-medium text-primary', className)}>{children}</p>
}

export function BodyExtraSmall({ children, className }: TypographyProps) {
  return <span className={cn('text-xs leading-4 font-medium text-secondary ', className)}>{children}</span>
}
