import cardsData from '~/data/cards'

import { createActionName, type Slice } from '../stateHelpers'
import { type CombatStore } from './combatStore'

export type CardActions = {
	drawCard: (amount?: number) => void
	reloadDeck: () => void
	discardCard: (handId: number) => void
	discardHand: () => void
	activateCard: (handId: number) => void
	/** Does NOT check if the player has enough stamina */
	consumeStamina: (amount: number) => void
}

const actionName = createActionName<keyof CardActions>('combat')

export const cardActions: Slice<CombatStore, CardActions> = (set, get) => ({
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
	}
})
