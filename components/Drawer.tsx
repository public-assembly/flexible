import { DrawerComposition } from './drawer/DrawerComposition';
import { Palette } from './Palette';
import { SaveChanges } from './SaveChanges';
import { useDrawer } from './drawer/useDrawer';

export function Drawer() {
  // const { requestOpen } = useDrawer()
  return (
    <DrawerComposition
      // trigger={requestOpen}
      closeTrigger={
        <button>
          <span className='text-sm text-[#ACB1B9]'>Close</span>
        </button>
      }
      content={
        <div className='flex flex-col justify-between px-6 pt-2'>
          <Palette />
          <SaveChanges />
        </div>
      }
      drawerName={'palette'}
    ></DrawerComposition>
  );
}
