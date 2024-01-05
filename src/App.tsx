import { MantineProvider, Stack, Title } from '@mantine/core'

function App() {
	return (
		<MantineProvider defaultColorScheme='dark'>
			<Stack align='center' justify='center' style={{ height: '100vh' }}>
				<Title>Duality Dungeon</Title>
			</Stack>
		</MantineProvider>
	)
}

export default App
