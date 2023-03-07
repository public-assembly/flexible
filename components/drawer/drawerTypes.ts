import { Dispatch, SetStateAction, ReactNode } from 'react';

export type DrawerProviderProps = {
  children?: ReactNode;
};

export type DrawerType = string | undefined;

export type DrawerState = {
  drawerType?: DrawerType;
  drawerOptions?: Record<any, any>;
};

export type DrawerContextType = [
  DrawerState,
  Dispatch<SetStateAction<DrawerState>>
];

export interface DrawerCompositionProps {
  // Unique identifier for the drawer
  drawerName: string;
  // Content housed inside of the drawer
  content: JSX.Element;
  // Unstyled button element to open the drawer
  trigger?: any
  // Unstyled button element to close the drawer
  closeTrigger?: JSX.Element;
  // Max width of the drawer window
  drawerWidth?: string;
  // Background color of the drawer window
  bgColor?: string;
}
