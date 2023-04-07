import { cn } from "@/utils/cn"

export function Divider({ className }: { className?: string }) {
  return <div className={cn("w-full h-[1px] my-10", className)} />
}
