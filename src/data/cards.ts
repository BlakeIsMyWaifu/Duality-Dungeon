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

const MISSING_EFFECT = (cardName: string, position: 'top' | 'bottom') => () =>
	console.log(`${cardName}-${position} has a missing effect`)

// TODO convert to a set
const cardsData = {
	slash: {
		name: 'Slash',
		stamina: 1,
		image: 'slash',
		top: {
			mood: 10,
			description: 'Deal 6 Damage',
			effect: MISSING_EFFECT('slash', 'top')
		},
		bottom: {
			mood: 15,
			description: 'Deal 6 Damage',
			effect: MISSING_EFFECT('slash', 'bottom')
		}
	},
	block: {
		name: 'Block',
		stamina: 1,
		image: 'block',
		top: {
			mood: -5,
			description: 'Gain 5 Block',
			effect: MISSING_EFFECT('block', 'top')
		},
		bottom: {
			mood: -10,
			description: 'Gain 5 Block and then do some more stuff',
			effect: MISSING_EFFECT('block', 'bottom')
		}
	}
} satisfies Record<string, CardData>

export default cardsData
