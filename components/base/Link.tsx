import React, { ReactNode } from 'react'
import NextLink from 'next/link'
import { Tooltip } from './Tooltip'
import { cx } from 'cva'

type LinkProps = {
	href: string
	children: ReactNode
	className?: string
	tooltip?: string
	onClick?: () => void
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

// Abstraction over NextLink
export const Link = ({ href, children, ...props }: LinkProps) => {
	if (href.startsWith('http')) {
		if (props.tooltip) {
			return (
				<Tooltip>
					<a
						className={cx('inline-block truncate hover:opacity-100', [props.className])}
						href={href}
						target="_blank"
						rel="noreferrer"
						{...props}
					>
						<Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
					</a>
					<Tooltip.Content>
						<Tooltip.Arrow className="fill-current" />
						{props.tooltip}
					</Tooltip.Content>
				</Tooltip>
			)
		} else {
			return (
				<a
					className={'truncate hover:underline hover:opacity-100 ' + props.className}
					href={href}
					target="_blank"
					rel="noreferrer"
					{...props}
				>
					{children}
				</a>
			)
		}
	}

	// If the link is internal, use NextLink
	return (
		<NextLink href={href} passHref legacyBehavior>
			<a {...props}>{children}</a>
		</NextLink>
	)
}
