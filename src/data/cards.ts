type CardData = {
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

const cardsData = {
	slash: {
		name: 'Slash',
		stamina: 1,
		image: 'slash',
		top: {
			mood: 10,
			description: 'Deal 6 Damage',
			effect: () => undefined
		},
		bottom: {
			mood: 15,
			description: 'Deal 6 Damage',
			effect: () => undefined
		}
	},
	block: {
		name: 'Block',
		stamina: 1,
		image: 'block',
		top: {
			mood: -5,
			description: 'Gain 5 Block',
			effect: () => undefined
		},
		bottom: {
			mood: -10,
			description: 'Gain 5 Block and then do some more stuff',
			effect: () => undefined
		}
	}
} satisfies Record<string, CardData>

export default cardsData
