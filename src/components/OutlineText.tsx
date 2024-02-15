import { Text, type TextProps } from '@mantine/core'
import { type ReactNode } from 'react'

type OutlineTextProps = {
	children: ReactNode
	colour?: `#${number | string}`
}

export default function OutlineText({ children, colour = '#000', ...textProps }: OutlineTextProps & TextProps) {
	return (
		<Text
			{...textProps}
			style={{
				textShadow: `-1px -1px 0 ${colour}, 1px -1px 0 ${colour}, -1px 1px 0 ${colour}, 1px 1px 0 ${colour}`
			}}
		>
			{children}
		</Text>
	)
}
