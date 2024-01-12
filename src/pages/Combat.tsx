import { DndContext } from '@dnd-kit/core'
import { Box } from '@mantine/core'

import Hand from '~/components/combat/Hand'
import Lane from '~/components/combat/Lane'
import Piles from '~/components/combat/Piles'
import Stamina from '~/components/combat/Stamina'

export default function Combat() {
	return (
		<DndContext>
			<Box
				style={{
					display: 'grid',
					gridTemplateAreas: `
						"top top top"
						"stamina hand piles"
						"bottom bottom bottom"
					`,
					gridTemplateColumns: '160px 1fr 240px',
					gridTemplateRows: '1fr 310px 1fr',
					columnGap: '32px',
					height: '100vh',
					boxSizing: 'border-box',
					padding: '16px',
					background: 'url(/background/combat.webp) no-repeat center center fixed',
					backgroundSize: 'cover'
				}}
			>
				<Lane position='top' />
				<Lane position='bottom' />
				<Stamina />
				<Hand />
				<Piles />
			</Box>
		</DndContext>
	)
}
