import { cva, type VariantProps } from 'cva'
import React, { forwardRef } from 'react'

const buttonVariants = cva(
  // default styles
  [
    'font-semibold',
    'inline-flex',
    'justify-center',
    'transition-colors',
    'transition-transform',
    'duration-200',
    // 'text-black',
    'dark:text-white',
    'border',
    'font-medium',
    'border-primary',
    'pointer-cursor',
    'will-change-transform',
    'justify-center',
    'items-center',
    'decoration-none',
    'text-center',
    // 'hover:scale-105',
    'active:scale-95',
  ],
  // variant styles
  {
    variants: {
      intent: {
        primary: [
          'bg-highlight text-primary',
          'hover:bg-highlight/50',
          '-translate-y-[1px]',
          'transform-gpu',
          'shadow-none',
          'hover:shadow-surface-elevation-high',
          'active:translate-y-[2px]',
          'active:shadow-none',
          // 'focus:outline-[4px solid black/30]',
          // 'focus:border-highlight',
          // 'active:bg-black/90',
          'active:bg-highlight',
          'disabled:',
          'disabled:text-black/50',
          'disabled:transform-none',
          'disabled:active:bg-highlight/50',
        ],
        secondary: ['bg-secondary', 'hover:bg-secondary/50'],
        danger: ['bg-red-300', 'hover:bg-red-500'],
        ghost: [
          'bg-transparent',
          'border-transparent',
          'hover:bg-black/10',
          'hover:text-gray-900',
          'hover:scale-102',
          'active:scale-95',
        ],
        transparent: [
          'bg-transparent',
          'text-blackA12',
          'border-transparent',
          'hover:bg-blackA3',
          'hover:text-gray-900',
          'dark:text-whiteA12',
          'dark:hover:bg-whiteA3',
        ],
        outline: [
          'bg-white',
          'shadow-surface-elevation-low',
          'text-black',
          'hover:border-black',
          'hover:shadow-surface-elevation-high',
          '',
        ],
      },

      disabled: {
        true: ['pointer-events-none', 'opacity-20', 'cursor-not-allowed', 'shadow-none', 'hover:shadow-none'],
      },
      size: {
        small: ['text-sm', 'py-1', 'px-2'],
        medium: ['text-base', 'py-2', 'px-4'],
        large: ['text-lg', 'py-3', 'px-6'],
        icon: ['py-1', 'px-1'],
      },
      shape: {
        circle: 'rounded-full',
        rounded: 'rounded-[4px]',
        pill: 'rounded-full',
      },
      // variant booleans that if true will add the variant name to the class list
      loading: {
        true: 'animate-pulse',
      },
      fullWidth: {
        true: 'w-full',
      },
      navbar: {
        true: '',
      },
    },
    // you can add classnames to the default styles
    compoundVariants: [
      { intent: 'primary', size: 'medium', shape: 'circle' },
      { intent: 'ghost', shape: 'circle', size: 'icon', class: 'iconButton' },
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
      shape: 'rounded',
      // threeD: true,
    },
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants
// type ButtonProps = ComponentProps<typeof Button>
export type ButtonVariants = VariantProps<typeof buttonVariants>

const Button: React.FC<ButtonProps> = forwardRef(function Button(
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement> | undefined
) {
  const { children, intent, size, fullWidth, loading, shape, disabled, className, ...rest } = props

  return (
    <button
      className={buttonVariants({
        intent,
        size,
        loading,
        fullWidth,
        disabled,
        shape,
        class: className,
      })}
      {...rest}
      ref={ref}
    >
      {children}
    </button>
  )
})

// Button.displayName = 'Button'

export { Button, buttonVariants }

// `const Button = styled('button', {
//   paddingY: 0,
//   cursor: 'pointer',
//   appearance: 'none',

//   borderRadius: '$2',
//   boxSizing: 'border-box',
//   border: '1px solid transparent',
//   backgroundColor: 'transparent',

//   willChange: 'transform',
//   transition:
//     'background-color $1 $ease, border $1 $ease, box-shadow $1 $ease, color $1 $ease, outline $1 $ease, transform $1 $ease',

//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',

//   fontFamily: '$body',
//   fontWeight: '$semibold',
//   height: '$formElement1',

//   textAlign: 'center',
//   textDecoration: 'none',
//   textTransform: 'uppercase',

//   '&:disabled': {
//     cursor: 'not-allowed',
//   },

//   svg: {
//     display: 'block',
//   },

//   variants: {
//     size: {
//       0: {
//         height: '$formElement0',
//         paddingX: '$4',
//         fontSize: '$1',
//       },
//       1: {
//         height: '$formElement1',
//         paddingX: '$6',
//         fontSize: '$2',
//       },
//       2: {
//         height: '$formElement2',
//         paddingX: '$7',
//         fontSize: '$2',
//       },
//       'view-nav': { paddingX: 10, fontSize: 18 },
//     },
//     icon: {
//       true: {},
//       standalone: {},
//     },
//     variant: {
//       base: {
//         '&:focus-visible': {
//           outline: 'none',
//         },
//       },
//       primary: primaryButtonCss,
//       outline: {
//         backgroundColor: '$white100',
//         boxShadow: '$regular0',
//         color: '$black100',

//         '@hover': {
//           '&:hover': {
//             borderColor: '$black100',
//             boxShadow: '$regular0, inset 0px 0px 0px 1px $colors$black100',
//           },
//         },
//         '&:active, &[data-state=open]': {
//           borderColor: '$black100',
//           backgroundColor: '$black5',
//           transform: 'translate3d(0, 2px, 0)',
//           boxShadow: '$regular0, inset 0px 0px 0px 1px $colors$black100',
//         },
//         '&:focus-visible': {
//           borderColor: '$black100',
//           outline: '4px solid $black30',
//         },
//         '&:disabled': {
//           boxShadow: '$regular0',
//           color: '$black40',
//           '@hover': {
//             '&:hover': {
//               borderColor: 'transparent',
//               boxShadow: '$regular0',
//             },
//           },
//           '&:active, &[data-state=open]': {
//             backgroundColor: '$white100',
//             transform: 'none',
//           },
//         },
//       },
//       raised: {
//         backgroundColor: '$white100',
//         borderColor: 'transparent',
//         boxShadow: '$soft0',
//         color: '$black100',

//         '@hover': {
//           '&:hover': {
//             borderColor: 'transparent',
//             boxShadow: '$soft1',
//             transform: 'translate3d(0, -1px, 0)',
//           },
//         },
//         '&:active, &[data-state=open]': {
//           borderColor: 'transparent',
//           boxShadow: '$soft0',
//           transform: 'translate3d(0, 2px, 0)',
//         },

//         '&:focus-visible': {
//           borderColor: '$black100',
//           outline: '4px solid $black30',
//         },
//         '&:disabled': {
//           color: '$black40',
//           transform: 'none',
//           borderColor: 'transparent',
//           '@hover': {
//             '&:hover': {
//               boxShadow: '$soft0',
//             },
//           },
//         },
//       },
//       ghost: {
//         backgroundColor: 'transparent',
//         color: '$black100',

//         '@hover': {
//           '&:hover': {
//             backgroundColor: '$black5',
//           },
//         },
//         '&:active, &[data-state=open]': {
//           backgroundColor: '$black5',
//           transform: 'translate3d(0, 2px, 0)',
//         },
//         '&:focus-visible': {
//           borderColor: '$black100',
//           outline: '4px solid $black30',
//         },
//         '&:disabled': {
//           color: '$black40',
//           '@hover': {
//             '&:hover': {
//               backgroundColor: 'transparent',
//             },
//           },
//           '&:active, &[data-state=open]': {
//             transform: 'none',
//           },
//         },
//       },
//       blur: {
//         backgroundColor: '$white20',
//         backdropFilter: 'blur(10px)',
//         color: '$white100',

//         '@hover': {
//           '&:hover': {
//             backgroundColor: '$white100',
//             boxShadow: '$regular1',
//             color: '$black100',
//             transform: 'translate3d(0, -1px, 0)',
//           },
//         },
//         '&:active, &[data-state=open]': {
//           boxShadow: 'none',
//           transform: 'translate3d(0, 2px, 0)',
//         },
//         '&:focus-visible': {
//           borderColor: '$white100',
//           outline: '4px solid $white50',
//         },
//         '&:disabled': {
//           backgroundColor: '$white60',
//           backdropFilter: 'blur(10px)',
//           color: '$black60',

//           '@hover': {
//             '&:hover': {
//               transform: 'none',
//               boxShadow: 'none',
//             },
//           },
//         },
//       },
//       danger: {
//         backgroundColor: '$black100',
//         color: '$white100',

//         '@hover': {
//           '&:hover': {
//             boxShadow: '$regular1',
//             backgroundColor: '$red100',
//             transform: 'translate3d(0, -1px, 0)',
//           },
//         },
//         '&:active, &[data-state=open]': {
//           backgroundColor: '$red100',
//           boxShadow: 'none',
//           transform: 'translate3d(0, 2px, 0)',
//         },
//         '&:focus-visible': {
//           borderColor: '$white100',
//           outline: '4px solid $black30',
//         },
//         '&:disabled': {
//           backgroundColor: '$black5',
//           boxShadow: 'none',
//           color: '$black50',
//           transform: 'none',

//           '&:active, &[data-state=open]': {
//             backgroundColor: '$black50',
//           },
//         },
//       },
//       disabled: {
//         backgroundColor: 'none',
//         color: '#757575',

//         '&:hover': {
//           backgroundColor: 'none',
//         },
//       },
//       inactive: {
//         backgroundColor: '$grey100',
//         color: '#fff',
//       },
//       uiToggle: {
//         display: 'flex',
//         paddingX: 16,
//         paddingY: 0,
//         backgroundColor: '$white100',
//         borderRadius: 9999,
//         textTransform: 'capitalize',
//         fontSize: 14,
//         fontWeight: 700,
//         boxShadow: '$regular0',
//         height: 40,
//         gap: 8,
//         userSelect: 'none',
//       },
//       'view-nav': {
//         backgroundColor: '$white100',
//         boxShadow: '$soft0',
//       },
//     },
//   },
//   defaultVariants: {
//     size: 1,
//     variant: 'outline',
//   },
//   compoundVariants: [
//     /*
//      * Button with icon in size 0 */
//     {
//       size: 0,
//       icon: true,
//       css: {
//         paddingX: '16',
//         svg: {
//           width: 'auto',
//           height: '$icon0',
//         },
//         'svg:first-child': {
//           marginRight: '6px',
//         },
//         'svg:last-child': {
//           marginLeft: '6px',
//         },
//       },
//     },
//     {
//       size: 0,
//       icon: 'standalone',
//       css: {
//         padding: 0,
//         borderRadius: '50%',
//         width: '36', // 36 formElement0
//         height: '36',
//         svg: {
//           width: 'auto',
//           height: '16',
//         },
//       },
//     },

//     /*
//      * Button with icon in size 1 */
//     {
//       size: 1,
//       icon: true,
//       css: {
//         paddingRight: '16',
//         paddingLeft: '20',
//         svg: {
//           width: 'auto',
//           height: '16', // icons1
//         },
//         'svg:first-child': {
//           marginRight: '8',
//         },
//         'svg:last-child': {
//           marginLeft: '8',
//         },
//       },
//     },
//     {
//       size: 1,
//       icon: 'standalone',
//       css: {
//         padding: 0,
//         borderRadius: '50%',
//         width: '44', // formElement1
//         height: '44',
//         svg: {
//           height: '18',
//           width: 'auto',
//         },
//       },
//     },

//     /*
//      * Button with icon in size 2 */
//     {
//       size: 2,
//       icon: true,
//       css: {
//         paddingX: '$6',
//         svg: {
//           width: 'auto',
//           height: '$icon2',
//         },
//         'svg:first-child': {
//           marginRight: '$3',
//         },
//         'svg:last-child': {
//           marginLeft: '$3',
//         },
//       },
//     },
//     {
//       size: 2,
//       icon: 'standalone',
//       css: {
//         padding: 0,
//         borderRadius: '50%',
//         width: '$formElement2',
//         height: '$formElement2',
//         svg: {
//           height: '$icon3',
//           width: 'auto',
//         },
//       },
//     },
//   ],
// })`

const shadows = {
  regular0: `0px 0px 2px rgba(0,0,0,0.15), 0px 2px 5px rgba(0,0,0,0.5), 0px 8px 40px rgba(0,0,0,0.4)`,
  regular1: `0px 0px 2px rgba(0,0,0,0.15), 0px 4px 7px rgba(0,0,0,0.5), 0px 12px 40px rgba(0,0,0,0.1)`,
  regular2: `0px 0px 2px rgba(0,0,0,0.15), 0px 4px 7px rgba(0, 0, 0, 0.07), 0px 12px 40px rgba(0,0,0,0.15)`,
  soft0: `0px 0px 4px rgba(0,0,0,0.2), 0px 8px 16px rgba(0,0,0,0.2), 0px 16px 32px rgba(0,0,0,0.4)`,
  soft1: `0px 0px 4px rgba(0,0,0,0.2), 0px 10px 16px rgba(0,0,0,0.3), 0px 18px 32px rgba(0,0,0,0.5)`,
  soft2: `0px 0px 4px rgba(0,0,0,0.2), 0px 12px 16px rgba(0,0,0,0.4), 0px 20px 32px rgba(0, 0, 0, 0.08)`,
}
export const primaryButtonCss = {
  // TODO: add primary button styles for hover colors
  backgroundColor: '$primary',
  boxShadow: 'none',
  color: '$white100',
  fontWeight: '$medium',

  '@hover': {
    '&:hover': {
      boxShadow: '$regular1',
      backgroundColor: '$primaryDark',
      transform: 'translate3d(0, -1px, 0)',
    },
  },
  '&:active': {
    backgroundColor: '$black90',
    boxShadow: 'none',
    transform: 'translate3d(0, 2px, 0)',
  },
  '&:focus-visible': {
    borderColor: '$white100',
    outline: '4px solid $black30',
  },
  '&:disabled': {
    backgroundColor: '$black5',
    boxShadow: 'none',
    color: '$black50',
    transform: 'none',

    '&:active': {
      backgroundColor: '$black50',
    },
  },
}
