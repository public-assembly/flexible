import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Icons
import { ArrowLeft, ArrowRight, ArrowUp } from '@/components/assets/icons'

// Components
import Button from '@/components/base/Button'
import { Flex } from '@/components/base/Flex'
import { Stack } from '@/components/base/Stack'
import { Seo } from '@/components/Seo'

// Hooks
import { useIsMobile } from '@/hooks/useIsMobile'
import { useAuction } from '@/hooks/useAuction'

// Utils
import { ENV } from 'utils/env'
import { cn } from 'utils/cn'

import { BlurImage } from '@/components/BlurImage'
import { TokenWinningBid } from '@/components/auction/TokenWinningBid'

const Auction = () => {
  const { isMobile } = useIsMobile()
  const { totalSupply, incrementId, decrementId, tokenId, isFirstToken, isLastToken, thumbnail, tokenName } =
    useAuction()

  if (!totalSupply) return null
  return (
    <Stack className='h-full gap-4 px-4 pt-20 '>
      <Flex className='relative justify-center w-full'>
        <Stack className='relative justify-between max-h-[690px]  max-w-[690px] w-full h-full p-4 bg-cover border aspect-square rounded-object border-primary bg-default-auction'>
          <div className='absolute inset-0 z-0 w-full aspect-square rounded-object'>
            {thumbnail && <BlurImage src={thumbnail} height={690} width={690} alt={`${tokenId}`} />}
          </div>

          {/* Explorer buttons */}
          <Flex className='gap-4'>
            <Button
              variant='tertiary'
              onClick={decrementId}
              className={cn('w-fit z-10', isFirstToken && 'pointer-events-none opacity-20')}
            >
              <ArrowLeft />
            </Button>
            <Button
              variant='tertiary'
              onClick={incrementId}
              className={cn('w-fit z-10', isLastToken && 'pointer-events-none opacity-20')}
            >
              <ArrowRight />
            </Button>
          </Flex>
          {isMobile ? null : (
            <Flex className='justify-between'>
              <div className='z-10 px-4 py-2 bg-primary text-secondary rounded-object'>
                <span>{tokenName}</span>
              </div>
              <TokenWinningBid tokenAddress={ENV.TOKEN_ADDRESS} tokenId={tokenId} />
            </Flex>
          )}
        </Stack>

        {/* Desktop/Tablet Auction button */}
        {isMobile ? null : (
          <Button variant='tertiary' className='max-w-[133px] uppercase absolute  right-0 top-10'>
            <ArrowLeft className='mr-2' />
            Auction
          </Button>
        )}
      </Flex>

      {/* Mobile auction button */}
      {isMobile ? (
        <Stack className='justify-between flex-grow w-full h-full'>
          <Stack className='gap-2'>
            <motion.div className='px-4 py-2 bg-primary text-secondary rounded-object w-fit'>{tokenName}</motion.div>
            <TokenWinningBid tokenAddress={ENV.TOKEN_ADDRESS} tokenId={tokenId} />
          </Stack>
          <Button variant='tertiary' className='max-w-[133px] uppercase absolute bottom-4 left-4'>
            <ArrowUp className='mr-2' />
            Auction
          </Button>
        </Stack>
      ) : null}
    </Stack>
  )
}

export default Auction
