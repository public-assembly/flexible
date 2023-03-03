import { cn } from 'utils/cn'

type RichTextProps = {
  className?: string
  html: string
}

/**
 * Component to apply Prose styling to rich text from the CMS or FAQ copy
 * @param props
 * @returns
 */

export function RichText(props: RichTextProps) {
  return (
    <div
      className={cn(props.className, 'prose')}
      dangerouslySetInnerHTML={{ __html: props.html }}
      tabIndex={0}
      aria-label={props.html}
    />
  )
}
