import { ArrowUp } from '@/components/assets/icons'
import Button from '@/components/base/Button'
import { Flex } from '@/components/base/Flex'
import { Stack } from '@/components/base/Stack'
import { Seo } from '@/components/Seo'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { useIsMobile } from '../hooks/useIsMobile'

function Home() {
  const { isMobile } = useIsMobile()
  return (
    <section id='index' className='h-full'>
      <Seo />
      <Stack className='px-4 pt-24 '>
        <Flex className='relative justify-center w-full'>
          <Stack className='w-[690px] h-[690px] rounded-object border border-primary bg-default-auction bg-cover p-4'>
            <Flex className='gap-4'>
              <Button variant='tertiary' className='w-fit'>
                <ArrowLeftIcon />
              </Button>
              <Button variant='tertiary' className='w-fit'>
                <ArrowRightIcon />
              </Button>
            </Flex>
          </Stack>
          {isMobile ? null : (
            <Button variant='tertiary' className='max-w-[133px] uppercase absolute right-0 top-10'>
              <ArrowLeftIcon className='mr-2' />
              Auction
            </Button>
          )}
        </Flex>

        {/* Mobile auction button */}
        {isMobile ? (
          <Button variant='tertiary' className='max-w-[133px] uppercase'>
            <ArrowUp className='mr-2' />
            Auction
          </Button>
        ) : null}
      </Stack>
    </section>
  )
}

export default Home
