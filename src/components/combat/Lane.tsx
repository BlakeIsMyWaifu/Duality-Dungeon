import { Group, Image } from '@mantine/core'

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
				gridArea: position
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
		</Group>
	)
}
