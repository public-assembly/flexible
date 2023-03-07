import { DrawerComposition } from './drawer/DrawerComposition';
import { Palette } from './Palette';
import { SaveChanges } from './SaveChanges';
// import { ThemingButton } from './ThemingButton';

export function Drawer() {
  return (
    <DrawerComposition
      // trigger={<ThemingButton />}
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
