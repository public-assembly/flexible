import { useCallback, useState } from 'react'

export function useTokenExplorer({ auctionState }: { auctionState: any }) {
  const [navigatedTokenId, setNavigatedTokenId] = useState<number>(
    Number(auctionState.tokenId)
  )

  const incrementId = useCallback(() => {
    if (navigatedTokenId < auctionState.tokenId) {
      setNavigatedTokenId(navigatedTokenId + 1)
    }
  }, [navigatedTokenId])

  const decrementId = useCallback(() => {
    if (navigatedTokenId > 0) {
      setNavigatedTokenId(navigatedTokenId - 1)
    }
  }, [navigatedTokenId])

  const isFirstToken = navigatedTokenId === 0
  const isLastToken = navigatedTokenId === Number(auctionState.tokenId)

  return {
    navigatedTokenId,
    setNavigatedTokenId,
    incrementId,
    decrementId,
    isFirstToken,
    isLastToken,
  }
}
