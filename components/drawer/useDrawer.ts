import { DrawerContext } from './DrawerProvider'
import { DrawerType, DrawerContextType } from './drawerTypes'
import { useCallback, useContext } from 'react'

export function useDrawer() {
  const [state, setState] = useContext<DrawerContextType>(DrawerContext)
  const { drawerType, drawerOptions = {} } = state

  const handleSetDrawerOptions = useCallback(
    (update: any) => {
      setState((prev) => ({ ...prev, options: { ...prev?.drawerOptions, ...update } }))
    },
    [setState]
  )

  const requestClose = useCallback(async () => {
    setState({ drawerType: undefined, drawerOptions: {} })
  }, [setState])

  const requestOpen = useCallback(
    async (nextDrawerType: DrawerType, options?: { [key: string]: any }) => {
      if (nextDrawerType === drawerType) {
        return
      }
      return setState({
        drawerType: nextDrawerType,
        ...(options && { drawerOptions: options }),
      })
    },
    [drawerType, setState]
  )

  const setDrawerType = useCallback(
    (drawerType: DrawerType) => setState({ drawerType }),
    [setState]
  )

  return {
    drawerType,
    setDrawerType,
    drawerOptions,
    setDrawerOptions: handleSetDrawerOptions,
    requestClose,
    requestOpen,
  }
}