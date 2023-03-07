import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../base/Dialog'
import { Check, Minus } from '../assets/icons'
import { Stack } from '../base/Stack'
import { Button } from '../base/Button'

const ProposalVoteButton = () => {
  // todo pull in total vote count
  const availableVotes = 1
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='max-w-[327px]' size='lg'>
          Submit vote
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Voting</DialogTitle>
          <DialogDescription>
            Votes are permanent and you can&apos;t change votes after its submitted onchain. (will finalize).
          </DialogDescription>
        </DialogHeader>
        <Stack className='grid gap-4 py-6'>
          <Button className='items-center w-full'>
            <Check />
            {availableVotes} vote for
          </Button>
          <Button className='items-center w-full'>
            <Check />
            {availableVotes} vote against
          </Button>
          <Button className='items-center w-full'>
            <Minus />
            Abstain from voting
          </Button>
        </Stack>
        <Stack>
          <textarea placeholder='Comment(optional)' className='w-full min-h-[167px] text-black'></textarea>
        </Stack>
        <DialogFooter>
          <Button type='submit' className='w-full'>
            Save vote
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProposalVoteButton
