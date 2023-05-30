import { useSWRConfig } from 'swr'
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
  const { mutate } = useSWRConfig()

  return (
    <Flex className="gap-4">
      <Button
        variant="tertiary"
        onClick={() => {
          decrementId()
          mutate('tokenChange')
        }}
        className={cn(
          'custom-shadow z-10 w-fit text-primary',
          isFirstToken && 'pointer-events-none opacity-20'
        )}
      >
        <ArrowLeft />
      </Button>
      <Button
        variant="tertiary"
        onClick={() => {
          incrementId()
          mutate('tokenChange')
        }}
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
