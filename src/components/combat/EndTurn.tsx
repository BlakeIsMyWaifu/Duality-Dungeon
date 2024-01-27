import { Button } from '@mantine/core'
import { useMemo } from 'react'

import cardsData from '~/data/cards'
import { useCombatStore } from '~/state/combatStore'

export default function EndTurn() {
	const endTurn = useCombatStore(state => state.endTurn)

	const hand = useCombatStore(state => state.cards.hand)
	const stamina = useCombatStore(state => state.stamina)

	const canPlayCards = useMemo(() => {
		if (!hand.length) return false
		const staminaCosts = hand.map(cardName => cardsData[cardName].stamina)
		const cheapestCost = Math.min(...staminaCosts)
		return cheapestCost <= stamina
	}, [hand, stamina])

	return (
		<Button color={canPlayCards ? 'yellow' : 'green'} onClick={endTurn}>
			End Turn
		</Button>
	)
}
