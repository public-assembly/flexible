import React from "react"

import { cn } from "utils/cn"
import { shortenAddress } from "utils/shortenAddress"
import { useEnsName } from "wagmi"

import { Hash } from "types"
import { ArrowUpRight } from "@/components/assets/icons"

type ProposerProps = {
  proposer: Hash | undefined
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
            "inline-flex items-center justify-center gap-1 underline text-primary/50",
            className
          )}
        >
          {proposerPretty} <ArrowUpRight className="text-primary/50" />
        </a>
      ) : (
        <span>{proposerPretty}</span>
      )}
    </>
  )
}
