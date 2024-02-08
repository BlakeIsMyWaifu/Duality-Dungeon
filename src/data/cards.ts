import { damageFront } from '~/utils/combatHelpers/damageEnemy'
import { shieldCharacter } from '~/utils/combatHelpers/shield'

type CardData = {
	name: CardName
	stamina: number
	image: string
	top: HalfCardData
	bottom: HalfCardData
}

type HalfCardData = {
	mood: number
	description: string
	effect: () => void
}

export type CardName = 'Slash' | 'Block'

const cards = new Map<CardName, CardData>()
	.set('Slash', {
		name: 'Slash',
		stamina: 1,
		image: 'slash',
		top: {
			mood: 10,
			description: 'Deal 6 Damage',
			effect: () => damageFront('top', 6)
		},
		bottom: {
			mood: 15,
			description: 'Deal 6 Damage',
			effect: () => damageFront('bottom', 6)
		}
	})
	.set('Block', {
		name: 'Block',
		stamina: 2,
		image: 'block',
		top: {
			mood: -5,
			description: 'Gain 5 Block',
			effect: () => shieldCharacter('top', 5)
		},
		bottom: {
			mood: -10,
			description: 'Gain 8 Block',
			effect: () => shieldCharacter('bottom', 8)
		}
	})

export function getCardData(cardName: CardName) {
	if (!cards.has(cardName)) throw new Error(`Missing card: ${cardName}`)
	return cards.get(cardName)!
}
