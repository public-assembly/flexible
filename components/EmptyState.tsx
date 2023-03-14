import { Headline } from "./base/Typography"

type EmptyState = {
  actions?: React.ReactNode
  heading: string
  subheading?: string
}

export default function EmptyState(props: EmptyState) {
  const { actions, heading, subheading } = props
  return (
    <div className="flex flex-col items-center h-full py-8">
      <Headline className="mb-8 headline">{heading}</Headline>
      {subheading && <p className="mb-4 text-md text-black/60">{subheading}</p>}
      {actions && <div className="flex justify-center gap-2">{actions}</div>}
    </div>
  )
}
