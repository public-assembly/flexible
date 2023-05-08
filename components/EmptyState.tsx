import { Headline } from './base/Typography'

type EmptyState = {
  actions?: React.ReactNode
  heading: string
  subheading?: string
}

export default function EmptyState(props: EmptyState) {
  const { actions, heading, subheading } = props
  return (
    <div className="flex h-full flex-col items-center py-8">
      <Headline className="headline mb-8">{heading}</Headline>
      {subheading && <p className="text-md mb-4 text-black/60">{subheading}</p>}
      {actions && <div className="flex justify-center gap-2">{actions}</div>}
    </div>
  )
}
