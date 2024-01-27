import { type Lane } from '~/types/Combat'
import { damageFront } from '~/utils/combatHelpers/damageEnemy'
import { shieldCharacter } from '~/utils/combatHelpers/shield'

export type CardData = {
	name: string
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

export type CardName = keyof typeof cardsData

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MISSING_EFFECT = (cardName: string, lane: Lane) => () => console.log(`${cardName}-${lane} has a missing effect`)

// TODO convert to a set
const cardsData = {
	slash: {
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
	},
	block: {
		name: 'Block',
		stamina: 1,
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
	}
} satisfies Record<string, CardData>

export default cardsData
