import { useSettle } from '@public-assembly/builder-utils'
import { Pending } from '../assets/icons'
import Button from '../base/Button'

export function Settle() {
  const { settle, settleSuccess, settleLoading } = useSettle()

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
