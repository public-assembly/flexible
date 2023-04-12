import { cn } from "utils/cn"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

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
    <ReactMarkdown
      className={cn(props.className, "prose body text-primary")}
      aria-label={props.html}
      rehypePlugins={[rehypeRaw]}
    >
      {props.html}
    </ReactMarkdown>
  )
}
