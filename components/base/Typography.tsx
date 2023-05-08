import { cn } from 'utils/cn'

type TypographyProps = {
  children: React.ReactNode
  className?: string
}

export function H2Heading({ children, className }: TypographyProps) {
  return <h2 className="primary text-4xl font-medium text-black">{children}</h2>
}

export function H1Heading({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        'text-2xl font-medium leading-10 tracking-[-0.5px] text-primary',
        className
      )}
    >
      {children}
    </h1>
  )
}

/**
 * Headline or Display Typography
 */
export function Headline({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        'headline text-[1.5rem] font-medium leading-10 tracking-[-0.5px] text-primary',
        className
      )}
    >
      {children}
    </p>
  )
}

export function Caption({ children, className }: TypographyProps) {
  return (
    <p className={cn('caption text-base text-primary', className)}>
      {children}
    </p>
  )
}

export function BodyLarge({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        'body text-[18px] font-medium leading-7 text-primary',
        className
      )}
    >
      {children}
    </p>
  )
}

export function Body({ children, className }: TypographyProps) {
  return (
    <p className={cn('body text-base font-normal text-primary', className)}>
      {children}
    </p>
  )
}

export function BodySmall({ children, className }: TypographyProps) {
  return (
    <p className={cn('body text-sm font-normal text-primary', className)}>
      {children}
    </p>
  )
}

export function BodyExtraSmall({ children, className }: TypographyProps) {
  return (
    <span
      className={cn(
        'body text-xs font-medium leading-4 text-secondary',
        className
      )}
    >
      {children}
    </span>
  )
}
