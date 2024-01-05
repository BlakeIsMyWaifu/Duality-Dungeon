import { Stack, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

export default function Home() {
	return (
		<Stack align='center' justify='center' style={{ height: '100vh' }}>
			<Title>Duality Dungeon</Title>
			<Link to='/map'>Map</Link>
		</Stack>
	)
}
