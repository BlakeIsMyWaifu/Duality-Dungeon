import { damageFront } from '~/utils/combatHelpers/damageEnemy'
import { shieldCharacter } from '~/utils/combatHelpers/shield'

import { type CardData } from '../cards'

export type BasicCardName = 'Slash' | 'Block'

export const basicCards = Object.values({
	Slash: {
		name: 'Slash',
		stamina: 1,
		image: 'slash',
		top: {
			mood: 10,
			description: 'Deal 6 damage',
			effect: () => damageFront('top', 6)
		},
		bottom: {
			mood: 15,
			description: 'Deal 6 damage',
			effect: () => damageFront('bottom', 6)
		}
	},
	Block: {
		name: 'Block',
		stamina: 2,
		image: 'block',
		top: {
			mood: -5,
			description: 'Gain 5 block',
			effect: () => shieldCharacter('top', 5)
		},
		bottom: {
			mood: -10,
			description: 'Gain 8 block',
			effect: () => shieldCharacter('bottom', 8)
		}
	}
} as const satisfies Record<BasicCardName, CardData>)
