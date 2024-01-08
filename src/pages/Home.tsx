import { Button, Stack, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

import { useSaveStore } from '~/state/saveStore'

export default function Home() {
	const navigate = useNavigate()

	const newGame = useSaveStore(state => state.newGame)

	return (
		<Stack align='center' justify='center' style={{ height: '100vh' }}>
			<Title>Duality Dungeon</Title>
			<Button
				onClick={() => {
					newGame()
					navigate('/map')
				}}
			>
				New Game
			</Button>
		</Stack>
	)
}
