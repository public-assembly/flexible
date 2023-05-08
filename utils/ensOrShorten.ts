import { useMemo } from 'react'
import { Hash } from 'types'
import { useEnsName } from 'wagmi'
import { shortenAddress } from './shortenAddress'

export function ensOrShorten(addressToResolve: Hash) {
  const { data: ensName } = useEnsName({
    address: addressToResolve,
  })

  const resolvedAddress = useMemo(
    () => (ensName ? ensName : shortenAddress(addressToResolve)),
    [ensName, addressToResolve]
  )

  return resolvedAddress
}
