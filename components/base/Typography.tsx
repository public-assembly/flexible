import { cn } from "utils/cn"

type TypographyProps = {
  children: React.ReactNode
  className?: string
}

export function H2Heading({ children, className }: TypographyProps) {
  return <h2 className="text-4xl font-medium text-black primary">{children}</h2>
}

export function H1Heading({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "text-2xl font-medium leading-10 tracking-[-0.5px] text-primary",
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
        "text-[1.5rem] font-medium leading-10 tracking-[-0.5px] text-primary",
        className
      )}
    >
      {children}
    </p>
  )
}

export function Caption({ children, className }: TypographyProps) {
  return <p className={cn("text-base text-primary caption", className)}>{children}</p>
}

export function BodyLarge({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        "text-[18px] leading-7 font-medium text-primary body",
        className
      )}
    >
      {children}
    </p>
  )
}

export function Body({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-base font-normal text-primary body", className)}>
      {children}
    </p>
  )
}

export function BodySmall({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-sm font-normal text-primary body", className)}>
      {children}
    </p>
  )
}

export function BodyExtraSmall({ children, className }: TypographyProps) {
  return (
    <span
      className={cn(
        "text-xs leading-4 font-medium text-secondary body",
        className
      )}
    >
      {children}
    </span>
  )
}
