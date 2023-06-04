import { useState } from 'react'
import { CheckCircle } from '../assets/icons'
import { Dialog, DialogContent, DialogFooter } from '../base/Dialog'
import { Separator } from '../base/Separator'
import { Stack } from '../base/Stack'
import { Body, BodyLarge, Headline } from '../base/Typography'

const VotingSuccess = ({ reason }: { reason: string | undefined }) => {
  const [open, setOpen] = useState(true)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="gap-y-6 border border-primary sm:max-w-[425px]">
        <Stack className="items-center gap-y-1 py-12">
          <CheckCircle className="h-16 w-16 text-highlight" />
          <Headline>Voting successful</Headline>
        </Stack>
        {reason ? (
          <>
            <Separator className="bg-black" />
            <DialogFooter>
              <Stack className="gap-y-2 pt-8">
                <BodyLarge>Reason for vote</BodyLarge>
                <Body className="min-h-[96px] w-full rounded bg-tertiary/50 py-2 px-3 text-black">
                  {reason}
                </Body>
              </Stack>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

export default VotingSuccess
