'use client' // Error components must be Client Components

import { useAuctionState } from '@public-assembly/builder-utils'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const router = useRouter()
  const { auctionState } = useAuctionState()

  useEffect(() => router.push(`/${auctionState.tokenId}`), [])

  return
}
