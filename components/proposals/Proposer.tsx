import React from 'react'

import { ArrowUpRight } from '@/components/assets/icons'
import { Hex } from 'viem'
import { cn } from 'utils/cn'
import { shortenAddress } from 'utils/shortenAddress'
import { useEnsName } from 'wagmi'

type ProposerProps = {
  proposer: Hex | undefined
  className?: string
  showExternalLink?: boolean
  externalLink?: string
}

export function Proposer({ proposer, className, externalLink }: ProposerProps) {
  const { data: ensName } = useEnsName({
    address: proposer,
  })

  const proposerPretty = React.useMemo(
    () => (ensName ? ensName : shortenAddress(proposer)),
    [ensName, proposer]
  )

  return (
    <>
      {!!externalLink ? (
        <a
          className={cn(
            'inline-flex items-center justify-center gap-1 text-primary/50 underline',
            className
          )}
        >
          {proposerPretty} <ArrowUpRight className="text-primary/50" />
        </a>
      ) : (
        proposerPretty
      )}
    </>
  )
}
