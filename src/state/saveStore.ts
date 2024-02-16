import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { type CardName } from '~/data/cards'
import { Router } from '~/pages/router'
import { type Lane } from '~/types/Combat'
import { type MapNode } from '~/types/Map'

import { useMapStore } from './mapStore'
import { createActionName, type Slice } from './stateHelpers'

type SaveState = {
	active: boolean
	gameStatus: 'map' | MapNode['type']
	maxStamina: number
	deck: CardName[]
	characters: {
		top: CharacterState
		bottom: CharacterState
	}
}

type CharacterState = {
	readonly characterInfo: RaphaelInfo | AzraelInfo
	health: NumberStat
	mood: Mood
}

type RaphaelInfo = {
	name: 'raphael'
	type: 'holy'
}

type AzraelInfo = {
	name: 'azrael'
	type: 'demonic'
}

type NumberStat = {
	current: number
	max: number
}

interface Mood extends NumberStat {
	thresholds: [number, number]
}

const saveState: SaveState = {
	active: false,
	gameStatus: 'map',
	maxStamina: 5,
	deck: ['Slash', 'Slash', 'Slash', 'Slash', 'Slash', 'Block', 'Block', 'Block', 'Block', 'Block'],
	characters: {
		top: {
			characterInfo: {
				name: 'raphael',
				type: 'holy'
			},
			health: {
				current: 50,
				max: 50
			},
			mood: {
				current: 10,
				max: 100,
				thresholds: [60, 80]
			}
		},
		bottom: {
			characterInfo: {
				name: 'azrael',
				type: 'demonic'
			},
			health: {
				current: 75,
				max: 75
			},
			mood: {
				current: 10,
				max: 100,
				thresholds: [60, 80]
			}
		}
	}
}

type SaveActions = {
	newGame: () => void
	updateCharacterHealth: (lane: Lane, amount: number) => void
}

const actionName = createActionName<keyof SaveActions>('save')

const saveActions: Slice<SaveStore, SaveActions> = (set, _get) => ({
	newGame: () => {
		set(
			{
				...saveState,
				active: true
			},
			...actionName('newGame')
		)

		useMapStore.getState().generateNodes()

		Router.push('Map')
	},

	updateCharacterHealth: (lane, amount) => {
		set(
			state => ({
				characters: {
					...state.characters,
					[lane]: {
						...state.characters[lane],
						health: {
							...state.characters[lane].health,
							current: amount
						}
					}
				}
			}),
			...actionName('updateCharacterHealth')
		)
	}
})

type SaveStore = SaveState & SaveActions

export const useSaveStore = create<SaveStore>()(
	persist(
		devtools(
			(...a) => ({
				...saveState,
				...saveActions(...a)
			}),
			{
				// Devtools settings
				name: 'save'
			}
		),
		{
			// Persist settings
			name: 'save'
		}
	)
)
