import React, { createContext, useState } from 'react';
import type {
  DrawerProviderProps,
  DrawerState,
  DrawerContextType,
} from './drawerTypes';

export const DrawerContext = createContext<DrawerContextType>([
  { drawerType: undefined },
  () => null,
] as DrawerContextType);

export const DrawerContextProvider = ({ children }: DrawerProviderProps) => {
  const [drawerState, setDrawerState] = useState<DrawerState>({
    drawerType: undefined,
  });

  return (
    <DrawerContext.Provider value={[drawerState, setDrawerState]}>
      <div id='drawer-root' className='fixed top-0 left-0 z-50' />
      {children}
    </DrawerContext.Provider>
  );
};
