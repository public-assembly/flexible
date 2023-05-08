import { Exit } from './assets/icons'
import { DrawerComposition } from './drawer/DrawerComposition'
import { Palette } from './Palette'

export function Drawer() {
  return (
    <DrawerComposition
      closeTrigger={<Exit className="h-8 w-8" />}
      content={
        <div className="flex flex-col justify-between pl-6 pr-4 pt-4">
          <Palette />
        </div>
      }
      drawerName={'palette'}
    ></DrawerComposition>
  )
}
