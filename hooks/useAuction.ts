/* eslint-disable react-hooks/exhaustive-deps */
import { useActiveAuction, useDaoToken } from "@public-assembly/dao-utils"
import { useCallback, useEffect, useState } from "react"
import { ENV } from "utils/env"

export const useAuction = () => {
  const { totalSupply, auctionData } = useActiveAuction(ENV.TOKEN_ADDRESS)

  const [tokenId, setTokenId] = useState(0)

  useEffect(() => {
    totalSupply && setTokenId(totalSupply - 1)
  }, [totalSupply])

  const incrementId = useCallback(() => {
    if (totalSupply && tokenId < totalSupply - 1) {
      setTokenId(tokenId + 1)
    }
  }, [setTokenId, tokenId])

  const decrementId = useCallback(() => {
    if (totalSupply && tokenId > 0) {
      setTokenId(tokenId - 1)
    }
  }, [setTokenId, tokenId])

  const isFirstToken = tokenId === 0
  // @ts-ignore
  const isLastToken = tokenId === totalSupply - 1

  const [thumbnail, setThumbnail] = useState<undefined | string>()
  const [name, setName] = useState<undefined | string>()

  const { tokenData } = useDaoToken({
    tokenAddress: ENV.TOKEN_ADDRESS,
    tokenId: tokenId.toString(),
  })

  useEffect(() => {
    const image = tokenData?.metadata?.image
    const name = tokenData?.metadata?.name
    if (image) {
      setThumbnail(image)
    }
    if (name) {
      setName(name)
    }
  }, [tokenData])

  return {
    auctionData,
    tokenId: tokenId.toString(),
    incrementId,
    decrementId,
    totalSupply,
    isFirstToken,
    isLastToken,
    thumbnail,
    tokenName: name,
  }
}
