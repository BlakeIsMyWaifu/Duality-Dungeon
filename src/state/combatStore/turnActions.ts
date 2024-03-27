import { tierOneCards } from '~/data/cards/tierOne'
import { combatState, type CombatStore } from '~/state/combatStore'
import { useSaveStore } from '~/state/saveStore'
import { createActionName, type Slice } from '~/state/stateHelpers'
import { type CombatNode } from '~/types/Map'
import { randomValue } from '~/utils/random'

import { useMapStore } from '../mapStore'

export type TurnActions = {
	/** Should only be called from useMapStore.openNode */
	initCombat: (combatNode: CombatNode) => void
	endCombat: () => void
	endTurn: () => void
	startTurn: () => void
	enemyTurn: () => void
}

const actionName = createActionName<keyof TurnActions>('combat')

export const turnActions: Slice<CombatStore, TurnActions> = (set, get) => ({
	initCombat: combatNode => {
		const { enemies } = combatNode.data

		const deck = structuredClone(useSaveStore.getState().deck)

		for (let i = deck.length - 1; i > 0; i--) {
			const j = ~~(Math.random() * (i + 1))
			;[deck[i], deck[j]] = [deck[j], deck[i]]
		}

		const initialState = structuredClone(combatState)
		initialState.cards.deck = deck

		set({ ...initialState }, ...actionName('initCombat'))

		enemies.top.forEach(enemyName => {
			get().addEnemy('top', enemyName)
		})
		enemies.bottom.forEach(enemyName => {
			get().addEnemy('bottom', enemyName)
		})

		get().drawCard(5)

		useSaveStore.getState().changeGameStatus('combat')
	},

	endCombat: () => {
		const randomTierOneCard = randomValue(tierOneCards)
		useSaveStore.getState().addCardToDeck(randomTierOneCard.name)

		useMapStore.getState().completeNode()
	},

	endTurn: () => {
		set({ isPlayerActive: false }, ...actionName('endTurn'))

		get().discardHand()
		get().enemyTurn()
		get().startTurn()

		set({}, ...actionName('endTurn'))
	},

	startTurn: () => {
		const { maxStamina } = useSaveStore.getState()

		set(
			state => ({ isPlayerActive: true, stamina: maxStamina, round: state.round + 1 }),
			...actionName('startTurn')
		)

		get().drawCard(5)
	},

	enemyTurn: () => {
		get().enemies.top.forEach((_, i) => get().enemyUseMove('top', i))
		get().enemies.bottom.forEach((_, i) => get().enemyUseMove('bottom', i))

		set({}, ...actionName('enemyTurn'))
	}
})
