import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import cardsData, { type CardName } from '~/data/cards'
import enemiesData, { type EnemyName } from '~/data/enemies'
import { type Lane } from '~/types/Combat'
import { type CombatNode } from '~/types/Map'

import { useSaveStore } from './saveStore'
import { createActionName, type Slice } from './stateHelpers'

type CombatState = {
	round: number
	isPlayerActive: boolean
	stamina: number
	characters: {
		top: CharacterCombat
		bottom: CharacterCombat
	}
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

type CharacterCombat = {
	shield: number
}

export type EnemyCombat = {
	name: EnemyName
	currentHealth: number
	shield: number
	status: Record<string, number>
}

const combatState: CombatState = {
	round: 0,
	isPlayerActive: true,
	stamina: 5,
	characters: {
		top: {
			shield: 0
		},
		bottom: {
			shield: 0
		}
	},
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
	addEnemy: (lane: Lane, enemyName: EnemyName) => void
	removeEnemy: (lane: Lane, index: number) => void
	drawCard: (amount?: number) => void
	reloadDeck: () => void
	discardCard: (handId: number) => void
	discardHand: () => void
	activateCard: (handId: number) => void
	/** Does NOT check if the player has enough stamina */
	consumeStamina: (amount: number) => void
	endTurn: () => void
	startTurn: () => void
	enemyTurn: () => void
	updateEnemy: (lane: Lane, index: number, data: Partial<EnemyCombat>) => void
	updateCharacter: (lane: Lane, data: Partial<CharacterCombat>) => void
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
			state => ({
				...combatState,
				cards: {
					...state.cards,
					deck
				}
			}),
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
							shield: enemyData.startingShield,
							status: enemyData.startingStatus
						}
					]
				}
			}),
			...actionName('addEnemy')
		)
	},

	removeEnemy: (lane, index) => {
		const updatedLane = structuredClone(get().enemies[lane])
		updatedLane.splice(index, 1)

		set(
			state => ({
				enemies: {
					...state.enemies,
					[lane]: updatedLane
				}
			}),
			...actionName('removeEnemy')
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

		const discardedCard = get().cards.hand[handId]

		set(
			state => ({
				cards: {
					...state.cards,
					hand,
					discard: [...state.cards.discard, discardedCard]
				}
			}),
			...actionName('discardCard')
		)
	},

	discardHand: () => {
		set(
			state => ({
				cards: {
					...state.cards,
					discard: [...state.cards.discard, ...state.cards.hand],
					hand: []
				}
			}),
			...actionName('discardHand')
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

		set({}, ...actionName('activateCard'))
	},

	consumeStamina: amount => {
		set(
			state => ({
				stamina: state.stamina - amount
			}),
			...actionName('consumeStamina')
		)
	},

	endTurn: () => {
		set({ isPlayerActive: false }, ...actionName('endTurn'))

		get().discardHand()
		get().enemyTurn()
		get().startTurn()
	},

	startTurn: () => {
		const { maxStamina } = useSaveStore.getState()

		set({ isPlayerActive: true, stamina: maxStamina })

		get().drawCard(5)
	},

	enemyTurn: () => {
		set({}, ...actionName('enemyTurn'))
	},

	updateEnemy: (lane, index, data) => {
		const laneEnemies = structuredClone(get().enemies[lane])
		laneEnemies[index] = { ...laneEnemies[index], ...data }

		set(
			state => ({
				enemies: {
					...state.enemies,
					[lane]: laneEnemies
				}
			}),
			...actionName('updateEnemy')
		)

		const enemy = get().enemies[lane][index]
		if (enemy.currentHealth <= 0) {
			get().removeEnemy(lane, index)
		}
	},

	updateCharacter: (lane, data) => {
		set(
			state => ({
				characters: {
					...state.characters,
					[lane]: { ...state.characters[lane], ...data }
				}
			}),
			...actionName('updateCharacter')
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
