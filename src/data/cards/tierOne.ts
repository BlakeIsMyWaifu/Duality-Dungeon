import { useCombatStore } from '~/state/combatStore/combatStore'
import { type Lane } from '~/types/Combat'
import { damageCharacter } from '~/utils/combatHelpers/damageCharacter'
import { damageEnemy, damageFront, damageLane } from '~/utils/combatHelpers/damageEnemy'

import { type CardData } from '../cards'

export type TierOneCardName = 'Life Tap' | 'Piercing Slash' | 'Charged Beam' | 'Shield Eruption'

function chargedBeam(lane: Lane) {
	const enemies = useCombatStore.getState().enemies[lane]
	enemies.forEach((_enemy, i) => {
		damageEnemy(lane, i, 2 ^ i)
	})
}

function shieldEruption(lane: Lane) {
	const shieldAmount = useCombatStore.getState().characters[lane].shield
	damageFront(lane, shieldAmount)
	useCombatStore.getState().updateCharacter(lane, { shield: 0 })
}

export const tierOneCards = Object.values({
	'Life Tap': {
		name: 'Life Tap',
		stamina: 0,
		image: 'TEMP',
		top: {
			mood: -10,
			description: 'Draw a card',
			effect: () => useCombatStore.getState().drawCard()
		},
		bottom: {
			mood: 15,
			description: 'Take 10 damage',
			effect: () => damageCharacter('bottom', 10)
		}
	},
	'Piercing Slash': {
		name: 'Piercing Slash',
		stamina: 2,
		image: 'TEMP',
		top: {
			mood: 10,
			description: 'Deal 4 Damage to all enemies',
			effect: () => damageLane('top', 4)
		},
		bottom: {
			mood: 10,
			description: 'Deal 6 Damage to all enemies',
			effect: () => damageLane('bottom', 6)
		}
	},
	'Charged Beam': {
		name: 'Charged Beam',
		stamina: 2,
		image: 'TEMP',
		top: {
			mood: 8,
			description: 'Deal 1 damage, deal double damage to the enemy behind, repeat endlessly',
			effect: chargedBeam
		},
		bottom: {
			mood: 8,
			description: 'Deal 1 damage, deal double damage to the enemy behind, repeat endlessly',
			effect: chargedBeam
		}
	},
	'Shield Eruption': {
		name: 'Shield Eruption',
		stamina: 3,
		image: 'TEMP',
		top: {
			mood: 15,
			description: 'Remove all characters shield, deal damage enemy equal to amount removed',
			effect: shieldEruption
		},
		bottom: {
			mood: 15,
			description: 'Remove all characters shield, deal damage enemy equal to amount removed',
			effect: shieldEruption
		}
	}
} as const satisfies Record<TierOneCardName, CardData>)
