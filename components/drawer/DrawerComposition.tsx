import { useDrawer } from "./useDrawer"
import { DrawerPortal } from "./DrawerPortal"
import { DrawerOverlay } from "./DrawerOverlay"
import { DrawerCompositionProps } from "./drawerTypes"
import { motion, AnimatePresence } from "framer-motion"
import { Headline } from "../base/Typography"
import { Save } from "../Save"

export function DrawerComposition({
  drawerName,
  content,
  trigger,
  closeTrigger,
  drawerWidth = "500px",
  bgColor = "#FFF",
  ...props
}: DrawerCompositionProps) {
  const { drawerType, requestClose } = useDrawer()

  return (
    <>
      <div {...props}></div>
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
                  width: "100%",
                  position: "fixed",
                  top: 0,
                  left: 0,
                  boxShadow: "0 0 25px rgba(0,0,0,.125)",
                  height: "100vh",
                  overflowY: "scroll",
                }}
              >
                <div className="flex items-center justify-between p-6">
                  <span className="text-[1.5rem] font-medium leading-10 tracking-[-0.5px] text-[#121212] font-satoshi">
                    Theme Editor
                  </span>
                  <button onClick={requestClose}>
                    {closeTrigger ? closeTrigger : `Close`}
                  </button>
                </div>
                <div className="w-100 h-100">{content}</div>
                <div className="sticky bottom-0">
                  <Save />
                </div>
              </motion.div>
              <DrawerOverlay drawerName={drawerName} />
            </>
          )}
        </AnimatePresence>
      </DrawerPortal>
    </>
  )
}
