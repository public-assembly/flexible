'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export function DrawerPortal({ children }: { children: ReactNode }) {
  const element = useRef(document.createElement('div'));

  useEffect(() => {
    const drawerRoot = document.querySelector('#drawer-root') as HTMLElement;
    drawerRoot!.appendChild(element.current);
    return () => void drawerRoot!.removeChild(element.current);
  }, []);

  return createPortal(children, element.current);
}
