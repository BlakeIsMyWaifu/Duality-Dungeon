import { Group } from '@mantine/core'

import Card from '~/components/Card'
import { useCombatStore } from '~/state/combatStore'

export default function Hand() {
	const hand = useCombatStore(state => state.cards.hand)

	return (
		<Group
			justify='center'
			align='center'
			gap='md'
			style={{
				gridArea: 'hand'
			}}
		>
			{hand.map((card, i) => (
				<CardWrapper key={i} cardName={card} />
			))}
		</Group>
	)
}

function CardWrapper({ cardName }: Parameters<typeof Card>[0]) {
	return <Card cardName={cardName} />
}
