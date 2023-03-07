import { useDrawer } from './useDrawer';
import { motion, AnimatePresence } from 'framer-motion';

export function DrawerOverlay({ drawerName }: { drawerName: string }) {
  const { drawerType } = useDrawer();

  return (
    <AnimatePresence>
      {drawerName === drawerType && (
        <motion.div
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1000,
          }}
        />
      )}
    </AnimatePresence>
  );
}
