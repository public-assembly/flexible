'use client'

import { Header } from '@/components/Header'
import Auction from '@/components/auction/Auction'

export default function HomePage() {
  const tokenId = 21
  return (
    <>
      <Header />
      <Auction tokenId={tokenId} />
    </>
  )
}
