import { useCallback } from 'react';
import { useDrawer } from './useDrawer';
import { DrawerPortal } from './DrawerPortal';
import { DrawerOverlay } from './DrawerOverlay';
import { DrawerCompositionProps } from './drawerTypes';
import { motion, AnimatePresence } from 'framer-motion';

export function DrawerComposition({
  drawerName,
  content,
  trigger,
  closeTrigger,
  drawerWidth = '420px',
  bgColor = '#FFFFFF',
  ...props
}: DrawerCompositionProps) {
  const { drawerType, requestClose, requestOpen } = useDrawer();

  const drawerHandler = useCallback(() => {
    requestOpen(drawerName);
  }, []);

  return (
    <>
      <div {...props}>
        <button onClick={drawerHandler}>
          {trigger ? trigger : `Open ${drawerName}`}
        </button>
      </div>
      <DrawerPortal>
        <AnimatePresence>
          {drawerType === drawerName && (
            <>
              <motion.div
                id={`drawer-${drawerName}`}
                transition={{ duration: 0.25 }}
                initial={{ transform: `translateX(-${drawerWidth})` }}
                animate={{ transform: `translateX(0px)` }}
                exit={{ transform: `translateX(-${drawerWidth})` }}
                style={{
                  maxWidth: drawerWidth,
                  backgroundColor: bgColor,
                  zIndex: 3000,
                  width: '100%',
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  boxShadow: '0 0 25px rgba(0,0,0,.125)',
                  height: '100vh',
                  overflowY: 'scroll',
                }}
              >
                <div className='flex justify-between items-center p-6 '>
                  <div>
                    <span className='text-2xl cursor-default'>Edit theme</span>
                  </div>
                  <button onClick={requestClose}>
                    {closeTrigger ? closeTrigger : `Close`}
                  </button>
                </div>
                <div className='w-100 h-100'>{content}</div>
              </motion.div>
              <DrawerOverlay drawerName={drawerName} />
            </>
          )}
        </AnimatePresence>
      </DrawerPortal>
    </>
  );
}
