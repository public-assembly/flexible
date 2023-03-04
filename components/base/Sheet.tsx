import * as React from "react"

import * as SheetPrimitive from "@radix-ui/react-dialog"
import { VariantProps, cva } from "cva"
import { cn } from "utils/cn"

import { Exit } from "@/components/assets/icons"
import Button from "@/components/base/Button"

const SHEET_Z_INDEX_STACK = [999, 1000, 1001] as const

const SheetPortal = SheetPrimitive.Portal

const SheetWindowBase = SheetPrimitive.Content
// interface SheetPortalProps extends SheetPrimitive.DialogPortalProps {}

// const SheetPortal = ({ className, children, ...props }: SheetPortalProps) => (
//   <SheetPrimitive.Portal
//     className={cn(className, "group radix-state-closed:animate-fakeFade ")}
//     {...props}
//   >
//     {children}
//   </SheetPrimitive.Portal>
// )
// SheetPortal.displayName = SheetPrimitive.Portal.displayName

/**
 * Primary Overlay rendered behind the Sheet Content responsible for blurring the background
 */
const BlurOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, children, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "overlay",
      "fixed inset-0 w-screen h-screen pointer-events-none",
      "z-sheet-0",
      "backdrop-blur-[24px] bg-black/60 filter",
      // Hide the overlay on wider breakpoints
      "md:hidden",
      "group-radix-state-closed:animate-fadeOut group-radix-state-open:animate-fadeIn",
      // "data-closed:animate-fadeOut data-open:animate-fadeIn",
      // "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-300 data-[state=closed]:animate-out data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut",
      className
    )}
    {...props}
    ref={ref}
  />
))
BlurOverlay.displayName = SheetPrimitive.Overlay.displayName

const positionOverlayVariants = cva("fixed inset-0 z-sheet-1 flex", {
  variants: {
    position: {
      top: "items-start",
      bottom: "items-end justify-end", // data-[state=open]:animate-longFadeInUp
      left: "justify-start",
      right: "justify-end ",
      // data-[state=open]:animate-slideInFromRight data-closed:animate-slideOutToRight
    },
  },
  defaultVariants: { position: "right" },
})

interface PositionOverlayProps
  extends SheetPrimitive.DialogOverlayProps,
    VariantProps<typeof positionOverlayVariants> {}

/**
 * Secondary Overlay, responsible for positioning the Sheet Window
 */

const PositionOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  PositionOverlayProps
>(({ className, children, position, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      positionOverlayVariants({ position }),
      "position-overlay",
      "z-sheet-2",
      "fixed inset-0",
      "w-screen h-screen",
      "pointer-events-none",
      "[&>*]:w-full [&>*}:h-full",
      "backdrop-blur-[24px] bg-black/60 filter",
      // Hide the overlay on wider breakpoints
      "md:hidden",
      "group-radix-state-closed:animate-fadeOut group-radix-state-open:animate-fadeIn",
      // This prevents the PositionOverlay from being unmounted until after this animation has completed
      // The animation does nothing, but is necessary to allow the animations on the Sheet Window to complete
      "radix-state-closed:animate-fakeFade group-radix-state-closed:animate-fakeFade",
      // "data-closed:animate-fadeOut data-open:animate-fadeIn",
      // "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-300 data-[state=closed]:animate-out data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut",
      className
    )}
    {...props}
    ref={ref}
  />
))
PositionOverlay.displayName = "PositionOverlay"

export const sheetWindowBaseVariants = cva(
  [
    "fixed z-50 scale-100 gap-4 bg-white p-6 opacity-100 dark:bg-slate-900 group",
    // "data-[state=open]:sm:animate-fadeInDown",
    "grid w-full rounded-t-lg bg-secondary p-6 sm:max-w-lg sm:rounded-lg sm:zoom-in-90 data-[state=open]:sm:animate-fadeInDown",
  ],

  {
    variants: {
      position: {
        top: "animate-in slide-in-from-top w-full duration-300",
        bottom:
          "animate-in slide-in-from-bottom w-full data-[state=open]:animate-longFadeInUp data-[state=open]:delay-500 data-[state=closed]:animate-longFadeInDown ",
        left: "animate-in slide-in-from-left h-full duration-300",
        right: "animate-in slide-in-from-right h-full duration-300",
      },
      height: {
        content: "h-auto",
        default: "h-1/3",
      },
      size: {
        content: "",
        default: "",
        sm: "",
        lg: "",
        xl: "",
        full: "",
      },
    },
    compoundVariants: [
      {
        position: ["top", "bottom"],
        size: "content",
        class: "max-h-screen",
      },
      {
        position: ["top", "bottom"],
        size: "default",
        class: "h-1/3",
      },
      {
        position: ["top", "bottom"],
        size: "sm",
        class: "h-1/4",
      },
      {
        position: ["top", "bottom"],
        size: "lg",
        class: "h-1/2",
      },
      {
        position: ["top", "bottom"],
        size: "xl",
        class: "h-5/6",
      },
      {
        position: ["top", "bottom"],
        size: "full",
        class: "h-screen",
      },
      {
        position: ["right", "left"],
        size: "content",
        class: "max-w-screen",
      },
      {
        position: ["right", "left"],
        size: "default",
        class: "w-1/3",
      },
      {
        position: ["right", "left"],
        size: "sm",
        class: "w-1/4",
      },
      {
        position: ["right", "left"],
        size: "lg",
        class: "w-1/2",
      },
      {
        position: ["right", "left"],
        size: "xl",
        class: "w-5/6",
      },
      {
        position: ["right", "left"],
        size: "full",
        class: "w-screen",
      },
    ],
    defaultVariants: {
      position: "right",
      size: "default",
      height: "default",
    },
  }
)

type SheetWindowBaseProps = VariantProps<typeof sheetWindowBaseVariants>
type BaseContentProps = SheetPrimitive.DialogContentProps & {
  children: React.ReactNode
  position?: SheetWindowBaseProps["position"]
  size?: SheetWindowBaseProps["size"]
  height?: SheetWindowBaseProps["height"]
}

export type ContentProps = BaseContentProps &
  Partial<UnmountListenerProps> &
  SheetWindowBaseProps

const SheetWindow = React.forwardRef(function SheetWindow(
  props: ContentProps,
  ref: React.Ref<HTMLDivElement>
) {
  const {
    children,
    position = "right",
    size = "default",
    height,
    ...contentProps
  } = props

  return (
    <SheetWindowBase
      {...contentProps}
      position={position}
      size={size}
      ref={ref}
    >
      {children}
    </SheetWindowBase>
  )
})

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  ContentProps
>(({ position, size, className, children, ...props }, ref) => (
  <SheetPrimitive.Portal>
    <BlurOverlay />
    <PositionOverlay position={position}>
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetWindowBaseVariants({ position, size }), className)}
        {...props}
      >
        <SheetPrimitive.Close asChild className={cn("mb-10")}>
          <Button
            variant="tertiary"
            className="max-w-[133px] uppercase gap-2 shadow-surface-elevation-medium"
          >
            <Exit />
            Hide
            <span className="sr-only">Close</span>
          </Button>
        </SheetPrimitive.Close>
        {children}
      </SheetPrimitive.Content>
    </PositionOverlay>
  </SheetPrimitive.Portal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 sm:text-left", className)}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(
      // "text-lg font-semibold text-slate-900",
      // "dark:text-slate-50",
      className
    )}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-slate-500", "dark:text-slate-400", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

type UnmountListenerProps = {
  onUnmount: () => void
}

/**
 * Works around a bug in Radix where onAnimationEnd is not called when the modal is closed.
 *
 * @see https://github.com/radix-ui/primitives/issues/1020
 */
function UnmountListener(props: UnmountListenerProps) {
  React.useEffect(() => {
    return () => {
      props.onUnmount()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

/**
 * This is a convenience wrapper to give most modals less boilerplate.
 * It encapsulates the Potal, Overlay, and Window components.
 */
function SheetWindowComposition(props: ContentProps) {
  return (
    <SheetPortal>
      <BlurOverlay />
      <PositionOverlay>
        <SheetWindow {...props} />
        {props.onUnmount && <UnmountListener onUnmount={props.onUnmount} />}
      </PositionOverlay>
    </SheetPortal>
  )
}

// // Utils
const onTouchEnd = (_ev: TouchEvent) => {
  if (typeof document !== "undefined") {
    document.body.style.pointerEvents = ""
  }
}

// Default props
SheetWindowComposition.defaultProps = {
  onTouchEnd: (ev) => ev.stopPropagation(),
}
// BlurOverlay.defaultProps = {
//   onTouchEnd,
// }
// SheetPrimitive.Close.defaultProps = {
//   onTouchEnd,
// }

const Sheet = {
  /** All Sheet sub-components must be wrapped by this */
  Root: SheetPrimitive.Root,
  // Use this to open a Sheet
  Trigger: SheetPrimitive.Trigger,
  SheetContent,
  // Most sheets should use this to configure the Sheet Window
  Content: SheetWindowComposition,
  // UI components to use inside the Sheet Body
  Title: SheetTitle,
  Header: SheetHeader,
  Footer: SheetFooter,
  Description: SheetDescription,
  SheetTitle,
  SheetHeader,
  SheetFooter,
  SheetDescription,

  Close: SheetPrimitive.Close,

  // If you need more control, use these lower-level components:
  BlurOverlay,
  Portal: SheetPrimitive.Portal,
  PositionOverlay,
  Window: SheetWindow,
}

export default Sheet
