import { Globe } from '@/components/assets/icons'
import ArrowUpRight from '@/components/assets/icons/ArrowUpRight'
import { Flex } from '@/components/base/Flex'
import IconButton from '@/components/base/IconButton'
import { Stack } from '@/components/base/Stack'
import { Body, H2Heading } from '@/components/base/Typography'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

export default function AboutPage() {
  return (
    <Stack className='gap-10 px-4 pt-10 lg:px-10'>
      <IconButton icon={<Globe />} tooltip='website' href={''} />
      <Body className='max-w-xl'>
        In contrast to the physical world, only one degree of separation lies between everyone on the internet. This
        heightened connectivity allows for new models of coordination + creation that are native to the digital realm.
        Public Assembly will test the best practices for leveraging the unique physics of the internet to create what’s
        missing as fast as possible.
      </Body>
      <Flex className='gap-6'>
        <Card className='px-6 py-4'>
          <Stack>
            <H2Heading>36</H2Heading>
            <div className='text-black'>Owners</div>
          </Stack>
        </Card>
        <Card className='px-6 py-4'>
          <Stack>
            <H2Heading>58</H2Heading>
            <div className='text-black'>Total Supply</div>
          </Stack>
        </Card>
      </Flex>
      <Flex className='flex-wrap w-full gap-6 text-black'>
        <Card className='px-4 py-2'>Total auction sales Ξ 7.3556</Card>
        <Card className='px-4 py-2'>
          <Flex className='items-center gap-4'>
            Treasury balance Ξ 10.556 <ArrowUpRight />
          </Flex>
        </Card>
        <Card className='px-4 py-2'>Treasury balance in USD $ 16,365.62</Card>
      </Flex>
    </Stack>
  )
}

function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={clsx('bg-white rounded-md w-fit h-fit', className)}>{children}</div>
}
