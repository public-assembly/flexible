import { DrawerComposition } from "./drawer/DrawerComposition"
import { Palette } from "./Palette"
import { Save } from "./Save"
import { Exit } from "./assets/icons"

export function Drawer() {
  return (
    <DrawerComposition
      closeTrigger={<Exit />}
      content={
        <div className="flex flex-col justify-between pl-6 pr-4 pt-4">
          <Palette />
        </div>
      }
      drawerName={"palette"}
    ></DrawerComposition>
  )
}
