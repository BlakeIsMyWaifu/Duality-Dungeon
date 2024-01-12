import { type DefaultMantineColor, type MantineColorsTuple } from '@mantine/core'

import { type MantineCustomColours } from '~/components/Mantine'

type ExtendedCustomColors = MantineCustomColours | 'primaryColorName' | 'secondaryColorName' | DefaultMantineColor

declare module '@mantine/core' {
	export interface MantineThemeColorsOverride {
		colors: Record<ExtendedCustomColors, MantineColorsTuple>
	}
}
