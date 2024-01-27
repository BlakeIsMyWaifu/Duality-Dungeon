import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import { Box, Stack } from '@mantine/core'

import EndTurn from '~/components/combat/EndTurn'
import Hand from '~/components/combat/Hand'
import Lane from '~/components/combat/Lane'
import Piles from '~/components/combat/Piles'
import Stamina from '~/components/combat/Stamina'
import { useCombatStore } from '~/state/combatStore'

export default function Combat() {
	const dndSettings = useDndSettings()

	return (
		<DndContext {...dndSettings}>
			<Box
				style={{
					display: 'grid',
					gridTemplateAreas: `
						"top top top"
						"turnStatus hand piles"
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

				<Stack
					style={{
						gridArea: 'turnStatus'
					}}
				>
					<Stamina />
					<EndTurn />
				</Stack>

				<Hand />
				<Piles />
			</Box>
		</DndContext>
	)
}

function useDndSettings() {
	const activateCard = useCombatStore(state => state.activateCard)

	const handleDragEnd = (event: DragEndEvent) => {
		if (!event.over) return
		const [type, id] = event.active.id.toString().split('-')
		if (type !== 'handCard') return
		activateCard(+id)
	}

	return {
		onDragEnd: handleDragEnd,
		modifiers: [restrictToWindowEdges]
	} satisfies Parameters<typeof DndContext>[0]
}
