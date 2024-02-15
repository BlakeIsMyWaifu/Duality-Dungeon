import { useDroppable } from '@dnd-kit/core'
import { Box, Group, Image, Stack } from '@mantine/core'

import { getEnemyData } from '~/data/enemies'
import { type EnemyCombat, useCombatStore } from '~/state/combatStore'
import { useSaveStore } from '~/state/saveStore'
import { type Lane } from '~/types/Combat'

import OutlineText from '../OutlineText'
import HealthBar from './HealthBar'

type LaneProps = {
	position: Lane
}

export default function Lane({ position }: LaneProps) {
	const enemies = useCombatStore(state => state.enemies)[position]

	return (
		<Group
			justify='space-between'
			align='end'
			style={{
				gridArea: position,
				position: 'relative'
			}}
		>
			<Character position={position} />

			<Group gap='xs'>
				{enemies.map((enemy, i) => (
					<Enemy key={i} enemyCombatData={enemy} />
				))}
			</Group>

			<Dropzone position={position} />
		</Group>
	)
}

type DropzoneProps = {
	position: Lane
}

function Dropzone({ position }: DropzoneProps) {
	const { setNodeRef } = useDroppable({
		id: `lane-${position}`
	})

	return (
		<Box
			ref={setNodeRef}
			style={{
				height: '12vh',
				width: '100%',
				position: 'absolute',
				top: position === 'top' ? 0 : undefined,
				bottom: position === 'bottom' ? 0 : undefined
			}}
		/>
	)
}

type CharacterProps = {
	position: Lane
}

function Character({ position }: CharacterProps) {
	const health = useSaveStore(state => state.characters[position].health)
	const shield = useCombatStore(state => state.characters[position].shield)

	return (
		<Stack>
			<Image src={position === 'top' ? '/players/raphael.webp' : '/players/azrael.webp'} h={280} w={280} />
			<HealthBar currentHealth={health.current} maxHealth={health.max} shield={shield} />
		</Stack>
	)
}

type EnemyProps = {
	enemyCombatData: EnemyCombat
}

function Enemy({ enemyCombatData }: EnemyProps) {
	const {
		image,
		maxHealth,
		actions: { movePool }
	} = getEnemyData(enemyCombatData.name)
	const nextMoveName = enemyCombatData.moves[0]
	const { icon: nextMoveIcon, displayName: nextMoveDisplayName } = movePool[nextMoveName]

	return (
		<Stack align='center'>
			<Image src={`/icons/${nextMoveIcon}.webp`} h={48} w={48} />
			<OutlineText fw={700}>{nextMoveDisplayName}</OutlineText>
			<Image
				src={`/enemies/${image}.webp`}
				h={200}
				w={200}
				style={{
					transform: 'scaleX(-1)'
				}}
			/>
			<HealthBar
				currentHealth={enemyCombatData.currentHealth}
				maxHealth={maxHealth}
				shield={enemyCombatData.shield}
			/>
		</Stack>
	)
}
