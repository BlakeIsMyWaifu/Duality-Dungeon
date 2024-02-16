import { Button, Stack, Title } from '@mantine/core'

import { useSaveStore } from '~/state/saveStore'

export default function Home() {
	const newGame = useSaveStore(state => state.newGame)

	return (
		<Stack align='center' justify='center' style={{ height: '100vh' }}>
			<Title>Duality Dungeon</Title>
			<Button onClick={newGame}>New Game</Button>
		</Stack>
	)
}
