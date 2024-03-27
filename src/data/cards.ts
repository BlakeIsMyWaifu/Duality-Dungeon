import { type Lane } from '~/types/Combat'

import { type BasicCardName, basicCards } from './cards/basic'
import { type TierOneCardName, tierOneCards } from './cards/tierOne'

export type CardName = BasicCardName | TierOneCardName

export type CardData = {
	name: CardName
	stamina: number
	image: string
	top: HalfCardData
	bottom: HalfCardData
}

type HalfCardData = {
	mood: number
	description: string
	effect: (lane: Lane) => void
}

const cards = new Map<string, CardData>()

function addCard(card: CardData) {
	cards.set(card.name, card)
}

basicCards.forEach(addCard)
tierOneCards.forEach(addCard)

export function getCardData(cardName: CardName) {
	if (!cards.has(cardName)) throw new Error(`Missing card: ${cardName}`)
	return cards.get(cardName)!
}
