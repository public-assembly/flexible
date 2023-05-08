import { cn } from '@/utils/cn'

export function Divider({ className }: { className?: string }) {
  return <div className={cn('my-10 h-[1px] w-full', className)} />
}
