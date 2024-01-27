import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import cardsData, { type CardName } from '~/data/cards'
import enemiesData, { type EnemyName } from '~/data/enemies'
import { type CombatNode } from '~/types/Map'

import { useSaveStore } from './saveStore'
import { createActionName, type Slice } from './stateHelpers'

type CombatState = {
	round: number
	stamina: number
	cards: {
		hand: CardName[]
		deck: CardName[]
		discard: CardName[]
		banish: CardName[]
	}
	enemies: {
		top: EnemyCombat[]
		bottom: EnemyCombat[]
	}
}

type EnemyCombat = {
	name: EnemyName
	currentHealth: number
	currentBlock: number
	status: Record<string, number>
}

const combatState: CombatState = {
	round: 0,
	stamina: 5,
	cards: {
		hand: [],
		deck: [],
		discard: [],
		banish: []
	},
	enemies: {
		top: [],
		bottom: []
	}
}

type CombatAction = {
	/** Should only be called from useMapStore.openNode */
	initCombat: (combatNode: CombatNode) => void
	addEnemy: (lane: 'top' | 'bottom', enemyName: EnemyName) => void
	drawCard: (amount?: number) => void
	reloadDeck: () => void
	discardCard: (handId: number) => void
	activateCard: (handId: number) => void
	/** Do NOT check if the player has enough stamina */
	consumeStamina: (amount: number) => void
}

const actionName = createActionName<keyof CombatAction>('combat')

const combatAction: Slice<CombatStore, CombatAction> = (set, get) => ({
	initCombat: combatNode => {
		const { enemies } = combatNode.data

		const { deck } = useSaveStore.getState()

		for (let i = deck.length - 1; i > 0; i--) {
			const j = ~~(Math.random() * (i + 1))
			;[deck[i], deck[j]] = [deck[j], deck[i]]
		}

		set(
			{
				round: 0,
				stamina: 5,
				cards: {
					hand: [],
					deck,
					discard: [],
					banish: []
				},
				enemies: {
					top: [],
					bottom: []
				}
			},
			...actionName('initCombat')
		)

		enemies.top.forEach(enemyName => {
			get().addEnemy('top', enemyName)
		})
		enemies.bottom.forEach(enemyName => {
			get().addEnemy('bottom', enemyName)
		})

		get().drawCard(5)
	},

	addEnemy: (lane, enemyName) => {
		const enemyData = enemiesData[enemyName]
		set(
			state => ({
				enemies: {
					...state.enemies,
					[lane]: [
						...state.enemies[lane],
						{
							name: enemyName,
							currentHealth: enemyData.maxHealth,
							currentBlock: enemyData.startingBlock,
							status: enemyData.startingStatus
						}
					]
				}
			}),
			...actionName('addEnemy')
		)
	},

	drawCard: (amount = 1) => {
		if (!get().cards.deck.length && !get().cards.discard.length) return

		if (get().cards.deck.length < amount) {
			get().reloadDeck()
		}

		const { deck } = get().cards
		const drawnCard = deck.pop()

		if (!drawnCard) return

		set(
			state => ({
				cards: {
					...state.cards,
					deck,
					hand: [...state.cards.hand, drawnCard]
				}
			}),
			...actionName('drawCard')
		)

		if (amount > 1) {
			get().drawCard(amount - 1)
		}
	},

	reloadDeck: () => {
		set(
			state => ({
				cards: {
					...state.cards,
					deck: state.cards.discard,
					discard: []
				}
			}),
			...actionName('reloadDeck')
		)
	},

	discardCard: handId => {
		const hand = structuredClone(get().cards.hand)
		hand.splice(handId, 1)

		set(
			state => ({
				cards: {
					...state.cards,
					hand,
				}
			}),
			...actionName('discardCard')
		)
	},

	activateCard: handId => {
		const { hand } = get().cards
		const cardName = hand[handId]
		const card = cardsData[cardName]

		const staminaCost = card.stamina
		const currentStamina = get().stamina
		if (currentStamina < staminaCost) return

		card.top.effect()
		card.bottom.effect()

		get().discardCard(handId)
		get().consumeStamina(staminaCost)
	},

	consumeStamina: amount => {
		set(
			state => ({
				stamina: state.stamina - amount
			}),
			...actionName('consumeStamina')
		)
	}
})

type CombatStore = CombatState & CombatAction

export const useCombatStore = create<CombatStore>()(
	persist(
		devtools(
			(...a) => ({
				...combatState,
				...combatAction(...a)
			}),
			{
				// Devtools settings
				name: 'combat'
			}
		),
		{
			// Persist settings
			name: 'combat'
		}
	)
)
