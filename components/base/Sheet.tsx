"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { VariantProps, cva } from "cva"
import { cn } from "utils/cn"

import { Exit } from "@/components/assets/icons"
import Button from "@/components/base/Button"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const portalVariants = cva("fixed inset-0 z-sheet-0 flex group", {
  variants: {
    position: {
      top: "items-start",
      bottom: "items-end",
      left: "justify-start",
      right: "justify-end",
    },
  },
  defaultVariants: { position: "right" },
})

interface SheetPortalProps
  extends SheetPrimitive.DialogPortalProps,
    VariantProps<typeof portalVariants> {}

const SheetPortal = ({
  position,
  className,
  children,
  ...props
}: SheetPortalProps) => (
  <SheetPrimitive.Portal className={cn(className)} {...props}>
    <div className={portalVariants({ position })}>{children}</div>
  </SheetPrimitive.Portal>
)
SheetPortal.displayName = SheetPrimitive.Portal.displayName

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, children, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      [
        "overlay",
        "fixed inset-0 pointer-events-none",
        "-z-sheet-1",
        "md:hidden",
        "backdrop-blur-[24px] bg-black/60 filter",
        "group-radix-state-closed:animate-fadeOut group-radix-state-open:animate-fadeIn",
        "data-closed:animate-fadeOut data-open:animate-fadeIn",
      ],
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-sheet-1 scale-100 gap-4 bg-secondary p-6 opacity-100 border-primary shadow-elevation-small border",
  {
    variants: {
      position: {
        top: [
          "animate-in slide-in-from-top w-full duration-300",
          "rounded-bl-object rounded-br-object",
        ],
        bottom: [
          "rounded-tl-object rounded-tr-object",
          "data-[state=open]:animate-longFadeInUp data-[state=open]:delay-500  data-[state=closed]:animate-longFadeInDown w-full",
        ],
        left: [
          "animate-in slide-in-from-left h-full duration-300",
          "rounded-tr-object rounded-br-object",
        ],
        right: [
          "rounded-tl-object rounded-bl-object",
          "animate-in data-[state=open]:animate-slideInFromRight data-[state=open]:delay-500 data-[state=closed]:animate-slideOutToRight h-full duration-300",
        ],
      },
      size: {
        content: "",
        default: "",
        sm: "",
        lg: "",
        xl: "",
        full: "",
        auction: "",
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
      {
        position: ["right", "left"],
        size: "auction",
        class: "h-[709px] top-[15%]",
      },
    ],
    defaultVariants: {
      position: "right",
      size: "default",
    },
  }
)

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  DialogContentProps
>(({ position, size, className, children, ...props }, ref) => (
  <SheetPortal position={position} forceMount>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ position, size }), className)}
      {...props}
      /**
       * Allows events to be called outside the bounds of the component
       * Should be used in conjunction with modal={false} on the Root component
       * onInteractOutside={(e) => e.preventDefault()}
       */
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
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-4", className)} {...props} />
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
  <SheetPrimitive.Title ref={ref} className={cn(className)} {...props} />
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

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
