import { useCallback, useEffect, useState } from 'react'

interface CopyText {
  handleCopy: (text: string) => void
  hasCopied: boolean
}

export default function useCopyText(): CopyText {
  const [notificationKey, setNotificationKey] = useState<number | null>(null)
  const [hasCopied, setHasCopied] = useState<boolean>(false)

  const handleCopy = useCallback(
    (text: string) => {
      setHasCopied(true)
      setNotificationKey(Date.now())
      navigator.clipboard.writeText(text)
    },
    [setHasCopied, setNotificationKey]
  )

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 3000)
  }, [notificationKey])

  return { handleCopy, hasCopied }
}
