import { shortenAddress } from "./shortenAddress"
import { useEnsName } from "wagmi"
import { useMemo } from "react"
import { Hash } from "types"

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
