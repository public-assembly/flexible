import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cx } from 'cva'

// import cx from 'classnames'
import React from 'react'
import { withClassName } from '../withClassName'

export type ToolTipProps = TooltipPrimitive.TooltipProps

export function Tooltip(props: ToolTipProps) {
	return <TooltipPrimitive.Root {...props} />
}

// Tooltip.Trigger = withClassName(TooltipPrimitive.Trigger, 'tooltip-trigger')

Tooltip.Trigger = React.forwardRef<HTMLButtonElement, TooltipPrimitive.TooltipTriggerProps>(function TooltipTrigger(
	{ ...props },
	forwardedRef
) {
	return <TooltipPrimitive.Trigger {...props} ref={forwardedRef} />
})

Tooltip.Portal = withClassName(TooltipPrimitive.Portal, 'tooltip-portal')

// Tooltip.Content = withClassName(TooltipPrimitive.Content, 'tooltip-content')

Tooltip.Content = React.forwardRef<HTMLDivElement, TooltipPrimitive.TooltipContentProps>(function TooltipContent(
	{ className, ...props },
	forwardedRef
) {
	return (
		<TooltipPrimitive.Content
			ref={forwardedRef}
			sideOffset={4}
			className={cx(className, [
				'radix-side-top:animate-slide-down-fade',
				'radix-side-right:animate-slide-left-fade',
				'radix-side-bottom:animate-slide-up-fade',
				'radix-side-left:animate-slide-right-fade',
				'inline-flex items-center rounded-md px-4 py-2.5',
				'bg-black/60 text-white  ',
			])}
			{...props}
		/>
	)
})

// Tooltip.Arrow = withClassName(TooltipPrimitive.Arrow, 'tooltip-arrow')

Tooltip.Arrow = React.forwardRef<SVGSVGElement, TooltipPrimitive.TooltipArrowProps>(function TooltipArrow(
	{ className, ...props },
	forwardedRef
) {
	return (
		<TooltipPrimitive.Arrow
			ref={forwardedRef}
			className={cx('fill-current  text-black/60', [className])}
			{...props}
		/>
	)
})

// import Tippy from '@tippyjs/react'

// import { styled } from 'stitches.config'

// import 'tippy.js/animations/shift-away.css'

// const TooltipBase = styled(Tippy, {
// 	backgroundColor: '$black100',
// 	color: '$white100',
// 	fontWeight: '$book',
// 	borderRadius: '$2',
// 	position: 'relative',
// 	textAlign: 'center',

// 	variants: {
// 		size: {
// 			0: {
// 				fontSize: '$0',
// 				paddingX: '$2',
// 				paddingY: '$1',
// 			},
// 			1: {
// 				fontSize: '1rem',
// 				paddingX: '$3',
// 				paddingY: '$2',
// 			},
// 		},
// 	},

// 	defaultVariants: {
// 		size: 0,
// 	},
// })

// TooltipBase.defaultProps = {
// 	animation: 'shift-away',
// 	maxWidth: 200,
// }

// const TooltipIcon = styled('div', {
// 	color: '$black40',
// 	transition: 'color $1 $ease',

// 	'@hover': {
// 		'&:hover': {
// 			color: '$black100',
// 		},
// 	},
// })

// const Tooltip = Object.assign(TooltipBase, { Icon: TooltipIcon })

// export default Tooltip
