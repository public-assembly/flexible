import parseBase64String from '@/utils/parseBase64String'
import { tokenAbi, useTokenContext } from '@public-assembly/dao-utils'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'

type TokenMetadata = {
  description: string
  image: string
  name: string
  properties: string
}

export function useTokenMetadata({ tokenId }: { tokenId: number }) {
  const [json, setJson] = useState<TokenMetadata>()

  const { tokenAddress } = useTokenContext()

  const { data: tokenUri } = useContractRead({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'tokenURI',
    args: [BigNumber.from(tokenId)],
  })

  useEffect(() => {
    if (tokenUri) {
      setJson(parseBase64String(tokenUri))
    }
  }, [tokenId])

  return {
    tokenDescription: json?.description,
    tokenThumbnail: json?.image,
    tokenName: json?.name,
    tokenProperties: json?.properties,
  }
}
