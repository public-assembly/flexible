import { ArrowUp } from '@/components/assets/icons'
import Button from '@/components/base/Button'
import { Flex } from '@/components/base/Flex'
import { Stack } from '@/components/base/Stack'
import { Seo } from '@/components/Seo'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'

function Home() {
  return (
    <section id='index' className='h-full'>
      <Seo />
      <Stack className='px-4 pt-24'>
        <Flex className='justify-center w-full'>
          <Stack className='w-[690px] h-[690px] rounded-object border border-primary bg-default-auction bg-cover p-4'>
            <Flex className='gap-4'>
              <Button variant='tertiary' size='icon' className='w-fit'>
                <ArrowLeftIcon />
              </Button>
              <Button variant='tertiary' className='w-fit'>
                <ArrowRightIcon />
              </Button>
            </Flex>
          </Stack>
        </Flex>
        <Button variant='tertiary' prefix={<ArrowLeftIcon className='mr-2' />} className='max-w-[133px] uppercase'>
          Auction
        </Button>
        <Button variant='tertiary' prefix={<ArrowUp className='mr-2' />} className='max-w-[133px] uppercase'>
          Auction
        </Button>
      </Stack>
    </section>
  )
}

export default Home
