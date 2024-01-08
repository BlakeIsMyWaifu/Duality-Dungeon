declare module 'react-drawline' {
	import { type DetailedHTMLProps, type HTMLAttributes, type MutableRefObject } from 'react'

	interface LineProps {
		startingElement: Element
		endingElement: Element
	}

	interface Element {
		ref: MutableRefObject<HTMLDivElement | null>
		x: string
		y: string
	}

	type Line = (props: LineProps | DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => JSX.Element

	export const StraightLine: Line
	export const LineL: Line
}
