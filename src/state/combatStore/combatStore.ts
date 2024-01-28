import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { type CardName } from '~/data/cards'
import { type EnemyName } from '~/data/enemies'

import { type CardActions, cardActions } from './cardActions'
import { type LaneActions, laneActions } from './LaneActions'
import { type TurnActions, turnActions } from './turnActions'

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

export type CharacterCombat = {
	shield: number
}

export type EnemyCombat = {
	name: EnemyName
	currentHealth: number
	shield: number
	status: Record<string, number>
}

export const combatState: CombatState = {
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

type CombatActions = TurnActions & CardActions & LaneActions

export type CombatStore = CombatState & CombatActions

export const useCombatStore = create<CombatStore>()(
	persist(
		devtools(
			(...a) => ({
				...combatState,
				...turnActions(...a),
				...cardActions(...a),
				...laneActions(...a)
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
