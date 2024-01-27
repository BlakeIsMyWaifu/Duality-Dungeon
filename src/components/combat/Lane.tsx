import { useDroppable } from '@dnd-kit/core'
import { Box, Group, Image } from '@mantine/core'

import { useCombatStore } from '~/state/combatStore'

type LaneProps = {
	position: 'top' | 'bottom'
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
			<Image src={position === 'top' ? '/players/raphael.webp' : '/players/azrael.webp'} h={280} w={280} />

			<Group gap={0}>
				{enemies.map((enemy, i) => (
					<Image
						key={i}
						src={`/enemies/${enemy.name}.webp`}
						h={200}
						w={200}
						style={{
							transform: 'scaleX(-1)'
						}}
					/>
				))}
			</Group>

			<Dropzone position={position} />
		</Group>
	)
}

type DropzoneProps = {
	position: 'top' | 'bottom'
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
