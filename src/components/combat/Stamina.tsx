import { Stack, Text } from '@mantine/core'

import { useCombatStore } from '~/state/combatStore'

export default function Stamina() {
	const stamina = useCombatStore(state => state.stamina)

	return (
		<Stack
			justify='center'
			style={{
				gridArea: 'stamina',
				backgroundColor: 'var(--mantine-color-brown-6)',
				aspectRatio: '1 / 1',
				borderRadius: '100%',
				marginTop: '75px'
			}}
		>
			<Text ta='center'>Stamina</Text>
			<Text size='xl' ta='center'>
				{stamina} / 5
			</Text>
		</Stack>
	)
}
