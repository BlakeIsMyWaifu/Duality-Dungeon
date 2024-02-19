import { ActionIcon, Box, Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlayerPauseFilled } from '@tabler/icons-react'
import { type ReactNode } from 'react'

import { Router } from '~/pages/router'

type PauseProps = {
	page: () => ReactNode
}

export default function Pause({ page: Page }: PauseProps) {
	return (
		<>
			<Page />
			<PauseInner />
		</>
	)
}

function PauseInner() {
	const [isPaused, pauseHandler] = useDisclosure(false)

	return (
		<>
			<Box style={{ position: 'absolute', top: '12px', left: '12px' }}>
				<ActionIcon onClick={pauseHandler.toggle}>
					<IconPlayerPauseFilled />
				</ActionIcon>
			</Box>

			<Modal opened={isPaused} onClose={pauseHandler.close} centered title='Pause'>
				<Button onClick={() => Router.push('home')}>Main Menu</Button>
			</Modal>
		</>
	)
}
