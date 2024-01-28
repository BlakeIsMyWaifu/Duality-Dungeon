import '@mantine/core/styles.css'
import '~/utils/globalStyles.m.css'

import { type MantineColorsTuple, MantineProvider } from '@mantine/core'
import { type ReactNode } from 'react'

type MantineProps = {
	children: ReactNode
}

export type MantineCustomColours = 'brown' | 'blueGrey'

export default function Mantine({ children }: MantineProps) {
	return (
		<MantineProvider
			defaultColorScheme='dark'
			theme={{
				colors: {
					brown: [
						'#EFEBE9',
						'#D7CCC8',
						'#BCAAA4',
						'#A1887F',
						'#8D6E63',
						'#795548',
						'#6D4C41',
						'#5D4037',
						'#4E342E',
						'#3E2723'
					],
					blueGrey: [
						'#ECEFF1',
						'#CFD8DC',
						'#B0BEC5',
						'#90A4AE',
						'#78909C',
						'#607D8B',
						'#546E7A',
						'#455A64',
						'#37474F',
						'#263238'
					]
				} satisfies Record<MantineCustomColours, MantineColorsTuple>
			}}
		>
			{children}
		</MantineProvider>
	)
}
