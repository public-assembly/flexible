'use client'

import { useAuctionState } from '@public-assembly/builder-utils'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()
  const { auctionState } = useAuctionState()

  useEffect(() => router.push(`/${auctionState.tokenId}`), [])

  return
}
