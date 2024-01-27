import { DragOverlay, useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Group, type MantineStyleProp } from '@mantine/core'

import Card, { type CardProps } from '~/components/Card'
import { useCombatStore } from '~/state/combatStore'

export default function Hand() {
	const hand = useCombatStore(state => state.cards.hand)

	return (
		<>
			<Group
				justify='center'
				align='center'
				gap='md'
				style={{
					gridArea: 'hand'
				}}
			>
				{hand.map((card, i) => (
					<CardWrapper key={card + i} cardName={card} id={i} />
				))}
			</Group>

			{/* Needed otherwise the cards can be dragged off screen */}
			<DragOverlay dropAnimation={{ duration: 0 }} />
		</>
	)
}

interface CardWrapperProps extends CardProps {
	id: number | string
}

function CardWrapper({ cardName, id }: CardWrapperProps) {
	const { attributes, listeners, setNodeRef, transform, over } = useDraggable({
		id: `handCard-${id}`
	})

	const style = transform
		? {
				style: {
					transform: CSS.Translate.toString(transform),
					border: `${over ? 'green' : 'yellow'} 12px solid`
				} satisfies MantineStyleProp
			}
		: undefined

	return <Card cardName={cardName} ref={setNodeRef} {...listeners} {...attributes} {...style} />
}
