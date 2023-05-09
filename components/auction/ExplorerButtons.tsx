import { cn } from 'utils/cn'
import { ArrowLeft, ArrowRight } from '../assets/icons'
import { Button, Flex } from '../base'

type ExplorerButtonProps = {
  incrementId: any
  decrementId: any
  isFirstToken: boolean
  isLastToken: boolean
}

export function ExplorerButtons({
  incrementId,
  decrementId,
  isFirstToken,
  isLastToken,
}: ExplorerButtonProps) {
  return (
    <Flex className="gap-4">
      <Button
        variant="tertiary"
        onClick={decrementId}
        className={cn(
          'custom-shadow z-10 w-fit text-primary',
          isFirstToken && 'pointer-events-none opacity-20'
        )}
      >
        <ArrowLeft />
      </Button>
      <Button
        variant="tertiary"
        onClick={incrementId}
        className={cn(
          'custom-shadow z-10 w-fit text-primary',
          isLastToken && 'pointer-events-none opacity-20'
        )}
      >
        <ArrowRight />
      </Button>
    </Flex>
  )
}
