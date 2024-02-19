import { Button, Stack, Title } from '@mantine/core'

import { useSaveStore } from '~/state/saveStore'

import { Router } from './router'

export default function Home() {
	const newGame = useSaveStore(state => state.newGame)
	const isActive = useSaveStore(state => state.isActive)
	const gameStatus = useSaveStore(state => state.gameStatus)

	return (
		<Stack align='center' justify='center' style={{ height: '100vh' }}>
			<Title>Duality Dungeon</Title>

			<Button disabled={!isActive} onClick={() => Router.push(gameStatus)}>
				Continue
			</Button>

			<Button onClick={newGame}>New Game</Button>
		</Stack>
	)
}
