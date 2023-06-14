import { Pending } from '../assets/icons'
import Button from '../base/Button'

interface SettleButtonProps {
  settle?: () => void
  isLoading: boolean
  isSuccess: boolean
}

export function SettleButton({
  settle,
  isLoading,
  isSuccess,
}: SettleButtonProps) {
  return (
    <>
      {!isSuccess ? (
        <Button size="lg" disabled={isLoading} onClick={() => settle?.()}>
          {!isLoading ? 'Settle auction' : <Pending className="animate-spin" />}
        </Button>
      ) : (
        <Button size="lg" disabled={true}>
          Settled successfully
        </Button>
      )}
    </>
  )
}