import type { ImageProps } from 'next/image'
import NextImage from 'next/image'
import React from 'react'
import { cn } from 'utils/cn'

export const BlurImage = (props: ImageProps) => {
  const [isLoading, setLoading] = React.useState(true)

  return (
    <div
      className={cn(
        'relative flex justify-center overflow-hidden rounded-object',
        'bg-white/2 border border-primary',
        "after:pointer-events-none after:absolute after:inset-0 after:z-10 after:content-['']",
        isLoading ? 'animate-pulse' : ''
      )}
    >
      <NextImage
        priority
        {...props}
        className={cn(
          'duration-700 ease-in-out',
          isLoading
            ? 'scale-[1.02] blur-xl grayscale'
            : 'scale-100 blur-0 grayscale-0'
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  )
}
