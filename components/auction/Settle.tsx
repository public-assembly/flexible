import { useSettle } from '@public-assembly/builder-utils'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Pending } from '../assets/icons'
import Button from '../base/Button'

export function Settle() {
  const { settle, settleSuccess, settleLoading } = useSettle()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (settleSuccess) {
      router.push(`/${parseInt(pathname.substring(1)) + 1}`)
    }
  }, [settleSuccess])

  return (
    <>
      {!settleSuccess ? (
        <Button size="lg" disabled={settleLoading} onClick={() => settle?.()}>
          {!settleLoading ? (
            'Settle auction'
          ) : (
            <Pending className="animate-spin" />
          )}
        </Button>
      ) : (
        <Button size="lg" disabled={true}>
          Settled successfully
        </Button>
      )}
    </>
  )
}
